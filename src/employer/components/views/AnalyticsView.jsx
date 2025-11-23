import React, { useEffect, useState } from "react";
import {
  BarChart2,
  TrendingUp,
  Users,
  Briefcase,
  Clock,
  CheckCircle,
} from "lucide-react";

import {
  getMyJobs,
  getApplicants,
  getHiringPipeline,
  getApplicationsPerMonth,
} from "../../helpers/employerService";

// ==============================
// Small UI Components
// ==============================
const MetricCard = ({ title, value, icon: Icon, color, bg }) => (
  <div className="bg-white p-5 rounded-xl shadow-lg border border-gray-100 transition hover:shadow-xl">
    <div className="flex items-center space-x-4">
      <div className={`h-10 w-10 ${bg} rounded-full flex items-center justify-center`}>
        <Icon className={`h-5 w-5 ${color}`} />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-gray-900 mt-0.5">{value}</p>
      </div>
    </div>
  </div>
);

const PipelineBlock = ({ label, count, color }) => (
  <div className="w-1/2 md:w-1/5 mb-4 md:mb-0">
    <p className={`text-4xl font-extrabold ${color}`}>{count}</p>
    <p className="text-sm text-gray-600 mt-1">{label}</p>
  </div>
);

// ==============================
// Real Chart Component
// ==============================
const RealChart = ({ data }) => {
  const months = Object.keys(data);
  const values = Object.values(data);
  const max = Math.max(...values, 1);

  return (
    <div className="bg-white p-6 rounded-xl shadow-xl border border-gray-100 col-span-1 lg:col-span-2">
      <h3 className="text-xl font-bold text-gray-900 mb-4">
        Applications Over Time (Real Data)
      </h3>
      <p className="text-sm text-gray-500 mb-6">
        Monthly applicant activity for your job postings.
      </p>

      <div className="h-64 flex items-end justify-between space-x-2 p-2">
        {values.map((value, index) => (
          <div key={index} className="flex flex-col items-center h-full w-full">
            <div
              className="w-10 rounded-t-lg bg-indigo-500/80"
              style={{ height: `${(value / max) * 90}%` }}
            />
            <span className="text-xs text-gray-700 mt-1">{value}</span>
            <span className="text-xs text-gray-400 mt-1">
              {months[index]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ==============================
// MAIN COMPONENT
// ==============================
const AnalyticsView = () => {
  const [loading, setLoading] = useState(true);

  const [totalJobs, setTotalJobs] = useState(0);
  const [totalApplicants, setTotalApplicants] = useState(0);
  const [shortlistRate, setShortlistRate] = useState("0%");
  const [avgHireTime, setAvgHireTime] = useState("—");
  const [jobStats, setJobStats] = useState([]);
  const [applicationsPerMonth, setApplicationsPerMonth] = useState({});

  const [pipelineStats, setPipelineStats] = useState({
    applied: 0,
    shortlisted: 0,
    interviewing: 0,
    offered: 0,
    hired: 0,
  });

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        const [jobsRes, applicantsRes, pipelineRes, monthlyRes] = await Promise.all([
          getMyJobs(),
          getApplicants(),
          getHiringPipeline(),
          getApplicationsPerMonth(),
        ]);

        const jobs = Array.isArray(jobsRes) ? jobsRes : [];
        const applicants = Array.isArray(applicantsRes) ? applicantsRes : [];
        const pipeline = Array.isArray(pipelineRes) ? pipelineRes : [];
        const monthly = monthlyRes || {};

        setApplicationsPerMonth(monthly);

        // ---- Metrics ----
        setTotalJobs(jobs.length);
        setTotalApplicants(applicants.length);

        const shortlistedCount = applicants.filter(a => a.status === "shortlisted").length;
        setShortlistRate(
          ((shortlistedCount / (applicants.length || 1)) * 100).toFixed(1) + "%"
        );

        setAvgHireTime("—");

        // ---- Job stats ----
        const formattedStats = jobs.map(job => ({
          id: job._id,
          title: job.title,
          applications: applicants.filter(a => a.jobId?._id === job._id).length,
          status: job.status || "Active",
        }));
        setJobStats(formattedStats);

        // Pipeline stage stats
        setPipelineStats({
          applied: applicants.length,
          shortlisted: applicants.filter(a => a.status === "shortlisted").length,
          interviewing: pipeline.filter(a => a.status === "interview_scheduled").length,
          offered: pipeline.filter(a => a.status === "offer_extended").length,
          hired: pipeline.filter(a => a.status === "hired").length,
        });
      } catch (err) {
        console.error("Analytics load error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="py-6 min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-600">Loading analytics...</p>
      </div>
    );
  }

  return (
    <div className="py-6 min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Talent Analytics</h1>
        <p className="text-lg text-gray-600 mt-1">
          Get insights into your job postings & candidate flow.
        </p>
      </div>

      {/* ==================
          Top Metric Cards
          ================== */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <MetricCard title="Total Active Jobs" value={totalJobs} icon={Briefcase} color="text-indigo-600" bg="bg-indigo-50" />
        <MetricCard title="Total Applicants" value={totalApplicants} icon={Users} color="text-green-600" bg="bg-green-50" />
        <MetricCard title="Avg. Shortlist Rate" value={shortlistRate} icon={TrendingUp} color="text-purple-600" bg="bg-purple-50" />
        <MetricCard title="Avg. Time to Hire" value={avgHireTime} icon={Clock} color="text-yellow-600" bg="bg-yellow-50" />
      </div>

      {/* ==================
          Chart & Job Performance
          ================== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <RealChart data={applicationsPerMonth} />

        <div className="bg-white p-6 rounded-xl shadow-2xl border border-gray-100 col-span-1">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <BarChart2 className="w-5 h-5 mr-2 text-indigo-500" />
            Job Performance
          </h3>
          <p className="text-sm text-gray-500 mb-4">
            Applicants per job posting.
          </p>

          <div className="space-y-4">
            {jobStats.map(job => (
              <div key={job.id} className="p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition">
                <h4 className="font-semibold text-gray-800">{job.title}</h4>
                <div className="flex justify-between items-center text-xs mt-1">
                  <span className="text-gray-500">
                    Apps:{" "}
                    <span className="font-bold text-green-600">
                      {job.applications}
                    </span>
                  </span>
                  <span className={`px-2 py-0.5 rounded-full font-medium ${
                    job.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}>
                    {job.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ==================
          Pipeline Summary
          ================== */}
      <div className="mt-10 bg-white p-6 rounded-xl shadow-lg border border-gray-100">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <CheckCircle className="w-5 h-5 mr-2 text-purple-500" />
          Global Pipeline Summary
        </h3>

        <div className="flex justify-between flex-wrap gap-4 text-center mt-6">
          <PipelineBlock label="Applied" count={pipelineStats.applied} color="text-blue-500" />
          <PipelineBlock label="Shortlisted" count={pipelineStats.shortlisted} color="text-purple-500" />
          <PipelineBlock label="Interviewing" count={pipelineStats.interviewing} color="text-orange-500" />
          <PipelineBlock label="Offer Extended" count={pipelineStats.offered} color="text-yellow-500" />
          <PipelineBlock label="Hired" count={pipelineStats.hired} color="text-green-600" />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsView;
