import express from 'express';
import {
  getResources,
  getResource,
  createResource,
  updateResource,
  deleteResource,
  addReview,
  getRecommendations
} from '../controllers/resourcesController';
import { protect } from '../middleware/auth';

const router = express.Router();

// Public routes
router.get('/', getResources);
router.get('/recommendations', protect, getRecommendations);
router.get('/:id', getResource);

// Protected routes
router.use(protect);
router.post('/', createResource);
router.put('/:id', updateResource);
router.delete('/:id', deleteResource);
router.post('/:id/review', addReview);

export default router;