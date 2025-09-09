import express from 'express';
import {
  getSkillGaps,
  createSkillGap,
  updateSkillGap,
  deleteSkillGap,
  updateProgress
} from '../controllers/skillsController';
import { protect } from '../middleware/auth';

const router = express.Router();

// All routes are protected
router.use(protect);

// Routes
router.route('/')
  .get(getSkillGaps)
  .post(createSkillGap);

router.route('/:id')
  .put(updateSkillGap)
  .delete(deleteSkillGap);

router.put('/:id/progress', updateProgress);

export default router;