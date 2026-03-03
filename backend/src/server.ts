import dotenv from 'dotenv';
// Load .env.local first, then fallback to .env
dotenv.config({ path: '.env.local' });
dotenv.config();

import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import mongoose from 'mongoose';
import rateLimit from 'express-rate-limit';
import { logger } from './utils/logger';
import { errorHandler } from './middleware/errorHandler';
import consultationRoutes from './routes/consultation.routes';
const app: Express = express();
const port = process.env.PORT || 5000;

// Security and utility middleware
app.use(helmet());

app.use(express.json());

//CORS Handling
app.use(cors({
    origin: [
        "http://localhost:3000",
        "https://arogya-ai-web.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    credentials: true
    })
);

app.options("*", cors()); //handle preflight requests

// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    standardHeaders: true,
    legacyHeaders: false,
});
app.use(limiter);

// Database connection
const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/arogyaai';
        await mongoose.connect(mongoURI);
        logger.info('MongoDB connected successfully');
    } catch (err) {
        logger.error('MongoDB connection error:', err);
        process.exit(1);
    }
};
connectDB();

// API Routes
app.use('/api/consultations', consultationRoutes);

// Health check route
app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({ status: 'ok', message: 'ArogyaAI Backend is healthy' });
});

// Centralized error handling
app.use(errorHandler);

// Start server
app.listen(port, () => {

    logger.info(`[server]: ${process.env.NODE_ENV === "production" ? "Production server running" : `Local server running at http://localhost:${port}`}`);
});
