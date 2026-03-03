import { GoogleGenAI } from '@google/genai';
import { logger } from '../utils/logger';

let aiInstance: GoogleGenAI | null = null;
const getAI = () => {
    if (!aiInstance) {
        if (!process.env.LLM_API_KEY) {
            throw new Error("API key must be set (LLM_API_KEY).");
        }
        aiInstance = new GoogleGenAI({ apiKey: process.env.LLM_API_KEY });
    }
    return aiInstance;
};

const PROMPT_TEMPLATE = `You are a cautious medical assistant.
Based on these symptoms:
{symptoms}

Respond strictly in JSON with the exact following schema:
{
  "condition": "string",
  "severity": "Low" | "Moderate" | "Emergency",
  "precautions": ["string"],
  "medicines": ["string"],
  "emergency_advice": "string"
}

Rules:
1. "emergency_advice" should only be provided if severity is "Emergency", otherwise omit it.
2. If symptoms indicate chest pain, breathing issues, or unconsciousness, always mark severity as "Emergency".
3. Provide only the JSON, no markdown formatting.`;

export const analyzeSymptoms = async (symptoms: string) => {
    try {
        const prompt = PROMPT_TEMPLATE.replace('{symptoms}', symptoms);

        const ai = getAI();
        // Using gemini-2.5-flash as the default fast reasoning model
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
            }
        });

        const text = response.text || "{}";
        const result = JSON.parse(text);
        return result;
    } catch (error) {
        logger.error('LLM Service Error', error);
        throw new Error('Failed to analyze symptoms via LLM');
    }
};
