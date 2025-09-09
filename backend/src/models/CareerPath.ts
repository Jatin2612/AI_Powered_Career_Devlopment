import mongoose, { Document, Schema } from 'mongoose';

export interface ICareerPath extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  currentRole: string;
  targetRole: string;
  timeframe: string;
  description: string;
  milestones: {
    title: string;
    description: string;
    timeframe: string;
    skills: string[];
    resources: mongoose.Types.ObjectId[];
    completed: boolean;
    completedDate?: Date;
  }[];
  skillRequirements: {
    skill: string;
    currentLevel: number;
    requiredLevel: number;
    priority: 'High' | 'Medium' | 'Low';
  }[];
  salaryRange: {
    min: number;
    max: number;
    currency: string;
  };
  marketInsights: {
    demandLevel: 'High' | 'Medium' | 'Low';
    growthRate: number;
    averageSalary: number;
    topCompanies: string[];
    keySkills: string[];
    lastUpdated: Date;
  };
  progress: {
    completedMilestones: number;
    totalMilestones: number;
    percentageComplete: number;
    estimatedCompletion: Date;
  };
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const careerPathSchema = new Schema<ICareerPath>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: [true, 'Career path title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  currentRole: {
    type: String,
    required: [true, 'Current role is required'],
    trim: true
  },
  targetRole: {
    type: String,
    required: [true, 'Target role is required'],
    trim: true
  },
  timeframe: {
    type: String,
    required: [true, 'Timeframe is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  milestones: [{
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    timeframe: {
      type: String,
      required: true,
      trim: true
    },
    skills: [{
      type: String,
      trim: true
    }],
    resources: [{
      type: Schema.Types.ObjectId,
      ref: 'LearningResource'
    }],
    completed: {
      type: Boolean,
      default: false
    },
    completedDate: {
      type: Date
    }
  }],
  skillRequirements: [{
    skill: {
      type: String,
      required: true,
      trim: true
    },
    currentLevel: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    requiredLevel: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    priority: {
      type: String,
      required: true,
      enum: ['High', 'Medium', 'Low']
    }
  }],
  salaryRange: {
    min: {
      type: Number,
      required: true
    },
    max: {
      type: Number,
      required: true
    },
    currency: {
      type: String,
      default: 'USD'
    }
  },
  marketInsights: {
    demandLevel: {
      type: String,
      enum: ['High', 'Medium', 'Low'],
      default: 'Medium'
    },
    growthRate: {
      type: Number,
      default: 0
    },
    averageSalary: {
      type: Number,
      default: 0
    },
    topCompanies: [{
      type: String,
      trim: true
    }],
    keySkills: [{
      type: String,
      trim: true
    }],
    lastUpdated: {
      type: Date,
      default: Date.now
    }
  },
  progress: {
    completedMilestones: {
      type: Number,
      default: 0
    },
    totalMilestones: {
      type: Number,
      default: 0
    },
    percentageComplete: {
      type: Number,
      default: 0
    },
    estimatedCompletion: {
      type: Date
    }
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for better query performance
careerPathSchema.index({ userId: 1, isActive: 1 });
careerPathSchema.index({ targetRole: 1 });

// Update progress before saving
careerPathSchema.pre('save', function(next) {
  if (this.milestones && this.milestones.length > 0) {
    const completedCount = this.milestones.filter(m => m.completed).length;
    this.progress.completedMilestones = completedCount;
    this.progress.totalMilestones = this.milestones.length;
    this.progress.percentageComplete = Math.round((completedCount / this.milestones.length) * 100);
  }
  next();
});

export default mongoose.model<ICareerPath>('CareerPath', careerPathSchema);