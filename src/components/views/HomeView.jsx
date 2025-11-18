import React from 'react';
import { Briefcase, Users, Send } from 'lucide-react'; // Added Send for the primary action

const HomeView = () => {
  return (
    // Card Container: Subtle shadow (shadow-lg), elegant rounded corners (rounded-lg)
    <div className="py-16 px-6 sm:px-10 text-center bg-white rounded-lg shadow-lg border border-gray-100 max-w-4xl mx-auto mt-12">
      
      {/* Header - Refined Typography */}
      <h1 className="text-3xl font-bold text-purple-500 tracking-tight mb-3">
        Welcome to the Recruiter Portal
      </h1>
      <p className="text-lg text-gray-600 mb-10">
        Manage your job postings, review applicants, and analyze hiring performance.
      </p>
      
      <p className="mt-12 text-sm text-gray-500">
        Access detailed analytics and settings via the main navigation.
      </p>
    </div>
  );
};

export default HomeView;