import { SarvamAIClient } from 'sarvamai';
import { logger } from '../utils/logger';

const getClient = () => {
    const key = process.env.SARVAM_API_KEY;
    if (!key) {
        throw new Error("SARVAM_API_KEY is not set.");
    }
    return new SarvamAIClient({ apiSubscriptionKey: key });
};

const languageMap: Record<string, string> = {
    English: 'en-IN',
    Hindi: 'hi-IN',
    Gujarati: 'gu-IN',
    Tamil: 'ta-IN',
    Telugu: 'te-IN',
    Marathi: 'mr-IN',
};

export const speechToText = async (audioBuffer: Buffer, language: string): Promise<string> => {
    try {
        const client = getClient();
        const response = await client.speechToText.transcribe({
            file: audioBuffer as any, // The SDK accepts Buffer, but TS might need cast wrapper
        });

        // The exact field on the response object might be 'transcript' or similar depends on the exact version response
        // Using any cast to avoid TS compile errors in case the schema type has strictly nested structure
        return (response as any).transcript || '';
    } catch (error: any) {
        logger.error('Sarvam STT SDK Error:', error.body || error.message || error);
        throw new Error('Failed to convert speech to text');
    }
};

export const translateText = async (text: string, sourceLang: string, targetLang: string = "English"): Promise<string> => {
    try {
        if (sourceLang === targetLang) return text;

        const sourceCode = languageMap[sourceLang] || 'hi-IN';
        const targetCode = languageMap[targetLang] || 'en-IN';

        const client = getClient();
        const response = await client.text.translate({
            input: text,
            source_language_code: sourceCode as any,
            target_language_code: targetCode as any,
            model: "mayura:v1",
            mode: "formal"
        });

        return (response as any).translated_text || text;
    } catch (error: any) {
        logger.error('Sarvam Translate SDK Error:', error.body || error.message || error);
        throw new Error('Failed to translate text');
    }
};

export const generateSpeech = async (text: string, language: string): Promise<Buffer> => {
    try {
        const langCode = languageMap[language] || 'hi-IN';
        const client = getClient();

        const response = await client.textToSpeech.convert({
            text,
            target_language_code: langCode as any,
            model: "bulbul:v3",
            speaker: "kavya"
        });

        // The SDK returns { audios: [ "base64_string", ... ] } 
        if (typeof response === "object" && response !== null) {
            const respObj = response as any;
            if (respObj.audios && Array.isArray(respObj.audios) && respObj.audios.length > 0) {
                return Buffer.from(respObj.audios[0], 'base64');
            } else if (respObj.audio && typeof respObj.audio === 'string') {
                return Buffer.from(respObj.audio, 'base64');
            }
        }

        if (response instanceof ArrayBuffer) {
            return Buffer.from(response);
        }

        throw new Error('Unexpected response format from TTS API');
    } catch (error: any) {
        logger.error('Sarvam TTS SDK Error:', error.body || error.message || error);
        throw new Error('Failed to generate speech');
    }
};
