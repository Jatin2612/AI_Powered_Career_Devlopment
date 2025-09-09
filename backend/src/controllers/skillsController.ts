import { Response, NextFunction } from 'express';
import SkillGap from '../models/SkillGap';
import { AuthRequest } from '../middleware/auth';

// @desc    Get all skill gaps for user
// @route   GET /api/skills
// @access  Private
export const getSkillGaps = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { priority, targetRole } = req.query;
    
    let query: any = { userId: req.user!._id };
    
    if (priority) {
      query.priority = priority;
    }
    
    if (targetRole) {
      query.targetRole = targetRole;
    }

    const skillGaps = await SkillGap.find(query)
      .sort({ priority: 1, requiredLevel: -1 });

    res.status(200).json({
      success: true,
      count: skillGaps.length,
      data: skillGaps
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new skill gap
// @route   POST /api/skills
// @access  Private
export const createSkillGap = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const skillGapData = {
      ...req.body,
      userId: req.user!._id
    };

    const skillGap = await SkillGap.create(skillGapData);

    res.status(201).json({
      success: true,
      data: skillGap
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update skill gap
// @route   PUT /api/skills/:id
// @access  Private
export const updateSkillGap = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    let skillGap = await SkillGap.findOne({
      _id: req.params.id,
      userId: req.user!._id
    });

    if (!skillGap) {
      return res.status(404).json({
        success: false,
        message: 'Skill gap not found'
      });
    }

    skillGap = await SkillGap.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    res.status(200).json({
      success: true,
      data: skillGap
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete skill gap
// @route   DELETE /api/skills/:id
// @access  Private
export const deleteSkillGap = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const skillGap = await SkillGap.findOne({
      _id: req.params.id,
      userId: req.user!._id
    });

    if (!skillGap) {
      return res.status(404).json({
        success: false,
        message: 'Skill gap not found'
      });
    }

    await SkillGap.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Skill gap deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update skill progress
// @route   PUT /api/skills/:id/progress
// @access  Private
export const updateProgress = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { completedResources, timeSpent, currentLevel } = req.body;

    const skillGap = await SkillGap.findOne({
      _id: req.params.id,
      userId: req.user!._id
    });

    if (!skillGap) {
      return res.status(404).json({
        success: false,
        message: 'Skill gap not found'
      });
    }

    // Update progress
    if (completedResources) {
      skillGap.progress.completedResources = [
        ...new Set([...skillGap.progress.completedResources, ...completedResources])
      ];
    }

    if (timeSpent) {
      skillGap.progress.timeSpent += timeSpent;
    }

    if (currentLevel) {
      skillGap.currentLevel = currentLevel;
    }

    skillGap.progress.lastUpdated = new Date();
    await skillGap.save();

    res.status(200).json({
      success: true,
      data: skillGap
    });
  } catch (error) {
    next(error);
  }
};