import React, { useState } from 'react';
import { 
  FileText, 
  AlertTriangle, 
  CheckCircle, 
  TrendingUp,
  Eye,
  Download,
  Lightbulb
} from 'lucide-react';
import { mockFeedback } from '../../utils/mockData';

const ResumeAnalysis: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('feedback');

  const atsScore = 78;
  const improvementAreas = mockFeedback.filter(item => !item.fixed);
  const completedItems = mockFeedback.filter(item => item.fixed);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High': return 'text-red-600 bg-red-100 border-red-200';
      case 'Medium': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'Low': return 'text-green-600 bg-green-100 border-green-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'ATS': return TrendingUp;
      case 'Content': return FileText;
      case 'Format': return Eye;
      case 'Skills': return Lightbulb;
      default: return FileText;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Career Analysis</h2>
          <p className="text-gray-600 mt-1">AI-powered insights to improve your career prospects</p>
        </div>
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Eye className="h-4 w-4" />
            <span>Preview Resume</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Download className="h-4 w-4" />
            <span>Download Report</span>
          </button>
        </div>
      </div>

      {/* ATS Score Card */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">ATS Compatibility Score</h3>
          <div className="flex items-center space-x-2">
            <div className={`text-2xl font-bold ${atsScore >= 80 ? 'text-green-600' : atsScore >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
              {atsScore}%
            </div>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${atsScore >= 80 ? 'bg-green-100 text-green-800' : atsScore >= 60 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
              {atsScore >= 80 ? 'Excellent' : atsScore >= 60 ? 'Good' : 'Needs Improvement'}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">85%</div>
            <div className="text-sm text-gray-600">Format Score</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">70%</div>
            <div className="text-sm text-gray-600">Content Score</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">80%</div>
            <div className="text-sm text-gray-600">Skills Match</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">75%</div>
            <div className="text-sm text-gray-600">Keyword Density</div>
          </div>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
          <div 
            className={`h-3 rounded-full ${atsScore >= 80 ? 'bg-green-500' : atsScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
            style={{ width: `${atsScore}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600">
          Your resume is performing well for ATS systems. Focus on the high-priority improvements below to boost your score.
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setSelectedTab('feedback')}
              className={`py-4 border-b-2 font-medium text-sm transition-colors ${
                selectedTab === 'feedback'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              AI Feedback ({improvementAreas.length})
            </button>
            <button
              onClick={() => setSelectedTab('completed')}
              className={`py-4 border-b-2 font-medium text-sm transition-colors ${
                selectedTab === 'completed'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Completed ({completedItems.length})
            </button>
            <button
              onClick={() => setSelectedTab('insights')}
              className={`py-4 border-b-2 font-medium text-sm transition-colors ${
                selectedTab === 'insights'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Market Insights
            </button>
          </nav>
        </div>

        <div className="p-6">
          {selectedTab === 'feedback' && (
            <div className="space-y-4">
              {improvementAreas.length === 0 ? (
                <div className="text-center py-12">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">All caught up!</h3>
                  <p className="text-gray-500">Your resume looks great. We'll notify you of new suggestions as they become available.</p>
                </div>
              ) : (
                improvementAreas.map((item) => {
                  const Icon = getCategoryIcon(item.category);
                  return (
                    <div key={item.id} className={`p-4 border rounded-lg ${getSeverityColor(item.severity)}`}>
                      <div className="flex items-start space-x-3">
                        <Icon className="h-5 w-5 mt-1" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold">{item.title}</h4>
                            <span className="text-xs font-medium px-2 py-1 rounded-full bg-white bg-opacity-50">
                              {item.severity} Priority
                            </span>
                          </div>
                          <p className="text-sm mb-3">{item.description}</p>
                          <div className="bg-white bg-opacity-50 p-3 rounded-lg">
                            <p className="text-sm font-medium mb-1">💡 Suggestion:</p>
                            <p className="text-sm">{item.suggestion}</p>
                          </div>
                          <div className="flex space-x-2 mt-3">
                            <button className="bg-white text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-50 transition-colors border">
                              Mark as Fixed
                            </button>
                            <button className="bg-white text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-50 transition-colors border">
                              Get Help
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}

          {selectedTab === 'completed' && (
            <div className="space-y-4">
              {completedItems.map((item) => {
                const Icon = getCategoryIcon(item.category);
                return (
                  <div key={item.id} className="p-4 border border-green-200 bg-green-50 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-green-900">{item.title}</h4>
                          <span className="text-xs font-medium text-green-800 bg-green-200 px-2 py-1 rounded-full">
                            Completed
                          </span>
                        </div>
                        <p className="text-sm text-green-800">{item.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {selectedTab === 'insights' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Job Market Trends</h4>
                  <p className="text-sm text-blue-800 mb-3">
                    Full-stack developer roles are up 15% this quarter, with high demand for React and Node.js skills.
                  </p>
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    View Details →
                  </button>
                </div>
                
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">Salary Insights</h4>
                  <p className="text-sm text-green-800 mb-3">
                    Your target role has a median salary of $95K in your location, 20% above your current range.
                  </p>
                  <button className="text-green-600 hover:text-green-800 text-sm font-medium">
                    See More →
                  </button>
                </div>
                
                <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                  <h4 className="font-semibold text-purple-900 mb-2">Skills Gap</h4>
                  <p className="text-sm text-purple-800 mb-3">
                    Adding Docker and AWS to your skillset could increase your job matches by 35%.
                  </p>
                  <button className="text-purple-600 hover:text-purple-800 text-sm font-medium">
                    Learn More →
                  </button>
                </div>
                
                <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                  <h4 className="font-semibold text-orange-900 mb-2">Competition</h4>
                  <p className="text-sm text-orange-800 mb-3">
                    You're in the top 25% of candidates for your target role based on your experience level.
                  </p>
                  <button className="text-orange-600 hover:text-orange-800 text-sm font-medium">
                    Improve Ranking →
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeAnalysis;