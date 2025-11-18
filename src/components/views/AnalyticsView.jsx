import React, { useState, useEffect, useMemo } from "react";
import { BarChart2, Loader2, Users, Briefcase, TrendingUp } from "lucide-react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../../firebase";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell,
} from 'recharts';

// Define a professional purple/accent palette for the charts
// COLORS now incorporates shades of purple and standard accents for charts
const CHART_COLORS = ['#8b5cf6', '#a78bfa', '#c4b5fd', '#82ca9d', '#ffc658']; 

// --- Helper Hook to Fetch Data (NO CHANGE TO LOGIC) ---
const useAnalyticsData = (uid) => {
  const [summary, setSummary] = useState({
    totalJobs: 0,
    totalApplicants: 0,
    topJobs: [],
    statusDistribution: [], 
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!uid) {
      setLoading(false);
      return;
    }

    const loadAnalytics = async () => {
      setLoading(true);
      try {
        // Fetch jobs created by recruiter
        const jobsQuery = query(
          collection(db, "jobs"),
          where("recruiterId", "==", uid)
        );
        const jobsSnap = await getDocs(jobsQuery);
        const jobs = jobsSnap.docs.map((d) => ({ id: d.id, ...d.data() }));

        // Fetch applications
        const appsQuery = query(
          collection(db, "applications"),
          where("recruiterId", "==", uid)
        );
        const appsSnap = await getDocs(appsQuery);
        const applications = appsSnap.docs.map((d) => ({ id: d.id, ...d.data() }));

        // Count applicants per job
        const jobCount = {};
        applications.forEach((a) => {
          jobCount[a.jobId] = (jobCount[a.jobId] || 0) + 1;
        });

        // Calculate Application Status Distribution (NO CHANGE TO LOGIC)
        const statusCount = {};
        applications.forEach((a) => {
          const status = a.status || 'Other'; 
          statusCount[status] = (statusCount[status] || 0) + 1;
        });
        const statusDistribution = Object.keys(statusCount).map(status => ({
          name: status,
          value: statusCount[status],
        }));


        // Rank jobs
        const topJobs = jobs
          .map((job) => ({
            title: job.title,
            count: jobCount[job.id] || 0,
          }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 5);

        setSummary({
          totalJobs: jobs.length,
          totalApplicants: applications.length,
          topJobs,
          statusDistribution,
        });
      } catch (err) {
        console.error("Analytics Error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadAnalytics();
  }, [uid]);

  return { summary, loading };
};

// --- Main Component ---
const AnalyticsView = () => {
  const uid = auth.currentUser?.uid;
  const { summary, loading } = useAnalyticsData(uid);

  // Custom function for PieChart labels (NO CHANGE TO LOGIC)
  const renderCustomizedLabel = ({ name, percent }) => {
    if (percent === 0) return null;
    // Shortened label for better fit
    return `${name}: ${(percent * 100).toFixed(0)}%`; 
  };

  if (loading) {
    return (
      <div className="py-24 bg-gray-50 min-h-screen flex justify-center items-center">
        <Loader2 className="h-10 w-10 animate-spin text-purple-600" />
        <p className="mt-4 text-gray-600 font-medium">Loading analytics...</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
      <header className="mb-8 max-w-7xl mx-auto">
        {/* Header - Reduced font size to maintain elegance */}
        <h1 className="text-3xl font-bold text-gray-900 flex items-center tracking-tight">
          <TrendingUp className="h-6 w-6 text-purple-600 mr-2" />
          Recruitment Analytics
        </h1>
        <p className="text-base text-gray-600 mt-1">
          Comprehensive overview of your job portal's performance.
        </p>
      </header>
      
      {/* --- SUMMARY CARDS (Refined UI) --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-7xl mx-auto mb-10">
        
        {/* Total Jobs Card */}
        <div className="bg-white p-5 rounded-lg shadow-md border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Total Jobs Posted</p>
            {/* Value - Reduced font size to avoid "big bold fonts" */}
            <h2 className="text-3xl font-bold text-purple-700 mt-1">{summary.totalJobs}</h2>
          </div>
          <Briefcase className="h-8 w-8 text-purple-400 opacity-70" />
        </div>

        {/* Total Applicants Card */}
        <div className="bg-white p-5 rounded-lg shadow-md border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Total Applications</p>
            {/* Value - Reduced font size to avoid "big bold fonts" */}
            <h2 className="text-3xl font-bold text-green-600 mt-1">{summary.totalApplicants}</h2>
          </div>
          <Users className="h-8 w-8 text-green-400 opacity-70" />
        </div>

        {/* Placeholder/Engagement Card */}
        <div className="bg-white p-5 rounded-lg shadow-md border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Avg. Apps per Job</p>
            {/* Value - Reduced font size to avoid "big bold fonts" */}
            <h2 className="text-3xl font-bold text-blue-600 mt-1">
              {(summary.totalJobs > 0 
                ? (summary.totalApplicants / summary.totalJobs) 
                : 0
              ).toFixed(1)}
            </h2>
          </div>
          <BarChart2 className="h-8 w-8 text-blue-400 opacity-70" />
        </div>
      </div>
      
      {/* --- CHARTS SECTION (Refined UI) --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
        
        {/* Top Performing Jobs Bar Chart */}
        <div className="bg-white p-5 rounded-lg shadow-md border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Top 5 Most Applied Jobs</h3>
          {summary.topJobs.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={summary.topJobs}
                margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
                layout="vertical"
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                {/* Axes styles updated for better elegance */}
                <YAxis dataKey="title" type="category" stroke="#9ca3af" fontSize={12} />
                <XAxis type="number" stroke="#9ca3af" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: '1px solid #ccc', 
                    borderRadius: '4px',
                    fontSize: '13px' 
                  }}
                  formatter={(value) => [`${value} applicants`, 'Count']}
                  labelFormatter={(name) => name}
                />
                {/* Bar Color updated to PURPLE */}
                <Bar dataKey="count" fill="#8b5cf6" name="Applicants" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-500 h-[300px] flex items-center justify-center">No jobs or applications to display.</p>
          )}
        </div>

        {/* Application Status Distribution Pie Chart */}
        <div className="bg-white p-5 rounded-lg shadow-md border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Application Status Distribution</h3>
          {summary.statusDistribution.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={summary.statusDistribution}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8b5cf6"
                  labelLine={false}
                  label={({ name, percent }) => renderCustomizedLabel({ name, percent })}
                >
                  {summary.statusDistribution.map((entry, index) => (
                    // Cell colors updated to use the PURPLE palette
                    <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#fff', 
                      border: '1px solid #ccc', 
                      borderRadius: '4px',
                      fontSize: '13px'
                    }}
                    formatter={(value, name, props) => [`${value} applications`, props.payload.name]}
                  />
                <Legend layout="horizontal" verticalAlign="bottom" align="center" iconType="circle" wrapperStyle={{ fontSize: '13px', paddingTop: '10px' }} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-500 h-[300px] flex items-center justify-center">No applications status data available.</p>
          )}
        </div>

      </div>
      
      {/* --- RAW DATA TABLE (Refined UI) --- */}
      <div className="mt-6 bg-white p-5 rounded-lg shadow-md border border-gray-100 max-w-7xl mx-auto">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Job Application Counts (Raw)</h3>
        {summary.topJobs.length === 0 ? (
          <p className="text-gray-500">No applications yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Job Title</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Applicants</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {summary.topJobs.map((job, i) => (
                  <tr key={i} className="hover:bg-purple-50/30 transition duration-150">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{job.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-base font-semibold text-purple-700">{job.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalyticsView;