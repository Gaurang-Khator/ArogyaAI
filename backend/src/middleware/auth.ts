import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '@clerk/clerk-sdk-node';
import { logger } from '../utils/logger';

export interface AuthRequest extends Request {
    auth?: {
        userId: string;
        sessionId?: string;
    };
}

export const requireAuth = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ success: false, message: 'Unauthorized: No token provided' });
        }

        const token = authHeader.split(' ')[1];
        const decodedToken = await verifyToken(token, {
            secretKey: process.env.CLERK_SECRET_KEY,
        });

        if (!decodedToken || !decodedToken.sub) {
            return res.status(401).json({ success: false, message: 'Unauthorized: Invalid token' });
        }

        req.auth = {
            userId: decodedToken.sub,
            sessionId: decodedToken.sid,
        };

        next();
    } catch (error) {
        logger.error('Authentication Error', error);
        return res.status(401).json({ success: false, message: 'Unauthorized: Token verification failed' });
    }
};
