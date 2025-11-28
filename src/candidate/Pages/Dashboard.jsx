import React, { useEffect, useState } from "react";
import { Loader2, Briefcase } from "lucide-react";
import API from "../../api";

// Consistent color definitions based on Upstox theme
const UPSTOX_TEXT_PURPLE = "purple-600";
const UPSTOX_LIGHT_PURPLE_BG = "purple-50";
const UPSTOX_ACCENT_PURPLE_BG = "purple-100";

const Dashboard = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await API.get("/applications"); // candidate route
        setApplications(res.data || []);
      } catch (err) {
        console.error("Failed to load applications", err);
        setApplications([]);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const statusClass = (status) =>
    ({
      pending: `bg-gray-100 text-gray-600`,
      shortlisted: `bg-blue-50 text-blue-600`,
      interview_scheduled: `bg-${UPSTOX_ACCENT_PURPLE_BG} text-${UPSTOX_TEXT_PURPLE}`,
      offer_extended: "bg-yellow-100 text-yellow-800",
      hired: "bg-green-100 text-green-700",
      rejected: "bg-red-100 text-red-700",
    }[status] || `bg-gray-100 text-gray-600`);

  const readableStatus = (status) =>
    ({
      pending: "Pending Review",
      shortlisted: "Shortlisted",
      interview_scheduled: "Interview Scheduled",
      offer_extended: "Offer Extended",
      hired: "Hired",
      rejected: "Rejected",
    }[status] || status);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4">
        <Loader2
          className={`animate-spin h-8 w-8 text-${UPSTOX_TEXT_PURPLE}`}
        />
        <p className="mt-3 text-gray-600 font-medium text-center">
          Loading your applications...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-6 px-6 sm:px-6">
      {/* Dashboard Header */}
      <div className="flex items-center space-x-3 mb-6">
        <Briefcase className={`h-8 w-8 text-${UPSTOX_TEXT_PURPLE}`} />
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 tracking-tight">
          My Applications
        </h1>
      </div>

      {applications.length === 0 ? (
        <div className="rounded-xl bg-white shadow-lg border border-gray-100 p-6 sm:p-8 text-center mt-8">
          <p className="text-base sm:text-lg text-gray-600 font-medium">
            You haven't applied to any jobs or internships yet.
          </p>
          <p
            className={`mt-2 text-sm sm:text-base text-${UPSTOX_TEXT_PURPLE} font-medium`}
          >
            Start exploring opportunities!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {applications.map((a) => (
            <div
              key={a._id}
              className={`bg-white rounded-xl shadow-md border border-gray-100 
                p-4 sm:p-5 flex flex-col sm:flex-row justify-between 
                sm:items-center gap-3 sm:gap-4 
                hover:shadow-lg hover:bg-${UPSTOX_LIGHT_PURPLE_BG}/30 
                transition duration-200`}
            >
              {/* Job Details */}
              <div className="flex flex-col text-left flex-1 min-w-0">
                <div className="text-lg sm:text-xl font-semibold text-gray-900 truncate">
                  {a.job?.title ?? "Unknown Role"}
                </div>
                <div className="text-sm sm:text-base text-gray-600 mt-0.5 truncate">
                  {a.job?.companyName ?? "Unknown Company"}{" "}
                  {a.job?.location ? `• ${a.job.location}` : ""}
                </div>
                <div className="text-xs text-gray-400 mt-2">
                  Applied: {new Date(a.createdAt).toLocaleDateString()}
                </div>
              </div>

              {/* Status & Actions */}
              <div className="flex flex-col items-start sm:items-end space-y-1.5 sm:space-y-2 flex-shrink-0">
                <div
                  className={`px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap ${statusClass(
                    a.status
                  )}`}
                >
                  {readableStatus(a.status)}
                </div>

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
