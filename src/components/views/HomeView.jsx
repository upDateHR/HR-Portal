// src/components/views/HomeView.jsx

import React from 'react';
import { Briefcase, Users } from 'lucide-react';

const HomeView = () => {
  return (
    <div className="py-8 text-center bg-white rounded-xl shadow-lg border border-gray-100">
      <h1 className="text-4xl font-bold text-purple-600 mb-4">Welcome to Your Company Portal</h1>
      <p className="text-xl text-gray-700 mb-6">This is the central hub after login. (Content will be finalized by the team.)</p>
      
      <div className="flex justify-center space-x-4">
        {/* Placeholder for Quick Access Buttons */}
        <button className="px-6 py-3 rounded-full bg-purple-600 text-white font-medium flex items-center space-x-2 hover:bg-purple-700 transition-colors">
            <Briefcase className="w-5 h-5" />
            <span>Post New Job</span>
        </button>
        <button className="px-6 py-3 rounded-full border border-gray-300 text-gray-700 font-medium flex items-center space-x-2 hover:bg-gray-50 transition-colors">
            <Users className="w-5 h-5" />
            <span>View Applicants</span>
        </button>
      </div>
      
      <p className="mt-8 text-sm text-gray-500">Your custom dashboard and features are available in the navigation bar.</p>
    </div>
  );
};

export default HomeView;