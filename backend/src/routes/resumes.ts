import express from 'express';
import { body } from 'express-validator';
import {
  getResumes,
  getResume,
  createResume,
  updateResume,
  deleteResume,
  analyzeResume,
  generateResumeContent
} from '../controllers/resumeController';
import { protect } from '../middleware/auth';

const router = express.Router();

// All routes are protected
router.use(protect);

// Validation rules
const resumeValidation = [
  body('title').trim().isLength({ min: 1, max: 100 }).withMessage('Title must be between 1 and 100 characters'),
  body('personalInfo.fullName').trim().isLength({ min: 1 }).withMessage('Full name is required'),
  body('personalInfo.email').isEmail().withMessage('Valid email is required'),
  body('personalInfo.phone').trim().isLength({ min: 1 }).withMessage('Phone number is required'),
  body('personalInfo.location').trim().isLength({ min: 1 }).withMessage('Location is required'),
  body('personalInfo.summary').trim().isLength({ min: 1, max: 500 }).withMessage('Summary must be between 1 and 500 characters')
];

// Routes
router.route('/')
  .get(getResumes)
  .post(resumeValidation, createResume);

router.route('/:id')
  .get(getResume)
  .put(updateResume)
  .delete(deleteResume);

router.post('/:id/analyze', analyzeResume);
router.post('/generate-content', generateResumeContent);

export default router;