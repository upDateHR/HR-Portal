import React from "react";
import { BarChart2, Loader2 } from "lucide-react";

const AnalyticsView = () => {
  return (
    // UI REFINEMENT: Added soft background and better centering
    <div className="py-16 bg-gray-50 min-h-screen flex items-start justify-center">
      {/* UI REFINEMENT: Consistent rounded-xl, professional shadow (shadow-2xl) */}
      <div className="mx-auto bg-white shadow-2xl border border-gray-100 rounded-xl p-10 max-w-xl w-full text-center mt-12">
        
        {/* ICON BLOCK: Smoother look with rounded-full background */}
        <div className="mx-auto h-16 w-16 bg-purple-50 rounded-full flex items-center justify-center mb-4 shadow-inner">
             <BarChart2 className="h-8 w-8 text-purple-600" />
        </div>

        {/* FONT REVERT: Original font size/weight maintained */}
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          Analytics Dashboard
        </h1>

        <p className="text-gray-600 text-lg mb-6 max-w-md mx-auto">
          Analytics data will become available once the student-side APIs are ready.
        </p>

        {/* LOADING INDICATOR: Smoother, prominent spinner */}
        <div className="flex justify-center space-x-2">
          <Loader2 className="animate-spin h-6 w-6 text-purple-700" />
          <p className="text-base font-medium text-gray-700">Loading...</p>
        </div>

        <p className="mt-4 text-sm text-gray-500">
          Waiting for integration with applicant & job activity data…
        </p>
      </div>
    </div>
  );
};

export default AnalyticsView;