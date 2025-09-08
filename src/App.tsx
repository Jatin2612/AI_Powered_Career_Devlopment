import React, { useState } from 'react';
import { AppProvider } from './contexts/AppContext';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import Overview from './components/Dashboard/Overview';
import ResumeBuilder from './components/Resume/ResumeBuilder';
import ResumeAnalysis from './components/Analysis/ResumeAnalysis';
import SkillGapAnalysis from './components/Skills/SkillGapAnalysis';
import LearningResources from './components/Resources/LearningResources';
import CareerRoadmap from './components/Career/CareerRoadmap';

function AppContent() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Overview />;
      case 'resume':
        return <ResumeBuilder />;
      case 'analysis':
        return <ResumeAnalysis />;
      case 'skills':
        return <SkillGapAnalysis />;
      case 'resources':
        return <LearningResources />;
      case 'roadmap':
        return <CareerRoadmap />;
      case 'jobs':
        return <div className="text-center py-12"><p className="text-gray-500">Job Matching feature coming soon...</p></div>;
      case 'progress':
        return <div className="text-center py-12"><p className="text-gray-500">Progress Tracking feature coming soon...</p></div>;
      case 'settings':
        return <div className="text-center py-12"><p className="text-gray-500">Settings panel coming soon...</p></div>;
      default:
        return <Overview />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex-1 flex flex-col">
        <Header />
        
        <main className="flex-1 p-6 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;