export interface User {
  id: string;
  name: string;
  email: string;
  currentRole?: string;
  targetRole?: string;
  experience: string;
  skills: string[];
  education: Education[];
  avatar?: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  year: string;
  gpa?: string;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  duration: string;
  description: string;
  achievements: string[];
}

export interface Resume {
  id: string;
  userId: string;
  title: string;
  template: string;
  personalInfo: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skills: string[];
  projects: Project[];
  certifications: Certification[];
  atsScore: number;
  lastUpdated: string;
}

export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedIn?: string;
  portfolio?: string;
  summary: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  link?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credentialId?: string;
}

export interface SkillGap {
  skill: string;
  currentLevel: number;
  requiredLevel: number;
  priority: 'High' | 'Medium' | 'Low';
  resources: LearningResource[];
}

export interface LearningResource {
  id: string;
  title: string;
  provider: string;
  type: 'Course' | 'Video' | 'Article' | 'Book' | 'Project';
  duration: string;
  rating: number;
  url: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  skills: string[];
}

export interface CareerPath {
  id: string;
  title: string;
  currentRole: string;
  targetRole: string;
  timeframe: string;
  milestones: Milestone[];
  skillRequirements: string[];
  salaryRange: {
    min: number;
    max: number;
  };
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  timeframe: string;
  skills: string[];
  resources: LearningResource[];
  completed: boolean;
}

export interface JobRole {
  id: string;
  title: string;
  company: string;
  location: string;
  salaryRange: string;
  requiredSkills: string[];
  matchPercentage: number;
  description: string;
  requirements: string[];
}

export interface FeedbackItem {
  id: string;
  category: 'Content' | 'Format' | 'ATS' | 'Skills';
  severity: 'High' | 'Medium' | 'Low';
  title: string;
  description: string;
  suggestion: string;
  fixed: boolean;
}