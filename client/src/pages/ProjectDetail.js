import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Calendar, Users, Upload, Bot, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    // Mock project data - will be replaced with API call
    const mockProject = {
      id: parseInt(id),
      title: "Summer Campaign 2024",
      description: "A comprehensive summer marketing campaign featuring multiple video assets",
      status: "Production",
      progress: 65,
      dueDate: "2024-09-15",
      createdAt: "2024-07-01",
      team: [
        { id: 1, name: "John Doe", role: "Director", avatar: "/api/placeholder/32/32" },
        { id: 2, name: "Jane Smith", role: "Producer", avatar: "/api/placeholder/32/32" },
        { id: 3, name: "Mike Johnson", role: "Editor", avatar: "/api/placeholder/32/32" }
      ],
      phases: [
        { 
          id: 1, 
          name: "Development", 
          status: "completed", 
          progress: 100,
          tasks: [
            { id: 1, title: "Script writing", status: "completed", dueDate: "2024-07-07" },
            { id: 2, title: "Storyboard creation", status: "completed", dueDate: "2024-07-10" }
          ]
        },
        { 
          id: 2, 
          name: "Pre-production", 
          status: "completed", 
          progress: 100,
          tasks: [
            { id: 3, title: "Location scouting", status: "completed", dueDate: "2024-07-20" },
            { id: 4, title: "Casting", status: "completed", dueDate: "2024-07-25" }
          ]
        },
        { 
          id: 3, 
          name: "Production", 
          status: "in_progress", 
          progress: 65,
          tasks: [
            { id: 5, title: "Film main scenes", status: "in_progress", dueDate: "2024-08-20" },
            { id: 6, title: "Record B-roll footage", status: "pending", dueDate: "2024-08-22" }
          ]
        },
        { 
          id: 4, 
          name: "Post-production", 
          status: "pending", 
          progress: 0,
          tasks: [
            { id: 7, title: "Video editing", status: "pending", dueDate: "2024-09-05" },
            { id: 8, title: "Color correction", status: "pending", dueDate: "2024-09-10" }
          ]
        }
      ]
    };
    setProject(mockProject);
  }, [id]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'in_progress': return <Clock className="h-4 w-4 text-blue-500" />;
      default: return <AlertCircle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'Development': 'bg-blue-100 text-blue-800',
      'Pre-production': 'bg-yellow-100 text-yellow-800',
      'Production': 'bg-green-100 text-green-800',
      'Post-production': 'bg-purple-100 text-purple-800',
      'completed': 'bg-green-100 text-green-800',
      'in_progress': 'bg-blue-100 text-blue-800',
      'pending': 'bg-gray-100 text-gray-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  if (!project) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{project.title}</h1>
            <p className="text-gray-600 mb-4">{project.description}</p>
            <div className="flex items-center space-x-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(project.status)}`}>
                {project.status}
              </span>
              <div className="flex items-center space-x-1 text-sm text-gray-500">
                <Calendar className="h-4 w-4" />
                <span>Due {project.dueDate}</span>
              </div>
              <div className="flex items-center space-x-1 text-sm text-gray-500">
                <Users className="h-4 w-4" />
                <span>{project.team.length} members</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900 mb-1">{project.progress}%</div>
            <div className="w-32 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-primary-600 h-2 rounded-full" 
                style={{ width: `${project.progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {['overview', 'phases', 'team', 'media'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 px-1 border-b-2 font-medium text-sm capitalize ${
                activeTab === tab
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Phases</h3>
              <div className="space-y-4">
                {project.phases.map((phase) => (
                  <div key={phase.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(phase.status)}
                        <h4 className="font-medium text-gray-900">{phase.name}</h4>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(phase.status)}`}>
                        {phase.status.replace('_', ' ')}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                      <div 
                        className="bg-primary-600 h-2 rounded-full" 
                        style={{ width: `${phase.progress}%` }}
                      ></div>
                    </div>
                    <div className="text-sm text-gray-600">
                      {phase.tasks.length} tasks • {phase.progress}% complete
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Team Members</h3>
              <div className="space-y-3">
                {project.team.map((member) => (
                  <div key={member.id} className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                    <div>
                      <div className="font-medium text-gray-900">{member.name}</div>
                      <div className="text-sm text-gray-500">{member.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                  <Upload className="h-4 w-4 text-gray-600" />
                  <span className="text-sm">Upload Media</span>
                </button>
                <button className="w-full flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                  <Bot className="h-4 w-4 text-gray-600" />
                  <span className="text-sm">AI Suggestions</span>
                </button>
                <button className="w-full flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                  <Users className="h-4 w-4 text-gray-600" />
                  <span className="text-sm">Invite Member</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'phases' && (
        <div className="space-y-6">
          {project.phases.map((phase) => (
            <div key={phase.id} className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(phase.status)}
                  <h3 className="text-xl font-semibold text-gray-900">{phase.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(phase.status)}`}>
                    {phase.status.replace('_', ' ')}
                  </span>
                </div>
                <div className="text-sm text-gray-500">{phase.progress}% complete</div>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                <div 
                  className="bg-primary-600 h-2 rounded-full" 
                  style={{ width: `${phase.progress}%` }}
                ></div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium text-gray-900">Tasks</h4>
                {phase.tasks.map((task) => (
                  <div key={task.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(task.status)}
                      <span className="text-gray-900">{task.title}</span>
                    </div>
                    <div className="text-sm text-gray-500">Due {task.dueDate}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'team' && (
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Team Members</h3>
            <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700">
              Invite Member
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {project.team.map((member) => (
              <div key={member.id} className="border rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                  <div>
                    <div className="font-medium text-gray-900">{member.name}</div>
                    <div className="text-sm text-gray-500">{member.role}</div>
                  </div>
                </div>
                <button className="w-full text-sm text-primary-600 hover:text-primary-700">
                  View Profile
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'media' && (
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Media Library</h3>
            <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700">
              Upload Media
            </button>
          </div>
          <div className="text-center py-12 text-gray-500">
            <Upload className="h-12 w-12 mx-auto mb-4" />
            <p>No media files uploaded yet</p>
            <p className="text-sm">Upload images, videos, and documents for this project</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetail;
