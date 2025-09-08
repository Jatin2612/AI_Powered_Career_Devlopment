import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, Resume, SkillGap, CareerPath } from '../types';

interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  currentResume: Resume | null;
  setCurrentResume: (resume: Resume | null) => void;
  skillGaps: SkillGap[];
  setSkillGaps: (gaps: SkillGap[]) => void;
  careerPaths: CareerPath[];
  setCareerPaths: (paths: CareerPath[]) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>({
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    currentRole: 'Junior Frontend Developer',
    targetRole: 'Senior Full Stack Developer',
    experience: '2 years',
    skills: ['React', 'JavaScript', 'HTML/CSS', 'Git', 'Responsive Design'],
    education: [{
      id: '1',
      degree: 'Bachelor of Science in Computer Science',
      institution: 'Stanford University',
      year: '2022',
      gpa: '3.8'
    }],
    avatar: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg'
  });

  const [currentResume, setCurrentResume] = useState<Resume | null>(null);
  const [skillGaps, setSkillGaps] = useState<SkillGap[]>([]);
  const [careerPaths, setCareerPaths] = useState<CareerPath[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <AppContext.Provider value={{
      user,
      setUser,
      currentResume,
      setCurrentResume,
      skillGaps,
      setSkillGaps,
      careerPaths,
      setCareerPaths,
      sidebarOpen,
      setSidebarOpen
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};