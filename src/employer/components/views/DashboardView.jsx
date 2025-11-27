import React, { useState, useEffect } from "react";
import MetricCard from "../ui/MetricCard";
import { Loader2 } from "lucide-react";
import { getDashboardSummary } from "../../helpers/employerService";

// Consistent color definitions based on Upstox theme
const UPSTOX_TEXT_PURPLE = 'purple-600';
const UPSTOX_HOVER_PURPLE = 'purple-700';
const UPSTOX_LIGHT_PURPLE_BG = 'purple-50';

// ----------------------------
// Sleek Job Card (JobPostingItem)
// ----------------------------
const JobPostingItem = ({ job, setCurrentView }) => (
  // UI REFINEMENT: Very subtle hover background, soft border, rounded-lg container
  <div 
    className={`p-4 border-b border-gray-100 hover:bg-${UPSTOX_LIGHT_PURPLE_BG} transition duration-150 cursor-pointer`}
    onClick={() => setCurrentView({ view: "editjob", id: job._id })}
  >
    <div className="flex justify-between items-start">
      <div className="flex-grow">
        <h4 className="text-base font-semibold text-gray-800 truncate">{job.title}</h4>
        <p className="text-sm text-gray-500 mt-0.5">{job.companyName}</p>
        <p className="text-xs text-gray-400 mt-1">{job.location}</p>
      </div>
      
      {/* Salary & Details Container */}
      <div className="flex flex-col items-end pl-4">
        <p className="text-sm text-gray-600 whitespace-nowrap">
          <span className="font-semibold text-gray-900">
            ₹{job.minSalary} – ₹{job.maxSalary}
          </span>
        </p>
        
        {/* BUTTON: Sleek, text-based button. Clickable area is the entire row, so this is just visual */}
        <span
          className={`text-xs font-medium text-${UPSTOX_TEXT_PURPLE} hover:text-${UPSTOX_HOVER_PURPLE} transition duration-150 mt-1`}
        >
          View Details &rarr;
        </span>
      </div>
    </div>
  </div>
);

// ----------------------------
// Sleek Applicant Item (ApplicantItem)
// ----------------------------
const ApplicantItem = ({ name, role, onClick }) => (
  // UI REFINEMENT: Subtle hover background, soft border
  <div 
    className={`p-4 border-b border-gray-100 hover:bg-${UPSTOX_LIGHT_PURPLE_BG} transition duration-150 cursor-pointer`}
    onClick={onClick}
  >
    <div className="flex justify-between items-center">
      <div>
        <p className="font-medium text-gray-800">{name}</p>
        <p className="text-sm text-gray-500">{role}</p>
      </div>
      {/* Badge: Use a subtle purple indicator for new applicants */}
      <span className={`text-xs text-${UPSTOX_TEXT_PURPLE} px-3 py-1 bg-purple-100 rounded-full font-medium`}>
        New
      </span>
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
        <Loader2 className={`animate-spin h-8 w-8 text-${UPSTOX_TEXT_PURPLE} mx-auto`} />
        <p className="mt-3 text-gray-600 font-medium">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-4">
      {/* HEADER */}
      <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">
        Welcome back, <span className={`text-${UPSTOX_TEXT_PURPLE}`}>{companyTitle}</span>!
      </h1>
      <p className="mt-1 text-base text-gray-500">
        Here's a concise overview of your hiring activity.
      </p>
      
      {/* --- */}

      {/* Metrics */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardData.metrics.map((metric, i) => (
          // NOTE: MetricCard is an external component, assuming it handles the purple theme internally.
          <MetricCard key={i} {...metric} /> 
        ))}
      </div>

      {/* --- */}

      {/* Main Content Blocks */}
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Job Posts Block */}
        {/* UI REFINEMENT: Sleek card design (rounded-xl, subtle shadow) */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="flex justify-between items-center p-5 border-b border-gray-100 bg-gray-50/50">
            <h2 className="text-lg font-semibold text-gray-800">Recent Job Posts</h2>
            {/* BUTTON: Sleek, professional text link */}
            <button
              onClick={() => setCurrentView("myjobs")}
              className={`text-sm font-medium text-${UPSTOX_TEXT_PURPLE} hover:text-${UPSTOX_HOVER_PURPLE} transition duration-150 p-1 rounded-md`}
            >
              View All &rarr;
            </button>
          </div>

          {dashboardData.postings.length > 0 ? (
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
            <p className="p-6 text-gray-500 text-center text-sm font-normal">
              No job postings yet. <span className={`text-${UPSTOX_TEXT_PURPLE} font-medium cursor-pointer`} onClick={() => setCurrentView("postjob")}>Post your first job</span>!
            </p>
          )}
        </div>

        {/* Applicants Block */}
        {/* UI REFINEMENT: Sleek card design (rounded-xl, subtle shadow) */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="flex justify-between items-center p-5 border-b border-gray-100 bg-gray-50/50">
            <h2 className="text-lg font-semibold text-gray-800">Recent Applicants</h2>
            {/* BUTTON: Sleek, professional text link */}
            <button
              onClick={() => setCurrentView("applicants")}
              className={`text-sm font-medium text-${UPSTOX_TEXT_PURPLE} hover:text-${UPSTOX_HOVER_PURPLE} transition duration-150 p-1 rounded-md`}
            >
              View All &rarr;
            </button>
          </div>

          {dashboardData.applicants.length > 0 ? (
            <div> 
              {dashboardData.applicants.map((a, i) => (
                <ApplicantItem 
                    key={i} 
                    {...a} 
                    onClick={() => setCurrentView({ view: "applicant_details", id: a.id })}
                />
              ))}
            </div>
          ) : (
            <p className="p-6 text-gray-500 text-center text-sm font-normal">
              No new applications.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardView;