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

// Get next stage
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

const MyHirings = () => {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const data = await getHiringPipeline();
      setApps(data);
      setLoading(false);
    };
    load();
  }, []);

  const handleProgress = async (id, nextStatus) => {
    setApps(prev =>
      prev.map(app => app._id === id ? { ...app, status: nextStatus } : app)
    );
    await updateHiringStage(id, nextStatus);
  };

  if (loading) {
    return (
      <div className="text-center py-20">
        <Loader2 className="animate-spin h-8 w-8 mx-auto text-purple-600" />
        <p className="mt-2 text-gray-500">Loading Hiring Pipeline...</p>
      </div>
    );
  }

  return (
    <div className="py-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">My Hirings</h1>
      <p className="text-lg text-gray-600 mb-6">Manage shortlisted and hired candidates</p>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4">Candidate</th>
              <th className="px-6 py-4">Job</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {apps.map((app) => {
              const nextStep = getNextStage(app.status);
              const Icon = nextStep?.icon;

              return (
                <tr key={app._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">{app.candidateName}</td>
                  <td className="px-6 py-4">{app.job?.title}</td>
                  <td className="px-6 py-4">{app.status}</td>
                  <td className="px-6 py-4">

                    {nextStep ? (
                      <button
                        onClick={() => handleProgress(app._id, nextStep.nextStatus)}
                        className="px-3 py-2 bg-purple-100 hover:bg-purple-200 rounded-lg"
                      >
                        <Icon className="inline-block mr-2" />
                        {nextStep.actionLabel}
                      </button>
                    ) : (
                      <span className="text-green-600 font-bold inline-flex items-center">
                        <CheckCircle className="mr-2" />
                        Hired
                      </span>
                    )}

                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyHirings;
