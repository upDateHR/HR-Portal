import React from 'react';

const MetricCard = ({ title, value, change, changeColor, icon: Icon, iconBg, iconColor }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 transition-transform hover:shadow-xl">
    <div className="flex justify-between items-start">
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <div className={`p-2 rounded-full ${iconBg}`}>
        <Icon className={`h-5 w-5 ${iconColor}`} />
      </div>
    </div>
    <p className="mt-1 text-3xl font-bold text-gray-900">{value.toLocaleString()}</p>
    <p className={`mt-2 text-xs ${changeColor} font-medium`}>{change}</p>
  </div>
);

export default MetricCard;