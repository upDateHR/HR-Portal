import React from "react";
import * as Icons from "lucide-react";

const MetricCard = ({ title, value, icon }) => {
  const Icon = Icons[icon] || Icons.Activity;

  return (
    // UI REFINEMENT: Consistent rounded-xl, stronger shadow, and smooth lift effect on hover.
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition duration-300 transform hover:-translate-y-0.5 cursor-pointer"> 
      <div className="flex items-center space-x-4">
        {/* ICON BLOCK: Smoother look with p-4 and subtle color change */}
        <div className="p-4 bg-purple-50 text-purple-600 rounded-xl flex-shrink-0"> 
          <Icon className="h-6 w-6" />
        </div>
        
        <div>
          {/* FONT REVERT: Original text size/weight maintained */}
          <p className="text-sm text-gray-500">{title}</p>
          <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
        </div>
      </div>
    </div>
  );
};

export default MetricCard;