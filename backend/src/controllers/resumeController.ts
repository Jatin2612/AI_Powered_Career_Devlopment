import { Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import Resume from '../models/Resume';
import { AuthRequest } from '../middleware/auth';
import geminiService from '../services/geminiService';

// @desc    Get all resumes for user
// @route   GET /api/resumes
// @access  Private
export const getResumes = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const resumes = await Resume.find({ userId: req.user!._id })
      .sort({ updatedAt: -1 })
      .select('-analysis'); // Exclude analysis for list view

    res.status(200).json({
      success: true,
      count: resumes.length,
      data: resumes
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single resume
// @route   GET /api/resumes/:id
// @access  Private
export const getResume = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      userId: req.user!._id
    });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: 'Resume not found'
      });
    }

    res.status(200).json({
      success: true,
      data: resume
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new resume
// @route   POST /api/resumes
// @access  Private
export const createResume = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const resumeData = {
      ...req.body,
      userId: req.user!._id
    };

    const resume = await Resume.create(resumeData);

    res.status(201).json({
      success: true,
      data: resume
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update resume
// @route   PUT /api/resumes/:id
// @access  Private
export const updateResume = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    let resume = await Resume.findOne({
      _id: req.params.id,
      userId: req.user!._id
    });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: 'Resume not found'
      });
    }

    resume = await Resume.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    res.status(200).json({
      success: true,
      data: resume
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete resume
// @route   DELETE /api/resumes/:id
// @access  Private
export const deleteResume = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      userId: req.user!._id
    });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: 'Resume not found'
      });
    }

    await Resume.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Resume deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Analyze resume with AI
// @route   POST /api/resumes/:id/analyze
// @access  Private
export const analyzeResume = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      userId: req.user!._id
    });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: 'Resume not found'
      });
    }

    // Get job description from request body if provided
    const jobDescription = req.body.jobDescription;

    // Analyze resume using Gemini AI
    const analysis = await geminiService.analyzeResume(resume, jobDescription);

    // Update resume with analysis results
    resume.atsScore = analysis.atsScore;
    resume.analysis = {
      strengths: analysis.strengths,
      weaknesses: analysis.weaknesses,
      suggestions: analysis.suggestions,
      keywordDensity: analysis.keywordDensity,
      readabilityScore: analysis.readabilityScore,
      lastAnalyzed: new Date()
    };

    await resume.save();

    res.status(200).json({
      success: true,
      data: {
        atsScore: analysis.atsScore,
        analysis: resume.analysis
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Generate resume content with AI
// @route   POST /api/resumes/generate-content
// @access  Private
export const generateResumeContent = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { targetRole, section } = req.body;

    if (!targetRole || !section) {
      return res.status(400).json({
        success: false,
        message: 'Target role and section are required'
      });
    }

    const userInfo = {
      currentRole: req.user!.currentRole,
      experience: req.user!.experience,
      skills: req.user!.skills
    };

    const content = await geminiService.generateResumeContent(userInfo, targetRole, section);

    res.status(200).json({
      success: true,
      data: {
        content
      }
    });
  } catch (error) {
    next(error);
  }
};