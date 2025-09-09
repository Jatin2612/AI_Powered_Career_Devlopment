import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth';

// Mock job data (in a real app, this would come from job APIs like Indeed, LinkedIn, etc.)
const mockJobs = [
  {
    id: '1',
    title: 'Senior Full Stack Developer',
    company: 'TechCorp Inc.',
    location: 'San Francisco, CA',
    type: 'Full-time',
    remote: true,
    salaryRange: '$120K - $160K',
    description: 'We are looking for a Senior Full Stack Developer to join our growing team...',
    requirements: [
      '5+ years of experience with React and Node.js',
      'Strong understanding of database design',
      'Experience with cloud platforms (AWS/GCP)',
      'Excellent problem-solving skills'
    ],
    skills: ['React', 'Node.js', 'PostgreSQL', 'AWS', 'Docker'],
    benefits: ['Health Insurance', 'Remote Work', '401k', 'Stock Options'],
    postedDate: new Date('2024-01-15'),
    applicationDeadline: new Date('2024-02-15'),
    matchPercentage: 85
  },
  {
    id: '2',
    title: 'Frontend Developer',
    company: 'StartupX',
    location: 'New York, NY',
    type: 'Full-time',
    remote: false,
    salaryRange: '$90K - $120K',
    description: 'Join our innovative team as a Frontend Developer...',
    requirements: [
      '3+ years of React experience',
      'Strong CSS and JavaScript skills',
      'Experience with modern build tools',
      'UI/UX design sensibility'
    ],
    skills: ['React', 'TypeScript', 'CSS', 'JavaScript', 'Figma'],
    benefits: ['Health Insurance', 'Flexible Hours', 'Learning Budget'],
    postedDate: new Date('2024-01-20'),
    applicationDeadline: new Date('2024-02-20'),
    matchPercentage: 92
  },
  {
    id: '3',
    title: 'Backend Engineer',
    company: 'DataFlow Systems',
    location: 'Austin, TX',
    type: 'Full-time',
    remote: true,
    salaryRange: '$100K - $140K',
    description: 'We need a Backend Engineer to build scalable systems...',
    requirements: [
      '4+ years of backend development',
      'Experience with microservices',
      'Strong database skills',
      'API design experience'
    ],
    skills: ['Node.js', 'Python', 'PostgreSQL', 'Redis', 'Kubernetes'],
    benefits: ['Remote Work', 'Health Insurance', 'Stock Options', 'Unlimited PTO'],
    postedDate: new Date('2024-01-18'),
    applicationDeadline: new Date('2024-02-18'),
    matchPercentage: 78
  }
];

// @desc    Get job matches for user
// @route   GET /api/jobs/matches
// @access  Private
export const getJobMatches = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { location, remote, salaryMin, salaryMax, type } = req.query;
    
    let filteredJobs = [...mockJobs];

    // Apply filters
    if (location) {
      filteredJobs = filteredJobs.filter(job => 
        job.location.toLowerCase().includes((location as string).toLowerCase())
      );
    }

    if (remote === 'true') {
      filteredJobs = filteredJobs.filter(job => job.remote);
    }

    if (type) {
      filteredJobs = filteredJobs.filter(job => job.type === type);
    }

    // Calculate match percentage based on user skills
    const userSkills = req.user!.skills || [];
    filteredJobs = filteredJobs.map(job => {
      const matchingSkills = job.skills.filter(skill => 
        userSkills.some(userSkill => 
          userSkill.toLowerCase().includes(skill.toLowerCase()) ||
          skill.toLowerCase().includes(userSkill.toLowerCase())
        )
      );
      
      const matchPercentage = Math.round((matchingSkills.length / job.skills.length) * 100);
      
      return {
        ...job,
        matchPercentage,
        matchingSkills
      };
    });

    // Sort by match percentage
    filteredJobs.sort((a, b) => b.matchPercentage - a.matchPercentage);

    res.status(200).json({
      success: true,
      count: filteredJobs.length,
      data: filteredJobs
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get job details
// @route   GET /api/jobs/:id
// @access  Private
export const getJobDetails = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const job = mockJobs.find(j => j.id === req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    // Calculate match details
    const userSkills = req.user!.skills || [];
    const matchingSkills = job.skills.filter(skill => 
      userSkills.some(userSkill => 
        userSkill.toLowerCase().includes(skill.toLowerCase()) ||
        skill.toLowerCase().includes(userSkill.toLowerCase())
      )
    );
    
    const missingSkills = job.skills.filter(skill => !matchingSkills.includes(skill));
    const matchPercentage = Math.round((matchingSkills.length / job.skills.length) * 100);

    const jobWithMatch = {
      ...job,
      matchPercentage,
      matchingSkills,
      missingSkills,
      recommendations: missingSkills.length > 0 ? 
        `Consider learning ${missingSkills.slice(0, 2).join(' and ')} to improve your match score.` : 
        'You have all the required skills for this position!'
    };

    res.status(200).json({
      success: true,
      data: jobWithMatch
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Save job for later
// @route   POST /api/jobs/:id/save
// @access  Private
export const saveJob = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const job = mockJobs.find(j => j.id === req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    // In a real app, this would save to a SavedJobs collection
    res.status(200).json({
      success: true,
      message: 'Job saved successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get saved jobs
// @route   GET /api/jobs/saved
// @access  Private
export const getSavedJobs = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    // In a real app, this would fetch from SavedJobs collection
    const savedJobs = mockJobs.slice(0, 2); // Mock saved jobs

    res.status(200).json({
      success: true,
      count: savedJobs.length,
      data: savedJobs
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Remove saved job
// @route   DELETE /api/jobs/:id/save
// @access  Private
export const removeSavedJob = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    // In a real app, this would remove from SavedJobs collection
    res.status(200).json({
      success: true,
      message: 'Job removed from saved list'
    });
  } catch (error) {
    next(error);
  }
};