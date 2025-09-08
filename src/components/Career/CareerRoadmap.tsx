import React, { useState } from 'react';
import { Map, Target, Clock, CheckCircle, Circle, Star, TrendingUp } from 'lucide-react';
import { mockCareerPaths } from '../../utils/mockData';

const CareerRoadmap: React.FC = () => {
  const [selectedPath, setSelectedPath] = useState(0);
  const path = mockCareerPaths[selectedPath];

  const formatSalary = (min: number, max: number) => {
    return `$${(min / 1000).toFixed(0)}K - $${(max / 1000).toFixed(0)}K`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Career Roadmap</h2>
          <p className="text-gray-600 mt-1">Your personalized path to career success</p>
        </div>
        <button className="mt-4 sm:mt-0 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Generate New Roadmap
        </button>
      </div>

      {/* Path Overview */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex items-center space-x-3 mb-4">
          <Map className="h-8 w-8" />
          <h3 className="text-xl font-bold">{path.title}</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <p className="text-blue-100 text-sm">Current Role</p>
            <p className="font-semibold">{path.currentRole}</p>
          </div>
          <div>
            <p className="text-blue-100 text-sm">Target Role</p>
            <p className="font-semibold">{path.targetRole}</p>
          </div>
          <div>
            <p className="text-blue-100 text-sm">Expected Timeline</p>
            <p className="font-semibold">{path.timeframe}</p>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-100 text-sm">Salary Range</p>
            <p className="font-semibold">{formatSalary(path.salaryRange.min, path.salaryRange.max)}</p>
          </div>
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5" />
            <span className="text-sm">85% match with your skills</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Milestones */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Career Milestones</h3>
            <div className="space-y-6">
              {path.milestones.map((milestone, index) => (
                <div key={milestone.id} className="relative">
                  {/* Timeline line */}
                  {index < path.milestones.length - 1 && (
                    <div className="absolute left-6 top-12 w-0.5 h-16 bg-gray-200"></div>
                  )}
                  
                  <div className="flex space-x-4">
                    <div className="flex-shrink-0">
                      {milestone.completed ? (
                        <CheckCircle className="h-12 w-12 text-green-500" />
                      ) : (
                        <Circle className="h-12 w-12 text-gray-300" />
                      )}
                    </div>
                    
                    <div className={`flex-1 p-4 rounded-lg border-2 ${
                      milestone.completed 
                        ? 'bg-green-50 border-green-200' 
                        : 'bg-white border-gray-200 hover:border-blue-200'
                    } transition-colors`}>
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">{milestone.title}</h4>
                        <span className="text-sm text-gray-500 flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {milestone.timeframe}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-3">{milestone.description}</p>
                      
                      {/* Skills */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        {milestone.skills.map((skill, skillIndex) => (
                          <span 
                            key={skillIndex} 
                            className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex space-x-2">
                        {!milestone.completed && (
                          <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors">
                            Start Learning
                          </button>
                        )}
                        <button className="border border-gray-300 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-50 transition-colors">
                          View Resources
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Progress Overview */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Overall Progress</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Career Progress</span>
                  <span>42%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '42%' }}></div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">2</div>
                  <div className="text-sm text-green-700">Completed</div>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">3</div>
                  <div className="text-sm text-blue-700">In Progress</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Required Skills */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Required Skills</h3>
            <div className="space-y-3">
              {path.skillRequirements.map((skill, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-gray-700">{skill}</span>
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star 
                        key={star} 
                        className={`h-4 w-4 ${star <= 3 ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Industry Insights */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Industry Insights</h3>
            <div className="space-y-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-sm font-medium text-blue-800">Job Market</p>
                <p className="text-xs text-blue-600">High demand for full-stack developers</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <p className="text-sm font-medium text-green-800">Salary Trend</p>
                <p className="text-xs text-green-600">+12% increase year over year</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <p className="text-sm font-medium text-purple-800">Hot Skills</p>
                <p className="text-xs text-purple-600">React, Node.js, Cloud platforms</p>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 border border-orange-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Next Steps</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Complete Node.js course</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Build a full-stack project</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Update resume with new skills</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerRoadmap;