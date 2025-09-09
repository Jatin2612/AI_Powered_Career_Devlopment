import mongoose from 'mongoose';
import dotenv from 'dotenv';
import LearningResource from '../models/LearningResource';

dotenv.config();

const seedResources = [
  {
    title: 'Complete Node.js Developer Course',
    provider: 'Udemy',
    type: 'Course',
    description: 'Learn Node.js by building real-world applications with Node, Express, MongoDB, Jest, and more!',
    url: 'https://www.udemy.com/course/the-complete-nodejs-developer-course-2/',
    duration: '35 hours',
    rating: 4.8,
    difficulty: 'Intermediate',
    skills: ['Node.js', 'Express.js', 'MongoDB', 'JavaScript', 'REST APIs'],
    price: { amount: 89.99, currency: 'USD', isFree: false },
    tags: ['backend', 'javascript', 'web development'],
    prerequisites: ['Basic JavaScript knowledge'],
    learningOutcomes: [
      'Build full-stack web applications',
      'Create REST APIs with Express',
      'Work with MongoDB databases',
      'Deploy applications to production'
    ]
  },
  {
    title: 'React - The Complete Guide',
    provider: 'Udemy',
    type: 'Course',
    description: 'Dive in and learn React.js from scratch! Learn Reactjs, Hooks, Redux, React Routing, Animations, Next.js and way more!',
    url: 'https://www.udemy.com/course/react-the-complete-guide-incl-redux/',
    duration: '48 hours',
    rating: 4.9,
    difficulty: 'Beginner',
    skills: ['React', 'JavaScript', 'Redux', 'Next.js', 'Hooks'],
    price: { amount: 94.99, currency: 'USD', isFree: false },
    tags: ['frontend', 'react', 'javascript'],
    prerequisites: ['HTML', 'CSS', 'Basic JavaScript'],
    learningOutcomes: [
      'Build modern React applications',
      'Understand React Hooks and Context',
      'Manage state with Redux',
      'Create responsive user interfaces'
    ]
  },
  {
    title: 'System Design Interview',
    provider: 'LeetCode',
    type: 'Course',
    description: 'Master system design interviews with real-world examples and hands-on practice.',
    url: 'https://leetcode.com/explore/system-design/',
    duration: '20 hours',
    rating: 4.7,
    difficulty: 'Advanced',
    skills: ['System Design', 'Architecture', 'Scalability', 'Databases'],
    price: { amount: 0, currency: 'USD', isFree: true },
    tags: ['system design', 'architecture', 'interviews'],
    prerequisites: ['Programming experience', 'Basic database knowledge'],
    learningOutcomes: [
      'Design scalable systems',
      'Understand distributed systems',
      'Master system design interviews',
      'Learn about microservices'
    ]
  },
  {
    title: 'Docker for Developers',
    provider: 'Pluralsight',
    type: 'Course',
    description: 'Learn Docker from the ground up and use it to streamline your development workflow.',
    url: 'https://www.pluralsight.com/courses/docker-developers',
    duration: '12 hours',
    rating: 4.6,
    difficulty: 'Intermediate',
    skills: ['Docker', 'DevOps', 'Containerization', 'Kubernetes'],
    price: { amount: 29.99, currency: 'USD', isFree: false },
    tags: ['docker', 'devops', 'containers'],
    prerequisites: ['Basic command line knowledge'],
    learningOutcomes: [
      'Containerize applications with Docker',
      'Understand Docker networking',
      'Deploy with Docker Compose',
      'Introduction to Kubernetes'
    ]
  },
  {
    title: 'TypeScript Handbook',
    provider: 'Microsoft',
    type: 'Article',
    description: 'The official TypeScript documentation and learning resource.',
    url: 'https://www.typescriptlang.org/docs/',
    duration: '8 hours',
    rating: 4.8,
    difficulty: 'Intermediate',
    skills: ['TypeScript', 'JavaScript', 'Type Safety'],
    price: { amount: 0, currency: 'USD', isFree: true },
    tags: ['typescript', 'javascript', 'documentation'],
    prerequisites: ['JavaScript knowledge'],
    learningOutcomes: [
      'Understand TypeScript syntax',
      'Add type safety to JavaScript',
      'Work with interfaces and generics',
      'Configure TypeScript projects'
    ]
  },
  {
    title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
    provider: 'Robert C. Martin',
    type: 'Book',
    description: 'Learn the principles of writing clean, maintainable code.',
    url: 'https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882',
    duration: '20 hours',
    rating: 4.9,
    difficulty: 'Intermediate',
    skills: ['Clean Code', 'Best Practices', 'Software Engineering'],
    price: { amount: 35.99, currency: 'USD', isFree: false },
    tags: ['clean code', 'best practices', 'software engineering'],
    prerequisites: ['Programming experience'],
    learningOutcomes: [
      'Write clean, readable code',
      'Understand code smells',
      'Learn refactoring techniques',
      'Apply SOLID principles'
    ]
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/careerai');
    console.log('Connected to MongoDB');

    // Clear existing resources
    await LearningResource.deleteMany({});
    console.log('Cleared existing learning resources');

    // Insert seed data
    await LearningResource.insertMany(seedResources);
    console.log('Seeded learning resources');

    console.log('Database seeding completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();