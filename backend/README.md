# CareerAI Backend API

A comprehensive backend API for the CareerAI platform, providing AI-powered career development features including resume analysis, skill gap assessment, and personalized learning recommendations.

## Features

### 🔐 Authentication & User Management
- JWT-based authentication
- User registration and login
- Profile management
- Password reset functionality

### 📄 Resume Management
- Create, read, update, delete resumes
- Multiple resume templates
- ATS-friendly formatting
- AI-powered resume analysis using Google Gemini

### 🤖 AI-Powered Analysis
- Resume ATS compatibility scoring
- Content optimization suggestions
- Skill gap analysis
- Career roadmap generation
- Market insights and trends

### 🎯 Skill Development
- Skill gap identification
- Progress tracking
- Personalized learning recommendations
- Resource curation

### 📚 Learning Resources
- Curated learning materials
- Course recommendations
- Resource reviews and ratings
- Skill-based filtering

### 🗺️ Career Planning
- AI-generated career roadmaps
- Milestone tracking
- Progress monitoring
- Market insights

### 💼 Job Matching
- Personalized job recommendations
- Skill-based matching
- Saved jobs functionality
- Application tracking

## Tech Stack

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **AI Integration**: Google Gemini API
- **Authentication**: JWT
- **Validation**: Express Validator
- **Security**: Helmet, CORS, Rate Limiting
- **Development**: Nodemon, TypeScript

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- Google Gemini API key

### Installation

1. **Clone and navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```
   
   Update the `.env` file with your configuration:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/careerai
   JWT_SECRET=your-super-secret-jwt-key-here
   JWT_EXPIRES_IN=7d
   GEMINI_API_KEY=your-gemini-api-key-here
   ```

4. **Start MongoDB**
   Make sure MongoDB is running on your system.

5. **Seed the database (optional)**
   ```bash
   npm run seed
   ```

6. **Start the development server**
   ```bash
   npm run dev
   ```

The API will be available at `http://localhost:5000`

### Production Build

```bash
npm run build
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update user profile
- `POST /api/auth/forgot-password` - Forgot password
- `PUT /api/auth/reset-password/:token` - Reset password

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users/stats` - Get user statistics
- `DELETE /api/users/account` - Delete user account

### Resumes
- `GET /api/resumes` - Get user's resumes
- `POST /api/resumes` - Create new resume
- `GET /api/resumes/:id` - Get specific resume
- `PUT /api/resumes/:id` - Update resume
- `DELETE /api/resumes/:id` - Delete resume
- `POST /api/resumes/:id/analyze` - Analyze resume with AI
- `POST /api/resumes/generate-content` - Generate resume content

### Analysis
- `GET /api/analysis/resume/:resumeId` - Get resume analysis
- `GET /api/analysis/skill-gap` - Get skill gap analysis
- `POST /api/analysis/career-insights` - Generate career insights
- `GET /api/analysis/market-trends/:role` - Get market trends

### Skills
- `GET /api/skills` - Get skill gaps
- `POST /api/skills` - Create skill gap
- `PUT /api/skills/:id` - Update skill gap
- `DELETE /api/skills/:id` - Delete skill gap
- `PUT /api/skills/:id/progress` - Update skill progress

### Learning Resources
- `GET /api/resources` - Get learning resources
- `GET /api/resources/recommendations` - Get personalized recommendations
- `GET /api/resources/:id` - Get specific resource
- `POST /api/resources` - Create resource (admin)
- `PUT /api/resources/:id` - Update resource (admin)
- `DELETE /api/resources/:id` - Delete resource (admin)
- `POST /api/resources/:id/review` - Add resource review

### Career Planning
- `GET /api/career` - Get career paths
- `POST /api/career` - Create career path
- `GET /api/career/:id` - Get specific career path
- `PUT /api/career/:id` - Update career path
- `DELETE /api/career/:id` - Delete career path
- `PUT /api/career/:id/milestone/:milestoneId` - Update milestone
- `POST /api/career/generate-roadmap` - Generate AI roadmap

### Job Matching
- `GET /api/jobs/matches` - Get job matches
- `GET /api/jobs/saved` - Get saved jobs
- `GET /api/jobs/:id` - Get job details
- `POST /api/jobs/:id/save` - Save job
- `DELETE /api/jobs/:id/save` - Remove saved job

## AI Integration

The backend integrates with Google Gemini AI for:

### Resume Analysis
- ATS compatibility scoring
- Content quality assessment
- Keyword optimization
- Formatting suggestions
- Industry-specific recommendations

### Skill Gap Analysis
- Current vs required skill levels
- Priority-based recommendations
- Learning path suggestions
- Market demand insights

### Career Roadmap Generation
- Milestone creation
- Timeline planning
- Skill requirement mapping
- Resource recommendations

## Database Schema

### User Model
- Personal information
- Skills and experience
- Education history
- Preferences and settings

### Resume Model
- Personal information
- Work experience
- Education
- Skills and projects
- ATS analysis results

### Skill Gap Model
- Skill assessments
- Progress tracking
- Learning recommendations

### Learning Resource Model
- Course information
- Reviews and ratings
- Skill mappings
- Pricing details

### Career Path Model
- Roadmap milestones
- Progress tracking
- Market insights
- Skill requirements

## Security Features

- JWT authentication
- Password hashing with bcrypt
- Rate limiting
- CORS protection
- Helmet security headers
- Input validation and sanitization
- MongoDB injection prevention

## Error Handling

Comprehensive error handling with:
- Custom error classes
- Validation error formatting
- Database error handling
- JWT error handling
- Global error middleware

## Development

### Code Structure
```
src/
├── controllers/     # Route handlers
├── models/         # Database models
├── routes/         # API routes
├── middleware/     # Custom middleware
├── services/       # Business logic
├── scripts/        # Utility scripts
├── config/         # Configuration files
└── server.ts       # Application entry point
```

### Adding New Features

1. Create model in `models/`
2. Add routes in `routes/`
3. Implement controllers in `controllers/`
4. Add middleware if needed
5. Update documentation

## Deployment

### Environment Variables
Ensure all required environment variables are set in production:
- `NODE_ENV=production`
- `MONGODB_URI` - Production MongoDB connection
- `JWT_SECRET` - Strong secret key
- `GEMINI_API_KEY` - Google Gemini API key

### Production Considerations
- Use process manager (PM2)
- Set up MongoDB replica set
- Configure reverse proxy (Nginx)
- Enable SSL/TLS
- Set up monitoring and logging
- Configure backup strategies

## Contributing

1. Fork the repository
2. Create feature branch
3. Make changes with tests
4. Submit pull request

## License

This project is licensed under the MIT License.