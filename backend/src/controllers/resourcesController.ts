import { Response, NextFunction } from 'express';
import LearningResource from '../models/LearningResource';
import SkillGap from '../models/SkillGap';
import { AuthRequest } from '../middleware/auth';

// @desc    Get all learning resources
// @route   GET /api/resources
// @access  Public
export const getResources = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const {
      type,
      difficulty,
      provider,
      skills,
      isFree,
      page = 1,
      limit = 20,
      sort = '-rating'
    } = req.query;

    let query: any = { isActive: true };

    // Build query filters
    if (type) query.type = type;
    if (difficulty) query.difficulty = difficulty;
    if (provider) query.provider = new RegExp(provider as string, 'i');
    if (skills) {
      const skillsArray = (skills as string).split(',');
      query.skills = { $in: skillsArray };
    }
    if (isFree !== undefined) query['price.isFree'] = isFree === 'true';

    // Pagination
    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;

    const resources = await LearningResource.find(query)
      .sort(sort as string)
      .skip(skip)
      .limit(limitNum)
      .populate('reviews.userId', 'name');

    const total = await LearningResource.countDocuments(query);

    res.status(200).json({
      success: true,
      count: resources.length,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
      data: resources
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single learning resource
// @route   GET /api/resources/:id
// @access  Public
export const getResource = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const resource = await LearningResource.findById(req.params.id)
      .populate('reviews.userId', 'name');

    if (!resource) {
      return res.status(404).json({
        success: false,
        message: 'Learning resource not found'
      });
    }

    res.status(200).json({
      success: true,
      data: resource
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new learning resource
// @route   POST /api/resources
// @access  Private (Admin only in real app)
export const createResource = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const resource = await LearningResource.create(req.body);

    res.status(201).json({
      success: true,
      data: resource
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update learning resource
// @route   PUT /api/resources/:id
// @access  Private (Admin only in real app)
export const updateResource = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const resource = await LearningResource.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!resource) {
      return res.status(404).json({
        success: false,
        message: 'Learning resource not found'
      });
    }

    res.status(200).json({
      success: true,
      data: resource
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete learning resource
// @route   DELETE /api/resources/:id
// @access  Private (Admin only in real app)
export const deleteResource = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const resource = await LearningResource.findById(req.params.id);

    if (!resource) {
      return res.status(404).json({
        success: false,
        message: 'Learning resource not found'
      });
    }

    await LearningResource.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Learning resource deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add review to learning resource
// @route   POST /api/resources/:id/review
// @access  Private
export const addReview = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { rating, comment } = req.body;

    const resource = await LearningResource.findById(req.params.id);

    if (!resource) {
      return res.status(404).json({
        success: false,
        message: 'Learning resource not found'
      });
    }

    // Check if user already reviewed this resource
    const existingReview = resource.reviews.find(
      review => review.userId.toString() === req.user!._id.toString()
    );

    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: 'You have already reviewed this resource'
      });
    }

    // Add review
    resource.reviews.push({
      userId: req.user!._id,
      rating,
      comment,
      date: new Date()
    });

    // Update average rating
    const totalRating = resource.reviews.reduce((sum, review) => sum + review.rating, 0);
    resource.rating = totalRating / resource.reviews.length;

    await resource.save();

    res.status(201).json({
      success: true,
      data: resource
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get personalized resource recommendations
// @route   GET /api/resources/recommendations
// @access  Private
export const getRecommendations = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    // Get user's skill gaps
    const skillGaps = await SkillGap.find({ userId: req.user!._id })
      .sort({ priority: 1 })
      .limit(5);

    if (skillGaps.length === 0) {
      return res.status(200).json({
        success: true,
        data: [],
        message: 'No skill gaps found. Complete a skill assessment to get recommendations.'
      });
    }

    // Get skills that need improvement
    const skillsToImprove = skillGaps.map(gap => gap.skill);

    // Find resources for these skills
    const recommendations = await LearningResource.find({
      skills: { $in: skillsToImprove },
      isActive: true
    })
      .sort({ rating: -1 })
      .limit(10);

    // Group by skill gap priority
    const groupedRecommendations = skillGaps.map(gap => ({
      skill: gap.skill,
      priority: gap.priority,
      currentLevel: gap.currentLevel,
      requiredLevel: gap.requiredLevel,
      resources: recommendations.filter(resource => 
        resource.skills.includes(gap.skill)
      ).slice(0, 3)
    }));

    res.status(200).json({
      success: true,
      data: groupedRecommendations
    });
  } catch (error) {
    next(error);
  }
};