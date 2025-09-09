import mongoose, { Document, Schema } from 'mongoose';

export interface ILearningResource extends Document {
  title: string;
  provider: string;
  type: 'Course' | 'Video' | 'Article' | 'Book' | 'Project' | 'Tutorial';
  description: string;
  url: string;
  duration: string;
  rating: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  skills: string[];
  price: {
    amount: number;
    currency: string;
    isFree: boolean;
  };
  tags: string[];
  prerequisites: string[];
  learningOutcomes: string[];
  reviews: {
    userId: mongoose.Types.ObjectId;
    rating: number;
    comment: string;
    date: Date;
  }[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const learningResourceSchema = new Schema<ILearningResource>({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  provider: {
    type: String,
    required: [true, 'Provider is required'],
    trim: true
  },
  type: {
    type: String,
    required: true,
    enum: ['Course', 'Video', 'Article', 'Book', 'Project', 'Tutorial']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  url: {
    type: String,
    required: [true, 'URL is required'],
    trim: true
  },
  duration: {
    type: String,
    required: [true, 'Duration is required'],
    trim: true
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
    default: 0
  },
  difficulty: {
    type: String,
    required: true,
    enum: ['Beginner', 'Intermediate', 'Advanced']
  },
  skills: [{
    type: String,
    required: true,
    trim: true
  }],
  price: {
    amount: {
      type: Number,
      required: true,
      min: 0
    },
    currency: {
      type: String,
      required: true,
      default: 'USD'
    },
    isFree: {
      type: Boolean,
      default: false
    }
  },
  tags: [{
    type: String,
    trim: true
  }],
  prerequisites: [{
    type: String,
    trim: true
  }],
  learningOutcomes: [{
    type: String,
    trim: true
  }],
  reviews: [{
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    comment: {
      type: String,
      trim: true,
      maxlength: [500, 'Comment cannot exceed 500 characters']
    },
    date: {
      type: Date,
      default: Date.now
    }
  }],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for better search performance
learningResourceSchema.index({ skills: 1, difficulty: 1 });
learningResourceSchema.index({ type: 1, rating: -1 });
learningResourceSchema.index({ provider: 1 });
learningResourceSchema.index({ 'price.isFree': 1 });

export default mongoose.model<ILearningResource>('LearningResource', learningResourceSchema);