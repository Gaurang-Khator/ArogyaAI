import { speechToText, translateText, generateSpeech } from './sarvam.service';
import { analyzeSymptoms } from './llm.service';
import Consultation from '../models/Consultation';
import { logger } from '../utils/logger';

export const processTextConsultation = async (userId: string, symptoms: string, language: string) => {
    logger.info(`Processing text consultation for user ${userId} in ${language}`);

    // 1. Translate to English if not already
    let translatedInput = symptoms;
    if (language !== "English") {
        translatedInput = await translateText(symptoms, language, "English");
    }

    // 2. Pass to LLM
    const aiResponse = await analyzeSymptoms(translatedInput);

    // 3. Translate AI Response back to original language if not English
    const finalAiResponse = { ...aiResponse };
    if (language !== "English") {
        logger.info(`Translating response back to ${language} for user ${userId}`);
        finalAiResponse.condition = await translateText(aiResponse.condition, "English", language);

        if (aiResponse.precautions && aiResponse.precautions.length > 0) {
            finalAiResponse.precautions = await Promise.all(
                aiResponse.precautions.map((p: string) => translateText(p, "English", language))
            );
        }

        if (aiResponse.medicines && aiResponse.medicines.length > 0) {
            finalAiResponse.medicines = await Promise.all(
                aiResponse.medicines.map((m: string) => translateText(m, "English", language))
            );
        }

        if (aiResponse.emergency_advice) {
            finalAiResponse.emergency_advice = await translateText(aiResponse.emergency_advice, "English", language);
        }
    }

    // 4. Save to DB (Store the translated response so history shows it correctly)
    const consultation = new Consultation({
        userId,
        originalLanguage: language,
        originalInput: symptoms,
        translatedInput,
        aiResponse: finalAiResponse,
        severity: finalAiResponse.severity, // Severity enum usually stays as English, but logic is fine
    });

    await consultation.save();

    return { consultation, finalAiResponse };
};

export const processAudioConsultation = async (userId: string, audioBuffer: Buffer, language: string) => {
    logger.info(`Processing audio consultation for user ${userId} in ${language}`);

    // 1. Speech to Text
    const transcribedText = await speechToText(audioBuffer, language);

    // 2. Pipeline follows normal text flow (translation, LLM, inverse translation)
    const { consultation, finalAiResponse } = await processTextConsultation(userId, transcribedText, language);

    // 3. Generate Audio for the final response
    let audioResponseBuffer: Buffer | null = null;
    try {
        const ttsTextOptions = [
            finalAiResponse.condition,
            finalAiResponse.precautions?.length ? `Precautions: ${finalAiResponse.precautions.join(", ")}` : "",
            finalAiResponse.medicines?.length ? `Medicines: ${finalAiResponse.medicines.join(", ")}` : "",
            finalAiResponse.emergency_advice || ""
        ];

        // Strip out empty strings
        const textToSpeak = ttsTextOptions.filter(Boolean).join(". ");

        if (textToSpeak) {
            logger.info(`Generating TTS audio response in ${language}`);
            audioResponseBuffer = await generateSpeech(textToSpeak, language);
        }
    } catch (err) {
        logger.error(`Failed to generate TTS audio response for user ${userId}:`, err);
        // Continue without audio if TTS fails
    }

    return { consultation, audioResponseBuffer };
};
