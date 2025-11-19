import React from 'react';
import { Briefcase, Users } from 'lucide-react';

const HomeView = () => {
  return (
    // UI REFINEMENT: Increased vertical padding (py-12), stronger shadow (shadow-2xl), and consistent rounded-xl
    <div className="py-12 px-6 text-center bg-white rounded-xl shadow-2xl border border-gray-100 max-w-5xl mx-auto mt-8">
      {/* FONT REVERT: Original font size/weight maintained */}
      <h1 className="text-4xl font-bold text-purple-600 mb-4">Welcome to Your Company Portal</h1>
      <p className="text-xl text-gray-700 mb-10">This is the central hub after login. (Content will be finalized by the team.)</p>
      
      {/* Buttons Container */}
      <div className="flex justify-center space-x-6">
        
        {/* Primary Button Refinement: Rounded-full, shadow/hover elevation, smooth transition */}
        <button className="px-8 py-3 rounded-full bg-purple-600 text-white font-medium flex items-center space-x-2 shadow-lg hover:bg-purple-700 hover:shadow-xl transition duration-300">
            <Briefcase className="w-5 h-5" />
            <span>Post New Job</span>
        </button>
        
        {/* Secondary Button Refinement: Rounded-full, better border/hover contrast, smooth transition */}
        <button className="px-8 py-3 rounded-full border border-gray-300 text-gray-700 font-medium flex items-center space-x-2 shadow-sm hover:bg-gray-100 transition duration-300 hover:border-gray-400">
            <Users className="w-5 h-5" />
            <span>View Applicants</span>
        </button>
      </div>
      
      <p className="mt-10 text-sm text-gray-500">Your custom dashboard and features are available in the navigation bar.</p>
    </div>
  );
};

export default HomeView;