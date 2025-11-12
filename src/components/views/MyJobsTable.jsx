import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Filter, Plus, ChevronDown, Edit, Trash2, Loader2 } from 'lucide-react';

const getStatusClasses = (status) => {
  switch (status) {
    case 'Active': return 'bg-green-100 text-green-700';
    case 'Paused': return 'bg-yellow-100 text-yellow-700';
    case 'Expired': return 'bg-red-100 text-red-700';
    default: return 'bg-gray-100 text-gray-700';
  }
};

const MobileJobCard = ({ job, setCurrentView }) => (
    <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100 mb-3">
        <div className="flex justify-between items-start border-b pb-2 mb-2">
            <div>
                <h4 className="text-lg font-bold text-gray-900">{job.title}</h4>
                <p className="text-sm text-gray-500">{job.company} • Posted {job.posted}</p>
            </div>
            <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClasses(job.status)}`}>
                {job.status}
            </span>
        </div>
        
        <div className="grid grid-cols-2 gap-y-1 text-sm">
            <p className="text-gray-700 font-medium">Applicants: <span className="font-bold">{job.applicants}</span> ({job.newCount} New)</p>
            <p className="text-gray-700">Views: {job.views}</p>
            <p className="text-gray-700">Match Avg: {job.matches}</p>
            <p className="text-gray-700">Response: {job.response}</p>
        </div>

        <div className="flex justify-end space-x-3 pt-3 border-t mt-3">
            <button className="text-sm text-purple-600 hover:text-purple-900 transition-colors">View Applicants</button>
            <button className="text-gray-600 hover:text-gray-900 transition-colors flex items-center">
                <Edit className="h-4 w-4 mr-1" /> Edit
            </button>
            <button className="text-red-500 hover:text-red-700 transition-colors flex items-center">
                <Trash2 className="h-4 w-4 mr-1" /> Del
            </button>
        </div>
    </div>
);


const MyJobsTable = ({ setCurrentView }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  // Fetch jobs from API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        // NOTE: Replace this endpoint with the actual backend endpoint
        const response = await axios.get('/api/employer/jobs'); 
        setJobs(response.data);
      } catch (error) {
        console.error("Error fetching job data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  // Filter logic now uses the 'jobs' state
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || job.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
      return <div className="text-center py-20"><Loader2 className="animate-spin h-8 w-8 mx-auto text-purple-600" /> <p className="mt-2 text-gray-500">Loading Job Postings...</p></div>
  }

  return (
    <div className="py-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">My Job Postings</h1>
      <p className="text-lg text-gray-600 mb-6">Manage the lifecycle of all your active, paused, and expired listings.</p>

      <div className="bg-white p-5 rounded-xl shadow-lg border border-gray-100 mb-6 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 items-center">
        
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by Title or Company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:border-purple-500 focus:ring-purple-500 transition-shadow shadow-sm"
            aria-label="Search jobs"
          />
        </div>

        <div className="relative w-full md:w-auto">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full md:w-40 appearance-none pl-10 pr-8 py-2 border border-gray-300 rounded-full focus:border-purple-500 focus:ring-purple-500 shadow-sm bg-white"
            aria-label="Filter job status"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Paused">Paused</option>
            <option value="Expired">Expired</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
        </div>
        
        <button 
            onClick={() => setCurrentView('postjob')}
            className="w-full md:w-auto flex items-center space-x-2 bg-purple-600 text-white font-medium px-6 py-2 rounded-full shadow-md hover:bg-purple-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span className="text-sm">Post New Job</span>
          </button>
      </div>

      {/* MOBILE VIEW: Cards */}
      <div className="md:hidden">
          {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => <MobileJobCard key={job.id} job={job} setCurrentView={setCurrentView} />)
          ) : (
              <p className="text-center py-10 text-gray-500">No jobs found matching your criteria.</p>
          )}
      </div>

      {/* DESKTOP VIEW: Table */}
      <div className="hidden md:block bg-white rounded-xl shadow-lg border border-gray-100 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Title & Company</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicants</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Metrics</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredJobs.map((job, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{job.title}</div>
                    <div className="text-xs text-gray-500">{job.company} • {job.posted}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClasses(job.status)}`}>
                      {job.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 font-semibold">{job.applicants} Total</div>
                    <div className="text-xs text-red-500">{job.newCount} New</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <p>Views: {job.views}</p>
                    <p>Match: {job.matches}</p>
                    <p>Response: {job.response}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3">
                    <button className="text-purple-600 hover:text-purple-900 transition-colors">View Applicants</button>
                    <button className="text-gray-600 hover:text-gray-900 transition-colors">Edit</button>
                    <button className="text-red-500 hover:text-red-700 transition-colors">Delete</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyJobsTable;