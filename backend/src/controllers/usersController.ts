import { Response, NextFunction } from 'express';
import User from '../models/User';
import Resume from '../models/Resume';
import SkillGap from '../models/SkillGap';
import CareerPath from '../models/CareerPath';
import { AuthRequest } from '../middleware/auth';

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.user!._id);

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
export const updateUserProfile = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const fieldsToUpdate = {
      name: req.body.name,
      currentRole: req.body.currentRole,
      targetRole: req.body.targetRole,
      experience: req.body.experience,
      skills: req.body.skills,
      education: req.body.education,
      preferences: req.body.preferences,
      profile: req.body.profile,
      avatar: req.body.avatar
    };

    // Remove undefined fields
    Object.keys(fieldsToUpdate).forEach(key => {
      if (fieldsToUpdate[key as keyof typeof fieldsToUpdate] === undefined) {
        delete fieldsToUpdate[key as keyof typeof fieldsToUpdate];
      }
    });

    const user = await User.findByIdAndUpdate(
      req.user!._id,
      fieldsToUpdate,
      {
        new: true,
        runValidators: true
      }
    );

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user statistics
// @route   GET /api/users/stats
// @access  Private
export const getUserStats = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!._id;

    // Get counts for various user data
    const [resumeCount, skillGapCount, careerPathCount] = await Promise.all([
      Resume.countDocuments({ userId }),
      SkillGap.countDocuments({ userId }),
      CareerPath.countDocuments({ userId, isActive: true })
    ]);

    // Get latest resume ATS score
    const latestResume = await Resume.findOne({ userId })
      .sort({ updatedAt: -1 })
      .select('atsScore');

    // Get skill gaps by priority
    const skillGapsByPriority = await SkillGap.aggregate([
      { $match: { userId } },
      { $group: { _id: '$priority', count: { $sum: 1 } } }
    ]);

    // Get career progress
    const careerPaths = await CareerPath.find({ userId, isActive: true });
    const totalMilestones = careerPaths.reduce((sum, path) => sum + path.milestones.length, 0);
    const completedMilestones = careerPaths.reduce(
      (sum, path) => sum + path.milestones.filter(m => m.completed).length, 
      0
    );

    const stats = {
      resumes: {
        total: resumeCount,
        latestAtsScore: latestResume?.atsScore || 0
      },
      skillGaps: {
        total: skillGapCount,
        byPriority: skillGapsByPriority.reduce((acc, item) => {
          acc[item._id.toLowerCase()] = item.count;
          return acc;
        }, {} as Record<string, number>)
      },
      careerProgress: {
        totalPaths: careerPathCount,
        totalMilestones,
        completedMilestones,
        progressPercentage: totalMilestones > 0 ? 
          Math.round((completedMilestones / totalMilestones) * 100) : 0
      },
      activity: {
        lastLogin: new Date(),
        accountAge: Math.floor(
          (Date.now() - new Date(req.user!.createdAt).getTime()) / (1000 * 60 * 60 * 24)
        )
      }
    };

    res.status(200).json({
      success: true,
      data: stats
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete user account
// @route   DELETE /api/users/account
// @access  Private
export const deleteUserAccount = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!._id;

    // Delete all user-related data
    await Promise.all([
      User.findByIdAndDelete(userId),
      Resume.deleteMany({ userId }),
      SkillGap.deleteMany({ userId }),
      CareerPath.deleteMany({ userId })
    ]);

    res.status(200).json({
      success: true,
      message: 'Account deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};