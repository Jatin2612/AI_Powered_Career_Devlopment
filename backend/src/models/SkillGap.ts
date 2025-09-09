import mongoose, { Document, Schema } from 'mongoose';

export interface ISkillGap extends Document {
  userId: mongoose.Types.ObjectId;
  skill: string;
  currentLevel: number;
  requiredLevel: number;
  priority: 'High' | 'Medium' | 'Low';
  targetRole: string;
  assessmentDate: Date;
  progress: {
    completedResources: string[];
    timeSpent: number; // in hours
    lastUpdated: Date;
  };
  recommendations: {
    courses: string[];
    projects: string[];
    certifications: string[];
  };
  createdAt: Date;
  updatedAt: Date;
}

const skillGapSchema = new Schema<ISkillGap>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  skill: {
    type: String,
    required: [true, 'Skill name is required'],
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
  },
  targetRole: {
    type: String,
    required: true,
    trim: true
  },
  assessmentDate: {
    type: Date,
    default: Date.now
  },
  progress: {
    completedResources: [{
      type: String,
      trim: true
    }],
    timeSpent: {
      type: Number,
      default: 0
    },
    lastUpdated: {
      type: Date,
      default: Date.now
    }
  },
  recommendations: {
    courses: [{
      type: String,
      trim: true
    }],
    projects: [{
      type: String,
      trim: true
    }],
    certifications: [{
      type: String,
      trim: true
    }]
  }
}, {
  timestamps: true
});

// Index for better query performance
skillGapSchema.index({ userId: 1, priority: 1 });
skillGapSchema.index({ skill: 1, targetRole: 1 });

export default mongoose.model<ISkillGap>('SkillGap', skillGapSchema);