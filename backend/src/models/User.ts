import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  currentRole?: string;
  targetRole?: string;
  experience: string;
  skills: string[];
  education: {
    degree: string;
    institution: string;
    year: string;
    gpa?: string;
  }[];
  avatar?: string;
  preferences: {
    jobAlerts: boolean;
    emailNotifications: boolean;
    skillRecommendations: boolean;
  };
  profile: {
    phone?: string;
    location?: string;
    linkedIn?: string;
    portfolio?: string;
    summary?: string;
  };
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false
  },
  currentRole: {
    type: String,
    trim: true
  },
  targetRole: {
    type: String,
    trim: true
  },
  experience: {
    type: String,
    required: [true, 'Experience level is required'],
    enum: ['0-1 years', '1-3 years', '3-5 years', '5-10 years', '10+ years']
  },
  skills: [{
    type: String,
    trim: true
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
    year: {
      type: String,
      required: true
    },
    gpa: {
      type: String,
      trim: true
    }
  }],
  avatar: {
    type: String,
    trim: true
  },
  preferences: {
    jobAlerts: {
      type: Boolean,
      default: true
    },
    emailNotifications: {
      type: Boolean,
      default: true
    },
    skillRecommendations: {
      type: Boolean,
      default: true
    }
  },
  profile: {
    phone: {
      type: String,
      trim: true
    },
    location: {
      type: String,
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
      trim: true,
      maxlength: [500, 'Summary cannot exceed 500 characters']
    }
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// Remove password from JSON output
userSchema.methods.toJSON = function() {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

export default mongoose.model<IUser>('User', userSchema);