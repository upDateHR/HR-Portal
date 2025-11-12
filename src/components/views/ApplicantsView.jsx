import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Briefcase, ChevronDown, Clock, MessageSquare, Loader2, Star } from 'lucide-react';

// --- Helper Functions (Defined here or imported from a helper file) ---
const getStageClasses = (stage) => {
  switch (stage) {
    case 'New': return 'bg-blue-100 text-blue-700';
    case 'Screening': return 'bg-yellow-100 text-yellow-700';
    case 'Interview': return 'bg-purple-100 text-purple-700';
    case 'Offer': return 'bg-green-100 text-green-700';
    case 'Rejected': return 'bg-red-100 text-red-700';
    default: return 'bg-gray-100 text-gray-700';
  }
};

// --- Mobile Applicant Card Component ---
const MobileApplicantCard = ({ applicant }) => (
    <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100 mb-3">
        <div className="flex justify-between items-start border-b pb-2 mb-3">
            <div className="flex items-center space-x-3">
                <div className="h-10 w-10 flex items-center justify-center rounded-full bg-indigo-500 text-white font-bold text-sm shrink-0">
                    {applicant.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                    <h4 className="text-lg font-bold text-gray-900">{applicant.name}</h4>
                    <p className="text-xs text-gray-500 flex items-center space-x-1"><Clock className="h-3 w-3" /> Applied {applicant.applied}</p>
                </div>
            </div>
            <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStageClasses(applicant.stage)}`}>
                {applicant.stage}
            </span>
        </div>
        
        <div className="space-y-1 text-sm">
            <p className="text-gray-700 font-medium">Job: <span className="text-purple-600">{applicant.jobTitle}</span></p>
            <p className="text-gray-700">Company: {applicant.jobCompany}</p>
            <p className="text-gray-700">Level: {applicant.jobLevel}</p>
            <p className="text-green-700 font-bold">Match: {applicant.match}</p>
        </div>

        <div className="flex justify-end space-x-3 pt-3 border-t mt-3">
            <button className="text-sm text-purple-600 hover:text-purple-900 transition-colors">View Profile</button>
            <button className="text-sm text-red-500 hover:text-red-700 transition-colors">Change Stage</button>
        </div>
    </div>
);

const applicantStages = ['All', 'New', 'Screening', 'Interview', 'Offer', 'Rejected'];

const ApplicantsView = () => {
  // --- STATE FOR API DATA ---
  const [allApplicants, setAllApplicants] = useState([]);
  const [jobPostings, setJobPostings] = useState([]); 
  const [loading, setLoading] = useState(true);
  
  const [selectedJob, setSelectedJob] = useState('All');
  const [selectedStage, setSelectedStage] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // --- API Fetch Logic ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        // NOTE: Replace these with actual backend endpoints
        const applicantsResponse = await axios.get('/api/employer/applicants'); 
        const jobsResponse = await axios.get('/api/employer/jobs/list'); // simplified job list
        
        setAllApplicants(applicantsResponse.data);
        setJobPostings(jobsResponse.data);
      } catch (error) {
        console.error("Error fetching applicants data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const availableJobs = jobPostings.map(job => ({ id: job.id, title: job.title, company: job.company }));

  // --- Filtering Logic (Uses data from state, not mock imports) ---
  const filteredApplicants = allApplicants.filter(applicant => {
    const jobMatch = selectedJob === 'All' || applicant.jobTitle === availableJobs.find(j => j.id === selectedJob)?.title;
    const stageMatch = selectedStage === 'All' || applicant.stage === selectedStage;
    const searchMatch = searchTerm === '' || applicant.name.toLowerCase().includes(searchTerm.toLowerCase());
    return jobMatch && stageMatch && searchMatch;
  });

  if (loading) {
      return <div className="text-center py-20"><Loader2 className="animate-spin h-8 w-8 mx-auto text-purple-600" /> <p className="mt-2 text-gray-500">Loading Applicants Data...</p></div>
  }

  return (
    <div className="py-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Applicant Tracking System</h1>
      <p className="text-lg text-gray-600 mb-6">Review, filter, and move candidates through the hiring pipeline.</p>

      {/* Filter Container */}
      <div className="bg-white p-5 rounded-xl shadow-lg border border-gray-100 mb-6 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 items-center">
        
        {/* 1. Search Bar */}
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search applicant name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:border-purple-500 focus:ring-purple-500 transition-shadow shadow-sm"
            aria-label="Search applicants"
          />
        </div>

        {/* 2. Job Filter (ADJUSTED TO 1/5 WIDTH) */}
        <div className="relative w-full md:w-1/5">
          <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <select
            value={selectedJob}
            onChange={(e) => setSelectedJob(e.target.value)}
            className="w-full appearance-none pl-10 pr-8 py-2 border border-gray-300 rounded-full focus:border-purple-500 focus:ring-purple-500 shadow-sm bg-white"
            aria-label="Filter by job"
          >
            <option value="All">All Jobs</option>
            {availableJobs.map(job => (
              <option key={job.id} value={job.id}>{job.title} ({job.company})</option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
        </div>

        {/* 3. Stage Filter Tabs (FIXED: Removed flex-grow and enforced flex-none) */}
        <div className="w-full md:w-auto overflow-x-auto whitespace-nowrap space-x-2 p-1 bg-gray-50 rounded-full flex justify-start md:justify-end md:flex-none">
          {applicantStages.map(stage => (
            <button
              key={stage}
              onClick={() => setSelectedStage(stage)}
              className={`text-sm px-4 py-1.5 rounded-full font-semibold transition-colors ${
                selectedStage === stage
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-gray-700 hover:bg-gray-200'
              }`}
            >
              {stage}
            </button>
          ))}
        </div>
      </div>
      
      {/* MOBILE VIEW: Cards */}
      <div className="md:hidden">
          {filteredApplicants.length > 0 ? (
              filteredApplicants.map((applicant) => <MobileApplicantCard key={applicant.id} applicant={applicant} />)
          ) : (
              <p className="text-center py-10 text-gray-500">No applicants found matching your current filters.</p>
          )}
      </div>

      {/* DESKTOP VIEW: Table */}
      <div className="hidden md:block bg-white rounded-xl shadow-lg border border-gray-100 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicant</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Applied</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Level & Match</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stage</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredApplicants.map((applicant) => (
                <tr key={applicant.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                        <div className="h-10 w-10 flex items-center justify-center rounded-full bg-indigo-500 text-white font-bold text-sm mr-4">{applicant.name.split(' ').map(n => n[0]).join('')}</div>
                        <div>
                            <div className="text-sm font-medium text-gray-900">{applicant.name}</div>
                            <div className="text-xs text-gray-500 flex items-center space-x-1 mt-0.5">
                                <Clock className="h-3 w-3" /> <span>Applied {applicant.applied}</span>
                            </div>
                        </div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{applicant.jobTitle}</div>
                    <div className="text-xs text-gray-500">{applicant.jobCompany}</div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${applicant.match.startsWith('9') ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'} mb-1`}>
                      {applicant.match} Match
                    </span>
                    <div className="text-xs text-gray-500">{applicant.jobLevel} Level</div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStageClasses(applicant.stage)}`}>
                      {applicant.stage}
                    </span>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3">
                    <button className="text-purple-600 hover:text-purple-900 transition-colors">View Profile</button>
                    <button className="text-red-500 hover:text-red-700 transition-colors">Change Stage</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApplicantsView;