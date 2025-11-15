import React, { useState, useEffect } from "react";
import MetricCard from "../ui/MetricCard";
import { Loader2 } from "lucide-react";
import { getDashboardSummary } from "../../helpers/employerService";

// ----------------------------
// Small Job Card (JobPostingItem)
// ----------------------------
const JobPostingItem = ({ job, setCurrentView }) => (
  // UI REFINEMENT: Increased padding, clear border separation, added smooth hover transition
  <div className="p-5 border-b border-gray-100 hover:bg-purple-50 transition duration-150 cursor-pointer">
    <div className="flex justify-between items-start">
      <div>
        {/* FONT REVERT: Original font size/weight maintained */}
        <h4 className="text-base font-semibold text-gray-800">{job.title}</h4>
        <p className="text-sm text-gray-600 mt-0.5">{job.companyName}</p>
        <p className="text-xs text-gray-500 mt-1">{job.location}</p>
      </div>
    </div>

    <div className="flex justify-between items-center mt-3">
      <p className="text-sm text-gray-600">
        Salary:{" "}
        <span className="font-semibold text-gray-900">
          ₹{job.minSalary} – ₹{job.maxSalary}
        </span>
      </p>

      {/* BUTTON: Smoother look with better hover state and rounding */}
      <button
        onClick={() => setCurrentView({ view: "editjob", id: job._id })}
        className="text-sm text-purple-600 font-semibold hover:text-purple-800 p-2 rounded-lg transition duration-150 hover:bg-purple-100/70"
      >
        View Details
      </button>
    </div>
  </div>
);

// ----------------------------
// Simple Applicant Item (ApplicantItem)
// ----------------------------
const ApplicantItem = ({ name, role }) => (
  // UI REFINEMENT: Increased padding, clear border separation, added smooth hover transition
  <div className="p-5 border-b border-gray-100 hover:bg-purple-50 transition duration-150 cursor-pointer">
    <div className="flex justify-between">
      <div>
        {/* FONT REVERT: Original font size/weight maintained */}
        <p className="font-semibold text-gray-900">{name}</p>
        <p className="text-sm text-gray-500">{role}</p>
      </div>
      {/* Small badge for visual interest */}
      <span className="text-xs text-gray-400 px-2 py-0.5 bg-gray-100 rounded-full shadow-inner">Recently Applied</span>
    </div>
  </div>
);

// ----------------------------
// MAIN DASHBOARD VIEW
// ----------------------------
const DashboardView = ({ setCurrentView }) => {
  const [dashboardData, setDashboardData] = useState({
    metrics: [],
    postings: [],
    applicants: [],
  });

  const [loading, setLoading] = useState(true);

  // Correct recruiter company/title name
  const user = JSON.parse(localStorage.getItem("hr_user") || "{}");
  const companyTitle = user.companyName || user.name || "Recruiter";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDashboardSummary();

        setDashboardData({
          metrics: data.metrics || [],
          postings: data.postings || [],
          applicants: data.applicants || [],
        });
      } catch (err) {
        console.error("Error loading dashboard:", err);
        setDashboardData({ metrics: [], postings: [], applicants: [] });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-20">
        {/* UI REFINEMENT: Consistent loading spinner style */}
        <Loader2 className="animate-spin h-8 w-8 text-purple-600 mx-auto" />
        <p className="mt-2 text-gray-600 font-medium">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <>
      {/* FONT REVERT: Original font size/weight maintained */}
      <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
        Welcome back, {companyTitle}!
      </h1>
      <p className="mt-1 text-lg text-gray-600">
        Here's an overview of your hiring activity.
      </p>

      {/* Metrics */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardData.metrics.map((metric, i) => (
          <MetricCard key={i} {...metric} />
        ))}
      </div>

      {/* Main Content Blocks */}
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Job Posts Block */}
        {/* UI REFINEMENT: Consistent card style (rounded-xl, shadow-xl) */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="flex justify-between items-center p-5 border-b border-gray-100">
            {/* FONT REVERT: Original font size/weight maintained */}
            <h2 className="text-xl font-semibold text-gray-900">Recent Job Posts</h2>
            {/* BUTTON: Smoother look with better hover state and rounding */}
            <button
              onClick={() => setCurrentView("myjobs")}
              className="text-sm text-purple-600 font-medium hover:text-purple-800 p-2 rounded-lg transition duration-150 hover:bg-purple-100/70"
            >
              View All
            </button>
          </div>

          {dashboardData.postings.length > 0 ? (
            // Removed unnecessary divide-y class from the list wrapper since items handle the border
            <div> 
              {dashboardData.postings.map((job, i) => (
                <JobPostingItem
                  key={job._id || i}
                  job={job}
                  setCurrentView={setCurrentView}
                />
              ))}
            </div>
          ) : (
            <p className="p-6 text-gray-500 text-center text-base font-medium">
              No job postings yet. Start by posting your first job!
            </p>
          )}
        </div>

        {/* Applicants Block */}
        {/* UI REFINEMENT: Consistent card style (rounded-xl, shadow-xl) */}
        <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="flex justify-between items-center p-5 border-b border-gray-100">
            {/* FONT REVERT: Original font size/weight maintained */}
            <h2 className="text-xl font-semibold text-gray-900">Recent Applicants</h2>
            {/* BUTTON: Smoother look with better hover state and rounding */}
            <button
              onClick={() => setCurrentView("applicants")}
              className="text-sm text-purple-600 font-medium hover:text-purple-800 p-2 rounded-lg transition duration-150 hover:bg-purple-100/70"
            >
              View All
            </button>
          </div>

          {dashboardData.applicants.length > 0 ? (
            // Removed unnecessary divide-y class from the list wrapper
            <div> 
              {dashboardData.applicants.map((a, i) => (
                <ApplicantItem key={i} {...a} />
              ))}
            </div>
          ) : (
            <p className="p-6 text-gray-500 text-center text-base font-medium">No applicants yet.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default DashboardView;