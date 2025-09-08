import React from 'react';
import { 
  FileText, 
  TrendingUp, 
  Target, 
  Award,
  ArrowUp,
  ArrowDown,
  Clock
} from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

const Overview: React.FC = () => {
  const { user } = useApp();

  const stats = [
    {
      label: 'Resume ATS Score',
      value: '78%',
      change: '+12%',
      trend: 'up',
      icon: FileText,
      color: 'text-blue-600'
    },
    {
      label: 'Skill Match Rate',
      value: '65%',
      change: '+8%',
      trend: 'up',
      icon: Target,
      color: 'text-green-600'
    },
    {
      label: 'Career Progress',
      value: '42%',
      change: '+5%',
      trend: 'up',
      icon: TrendingUp,
      color: 'text-purple-600'
    },
    {
      label: 'Completed Courses',
      value: '12',
      change: '+3',
      trend: 'up',
      icon: Award,
      color: 'text-orange-600'
    }
  ];

  const recentActivity = [
    { action: 'Updated resume with new project', time: '2 hours ago', type: 'resume' },
    { action: 'Completed Node.js fundamentals course', time: '1 day ago', type: 'learning' },
    { action: 'Applied to Senior Developer position', time: '2 days ago', type: 'application' },
    { action: 'Received feedback on portfolio', time: '3 days ago', type: 'feedback' }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Welcome back, {user?.name}!</h2>
        <p className="text-blue-100 mb-4">
          You're on track to reach your goal of becoming a {user?.targetRole}.
        </p>
        <div className="flex items-center space-x-4">
          <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors">
            View Career Roadmap
          </button>
          <button className="border border-blue-300 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
            Update Profile
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg bg-gray-50 ${stat.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div className="flex items-center space-x-1 text-sm">
                  {stat.trend === 'up' ? (
                    <ArrowUp className="h-4 w-4 text-green-500" />
                  ) : (
                    <ArrowDown className="h-4 w-4 text-red-500" />
                  )}
                  <span className={stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}>
                    {stat.change}
                  </span>
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="p-2 rounded-full bg-blue-100">
                  <Clock className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900 font-medium">{activity.action}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors">
              Improve Resume
            </button>
            <button className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors">
              Find Learning Resources
            </button>
            <button className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-purple-700 transition-colors">
              Explore Job Matches
            </button>
            <button className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors">
              Schedule Career Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;