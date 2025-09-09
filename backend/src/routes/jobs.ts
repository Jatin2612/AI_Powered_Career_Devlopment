import express from 'express';
import {
  getJobMatches,
  getJobDetails,
  saveJob,
  getSavedJobs,
  removeSavedJob
} from '../controllers/jobsController';
import { protect } from '../middleware/auth';

const router = express.Router();

// All routes are protected
router.use(protect);

// Routes
router.get('/matches', getJobMatches);
router.get('/saved', getSavedJobs);
router.get('/:id', getJobDetails);
router.post('/:id/save', saveJob);
router.delete('/:id/save', removeSavedJob);

export default router;