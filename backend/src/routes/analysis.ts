import express from 'express';
import {
  getResumeAnalysis,
  getSkillGapAnalysis,
  generateCareerInsights,
  getMarketTrends
} from '../controllers/analysisController';
import { protect } from '../middleware/auth';

const router = express.Router();

// All routes are protected
router.use(protect);

// Routes
router.get('/resume/:resumeId', getResumeAnalysis);
router.get('/skill-gap', getSkillGapAnalysis);
router.post('/career-insights', generateCareerInsights);
router.get('/market-trends/:role', getMarketTrends);

export default router;