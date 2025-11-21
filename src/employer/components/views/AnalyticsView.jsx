import React from "react";
import { BarChart2, TrendingUp, Users, Briefcase, Clock, CheckCircle } from "lucide-react";

// --- MOCK DATA ---
const MOCK_METRICS = [
  { title: "Total Active Jobs", value: 15, icon: Briefcase, color: "text-indigo-600", bg: "bg-indigo-50" },
  { title: "Total Applicants", value: 452, icon: Users, color: "text-green-600", bg: "bg-green-50" },
  { title: "Avg. Shortlist Rate", value: "18%", icon: TrendingUp, color: "text-purple-600", bg: "bg-purple-50" },
  { title: "Avg. Time to Hire", value: "28 Days", icon: Clock, color: "text-yellow-600", bg: "bg-yellow-50" },
];

const MOCK_JOB_PERFORMANCE = [
  { id: 1, title: "Senior React Developer", views: 2500, applications: 120, status: "Active" },
  { id: 2, title: "Junior Data Analyst", views: 1800, applications: 80, status: "Active" },
  { id: 3, title: "UX Designer Intern", views: 950, applications: 35, status: "Closed" },
  { id: 4, title: "Cloud Engineer (AWS)", views: 3200, applications: 155, status: "Active" },
];

// --- Sub-Component: Metric Card ---
const MetricCard = ({ metric }) => {
  const Icon = metric.icon;
  return (
    <div className="bg-white p-5 rounded-xl shadow-lg border border-gray-100 transition hover:shadow-xl">
      <div className="flex items-center space-x-4">
        <div className={`h-10 w-10 ${metric.bg} rounded-full flex items-center justify-center`}>
          <Icon className={`h-5 w-5 ${metric.color}`} />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">{metric.title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-0.5">{metric.value}</p>
        </div>
      </div>
    </div>
  );
};

// --- Sub-Component: Mock Chart Area ---
const MockChart = () => (
  <div className="bg-white p-6 rounded-xl shadow-2xl border border-gray-100 col-span-1 lg:col-span-2">
    <h3 className="text-xl font-bold text-gray-900 mb-4">Application Trends (Last 6 Months)</h3>
    <p className="text-sm text-gray-500 mb-6">Total applications received per month.</p>
    
    {/* Simple Mock Bar Chart Representation */}
    <div className="h-64 flex items-end justify-between space-x-2 p-2">
      {[120, 150, 200, 180, 250, 220].map((value, index) => (
        <div key={index} className="flex flex-col items-center justify-end h-full w-full">
          {/* Bar */}
          <div 
            className="w-10 rounded-t-lg bg-indigo-500/80 transition-all duration-700 hover:bg-indigo-600"
            style={{ height: `${(value / 250) * 90}%` }}
          ></div>
          {/* Value Label */}
          <span className="text-xs text-gray-700 mt-1">{value}</span>
          {/* Month Label */}
          <span className="text-xs text-gray-400 mt-1">{["Jun", "Jul", "Aug", "Sep", "Oct", "Nov"][index]}</span>
        </div>
      ))}
    </div>
  </div>
);


const AnalyticsView = () => {
  return (
    <div className="py-6 min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Talent Analytics</h1>
        <p className="text-lg text-gray-600 mt-1">Key performance indicators for your recruitment efforts.</p>
      </div>

      {/* 1. Metric Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {MOCK_METRICS.map((metric, index) => (
          <MetricCard key={index} metric={metric} />
        ))}
      </div>

      {/* 2. Chart and Performance List Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Mock Chart Area */}
        <MockChart />

        {/* Job Performance List */}
        <div className="bg-white p-6 rounded-xl shadow-2xl border border-gray-100 col-span-1">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <BarChart2 className="w-5 h-5 mr-2 text-indigo-500" />
            Job Performance
          </h3>
          <p className="text-sm text-gray-500 mb-4">Views and applications per job posting.</p>

          <div className="space-y-4">
            {MOCK_JOB_PERFORMANCE.map(job => (
              <div key={job.id} className="p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition">
                <h4 className="font-semibold text-gray-800">{job.title}</h4>
                <div className="flex justify-between items-center text-xs mt-1">
                  <span className="text-gray-500">Views: <span className="font-bold text-indigo-600">{job.views}</span></span>
                  <span className="text-gray-500">Apps: <span className="font-bold text-green-600">{job.applications}</span></span>
                  <span className={`px-2 py-0.5 rounded-full font-medium ${job.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {job.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          <button className="w-full mt-6 py-2 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-medium hover:bg-indigo-100 transition">
            View All Job Metrics
          </button>
        </div>
      </div>
      
      {/* 3. Placeholder for Global Application Pipeline (Hiring Stages) */}
      <div className="mt-10 bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
             <CheckCircle className="w-5 h-5 mr-2 text-purple-500"/>
             Global Pipeline Summary
          </h3>
          <div className="flex justify-between flex-wrap gap-4 text-center mt-6">
              {[
                  { label: "Applied", count: 452, color: "text-blue-500" },
                  { label: "Shortlisted", count: 81, color: "text-purple-500" },
                  { label: "Interviewing", count: 25, color: "text-orange-500" },
                  { label: "Offer Extended", count: 8, color: "text-yellow-500" },
                  { label: "Hired", count: 4, color: "text-green-600" },
              ].map(stage => (
                  <div key={stage.label} className="w-1/2 md:w-1/5">
                      <p className={`text-4xl font-extrabold ${stage.color}`}>{stage.count}</p>
                      <p className="text-sm text-gray-600 mt-1">{stage.label}</p>
                  </div>
              ))}
          </div>
      </div>

    </div>
  );
};

export default AnalyticsView;