import mongoose, { Document, Schema } from 'mongoose';

export interface IResume extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  template: string;
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedIn?: string;
    portfolio?: string;
    summary: string;
  };
  experience: {
    title: string;
    company: string;
    location?: string;
    startDate: Date;
    endDate?: Date;
    current: boolean;
    description: string;
    achievements: string[];
  }[];
  education: {
    degree: string;
    institution: string;
    location?: string;
    startDate: Date;
    endDate?: Date;
    gpa?: string;
    honors?: string[];
  }[];
  skills: {
    technical: string[];
    soft: string[];
    languages?: string[];
  };
  projects: {
    name: string;
    description: string;
    technologies: string[];
    link?: string;
    startDate?: Date;
    endDate?: Date;
  }[];
  certifications: {
    name: string;
    issuer: string;
    date: Date;
    credentialId?: string;
    link?: string;
  }[];
  atsScore: number;
  analysis: {
    strengths: string[];
    weaknesses: string[];
    suggestions: string[];
    keywordDensity: number;
    readabilityScore: number;
    lastAnalyzed: Date;
  };
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const resumeSchema = new Schema<IResume>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: [true, 'Resume title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  template: {
    type: String,
    required: true,
    enum: ['modern', 'classic', 'creative', 'minimal'],
    default: 'modern'
  },
  personalInfo: {
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true
    },
    linkedIn: {
      type: String,
      trim: true
    },
    portfolio: {
      type: String,
      trim: true
    },
    summary: {
      type: String,
      required: [true, 'Professional summary is required'],
      trim: true,
      maxlength: [500, 'Summary cannot exceed 500 characters']
    }
  },
  experience: [{
    title: {
      type: String,
      required: true,
      trim: true
    },
    company: {
      type: String,
      required: true,
      trim: true
    },
    location: {
      type: String,
      trim: true
    },
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date
    },
    current: {
      type: Boolean,
      default: false
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    achievements: [{
      type: String,
      trim: true
    }]
  }],
  education: [{
    degree: {
      type: String,
      required: true,
      trim: true
    },
    institution: {
      type: String,
      required: true,
      trim: true
    },
    location: {
      type: String,
      trim: true
    },
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date
    },
    gpa: {
      type: String,
      trim: true
    },
    honors: [{
      type: String,
      trim: true
    }]
  }],
  skills: {
    technical: [{
      type: String,
      trim: true
    }],
    soft: [{
      type: String,
      trim: true
    }],
    languages: [{
      type: String,
      trim: true
    }]
  },
  projects: [{
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    technologies: [{
      type: String,
      trim: true
    }],
    link: {
      type: String,
      trim: true
    },
    startDate: {
      type: Date
    },
    endDate: {
      type: Date
    }
  }],
  certifications: [{
    name: {
      type: String,
      required: true,
      trim: true
    },
    issuer: {
      type: String,
      required: true,
      trim: true
    },
    date: {
      type: Date,
      required: true
    },
    credentialId: {
      type: String,
      trim: true
    },
    link: {
      type: String,
      trim: true
    }
  }],
  atsScore: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  analysis: {
    strengths: [{
      type: String,
      trim: true
    }],
    weaknesses: [{
      type: String,
      trim: true
    }],
    suggestions: [{
      type: String,
      trim: true
    }],
    keywordDensity: {
      type: Number,
      default: 0
    },
    readabilityScore: {
      type: Number,
      default: 0
    },
    lastAnalyzed: {
      type: Date,
      default: Date.now
    }
  },
  isPublic: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Index for better query performance
resumeSchema.index({ userId: 1, createdAt: -1 });
resumeSchema.index({ atsScore: -1 });

export default mongoose.model<IResume>('Resume', resumeSchema);