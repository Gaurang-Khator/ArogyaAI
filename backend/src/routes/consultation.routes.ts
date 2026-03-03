import { Router } from 'express';
import multer from 'multer';
import { requireAuth } from '../middleware/auth';
import { analyzeText, analyzeAudio, getHistory } from '../controllers/consultation.controller';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/text', requireAuth, analyzeText);
router.post('/audio', requireAuth, upload.single('audio'), analyzeAudio);
router.get('/', requireAuth, getHistory);

export default router;
