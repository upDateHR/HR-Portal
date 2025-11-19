import React from 'react';
import { Mail, Phone, Building2, Globe } from 'lucide-react'; 

const IconMap = { Mail, Phone, Building2, Globe };

const DetailItem = ({ icon: IconName, title, value }) => {
    const Icon = IconMap[IconName] || Building2; 
    
    return (
        // UI REFINEMENT: Professional card look with rounded-xl, shadow, and hover effect.
        <div className="p-4 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition duration-200">
            
            <p className="text-xs font-medium text-gray-500 flex items-center space-x-1 mb-1">
                <Icon className="h-4 w-4 text-purple-600 flex-shrink-0" /> 
                <span>{title}</span>
            </p>
            
            {/* FONT REVERT: Original text size/weight maintained */}
            <p className="text-base font-semibold text-gray-800 leading-snug break-words">
                {value}
            </p>
        </div>
    );
};

export default DetailItem;