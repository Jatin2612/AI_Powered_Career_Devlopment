import { Response, NextFunction } from 'express';
import Resume from '../models/Resume';
import SkillGap from '../models/SkillGap';
import { AuthRequest } from '../middleware/auth';
import geminiService from '../services/geminiService';

// @desc    Get resume analysis
// @route   GET /api/analysis/resume/:resumeId
// @access  Private
export const getResumeAnalysis = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.resumeId,
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
      data: {
        atsScore: resume.atsScore,
        analysis: resume.analysis
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get skill gap analysis
// @route   GET /api/analysis/skill-gap
// @access  Private
export const getSkillGapAnalysis = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const skillGaps = await SkillGap.find({ userId: req.user!._id })
      .sort({ priority: 1, requiredLevel: -1 });

    // If no skill gaps exist, generate them
    if (skillGaps.length === 0 && req.user!.targetRole) {
      const analysis = await geminiService.generateSkillGapAnalysis(
        req.user!.skills,
        req.user!.targetRole
      );

      // Create skill gap records
      const skillGapPromises = analysis.skillGaps.map(gap => 
        SkillGap.create({
          userId: req.user!._id,
          skill: gap.skill,
          currentLevel: gap.currentLevel,
          requiredLevel: gap.requiredLevel,
          priority: gap.priority,
          targetRole: req.user!.targetRole,
          recommendations: {
            courses: analysis.recommendations.slice(0, 3),
            projects: [],
            certifications: []
          }
        })
      );

      const newSkillGaps = await Promise.all(skillGapPromises);

      return res.status(200).json({
        success: true,
        data: newSkillGaps,
        recommendations: analysis.recommendations
      });
    }

    res.status(200).json({
      success: true,
      data: skillGaps
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Generate career insights
// @route   POST /api/analysis/career-insights
// @access  Private
export const generateCareerInsights = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { targetRole, timeframe } = req.body;

    if (!targetRole) {
      return res.status(400).json({
        success: false,
        message: 'Target role is required'
      });
    }

    const currentRole = req.user!.currentRole || 'Entry Level';
    const roadmap = await geminiService.generateCareerRoadmap(
      currentRole,
      targetRole,
      timeframe || '12-18 months'
    );

    res.status(200).json({
      success: true,
      data: roadmap
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get market trends for a role
// @route   GET /api/analysis/market-trends/:role
// @access  Private
export const getMarketTrends = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { role } = req.params;

    // Mock market trends data (in a real app, this would come from job market APIs)
    const trends = {
      role,
      demandLevel: 'High',
      growthRate: 15.2,
      averageSalary: {
        min: 75000,
        max: 120000,
        median: 95000
      },
      topSkills: [
        'React',
        'Node.js',
        'TypeScript',
        'AWS',
        'Docker',
        'System Design'
      ],
      topCompanies: [
        'Google',
        'Microsoft',
        'Amazon',
        'Meta',
        'Netflix'
      ],
      locations: [
        { city: 'San Francisco', averageSalary: 130000 },
        { city: 'New York', averageSalary: 115000 },
        { city: 'Seattle', averageSalary: 110000 },
        { city: 'Austin', averageSalary: 95000 },
        { city: 'Remote', averageSalary: 100000 }
      ],
      insights: [
        'Demand for full-stack developers has increased by 15% this year',
        'Companies are prioritizing candidates with cloud platform experience',
        'Remote work opportunities have increased by 40%',
        'TypeScript adoption is becoming a key differentiator'
      ]
    };

    res.status(200).json({
      success: true,
      data: trends
    });
  } catch (error) {
    next(error);
  }
};