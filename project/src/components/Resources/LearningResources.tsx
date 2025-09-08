import React, { useState } from 'react';
import { Book, Video, FileText, Star, Clock, Filter, Search } from 'lucide-react';
import { LearningResource } from '../../types';

const LearningResources: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const resources: LearningResource[] = [
    {
      id: '1',
      title: 'Complete Node.js Developer Course',
      provider: 'Udemy',
      type: 'Course',
      duration: '35 hours',
      rating: 4.8,
      url: '#',
      difficulty: 'Intermediate',
      skills: ['Node.js', 'Express.js', 'MongoDB']
    },
    {
      id: '2',
      title: 'System Design Interview Guide',
      provider: 'LeetCode',
      type: 'Course',
      duration: '20 hours',
      rating: 4.7,
      url: '#',
      difficulty: 'Advanced',
      skills: ['System Design', 'Architecture']
    },
    {
      id: '3',
      title: 'Docker for Developers',
      provider: 'Pluralsight',
      type: 'Course',
      duration: '12 hours',
      rating: 4.6,
      url: '#',
      difficulty: 'Intermediate',
      skills: ['Docker', 'DevOps']
    },
    {
      id: '4',
      title: 'React Advanced Patterns',
      provider: 'Frontend Masters',
      type: 'Video',
      duration: '6 hours',
      rating: 4.9,
      url: '#',
      difficulty: 'Advanced',
      skills: ['React', 'JavaScript']
    },
    {
      id: '5',
      title: 'Building RESTful APIs',
      provider: 'freeCodeCamp',
      type: 'Article',
      duration: '2 hours',
      rating: 4.5,
      url: '#',
      difficulty: 'Beginner',
      skills: ['APIs', 'Backend']
    },
    {
      id: '6',
      title: 'Clean Code Principles',
      provider: 'Manning',
      type: 'Book',
      duration: '15 hours',
      rating: 4.8,
      url: '#',
      difficulty: 'Intermediate',
      skills: ['Best Practices', 'Code Quality']
    }
  ];

  const filters = [
    { id: 'all', label: 'All Resources', count: resources.length },
    { id: 'Course', label: 'Courses', count: resources.filter(r => r.type === 'Course').length },
    { id: 'Video', label: 'Videos', count: resources.filter(r => r.type === 'Video').length },
    { id: 'Article', label: 'Articles', count: resources.filter(r => r.type === 'Article').length },
    { id: 'Book', label: 'Books', count: resources.filter(r => r.type === 'Book').length },
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Course': return Book;
      case 'Video': return Video;
      case 'Article': return FileText;
      case 'Book': return Book;
      default: return Book;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-600 bg-green-100';
      case 'Intermediate': return 'text-yellow-600 bg-yellow-100';
      case 'Advanced': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const filteredResources = resources.filter(resource => {
    const matchesFilter = selectedFilter === 'all' || resource.type === selectedFilter;
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Learning Resources</h2>
          <p className="text-gray-600 mt-1">Curated resources to help you master new skills</p>
        </div>
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter className="h-4 w-4" />
            <span>More Filters</span>
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Search */}
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search resources, skills, or providers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setSelectedFilter(filter.id)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedFilter === filter.id
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {filter.label} ({filter.count})
            </button>
          ))}
        </div>
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((resource) => {
          const Icon = getTypeIcon(resource.type);
          return (
            <div key={resource.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Icon className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                      {resource.type}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium text-gray-900">{resource.rating}</span>
                </div>
              </div>

              {/* Content */}
              <div className="mb-4">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{resource.title}</h3>
                <p className="text-sm text-gray-600 mb-3">by {resource.provider}</p>
                
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-1 text-sm text-gray-500">
                    <Clock className="h-4 w-4" />
                    <span>{resource.duration}</span>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(resource.difficulty)}`}>
                    {resource.difficulty}
                  </span>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {resource.skills.slice(0, 3).map((skill, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                      {skill}
                    </span>
                  ))}
                  {resource.skills.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-500 rounded text-xs">
                      +{resource.skills.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-2">
                <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                  Start Learning
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  Save
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredResources.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Book className="h-16 w-16 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No resources found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      )}

      {/* Personalized Recommendations */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">📚 Personalized for You</h3>
        <p className="text-gray-600 mb-4">
          Based on your current skills and target role as <strong>Senior Full Stack Developer</strong>, 
          we recommend focusing on Node.js and System Design courses first.
        </p>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          View My Learning Plan
        </button>
      </div>
    </div>
  );
};

export default LearningResources;