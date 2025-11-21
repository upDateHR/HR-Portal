import React, { useState, useEffect } from "react";
import {
  Calendar,
  CheckCircle,
  Briefcase,
  Send,
  Loader2,
  ChevronRight,
  UserCheck
} from "lucide-react";

// --- MOCK DATA ---
const MOCK_APPLICANTS = [
    { _id: 'a001', name: 'Alice Johnson', status: 'Shortlisted', jobId: { title: 'Senior Backend Engineer' }, email: 'alice.j@corp.com', phone: '555-1234' },
    { _id: 'a002', name: 'Bob Smith', status: 'Interview Scheduled', jobId: { title: 'Junior Data Analyst' }, email: 'bob.s@corp.com', phone: '555-5678' },
    { _id: 'a003', name: 'Charlie Davis', status: 'Offer Extended', jobId: { title: 'UX/UI Designer' }, email: 'charlie.d@corp.com', phone: '555-9012' },
    { _id: 'a004', name: 'Diana Prince', status: 'Hired', jobId: { title: 'Senior Backend Engineer' }, email: 'diana.p@corp.com', phone: '555-3456' },
    { _id: 'a005', name: 'Eve Brown', status: 'Shortlisted', jobId: { title: 'UX/UI Designer' }, email: 'eve.b@corp.com', phone: '555-7890' },
];

// --- HELPER: Determine Next Step ---
const getNextStage = (currentStatus) => {
  switch (currentStatus) {
    case "Shortlisted":
      return {
        actionLabel: "Schedule Interview",
        nextStatus: "Interview Scheduled",
        color: "text-purple-600 bg-purple-50 hover:bg-purple-100 border-purple-200",
        icon: Calendar,
      };
    case "Interview Scheduled":
      return {
        actionLabel: "Confirm Offer",
        nextStatus: "Offer Extended",
        color: "text-orange-600 bg-orange-50 hover:bg-orange-100 border-orange-200",
        icon: Send,
      };
    case "Offer Extended":
      return {
        actionLabel: "Mark as Hired",
        nextStatus: "Hired",
        color: "text-green-600 bg-green-50 hover:bg-green-100 border-green-200",
        icon: Briefcase,
      };
    default:
      return null; // Hired or other statuses have no next action
  }
};

// --- MAIN COMPONENT ---
const MyHirings = () => {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);

  // Stages we care about for this page
  const validStages = ["Shortlisted", "Interview Scheduled", "Offer Extended", "Hired"];

  // Mock data loading effect
  useEffect(() => {
    // Simulate API call delay
    const load = () => {
        setTimeout(() => {
            setApps(MOCK_APPLICANTS);
            setLoading(false);
        }, 800);
    };
    load();
  }, []);

  // Handler for status update
  const handleProgress = async (id, nextStatus) => {
    // 1. Optimistic UI Update (Update screen immediately)
    setApps(prev => prev.map(app => 
        app._id === id ? { ...app, status: nextStatus } : app
    ));

    // 2. Mock Console Log (Replace this with your real API call later!)
    console.log(`MOCK UPDATE: Moving candidate ${id} to ${nextStatus}`);
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
    <div className="py-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Hirings</h1>
        <p className="text-gray-600 mt-1">
          Manage your candidates from shortlist through to final hiring.
        </p>
      </div>

      {/* Pipeline Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {validStages.map((stage) => (
              <div key={stage} className="bg-white p-4 rounded-xl shadow-md border border-gray-100">
                  <p className="text-xs text-gray-500 uppercase font-semibold">{stage}</p>
                  <p className="text-2xl font-bold text-gray-800">
                      {apps.filter(a => a.status === stage).length}
                  </p>
              </div>
          ))}
      </div>

      {/* DESKTOP TABLE */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Candidate</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Applied Job</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Current Stage</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Next Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {apps.map((app) => {
              const nextStep = getNextStage(app.status);
              const ActionIcon = nextStep?.icon;

              return (
                <tr key={app._id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-bold text-gray-900">{app.name}</div>
                    <div className="text-sm text-gray-600">{app.email}</div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-purple-600 font-medium">
                    {app.jobId?.title || '—'}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                        app.status === 'Hired' 
                        ? 'bg-green-100 text-green-700 border-green-200' 
                        : 'bg-blue-50 text-blue-700 border-blue-100'
                    }`}>
                        {app.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    {nextStep ? (
                      <button
                        onClick={() => handleProgress(app._id, nextStep.nextStatus)}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition border shadow-sm ${nextStep.color}`}
                      >
                        <ActionIcon className="h-4 w-4" />
                        <span>{nextStep.actionLabel}</span>
                        <ChevronRight className="h-4 w-4 opacity-50" />
                      </button>
                    ) : (
                        <span className="flex items-center text-green-600 font-bold text-sm">
                            <CheckCircle className="h-5 w-5 mr-2" />
                            Hiring Complete
                        </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        
        {apps.length === 0 && (
            <div className="text-center py-12 text-gray-500">
                No candidates are currently in the hiring pipeline.
            </div>
        )}
      </div>
    </div>
  );
};

export default MyHirings;