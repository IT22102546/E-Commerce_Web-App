import express from 'express';
import { getColorRecommendations } from '../controllers/recommendation.controller.js';


const router = express.Router();

router.post('/', getColorRecommendations);

export default router;