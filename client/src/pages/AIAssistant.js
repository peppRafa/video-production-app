import React, { useState } from 'react';
import { Bot, Send, Lightbulb, MapPin, Users, Calendar, FileText } from 'lucide-react';

const AIAssistant = () => {
  const [selectedType, setSelectedType] = useState('general');
  const [prompt, setPrompt] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const suggestionTypes = [
    { id: 'location', label: 'Location Scouting', icon: MapPin, color: 'bg-blue-500' },
    { id: 'casting', label: 'Casting', icon: Users, color: 'bg-green-500' },
    { id: 'scheduling', label: 'Scheduling', icon: Calendar, color: 'bg-purple-500' },
    { id: 'script', label: 'Script Analysis', icon: FileText, color: 'bg-orange-500' },
    { id: 'general', label: 'General', icon: Lightbulb, color: 'bg-gray-500' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsLoading(true);
    
    // Mock API call - will be replaced with actual API
    setTimeout(() => {
      const mockSuggestions = {
        location: [
          {
            title: "Urban Rooftop",
            description: "Modern city skyline backdrop with golden hour lighting",
            pros: ["Great natural lighting", "Urban aesthetic", "Multiple angles"],
            cons: ["Weather dependent", "Permit required"],
            cost: "$500-800/day"
          },
          {
            title: "Industrial Warehouse",
            description: "Spacious interior with high ceilings and dramatic lighting",
            pros: ["Controlled environment", "Versatile space", "Good acoustics"],
            cons: ["May need additional lighting", "Limited natural light"],
            cost: "$300-600/day"
          }
        ],
        casting: [
          {
            role: "Lead Actor",
            description: "Charismatic professional with commercial experience",
            requirements: ["Age 25-35", "Previous commercial work", "Available for 3 days"],
            budget: "$2000-3000/day"
          }
        ],
        general: [
          {
            suggestion: "Consider shooting during golden hour for better lighting",
            category: "Cinematography",
            impact: "High"
          },
          {
            suggestion: "Plan for backup indoor locations in case of weather issues",
            category: "Production Planning",
            impact: "Medium"
          }
        ]
      };

      setSuggestions(mockSuggestions[selectedType] || mockSuggestions.general);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-full">
            <Bot className="h-8 w-8 text-white" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900">AI Assistant</h1>
        <p className="text-gray-600 mt-2">Get AI-powered suggestions for your video production needs</p>
      </div>

      {/* Suggestion Types */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {suggestionTypes.map((type) => {
          const Icon = type.icon;
          return (
            <button
              key={type.id}
              onClick={() => setSelectedType(type.id)}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedType === type.id
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className={`${type.color} p-2 rounded-lg mb-2 mx-auto w-fit`}>
                <Icon className="h-5 w-5 text-white" />
              </div>
              <p className="text-sm font-medium text-gray-900">{type.label}</p>
            </button>
          );
        })}
      </div>

      {/* Input Form */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              What do you need help with?
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={`Ask for ${selectedType} suggestions... (e.g., "I need locations for a corporate video shoot in downtown area")`}
              rows={4}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading || !prompt.trim()}
            className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Generating suggestions...</span>
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                <span>Get AI Suggestions</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">AI Suggestions</h2>
          <div className="grid gap-4">
            {suggestions.map((suggestion, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border p-6">
                {selectedType === 'location' && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{suggestion.title}</h3>
                    <p className="text-gray-600 mb-4">{suggestion.description}</p>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <h4 className="font-medium text-green-800 mb-2">Pros</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {suggestion.pros.map((pro, i) => (
                            <li key={i}>• {pro}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-red-800 mb-2">Cons</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {suggestion.cons.map((con, i) => (
                            <li key={i}>• {con}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-blue-800 mb-2">Cost</h4>
                        <p className="text-sm text-gray-600">{suggestion.cost}</p>
                      </div>
                    </div>
                  </div>
                )}

                {selectedType === 'casting' && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{suggestion.role}</h3>
                    <p className="text-gray-600 mb-4">{suggestion.description}</p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-gray-800 mb-2">Requirements</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {suggestion.requirements.map((req, i) => (
                            <li key={i}>• {req}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800 mb-2">Budget</h4>
                        <p className="text-sm text-gray-600">{suggestion.budget}</p>
                      </div>
                    </div>
                  </div>
                )}

                {selectedType === 'general' && (
                  <div>
                    <div className="flex items-start space-x-3">
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <Lightbulb className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-900 mb-2">{suggestion.suggestion}</p>
                        <div className="flex items-center space-x-4 text-sm">
                          <span className="bg-gray-100 px-2 py-1 rounded text-gray-700">
                            {suggestion.category}
                          </span>
                          <span className={`px-2 py-1 rounded ${
                            suggestion.impact === 'High' ? 'bg-red-100 text-red-700' :
                            suggestion.impact === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-green-100 text-green-700'
                          }`}>
                            {suggestion.impact} Impact
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AIAssistant;
