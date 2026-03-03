import { Request, Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth';
import { processTextConsultation, processAudioConsultation } from '../services/pipeline.service';
import Consultation from '../models/Consultation';

export const analyzeText = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const userId = req.auth?.userId;
        const { symptoms, language } = req.body;

        if (!userId || !symptoms || !language) {
            return res.status(400).json({ success: false, message: 'Missing required fields' });
        }

        const { consultation, finalAiResponse } = await processTextConsultation(userId, symptoms, language);

        res.status(200).json({
            success: true,
            data: {
                ...consultation.toObject(),
                aiResponse: finalAiResponse // Ensures the translated one is returned immediately
            }
        });
    } catch (error) {
        next(error);
    }
};

export const analyzeAudio = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const userId = req.auth?.userId;
        const language = req.body.language;
        const audioFile = req.file;

        if (!userId || !audioFile || !language) {
            return res.status(400).json({ success: false, message: 'Missing required fields or audio file' });
        }

        const { consultation, audioResponseBuffer } = await processAudioConsultation(userId, audioFile.buffer, language);

        res.status(200).json({
            success: true,
            data: {
                ...consultation.toObject(),
                // consultation.aiResponse already contains the translated response here
            },
            audioResponse: audioResponseBuffer ? audioResponseBuffer.toString('base64') : null
        });
    } catch (error) {
        next(error);
    }
};

export const getHistory = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const userId = req.auth?.userId;
        if (!userId) {
            return res.status(400).json({ success: false, message: 'Missing user id' });
        }

        const history = await Consultation.find({ userId }).sort({ createdAt: -1 });

        res.status(200).json({ success: true, data: history });
    } catch (error) {
        next(error);
    }
};
