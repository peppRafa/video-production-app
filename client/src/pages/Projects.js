import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Filter, Calendar, Users, MoreVertical } from 'lucide-react';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    // Mock data - will be replaced with API call
    const mockProjects = [
      {
        id: 1,
        title: "Summer Campaign 2024",
        description: "A comprehensive summer marketing campaign featuring multiple video assets",
        status: "Production",
        progress: 65,
        dueDate: "2024-09-15",
        team: 8,
        createdAt: "2024-07-01"
      },
      {
        id: 2,
        title: "Corporate Training Video",
        description: "Internal training video for new employee onboarding",
        status: "Pre-production",
        progress: 30,
        dueDate: "2024-08-30",
        team: 5,
        createdAt: "2024-07-15"
      },
      {
        id: 3,
        title: "Product Launch Promo",
        description: "Promotional video for new product launch",
        status: "Development",
        progress: 15,
        dueDate: "2024-10-01",
        team: 6,
        createdAt: "2024-07-20"
      }
    ];
    setProjects(mockProjects);
  }, []);

  const getStatusColor = (status) => {
    const colors = {
      'Development': 'bg-blue-100 text-blue-800',
      'Pre-production': 'bg-yellow-100 text-yellow-800',
      'Production': 'bg-green-100 text-green-800',
      'Post-production': 'bg-purple-100 text-purple-800',
      'Completed': 'bg-gray-100 text-gray-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || project.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
          <p className="text-gray-600 mt-1">Manage your video production projects</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-primary-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-primary-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>New Project</span>
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none bg-white"
          >
            <option value="all">All Status</option>
            <option value="Development">Development</option>
            <option value="Pre-production">Pre-production</option>
            <option value="Production">Production</option>
            <option value="Post-production">Post-production</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div key={project.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{project.title}</h3>
                  <p className="text-gray-600 text-sm line-clamp-2">{project.description}</p>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreVertical className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                  <span className="text-sm text-gray-500">{project.progress}%</span>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-primary-600 h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>{project.team} members</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>Due {project.dueDate}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t">
                <Link
                  to={`/projects/${project.id}`}
                  className="w-full bg-primary-50 text-primary-600 py-2 px-4 rounded-lg text-sm font-medium hover:bg-primary-100 transition-colors text-center block"
                >
                  View Project
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
          <p className="text-gray-600 mb-4">
            {searchTerm || filterStatus !== 'all' 
              ? 'Try adjusting your search or filter criteria' 
              : 'Get started by creating your first project'}
          </p>
          {!searchTerm && filterStatus === 'all' && (
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
            >
              Create Project
            </button>
          )}
        </div>
      )}

      {/* Create Project Modal - Placeholder */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Create New Project</h3>
            <p className="text-gray-600 mb-4">Project creation form will be implemented here.</p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700">
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
