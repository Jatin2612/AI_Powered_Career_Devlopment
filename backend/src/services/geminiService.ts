import { GoogleGenerativeAI } from '@google/generative-ai';
import { IResume } from '../models/Resume';

class GeminiService {
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor() {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is required');
    }
    
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });
  }

  async analyzeResume(resume: IResume, jobDescription?: string): Promise<{
    atsScore: number;
    strengths: string[];
    weaknesses: string[];
    suggestions: string[];
    keywordDensity: number;
    readabilityScore: number;
  }> {
    try {
      const resumeText = this.extractResumeText(resume);
      
      const prompt = `
        As an expert ATS (Applicant Tracking System) analyzer and career coach, analyze the following resume and provide detailed feedback.
        
        Resume Content:
        ${resumeText}
        
        ${jobDescription ? `Job Description for comparison:\n${jobDescription}\n` : ''}
        
        Please provide a comprehensive analysis in the following JSON format:
        {
          "atsScore": <number between 0-100>,
          "strengths": [<array of 3-5 key strengths>],
          "weaknesses": [<array of 3-5 areas for improvement>],
          "suggestions": [<array of 5-7 specific actionable suggestions>],
          "keywordDensity": <number between 0-100 representing keyword optimization>,
          "readabilityScore": <number between 0-100 representing how readable the resume is>
        }
        
        Focus on:
        1. ATS compatibility (formatting, keywords, structure)
        2. Content quality and impact
        3. Skill relevance and presentation
        4. Professional summary effectiveness
        5. Achievement quantification
        6. Industry-specific terminology
        7. Overall presentation and flow
        
        Provide specific, actionable feedback that will help improve the resume's performance in ATS systems and with human recruiters.
      `;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // Extract JSON from the response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('Invalid response format from Gemini API');
      }
      
      const analysis = JSON.parse(jsonMatch[0]);
      
      // Validate the response structure
      if (!this.isValidAnalysis(analysis)) {
        throw new Error('Invalid analysis structure from Gemini API');
      }
      
      return analysis;
    } catch (error) {
      console.error('Error analyzing resume with Gemini:', error);
      throw new Error('Failed to analyze resume');
    }
  }

  async generateResumeContent(userInfo: any, targetRole: string, section: string): Promise<string> {
    try {
      const prompt = `
        As a professional resume writer, help generate compelling content for a resume.
        
        User Information:
        - Current Role: ${userInfo.currentRole || 'Not specified'}
        - Target Role: ${targetRole}
        - Experience Level: ${userInfo.experience}
        - Skills: ${userInfo.skills?.join(', ') || 'Not specified'}
        
        Generate content for the "${section}" section that is:
        1. ATS-friendly with relevant keywords
        2. Quantified with metrics where possible
        3. Action-oriented using strong verbs
        4. Tailored for the target role
        5. Professional and impactful
        
        Provide 3-5 bullet points or a professional summary (depending on the section).
      `;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Error generating resume content:', error);
      throw new Error('Failed to generate resume content');
    }
  }

  async generateSkillGapAnalysis(currentSkills: string[], targetRole: string): Promise<{
    skillGaps: Array<{
      skill: string;
      currentLevel: number;
      requiredLevel: number;
      priority: 'High' | 'Medium' | 'Low';
      reasoning: string;
    }>;
    recommendations: string[];
  }> {
    try {
      const prompt = `
        As a career development expert, analyze the skill gap for someone transitioning to a ${targetRole} role.
        
        Current Skills: ${currentSkills.join(', ')}
        Target Role: ${targetRole}
        
        Provide a detailed skill gap analysis in JSON format:
        {
          "skillGaps": [
            {
              "skill": "<skill name>",
              "currentLevel": <1-5>,
              "requiredLevel": <1-5>,
              "priority": "<High|Medium|Low>",
              "reasoning": "<explanation of why this skill is important>"
            }
          ],
          "recommendations": [<array of 5-7 specific learning recommendations>]
        }
        
        Focus on:
        1. Technical skills required for the role
        2. Soft skills and leadership abilities
        3. Industry-specific knowledge
        4. Tools and technologies
        5. Certifications that would be valuable
        
        Prioritize skills based on market demand and role requirements.
      `;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('Invalid response format from Gemini API');
      }
      
      return JSON.parse(jsonMatch[0]);
    } catch (error) {
      console.error('Error generating skill gap analysis:', error);
      throw new Error('Failed to generate skill gap analysis');
    }
  }

  async generateCareerRoadmap(currentRole: string, targetRole: string, timeframe: string): Promise<{
    milestones: Array<{
      title: string;
      description: string;
      timeframe: string;
      skills: string[];
    }>;
    skillRequirements: Array<{
      skill: string;
      currentLevel: number;
      requiredLevel: number;
      priority: 'High' | 'Medium' | 'Low';
    }>;
  }> {
    try {
      const prompt = `
        As a career strategist, create a detailed career roadmap for transitioning from ${currentRole} to ${targetRole} within ${timeframe}.
        
        Provide a comprehensive roadmap in JSON format:
        {
          "milestones": [
            {
              "title": "<milestone title>",
              "description": "<detailed description>",
              "timeframe": "<time to complete>",
              "skills": [<array of skills to develop>]
            }
          ],
          "skillRequirements": [
            {
              "skill": "<skill name>",
              "currentLevel": <1-5>,
              "requiredLevel": <1-5>,
              "priority": "<High|Medium|Low>"
            }
          ]
        }
        
        Create 4-6 logical milestones that build upon each other, considering:
        1. Current skill level and experience
        2. Market requirements for the target role
        3. Realistic progression timeline
        4. Industry best practices
        5. Certification and learning opportunities
      `;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('Invalid response format from Gemini API');
      }
      
      return JSON.parse(jsonMatch[0]);
    } catch (error) {
      console.error('Error generating career roadmap:', error);
      throw new Error('Failed to generate career roadmap');
    }
  }

  private extractResumeText(resume: IResume): string {
    let text = '';
    
    // Personal Info
    text += `Name: ${resume.personalInfo.fullName}\n`;
    text += `Email: ${resume.personalInfo.email}\n`;
    text += `Phone: ${resume.personalInfo.phone}\n`;
    text += `Location: ${resume.personalInfo.location}\n`;
    if (resume.personalInfo.linkedIn) text += `LinkedIn: ${resume.personalInfo.linkedIn}\n`;
    if (resume.personalInfo.portfolio) text += `Portfolio: ${resume.personalInfo.portfolio}\n`;
    text += `\nProfessional Summary:\n${resume.personalInfo.summary}\n\n`;
    
    // Experience
    if (resume.experience.length > 0) {
      text += 'EXPERIENCE:\n';
      resume.experience.forEach(exp => {
        text += `${exp.title} at ${exp.company}\n`;
        text += `${exp.startDate.toDateString()} - ${exp.endDate ? exp.endDate.toDateString() : 'Present'}\n`;
        text += `${exp.description}\n`;
        if (exp.achievements.length > 0) {
          text += 'Achievements:\n';
          exp.achievements.forEach(achievement => {
            text += `• ${achievement}\n`;
          });
        }
        text += '\n';
      });
    }
    
    // Education
    if (resume.education.length > 0) {
      text += 'EDUCATION:\n';
      resume.education.forEach(edu => {
        text += `${edu.degree} from ${edu.institution}\n`;
        text += `${edu.startDate.toDateString()} - ${edu.endDate ? edu.endDate.toDateString() : 'Present'}\n`;
        if (edu.gpa) text += `GPA: ${edu.gpa}\n`;
        text += '\n';
      });
    }
    
    // Skills
    text += 'SKILLS:\n';
    if (resume.skills.technical.length > 0) {
      text += `Technical: ${resume.skills.technical.join(', ')}\n`;
    }
    if (resume.skills.soft.length > 0) {
      text += `Soft Skills: ${resume.skills.soft.join(', ')}\n`;
    }
    if (resume.skills.languages && resume.skills.languages.length > 0) {
      text += `Languages: ${resume.skills.languages.join(', ')}\n`;
    }
    
    // Projects
    if (resume.projects.length > 0) {
      text += '\nPROJECTS:\n';
      resume.projects.forEach(project => {
        text += `${project.name}\n`;
        text += `${project.description}\n`;
        text += `Technologies: ${project.technologies.join(', ')}\n`;
        if (project.link) text += `Link: ${project.link}\n`;
        text += '\n';
      });
    }
    
    // Certifications
    if (resume.certifications.length > 0) {
      text += 'CERTIFICATIONS:\n';
      resume.certifications.forEach(cert => {
        text += `${cert.name} - ${cert.issuer} (${cert.date.toDateString()})\n`;
      });
    }
    
    return text;
  }

  private isValidAnalysis(analysis: any): boolean {
    return (
      typeof analysis === 'object' &&
      typeof analysis.atsScore === 'number' &&
      Array.isArray(analysis.strengths) &&
      Array.isArray(analysis.weaknesses) &&
      Array.isArray(analysis.suggestions) &&
      typeof analysis.keywordDensity === 'number' &&
      typeof analysis.readabilityScore === 'number'
    );
  }
}

export default new GeminiService();