import React from 'react';
import { TrendingUp, Target, Book, Clock, Star, ArrowRight } from 'lucide-react';
import { mockSkillGaps } from '../../utils/mockData';

const SkillGapAnalysis: React.FC = () => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'text-red-600 bg-red-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getSkillLevel = (level: number) => {
    const levels = ['Beginner', 'Basic', 'Intermediate', 'Advanced', 'Expert'];
    return levels[level - 1] || 'Beginner';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Skill Development</h2>
          <p className="text-gray-600 mt-1">Identify gaps and build the skills you need for your target role</p>
        </div>
        <button className="mt-4 sm:mt-0 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Take Skills Assessment
        </button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-red-100 rounded-lg">
              <Target className="h-6 w-6 text-red-600" />
            </div>
            <span className="text-2xl font-bold text-red-600">3</span>
          </div>
          <h3 className="font-semibold text-gray-900">High Priority Skills</h3>
          <p className="text-sm text-gray-600 mt-1">Critical for your target role</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-yellow-600" />
            </div>
            <span className="text-2xl font-bold text-yellow-600">5</span>
          </div>
          <h3 className="font-semibold text-gray-900">In Progress</h3>
          <p className="text-sm text-gray-600 mt-1">Currently learning</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <Star className="h-6 w-6 text-green-600" />
            </div>
            <span className="text-2xl font-bold text-green-600">8</span>
          </div>
          <h3 className="font-semibold text-gray-900">Strong Skills</h3>
          <p className="text-sm text-gray-600 mt-1">Above target level</p>
        </div>
      </div>

      {/* Skill Gaps */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Skill Gap Analysis</h3>
          <div className="flex items-center space-x-2">
            <button className="text-sm text-gray-500 hover:text-gray-700">Filter by Priority</button>
            <button className="text-sm text-gray-500 hover:text-gray-700">Sort by Gap Size</button>
          </div>
        </div>

        <div className="space-y-4">
          {mockSkillGaps.map((gap, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="font-semibold text-gray-900">{gap.skill}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(gap.priority)}`}>
                      {gap.priority} Priority
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>Current: {getSkillLevel(gap.currentLevel)}</span>
                    <ArrowRight className="h-4 w-4" />
                    <span>Target: {getSkillLevel(gap.requiredLevel)}</span>
                  </div>
                </div>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  View Resources
                </button>
              </div>

              {/* Progress Bar */}
              <div className="mb-3">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Current Level</span>
                  <span>Target Level</span>
                </div>
                <div className="relative w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${(gap.currentLevel / gap.requiredLevel) * 100}%` }}
                  ></div>
                  <div 
                    className="absolute top-0 h-2 bg-blue-300 rounded-full opacity-50"
                    style={{ 
                      left: `${(gap.currentLevel / gap.requiredLevel) * 100}%`,
                      width: `${((gap.requiredLevel - gap.currentLevel) / gap.requiredLevel) * 100}%`
                    }}
                  ></div>
                </div>
              </div>

              {/* Top Resource */}
              {gap.resources[0] && (
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Book className="h-4 w-4 text-blue-600" />
                      <div>
                        <p className="font-medium text-sm text-gray-900">{gap.resources[0].title}</p>
                        <p className="text-xs text-gray-500">{gap.resources[0].provider}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <Clock className="h-3 w-3" />
                      <span>{gap.resources[0].duration}</span>
                      <div className="flex items-center">
                        <Star className="h-3 w-3 text-yellow-500 fill-current" />
                        <span className="ml-1">{gap.resources[0].rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Learning Path Suggestions */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommended Learning Path</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">1</div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">Master Node.js Fundamentals</p>
              <p className="text-sm text-gray-600">Start with server-side JavaScript basics</p>
            </div>
            <span className="text-sm text-blue-600">2-3 weeks</span>
          </div>
          <div className="flex items-center space-x-4 p-3 bg-gray-50 border border-gray-200 rounded-lg">
            <div className="w-8 h-8 bg-gray-400 text-white rounded-full flex items-center justify-center text-sm font-medium">2</div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">Learn System Design Principles</p>
              <p className="text-sm text-gray-600">Understand scalable architecture patterns</p>
            </div>
            <span className="text-sm text-gray-600">4-6 weeks</span>
          </div>
          <div className="flex items-center space-x-4 p-3 bg-gray-50 border border-gray-200 rounded-lg">
            <div className="w-8 h-8 bg-gray-400 text-white rounded-full flex items-center justify-center text-sm font-medium">3</div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">Practice with Docker & DevOps</p>
              <p className="text-sm text-gray-600">Gain hands-on containerization experience</p>
            </div>
            <span className="text-sm text-gray-600">2-3 weeks</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillGapAnalysis;