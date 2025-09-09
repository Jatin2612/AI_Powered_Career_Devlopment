import express from 'express';
import {
  getUserProfile,
  updateUserProfile,
  getUserStats,
  deleteUserAccount
} from '../controllers/usersController';
import { protect } from '../middleware/auth';

const router = express.Router();

// All routes are protected
router.use(protect);

// Routes
router.get('/profile', getUserProfile);
router.put('/profile', updateUserProfile);
router.get('/stats', getUserStats);
router.delete('/account', deleteUserAccount);

export default router;