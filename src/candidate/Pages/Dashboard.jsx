import React, { useEffect, useState } from "react";
import { Loader2, Briefcase, ChevronRight } from "lucide-react"; // Added icons
import API from "../../api";

// Consistent color definitions based on Upstox theme
const UPSTOX_TEXT_PURPLE = 'purple-600';
const UPSTOX_HOVER_PURPLE = 'purple-700';
const UPSTOX_LIGHT_PURPLE_BG = 'purple-50';
const UPSTOX_ACCENT_PURPLE_BG = 'purple-100';

const Dashboard = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await API.get('/applications'); // candidate route
        setApplications(res.data || []);
      } catch (err) {
        console.error('Failed to load applications', err);
        setApplications([]);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  // Standardized status classes using the Upstox color theme
  const statusClass = (status) => ({
    pending: `bg-gray-100 text-gray-600`, // Subtle gray for pending
    shortlisted: `bg-blue-50 text-blue-600`, // Standard blue for Shortlisted
    interview_scheduled: `bg-${UPSTOX_ACCENT_PURPLE_BG} text-${UPSTOX_TEXT_PURPLE}`, // Branded purple for action/next step
    offer_extended: "bg-yellow-100 text-yellow-800", // Standard yellow for caution/offer
    hired: "bg-green-100 text-green-700", // Standard green for success
    rejected: "bg-red-100 text-red-700", // Standard red for rejection
  }[status] || `bg-gray-100 text-gray-600`);

  const readableStatus = (status) => ({
    pending: "Pending Review",
    shortlisted: "Shortlisted",
    interview_scheduled: "Interview Scheduled",
    offer_extended: "Offer Extended",
    hired: "Hired",
    rejected: "Rejected"
  }[status] || status);

  if (loading) {
    return (
      <div className="text-center py-20">
        <Loader2 className={`animate-spin h-8 w-8 mx-auto text-${UPSTOX_TEXT_PURPLE}`} />
        <p className="mt-3 text-gray-600 font-medium">Loading your applications...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-6">
      {/* Dashboard Header */}
      <div className="flex items-center space-x-3 mb-6">
          <Briefcase className={`h-8 w-8 text-${UPSTOX_TEXT_PURPLE}`} />
          <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">
            My Applications
          </h1>
      </div>

      {applications.length === 0 ? (
        <div className="rounded-xl bg-white shadow-lg border border-gray-100 p-8 text-center mt-8">
          <p className="text-lg text-gray-600 font-medium">
            You haven't applied to any jobs or internships yet.
          </p>
          <p className={`mt-2 text-sm text-${UPSTOX_TEXT_PURPLE} font-medium`}>
             Start exploring opportunities!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {applications.map((a) => (
            // Card Style: Sleek rounded-xl, subtle shadow, light purple hover for interaction cue
            <div
              key={a._id}
              className={`bg-white rounded-xl shadow-md border border-gray-100 p-5 flex justify-between items-center hover:shadow-lg hover:bg-${UPSTOX_LIGHT_PURPLE_BG}/30 transition duration-200`}
            >
              {/* Job Details */}
              <div className="flex flex-col text-left truncate pr-4">
                <div className="text-xl font-semibold text-gray-900 truncate">
                  {a.job?.title ?? "Unknown Role"}
                </div>
                <div className="text-base text-gray-600 mt-0.5 truncate">
                  {a.job?.companyName ?? "Unknown Company"}{" "}
                  {a.job?.location ? `• ${a.job.location}` : ""}
                </div>
                <div className="text-xs text-gray-400 mt-2">
                  Applied: {new Date(a.createdAt).toLocaleDateString()}
                </div>
              </div>

              {/* Status & Actions */}
              <div className="flex flex-col items-end space-y-2 flex-shrink-0 pl-4">
                {/* Status Badge: Using dynamic, themed colors */}
                <div className={`px-4 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap ${statusClass(a.status)}`}>
                  {readableStatus(a.status)}
                </div>

                {/* Status Messages (Conditional) */}
                {a.status === "interview_scheduled" && (
                  <div className="text-xs text-purple-600 font-medium whitespace-nowrap">
                     Interview scheduled — check email!
                  </div>
                )}
                {a.status === "offer_extended" && (
                  <div className="text-xs text-yellow-700 font-medium whitespace-nowrap">
                     Offer received — review now!
                  </div>
                )}
                {a.status === "hired" && (
                  <div className="text-xs text-green-700 font-medium whitespace-nowrap">
                     You have been hired!
                  </div>
                )}
                {a.status === "rejected" && (
                  <div className="text-xs text-red-700 font-medium whitespace-nowrap">
                     Application closed.
                  </div>
                )}

                
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;