import React from 'react';
import { Mail, Phone, Building2, Globe } from 'lucide-react'; 

// Manual map for icon components
const IconMap = { Mail, Phone, Building2, Globe };

const DetailItem = ({ icon: IconName, title, value }) => {
    // Globe is imported as a named icon from lucide-react, resolving the previous issue.
    const Icon = IconMap[IconName] || Building2; 
    return (
        <div className="space-y-1">
            <p className="text-xs font-medium text-gray-500 flex items-center space-x-1">
                <Icon className="h-4 w-4" /> <span>{title}</span>
            </p>
            <p className="text-base font-semibold text-gray-800">{value}</p>
        </div>
    );
};

export default DetailItem;