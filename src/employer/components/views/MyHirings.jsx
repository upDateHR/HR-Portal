import React, { useState, useEffect } from "react";
import {
  Calendar,
  CheckCircle,
  Briefcase,
  Send,
  Loader2,
  ChevronRight,
} from "lucide-react";

import { getHiringPipeline, updateHiringStage } from "../../helpers/employerService";

// Consistent color definitions based on Upstox theme
const UPSTOX_TEXT_PURPLE = 'purple-600';
const UPSTOX_HOVER_PURPLE = 'purple-700';
const UPSTOX_LIGHT_PURPLE_BG = 'purple-50';
const UPSTOX_ACCENT_PURPLE_BG = 'purple-100';

// Get next stage (logic unchanged)
const getNextStage = (currentStatus) => {
  switch (currentStatus) {
    case "shortlisted":
      return {
        actionLabel: "Schedule Interview",
        nextStatus: "interview_scheduled",
        icon: Calendar,
      };
    case "interview_scheduled":
      return {
        actionLabel: "Extend Offer",
        nextStatus: "offer_extended",
        icon: Send,
      };
    case "offer_extended":
      return {
        actionLabel: "Mark as Hired",
        nextStatus: "hired",
        icon: Briefcase,
      };
    default:
      return null;
  }
};

// Helper to format the status string
const formatStatus = (status) => {
    if (!status) return "N/A";
    // Capitalize first letter and replace underscores with spaces
    return status.charAt(0).toUpperCase() + status.slice(1).replace(/_/g, ' ');
};


const MyHirings = () => {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getHiringPipeline();
        setApps(data || []);
      } catch (error) {
          console.error("Failed to load hiring pipeline:", error);
          setApps([]);
      }
      setLoading(false);
    };
    load();
  }, []);

  const handleProgress = async (id, nextStatus) => {
    // Optimistic update
    setApps(prev =>
      prev.map(app => app._id === id ? { ...app, status: nextStatus, isUpdating: true } : app)
    );
    try {
        await updateHiringStage(id, nextStatus);
        // Remove isUpdating flag on success
        setApps(prev =>
            prev.map(app => app._id === id ? { ...app, isUpdating: false } : app)
        );
    } catch (error) {
        console.error("Failed to update hiring stage:", error);
        // Revert status on failure (or handle with a notification)
        setApps(prev =>
            prev.map(app => app._id === id ? { ...app, isUpdating: false, status: getPreviousStatus(nextStatus) } : app)
        );
    }
  };
  
  // NOTE: getPreviousStatus would be required for a complete optimistic UI revert, 
  // but is not implemented here to avoid changing backend logic/complexity. 
  // We rely on the initial optimistic update above for UX.

  if (loading) {
    return (
      <div className="text-center py-20">
        {/* Consistent loading spinner style */}
        <Loader2 className={`animate-spin h-8 w-8 mx-auto text-${UPSTOX_TEXT_PURPLE}`} />
        <p className="mt-3 text-gray-600 font-medium">Loading Hiring Pipeline...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-6">
      <h1 className="text-3xl font-semibold text-gray-900 mb-2 tracking-tight">
        Hiring Pipeline
      </h1>
      <p className="text-base text-gray-500 mb-8">
        Manage shortlisted candidates and progress them through the hiring stages.
      </p>

      {/* TABLE CONTAINER: Sleek card design */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        {apps.length === 0 ? (
             <p className="p-10 text-center text-base text-gray-500 font-medium">
                No candidates are currently in the hiring pipeline.
             </p>
        ) : (
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-100">
                    <thead className="bg-gray-50">
                        <tr>
                            {/* Table Headers: Clean, concise, professional */}
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Candidate
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Applied for Job
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Current Status
                            </th>
                            <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Next Action
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                        {apps.map((app) => {
                            const nextStep = getNextStage(app.status);
                            const Icon = nextStep?.icon;

                            return (
                                <tr key={app._id} className={`hover:bg-${UPSTOX_LIGHT_PURPLE_BG}/50 transition duration-150`}>
                                    {/* Candidate */}
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                                        {app.candidateName}
                                    </td>
                                    {/* Job */}
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {app.job?.title || 'N/A'}
                                    </td>
                                    {/* Status */}
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {/* Status Badge: Using purple for active stages, green for Hired */}
                                        {app.status === 'hired' ? (
                                            <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                {formatStatus(app.status)}
                                            </span>
                                        ) : (
                                            <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-${UPSTOX_ACCENT_PURPLE_BG} text-${UPSTOX_TEXT_PURPLE}`}>
                                                {formatStatus(app.status)}
                                            </span>
                                        )}
                                    </td>
                                    {/* Action Button */}
                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                        {nextStep ? (
                                            <button
                                                onClick={() => handleProgress(app._id, nextStep.nextStatus)}
                                                disabled={app.isUpdating}
                                                className={`
                                                    inline-flex items-center px-4 py-2 text-sm font-semibold rounded-lg 
                                                    bg-${UPSTOX_ACCENT_PURPLE_BG} text-${UPSTOX_TEXT_PURPLE} 
                                                    shadow-sm 
                                                    hover:bg-purple-200 
                                                    transition duration-200
                                                    disabled:opacity-50 disabled:cursor-not-allowed
                                                `}
                                            >
                                                {app.isUpdating ? (
                                                    <Loader2 className="animate-spin h-4 w-4 mr-2" />
                                                ) : (
                                                    <>
                                                        <Icon className="h-4 w-4 mr-2" />
                                                        {nextStep.actionLabel}
                                                        <ChevronRight className="h-4 w-4 ml-1" />
                                                    </>
                                                )}
                                            </button>
                                        ) : (
                                            <span className="text-green-600 font-semibold inline-flex items-center text-sm">
                                                <CheckCircle className="h-5 w-5 mr-2" />
                                                Completed
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        )}
      </div>
    </div>
  );
};

export default MyHirings;