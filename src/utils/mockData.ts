import { SkillGap, LearningResource, CareerPath, JobRole, FeedbackItem } from '../types';

export const mockSkillGaps: SkillGap[] = [
  {
    skill: 'Node.js',
    currentLevel: 2,
    requiredLevel: 4,
    priority: 'High',
    resources: [
      {
        id: '1',
        title: 'Complete Node.js Developer Course',
        provider: 'Udemy',
        type: 'Course',
        duration: '35 hours',
        rating: 4.8,
        url: '#',
        difficulty: 'Intermediate',
        skills: ['Node.js', 'Express.js', 'MongoDB']
      }
    ]
  },
  {
    skill: 'System Design',
    currentLevel: 1,
    requiredLevel: 4,
    priority: 'High',
    resources: [
      {
        id: '2',
        title: 'System Design Interview Guide',
        provider: 'LeetCode',
        type: 'Course',
        duration: '20 hours',
        rating: 4.7,
        url: '#',
        difficulty: 'Advanced',
        skills: ['System Design', 'Architecture']
      }
    ]
  },
  {
    skill: 'Docker',
    currentLevel: 1,
    requiredLevel: 3,
    priority: 'Medium',
    resources: [
      {
        id: '3',
        title: 'Docker for Developers',
        provider: 'Pluralsight',
        type: 'Course',
        duration: '12 hours',
        rating: 4.6,
        url: '#',
        difficulty: 'Intermediate',
        skills: ['Docker', 'DevOps']
      }
    ]
  }
];

export const mockCareerPaths: CareerPath[] = [
  {
    id: '1',
    title: 'Frontend to Full Stack Developer',
    currentRole: 'Junior Frontend Developer',
    targetRole: 'Senior Full Stack Developer',
    timeframe: '18-24 months',
    skillRequirements: ['Node.js', 'Database Design', 'System Design', 'DevOps'],
    salaryRange: { min: 85000, max: 120000 },
    milestones: [
      {
        id: '1',
        title: 'Master Backend Development',
        description: 'Learn server-side programming with Node.js and Express',
        timeframe: '3-4 months',
        skills: ['Node.js', 'Express.js', 'REST APIs'],
        resources: [],
        completed: false
      },
      {
        id: '2',
        title: 'Database Expertise',
        description: 'Gain proficiency in both SQL and NoSQL databases',
        timeframe: '2-3 months',
        skills: ['PostgreSQL', 'MongoDB', 'Database Design'],
        resources: [],
        completed: false
      }
    ]
  }
];

export const mockJobRoles: JobRole[] = [
  {
    id: '1',
    title: 'Full Stack Developer',
    company: 'TechCorp Inc.',
    location: 'San Francisco, CA',
    salaryRange: '$90K - $120K',
    requiredSkills: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
    matchPercentage: 75,
    description: 'Join our growing team as a Full Stack Developer...',
    requirements: [
      '3+ years of experience with React',
      'Strong backend development skills',
      'Experience with cloud platforms'
    ]
  },
  {
    id: '2',
    title: 'Senior Frontend Engineer',
    company: 'StartupX',
    location: 'New York, NY',
    salaryRange: '$100K - $130K',
    requiredSkills: ['React', 'TypeScript', 'Next.js', 'GraphQL'],
    matchPercentage: 85,
    description: 'Looking for a senior frontend engineer to lead our UI team...',
    requirements: [
      '4+ years of React experience',
      'TypeScript proficiency',
      'Leadership experience'
    ]
  }
];

export const mockFeedback: FeedbackItem[] = [
  {
    id: '1',
    category: 'ATS',
    severity: 'High',
    title: 'Missing Keywords',
    description: 'Your resume lacks important keywords from the job description',
    suggestion: 'Include terms like "agile development", "microservices", and "cloud architecture"',
    fixed: false
  },
  {
    id: '2',
    category: 'Content',
    severity: 'Medium',
    title: 'Quantify Achievements',
    description: 'Your experience bullets could be more impactful',
    suggestion: 'Add specific numbers and metrics to demonstrate your impact',
    fixed: false
  },
  {
    id: '3',
    category: 'Format',
    severity: 'Low',
    title: 'Inconsistent Date Format',
    description: 'Use consistent date formatting throughout your resume',
    suggestion: 'Use "MM/YYYY - MM/YYYY" format for all date ranges',
    fixed: true
  }
];