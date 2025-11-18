// This file centralizes the logic for styling statuses and stages.

export const getStatusClasses = (status) => {
  switch (status) {
    case 'Active': return 'bg-green-100 text-green-700';
    case 'Paused': return 'bg-yellow-100 text-yellow-700';
    case 'Expired': return 'bg-red-100 text-red-700';
    default: return 'bg-gray-100 text-gray-700';
  }
};

export const getStageClasses = (stage) => {
  switch (stage) {
    case 'New': return 'bg-blue-100 text-blue-700';
    case 'Screening': return 'bg-yellow-100 text-yellow-700';
    case 'Interview': return 'bg-purple-100 text-purple-700';
    case 'Offer': return 'bg-green-100 text-green-700';
    case 'Rejected': return 'bg-red-100 text-red-700';
    default: return 'bg-gray-100 text-gray-700';
  }
};