import React, { useState } from 'react';
import { Calendar as CalendarIcon, Plus, Clock, AlertCircle, CheckCircle } from 'lucide-react';

const Calendar = () => {
  const [selectedDate] = useState(new Date());
  const [view, setView] = useState('month');

  // Mock events data
  const events = [
    { id: 1, title: "Film main scenes", date: "2024-08-20", type: "deadline", project: "Summer Campaign 2024", priority: "high" },
    { id: 2, title: "Location scouting", date: "2024-08-22", type: "task", project: "Corporate Training", priority: "medium" },
    { id: 3, title: "Video editing deadline", date: "2024-09-05", type: "deadline", project: "Summer Campaign 2024", priority: "high" },
    { id: 4, title: "Client review meeting", date: "2024-08-25", type: "meeting", project: "Product Launch", priority: "medium" }
  ];

  const getEventColor = (type, priority) => {
    if (type === 'deadline' && priority === 'high') return 'bg-red-100 text-red-800 border-red-200';
    if (type === 'deadline') return 'bg-orange-100 text-orange-800 border-orange-200';
    if (type === 'meeting') return 'bg-blue-100 text-blue-800 border-blue-200';
    return 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getEventIcon = (type) => {
    switch (type) {
      case 'deadline': return <AlertCircle className="h-4 w-4" />;
      case 'meeting': return <Clock className="h-4 w-4" />;
      case 'task': return <CheckCircle className="h-4 w-4" />;
      default: return <CalendarIcon className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Calendar</h1>
          <p className="text-gray-600 mt-1">Track deadlines, milestones, and important dates</p>
        </div>
        <button className="bg-primary-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-primary-700 transition-colors">
          <Plus className="h-4 w-4" />
          <span>Add Event</span>
        </button>
      </div>

      {/* View Toggle */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
        {['month', 'week', 'day'].map((viewType) => (
          <button
            key={viewType}
            onClick={() => setView(viewType)}
            className={`px-4 py-2 rounded-md text-sm font-medium capitalize transition-colors ${
              view === viewType
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {viewType}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Calendar View */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                {selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </h2>
              <div className="flex space-x-2">
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <span className="sr-only">Previous month</span>
                  ←
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <span className="sr-only">Next month</span>
                  →
                </button>
              </div>
            </div>

            {/* Simple Calendar Grid */}
            <div className="grid grid-cols-7 gap-1 mb-4">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
                  {day}
                </div>
              ))}
              {Array.from({ length: 35 }, (_, i) => {
                const date = new Date(2024, 7, i - 6); // August 2024
                const isToday = date.toDateString() === new Date().toDateString();
                const hasEvents = events.some(event => 
                  new Date(event.date).toDateString() === date.toDateString()
                );
                
                return (
                  <div
                    key={i}
                    className={`p-2 text-center text-sm cursor-pointer hover:bg-gray-100 rounded ${
                      isToday ? 'bg-primary-100 text-primary-600 font-semibold' : ''
                    } ${date.getMonth() !== 7 ? 'text-gray-400' : ''}`}
                  >
                    <div className="relative">
                      {date.getDate()}
                      {hasEvents && (
                        <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Events</h3>
            <div className="space-y-3">
              {events.slice(0, 4).map((event) => (
                <div
                  key={event.id}
                  className={`p-3 rounded-lg border ${getEventColor(event.type, event.priority)}`}
                >
                  <div className="flex items-start space-x-2">
                    {getEventIcon(event.type)}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm">{event.title}</p>
                      <p className="text-xs opacity-75">{event.project}</p>
                      <p className="text-xs opacity-75 mt-1">{event.date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">This Week</span>
                <span className="font-semibold text-gray-900">3 events</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Overdue</span>
                <span className="font-semibold text-red-600">1 task</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Completed</span>
                <span className="font-semibold text-green-600">8 tasks</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-lg text-white">
            <div className="flex items-center space-x-2 mb-2">
              <CalendarIcon className="h-5 w-5" />
              <span className="font-semibold">Pro Tip</span>
            </div>
            <p className="text-sm opacity-90">
              Set up email notifications for important deadlines to never miss a milestone.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
