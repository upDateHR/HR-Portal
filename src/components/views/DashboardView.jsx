import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MetricCard from '../ui/MetricCard';
import { Star, Loader2, Clock } from 'lucide-react';
// NOTE: Mock data is no longer imported here

// --- Sub-Components (Helper rendering logic) ---

const JobPostingItem = ({ title, company, info, applicants, newCount }) => (
    <div className="p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="text-base font-semibold text-gray-800">{title}</h4>
          <p className="text-sm text-gray-600 font-medium mt-0.5">{company}</p>
          <p className="text-xs text-gray-500 mt-1">{info}</p>
        </div>
        {newCount > 0 && (
          <span className="inline-flex items-center px-3 py-1 text-xs font-bold rounded-full text-red-700 bg-red-100/70">
            {newCount} New
          </span>
        )}
      </div>
      <div className="flex justify-between items-center mt-3">
        <p className="text-sm font-medium text-gray-600">
          <span className="font-bold text-gray-900">{applicants}</span> Applicants
        </p>
        <button className="text-sm text-purple-600 font-semibold hover:text-purple-800 transition-colors">
          View Applicants
        </button>
      </div>
    </div>
);

const ApplicantItem = ({ name, match, role, exp, skills, time, initials }) => (
    <div className="p-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors">
      <div className="flex items-start space-x-3">
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-purple-100 text-purple-600 font-bold text-sm flex-shrink-0">
          {initials}
        </div>
        <div className="flex-grow">
          <div className="flex justify-between items-center">
            <h4 className="text-base font-semibold text-gray-800">{name}</h4>
            <span className="text-sm font-bold text-green-700 bg-green-100/70 px-3 py-1 rounded-full">{match} Match</span>
          </div>
          <p className="text-sm text-gray-600 mt-1">{role}</p>
          <p className="text-xs text-gray-500">{exp}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {skills.map(skill => (
              <span key={skill} className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full font-medium">
                {skill}
              </span>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-2">Applied {time}</p>
        </div>
      </div>
      <div className="flex justify-end space-x-2 mt-3 pt-3 border-t border-dashed border-gray-200">
          <button className="text-sm text-red-500 hover:text-red-700">
              <span className="flex items-center space-x-1"><Star className="h-4 w-4" /> Shortlist</span>
          </button>
          <button className="text-sm text-gray-500 hover:text-gray-700">
              Reject
          </button>
      </div>
    </div>
);
// --- End Sub-Components ---


const DashboardView = ({ setCurrentView }) => {
    // CRITICAL FIX: Ensure state starts with defined arrays
    const [dashboardData, setDashboardData] = useState({ metrics: [], postings: [], applicants: [] });
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                // NOTE: Replace this with the actual backend endpoint
                const response = await axios.get('/api/dashboard/summary'); 
                // CRITICAL: Ensure the response data keys match your state keys (metrics, postings, applicants)
                setDashboardData(response.data);
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
                // Fallback: Keep state as empty array if API fails, allowing the UI to render safely
            } finally {
                setLoading(false);
            }
        };
        fetchDashboardData();
    }, []);

    if (loading) {
        return <div className="text-center py-20"><Loader2 className="animate-spin h-8 w-8 mx-auto text-purple-600" /> <p className="mt-2 text-gray-500">Loading Dashboard...</p></div>
    }

    return (
        <>
            <h1 className="text-3xl font-bold text-gray-900">Welcome back, Acme Corp!</h1>
            <p className="mt-1 text-lg text-gray-600">Here's what's happening with your recruitment today.</p>

            {/* Metrics Mapping (CRASH FIX APPLIED) */}
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {dashboardData.metrics && dashboardData.metrics.map((metric, index) => (
                <MetricCard key={index} {...metric} />
              ))}
            </div>

            <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              <div className="lg:col-span-2 bg-white rounded-xl shadow-lg border border-gray-100">
                <div className="flex justify-between items-center p-5 border-b border-gray-100">
                  <h2 className="text-xl font-semibold text-gray-900">Active Job Postings</h2>
                  <button 
                    onClick={() => setCurrentView('myjobs')}
                    className="text-sm text-purple-600 font-medium hover:text-purple-800"
                  >
                    View All
                  </button>
                </div>
                
                {/* Postings Mapping (CRASH FIX APPLIED) */}
                <div className="divide-y divide-gray-100">
                  {dashboardData.postings && dashboardData.postings.map((job, index) => (
                    <JobPostingItem key={index} {...job} info={`Recruitment • ${job.response} response time`} /> 
                  ))}
                </div>
                
                <div className="p-4 text-center">
                    <button className="text-sm text-gray-500 hover:text-gray-700 font-medium">Load More Postings</button>
                </div>

              </div>

              <div className="lg:col-span-1 bg-white rounded-xl shadow-lg border border-gray-100">
                <div className="flex justify-between items-center p-5 border-b border-gray-100">
                  <h2 className="text-xl font-semibold text-gray-900">Recent Applicants</h2>
                  <button 
                    onClick={() => setCurrentView('applicants')}
                    className="text-sm text-purple-600 font-medium hover:text-purple-800"
                  >
                    View All
                  </button>
                </div>
                
                {/* Applicants Mapping (CRASH FIX APPLIED) */}
                <div className="divide-y divide-gray-100">
                  {dashboardData.applicants && dashboardData.applicants.map((applicant, index) => (
                    <ApplicantItem key={index} {...applicant} />
                  ))}
                </div>

              </div>
            </div>
        </>
    );
};

export default DashboardView;