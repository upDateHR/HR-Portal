import React from "react";
import * as Icons from "lucide-react";

// The prop name 'label' is used here to match the DashboardView component's usage.
const MetricCard = ({ label, value, icon }) => {
  // Logic remains unchanged: Dynamically fetch icon component
  const Icon = Icons[icon] || Icons.Activity;

  return (
    // Card Container: Subtle shadow, elegant border, gentle hover effect.
    <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 transition duration-300 transform hover:shadow-md cursor-pointer">
      <div className="flex items-center space-x-4">
        
        {/* ICON BLOCK: Using PURPLE theme with rounded-full for softness */}
        <div className="p-3 bg-purple-50 text-purple-600 rounded-full flex-shrink-0"> 
          <Icon className="h-5 w-5" />
        </div>
        
        <div>
          {/* Label: Clear and professional title */}
          <p className="text-sm font-medium text-gray-500">{label}</p>
          
          {/* Value: Reduced size and weight to maintain elegance */}
          <h3 className="text-xl font-semibold text-gray-900 leading-tight mt-1">
            {value}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default MetricCard;