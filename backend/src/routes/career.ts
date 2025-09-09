import express from 'express';
import {
  getCareerPaths,
  getCareerPath,
  createCareerPath,
  updateCareerPath,
  deleteCareerPath,
  updateMilestone,
  generateRoadmap
} from '../controllers/careerController';
import { protect } from '../middleware/auth';

const router = express.Router();

// All routes are protected
router.use(protect);

// Routes
router.route('/')
  .get(getCareerPaths)
  .post(createCareerPath);

router.route('/:id')
  .get(getCareerPath)
  .put(updateCareerPath)
  .delete(deleteCareerPath);

router.put('/:id/milestone/:milestoneId', updateMilestone);
router.post('/generate-roadmap', generateRoadmap);

export default router;