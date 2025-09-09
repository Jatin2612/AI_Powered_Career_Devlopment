import { Response, NextFunction } from 'express';
import CareerPath from '../models/CareerPath';
import LearningResource from '../models/LearningResource';
import { AuthRequest } from '../middleware/auth';
import geminiService from '../services/geminiService';

// @desc    Get all career paths for user
// @route   GET /api/career
// @access  Private
export const getCareerPaths = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const careerPaths = await CareerPath.find({ 
      userId: req.user!._id,
      isActive: true 
    })
      .populate('milestones.resources')
      .sort({ updatedAt: -1 });

    res.status(200).json({
      success: true,
      count: careerPaths.length,
      data: careerPaths
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single career path
// @route   GET /api/career/:id
// @access  Private
export const getCareerPath = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const careerPath = await CareerPath.findOne({
      _id: req.params.id,
      userId: req.user!._id
    }).populate('milestones.resources');

    if (!careerPath) {
      return res.status(404).json({
        success: false,
        message: 'Career path not found'
      });
    }

    res.status(200).json({
      success: true,
      data: careerPath
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new career path
// @route   POST /api/career
// @access  Private
export const createCareerPath = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const careerPathData = {
      ...req.body,
      userId: req.user!._id
    };

    const careerPath = await CareerPath.create(careerPathData);

    res.status(201).json({
      success: true,
      data: careerPath
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update career path
// @route   PUT /api/career/:id
// @access  Private
export const updateCareerPath = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    let careerPath = await CareerPath.findOne({
      _id: req.params.id,
      userId: req.user!._id
    });

    if (!careerPath) {
      return res.status(404).json({
        success: false,
        message: 'Career path not found'
      });
    }

    careerPath = await CareerPath.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    res.status(200).json({
      success: true,
      data: careerPath
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete career path
// @route   DELETE /api/career/:id
// @access  Private
export const deleteCareerPath = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const careerPath = await CareerPath.findOne({
      _id: req.params.id,
      userId: req.user!._id
    });

    if (!careerPath) {
      return res.status(404).json({
        success: false,
        message: 'Career path not found'
      });
    }

    await CareerPath.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Career path deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update milestone completion
// @route   PUT /api/career/:id/milestone/:milestoneId
// @access  Private
export const updateMilestone = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { completed } = req.body;

    const careerPath = await CareerPath.findOne({
      _id: req.params.id,
      userId: req.user!._id
    });

    if (!careerPath) {
      return res.status(404).json({
        success: false,
        message: 'Career path not found'
      });
    }

    const milestone = careerPath.milestones.id(req.params.milestoneId);
    if (!milestone) {
      return res.status(404).json({
        success: false,
        message: 'Milestone not found'
      });
    }

    milestone.completed = completed;
    if (completed) {
      milestone.completedDate = new Date();
    } else {
      milestone.completedDate = undefined;
    }

    await careerPath.save();

    res.status(200).json({
      success: true,
      data: careerPath
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Generate AI-powered career roadmap
// @route   POST /api/career/generate-roadmap
// @access  Private
export const generateRoadmap = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { targetRole, timeframe } = req.body;

    if (!targetRole) {
      return res.status(400).json({
        success: false,
        message: 'Target role is required'
      });
    }

    const currentRole = req.user!.currentRole || 'Entry Level';
    
    // Generate roadmap using AI
    const roadmapData = await geminiService.generateCareerRoadmap(
      currentRole,
      targetRole,
      timeframe || '12-18 months'
    );

    // Find relevant learning resources for each milestone
    const milestonesWithResources = await Promise.all(
      roadmapData.milestones.map(async (milestone) => {
        const resources = await LearningResource.find({
          skills: { $in: milestone.skills },
          isActive: true
        })
          .sort({ rating: -1 })
          .limit(3);

        return {
          ...milestone,
          resources: resources.map(r => r._id),
          completed: false
        };
      })
    );

    // Create career path
    const careerPath = await CareerPath.create({
      userId: req.user!._id,
      title: `${currentRole} to ${targetRole}`,
      currentRole,
      targetRole,
      timeframe: timeframe || '12-18 months',
      description: `AI-generated roadmap for transitioning from ${currentRole} to ${targetRole}`,
      milestones: milestonesWithResources,
      skillRequirements: roadmapData.skillRequirements,
      salaryRange: {
        min: 75000,
        max: 120000,
        currency: 'USD'
      },
      marketInsights: {
        demandLevel: 'High',
        growthRate: 15,
        averageSalary: 95000,
        topCompanies: ['Google', 'Microsoft', 'Amazon', 'Meta'],
        keySkills: roadmapData.skillRequirements.map(sr => sr.skill),
        lastUpdated: new Date()
      }
    });

    const populatedCareerPath = await CareerPath.findById(careerPath._id)
      .populate('milestones.resources');

    res.status(201).json({
      success: true,
      data: populatedCareerPath
    });
  } catch (error) {
    next(error);
  }
};