import express from 'express';
import { body } from 'express-validator';
import { register, login, getMe, updateProfile, forgotPassword, resetPassword } from '../controllers/authController';
import { protect } from '../middleware/auth';

const router = express.Router();

// Validation rules
const registerValidation = [
  body('name').trim().isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('experience').isIn(['0-1 years', '1-3 years', '3-5 years', '5-10 years', '10+ years']).withMessage('Invalid experience level')
];

const loginValidation = [
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
  body('password').notEmpty().withMessage('Password is required')
];

const updateProfileValidation = [
  body('name').optional().trim().isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),
  body('email').optional().isEmail().normalizeEmail().withMessage('Please provide a valid email'),
  body('currentRole').optional().trim().isLength({ max: 100 }).withMessage('Current role cannot exceed 100 characters'),
  body('targetRole').optional().trim().isLength({ max: 100 }).withMessage('Target role cannot exceed 100 characters'),
  body('profile.summary').optional().trim().isLength({ max: 500 }).withMessage('Summary cannot exceed 500 characters')
];

// Routes
router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);
router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfileValidation, updateProfile);
router.post('/forgot-password', forgotPassword);
router.put('/reset-password/:resetToken', resetPassword);

export default router;