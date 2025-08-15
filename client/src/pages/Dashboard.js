import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  FolderOpen, 
  Users, 
  TrendingUp,
  Calendar,
  CheckCircle,
  AlertCircle,
  Bot
} from 'lucide-react';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [stats, setStats] = useState({
    totalProjects: 0,
    activeProjects: 0,
    completedTasks: 0,
    upcomingDeadlines: 0
  });

  // Mock data - will be replaced with API calls
  useEffect(() => {
    const mockProjects = [
      {
        id: 1,
        title: "Summer Campaign 2024",
        status: "Production",
        progress: 65,
        dueDate: "2024-09-15",
        team: 8
      },
      {
        id: 2,
        title: "Corporate Training Video",
        status: "Pre-production",
        progress: 30,
        dueDate: "2024-08-30",
        team: 5
      },
      {
        id: 3,
        title: "Product Launch Promo",
        status: "Development",
        progress: 15,
        dueDate: "2024-10-01",
        team: 6
      }
    ];

    setProjects(mockProjects);
    setStats({
      totalProjects: mockProjects.length,
      activeProjects: mockProjects.filter(p => p.status !== 'Completed').length,
      completedTasks: 24,
      upcomingDeadlines: 3
    });
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

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's your project overview.</p>
        </div>
        <Link
          to="/projects"
          className="bg-primary-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-primary-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>New Project</span>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Projects</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalProjects}</p>
            </div>
            <FolderOpen className="h-8 w-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Projects</p>
              <p className="text-2xl font-bold text-gray-900">{stats.activeProjects}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed Tasks</p>
              <p className="text-2xl font-bold text-gray-900">{stats.completedTasks}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-purple-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Upcoming Deadlines</p>
              <p className="text-2xl font-bold text-gray-900">{stats.upcomingDeadlines}</p>
            </div>
            <AlertCircle className="h-8 w-8 text-red-500" />
          </div>
        </div>
      </div>

      {/* Recent Projects */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">Recent Projects</h2>
            <Link
              to="/projects"
              className="text-primary-600 hover:text-primary-700 text-sm font-medium"
            >
              View all
            </Link>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <h3 className="font-medium text-gray-900">{project.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                      {project.status}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
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
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary-600 h-2 rounded-full" 
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600">{project.progress}%</span>
                  </div>
                  <Link
                    to={`/projects/${project.id}`}
                    className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                  >
                    View
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link
          to="/ai-assistant"
          className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-lg text-white hover:from-blue-600 hover:to-purple-700 transition-all"
        >
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <Bot className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-semibold">AI Assistant</h3>
              <p className="text-sm opacity-90">Get AI-powered suggestions</p>
            </div>
          </div>
        </Link>

        <Link
          to="/calendar"
          className="bg-gradient-to-r from-green-500 to-teal-600 p-6 rounded-lg text-white hover:from-green-600 hover:to-teal-700 transition-all"
        >
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <Calendar className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-semibold">Calendar</h3>
              <p className="text-sm opacity-90">View deadlines & milestones</p>
            </div>
          </div>
        </Link>

        <Link
          to="/team"
          className="bg-gradient-to-r from-orange-500 to-red-600 p-6 rounded-lg text-white hover:from-orange-600 hover:to-red-700 transition-all"
        >
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-semibold">Team</h3>
              <p className="text-sm opacity-90">Manage team members</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
