import React from 'react';
import { Briefcase, Users } from 'lucide-react';

// Consistent color definitions based on Upstox theme
const UPSTOX_PURPLE = 'purple-700';
const UPSTOX_TEXT_PURPLE = 'purple-600';
const UPSTOX_BUTTON_PURPLE = 'purple-600';

const HomeView = () => {
  return (
    // UI: Reduced vertical spacing (py-12), subtle shadow, elegant rounded edges (rounded-xl)
    <div className="py-12 px-6 sm:px-8 text-center bg-white rounded-xl shadow-lg border border-gray-50 max-w-4xl mx-auto mt-8 transition duration-500">
      
      {/* Title & Subtitle: Reduced font size and weight for a less 'bulky' look */}
      <h1 className={`text-3xl font-semibold text-${UPSTOX_TEXT_PURPLE} mb-3 tracking-normal`}>
        Recruiter Dashboard
      </h1>
      <p className="text-lg text-gray-500 mb-10 max-w-3xl mx-auto">
        Manage your listings and candidate applications efficiently.
      </p>
      
      {/* Buttons Container: Changed to stack them on mobile, side-by-side on desktop */}
      <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-6">
        
        {/* Primary CTA: Post New Job (Sleek, rounded-md, modest shadow) */}
        <button className={`
            px-6 py-2.5 rounded-lg 
            bg-${UPSTOX_BUTTON_PURPLE} text-white 
            font-medium text-base
            flex items-center justify-center space-x-2 
            shadow-md hover:shadow-lg 
            hover:bg-purple-700 
            transition duration-200
          `}
        >
          <Briefcase className="w-5 h-5" />
          <span>Post New Job</span>
        </button>
        
        {/* Secondary Action: View Applicants (Outline, matching size, subtle hover) */}
        <button className={`
            px-6 py-2.5 rounded-lg 
            bg-white border border-gray-300 
            text-gray-700 
            font-medium text-base
            flex items-center justify-center space-x-2 
            hover:border-${UPSTOX_BUTTON_PURPLE} hover:text-${UPSTOX_BUTTON_PURPLE} hover:bg-purple-50
            transition duration-200
          `}
        >
          <Users className="w-5 h-5" />
          <span>View Applicants</span>
        </button>
      </div>
      
      <p className="mt-12 text-xs text-gray-400">
        Use the navigation bar for detailed profile and historical data management.
      </p>
    </div>
  );
};

export default HomeView;