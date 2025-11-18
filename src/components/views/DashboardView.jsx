import React, { useState, useEffect } from "react";
import MetricCard from "../ui/MetricCard";
import { Loader2, Briefcase, Users, ArrowRight } from "lucide-react"; 

import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import { auth, db } from "../../firebase";


// ----------------------------
// Small Job Card (Refined UI, PURPLE Theme)
// ----------------------------
const JobPostingItem = ({ job, setCurrentView }) => (
  <div
    className="job-card-item p-4 border-b border-gray-100 transition duration-150 ease-in-out cursor-pointer hover:bg-purple-50"
    onClick={() => setCurrentView({ view: "editjob", id: job.id })}
  >
    <div className="flex justify-between items-start">
      <div>
        <h4 className="text-base font-semibold text-gray-800 truncate max-w-xs sm:max-w-md">
          {job.title}
        </h4>
        <p className="text-sm text-purple-700 mt-0.5 font-medium">
          {job.companyName}
        </p>
        <p className="text-xs text-gray-500 mt-1 flex items-center">
          <svg
            className="w-3 h-3 mr-1 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          {job.location}
        </p>
      </div>
      
      <button
        onClick={(e) => {
          e.stopPropagation();
          setCurrentView({ view: "editjob", id: job.id });
        }}
        className="text-sm text-purple-600 font-medium hover:text-purple-800 p-2 rounded-lg transition duration-150 hover:bg-purple-50"
        title="View Details"
      >
        Details <ArrowRight className="w-4 h-4 inline ml-1" />
      </button>
    </div>

    <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
      <p className="text-sm text-gray-500">
        Salary:
        <span className="font-semibold text-gray-900 ml-1">
          ₹{job.minSalary} – ₹{job.maxSalary}
        </span>
      </p>
    </div>
  </div>
);

// ----------------------------
// Applicant Item (Refined UI, PURPLE Theme)
// ----------------------------
const ApplicantItem = ({ applicant }) => (
  <div className="applicant-card-item p-4 border-b border-gray-100 transition duration-150 ease-in-out cursor-pointer hover:bg-purple-50">
    <div className="flex justify-between items-start">
      <div className="flex items-center">
        <div className="w-9 h-9 bg-purple-50 rounded-full flex items-center justify-center text-purple-600 font-semibold text-sm mr-3 flex-shrink-0">
          {applicant.candidateName ? applicant.candidateName[0] : "C"}
        </div>
        <div>
          <p className="font-medium text-gray-900 leading-tight">
            {applicant.candidateName}
          </p>
          <p className="text-xs text-gray-500 mt-0.5 leading-tight">
            {applicant.jobTitle}
          </p>
        </div>
      </div>
    </div>
  </div>
);

// ----------------------------
// MAIN DASHBOARD VIEW (PURPLE Theme)
// ----------------------------
const DashboardView = ({ setCurrentView }) => {
  const [loading, setLoading] = useState(true);

  const [metrics, setMetrics] = useState({
    totalJobs: 0,
    totalApplicants: 0,
  });

  const [recentJobs, setRecentJobs] = useState([]);
  const [recentApplicants, setRecentApplicants] = useState([]);

  // Retain all existing JS logic and Firebase variables
  const uid = auth.currentUser?.uid;

  // helper: chunk array into arrays of size n - NO CHANGES TO LOGIC
  const chunkArray = (arr, size) => {
    const chunks = [];
    for (let i = 0; i < arr.length; i += size) chunks.push(arr.slice(i, i + size));
    return chunks;
  };

  // useEffect - NO CHANGES TO FIREBASE OR DATA LOGIC
  useEffect(() => {
    if (!uid) return;

    const loadDashboard = async () => {
      try {
        // ... (data loading logic remains unchanged)
        const jobsQuery = query(
          collection(db, "jobs"),
          where("recruiterId", "==", uid)
        );
        const jobsSnap = await getDocs(jobsQuery);
        const jobsList = jobsSnap.docs.map((d) => ({ id: d.id, ...d.data() }));

        const jobMap = {};
        const jobIds = [];
        jobsList.forEach((j) => {
          jobMap[j.id] = { title: j.title || "Job", companyName: j.companyName || "" };
          jobIds.push(j.id);
        });

        let appsList = [];
        if (jobIds.length > 0) {
          const chunks = chunkArray(jobIds, 10);
          for (const c of chunks) {
            const appsQuery = query(
              collection(db, "applications"),
              where("jobId", "in", c)
            );
            const appsSnap = await getDocs(appsQuery);
            appsSnap.docs.forEach((d) => appsList.push({ id: d.id, ...d.data() }));
          }
        }

        setMetrics({
          totalJobs: jobsList.length,
          totalApplicants: appsList.length,
        });

        setRecentJobs(jobsList.slice(0, 3));

        const enrichedApps = appsList
          .sort((a, b) => {
            const ta = a.appliedAt?.toMillis?.() || 0;
            const tb = b.appliedAt?.toMillis?.() || 0;
            return tb - ta;
          })
          .slice(0, 3)
          .map((a) => {
            const jId = a.jobId;
            const jobInfo = jobMap[jId] || {};
            return {
              id: a.id,
              candidateName: a.name || a.candidateName || a.candidate || a.studentName || "Candidate",
              jobTitle: (a.jobTitle || jobInfo.title || "Job") + (jobInfo.companyName ? ` • ${jobInfo.companyName}` : ""),
              appliedAt: a.appliedAt,
              raw: a,
            };
          });

        setRecentApplicants(enrichedApps);
      } catch (err) {
        console.error("Dashboard load error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, [uid]);

  // Loading State - UI updated to PURPLE theme
  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <Loader2 className="animate-spin h-8 w-8 text-purple-600 mx-auto" />
          <p className="mt-4 text-gray-600 font-medium">
            Fetching your hiring data...
          </p>
        </div>
      </div>
    );
  }

  // Main Dashboard Render - Refined UI, PURPLE Theme
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          Welcome back! Recruiter...
        </h1>
        <p className="mt-1 text-base text-gray-600">
          Review your hiring key performance indicators and recent activity.
        </p>
      </header>
      
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Hiring Overview
      </h2>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Total Job Posts"
          value={metrics.totalJobs}
          icon={Briefcase} 
        />
        <MetricCard
          label="Total Applicants"
          value={metrics.totalApplicants}
          icon={Users} 
        />
        
      </div>

      {/* Main Content */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Job Posts Card */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden">
          <div className="flex justify-between items-center p-4 border-b border-gray-100 bg-gray-50">
            <h2 className="text-lg font-bold text-gray-800 flex items-center">
              <Briefcase className="w-5 h-5 mr-2 text-purple-600" />
              Recent Job Posts
            </h2>
            <button
              onClick={() => setCurrentView("myjobs")}
              className="text-sm text-purple-600 font-medium hover:text-purple-800 transition duration-150 py-1 px-3 rounded-md hover:bg-purple-50"
            >
              View All
            </button>
          </div>

          {recentJobs.length ? (
            <div>
              {recentJobs.map((job) => (
                <JobPostingItem
                  key={job.id}
                  job={job}
                  setCurrentView={setCurrentView}
                />
              ))}
            </div>
          ) : (
            <div className="p-6 text-center bg-gray-50/50">
              <p className="text-gray-500 text-sm">
                You haven't posted any jobs yet.
              </p>
              <button
                onClick={() => setCurrentView("postjob")}
                className="mt-3 text-sm text-white bg-purple-600 font-medium hover:bg-purple-700 transition duration-150 py-2 px-4 rounded-md shadow-md"
              >
                Post Your First Job
              </button>
            </div>
          )}
        </div>

        {/* Applicants Card */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden">
          <div className="flex justify-between items-center p-4 border-b border-gray-100 bg-gray-50">
            <h2 className="text-lg font-bold text-gray-800 flex items-center">
              <Users className="w-5 h-5 mr-2 text-purple-600" />
              Recent Applicants
            </h2>
            <button
              onClick={() => setCurrentView("applicants")}
              className="text-sm text-purple-600 font-medium hover:text-purple-800 transition duration-150 py-1 px-3 rounded-md hover:bg-purple-50"
            >
              View All
            </button>
          </div>

          {recentApplicants.length ? (
            <div>
              {recentApplicants.map((a) => (
                <ApplicantItem key={a.id} applicant={a} />
              ))}
            </div>
          ) : (
            <div className="p-6 text-center">
              <p className="text-gray-500 text-sm">No recent applications to review.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardView;