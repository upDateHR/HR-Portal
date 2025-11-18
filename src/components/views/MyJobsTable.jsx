import React, { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Plus,
  ChevronDown,
  Loader2,
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";

import { getStatusClasses } from "../../helpers/utils"; 
import {
  getMyJobs,
  deleteJob,
  updateJobStatus,
} from "../../helpers/employerService";

import { db, auth } from "../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

const MyJobsTable = ({ setCurrentView }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  // ----------------------------------
  // LOAD JOBS + APPLICANT COUNTS - NO CHANGE TO LOGIC
  // ----------------------------------
  useEffect(() => {
    // ... (logic remains unchanged)
    const loadJobs = async () => {
      try {
        const jobData = await getMyJobs();

        const q = query(
          collection(db, "applications"),
          where("recruiterId", "==", auth.currentUser.uid)
        );
        const appSnap = await getDocs(q);

        const countMap = {};

        appSnap.docs.forEach((d) => {
          const jid = d.data().jobId;
          if (!countMap[jid]) countMap[jid] = 0;
          countMap[jid]++;
        });

        const normalized = (jobData || []).map((job) => ({
          _id: job._id,
          title: job.title,
          company: job.companyName,
          posted: job.createdAt?.toDate?.().toDateString() || "Recently",
          applicants: countMap[job._id] || 0,
          status: job.status || "Active",
        }));

        setJobs(normalized);
      } catch (err) {
        console.error("Fetch jobs failed:", err);
        setJobs([]);
      } finally {
        setLoading(false);
      }
    };

    loadJobs();
  }, []);

  // ---------------- DELETE JOB - NO CHANGE TO LOGIC ----------------
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this job?")) return;
    try {
      await deleteJob(id);
      setJobs((prev) => prev.filter((job) => job._id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  // ---------------- UPDATE STATUS - NO CHANGE TO LOGIC ----------------
  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateJobStatus(id, newStatus);
      setJobs((prev) =>
        prev.map((job) =>
          job._id === id ? { ...job, status: newStatus } : job
        )
      );
    } catch (err) {
      console.error("Status update failed:", err);
    }
  };

  // FILTER - NO CHANGE TO LOGIC
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "All" || job.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // LOADING SCREEN - UI updated to PURPLE theme
  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <Loader2 className="animate-spin h-8 w-8 text-purple-600 mx-auto" />
          <p className="mt-4 text-gray-600 font-medium">
            Loading Job Postings...
          </p>
        </div>
      </div>
    );
  }

  // ---------------------------------------------
  // MOBILE CARD (Refined UI, PURPLE Theme) - NO CHANGES HERE
  // ---------------------------------------------
  const MobileJobCard = ({ job }) => (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition duration-200 mb-4">
      <div className="flex justify-between items-start border-b border-gray-100 pb-3 mb-3">
        <div>
          <h4 className="text-lg font-semibold text-gray-900">{job.title}</h4>
          <p className="text-xs text-gray-500 mt-1">
            {job.company} • Posted {job.posted}
          </p>
        </div>

        {/* Status Badge (Already present in mobile card) */}
        <span
          className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusClasses(
            job.status
          )}`}
        >
          {job.status}
        </span>
      </div>

      <div className="flex justify-between items-center">
        {/* Applicants Count */}
        <p className="text-sm text-gray-700 font-medium">
          Applicants:{" "}
          <span className="font-bold text-purple-600">{job.applicants}</span>
        </p>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <button
            onClick={() => setCurrentView({ view: "applicants", id: job._id })}
            className="text-purple-600 hover:bg-purple-50 p-1.5 rounded-full transition duration-150"
            title="View Applicants"
          >
            <Eye className="h-5 w-5" />
          </button>
          <button
            onClick={() => setCurrentView({ view: "editjob", id: job._id })}
            className="text-gray-600 hover:bg-gray-100 p-1.5 rounded-full transition duration-150"
            title="Edit Job"
          >
            <Pencil className="h-5 w-5" />
          </button>
          <button
            onClick={() => handleDelete(job._id)}
            className="text-red-500 hover:bg-red-50 p-1.5 rounded-full transition duration-150"
            title="Delete Job"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      {/* Mobile Status Change Dropdown */}
      <div className="pt-3 mt-3 border-t border-gray-100 flex justify-end">
         <select
          value={job.status}
          onChange={(e) => handleStatusChange(job._id, e.target.value)}
          className="px-3 py-1.5 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 transition duration-150"
        >
          <option value="Active">Set Active</option>
          <option value="Paused">Set Paused</option>
          <option value="Closed">Set Closed</option>
        </select>
      </div>
    </div>
  );

  // ---------------------------------------------
  // DESKTOP/MAIN VIEW (PURPLE Theme) - STATUS BADGE RE-INSERTED
  // ---------------------------------------------
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          My Job Postings
        </h1>
        <p className="mt-1 text-base text-gray-600">
          Manage all your active, paused, and closed job listings.
        </p>
      </header>

      {/* FILTERS & CTA */}
      <div className="bg-white p-4 rounded-lg shadow-md border border-gray-100 mb-8 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 items-center">
        
        {/* Search Input */}
        <div className="relative flex-grow w-full sm:w-1/2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search by Job Title or Company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:border-purple-500 focus:ring-purple-500 shadow-sm transition duration-150 text-sm"
          />
        </div>

        {/* Filter Dropdown */}
        <div className="relative w-full sm:w-40">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full pl-3 pr-8 py-2 border border-gray-300 rounded-md appearance-none focus:border-purple-500 focus:ring-purple-500 shadow-sm transition duration-150 text-sm"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Paused">Paused</option>
            <option value="Closed">Closed</option>
          </select>
          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
        </div>

        {/* Post New Job Button */}
        <button
          onClick={() => setCurrentView("postjob")}
          className="w-full sm:w-auto bg-purple-600 text-white px-5 py-2 rounded-md flex items-center justify-center space-x-2 font-medium hover:bg-purple-700 transition duration-150 shadow-md"
        >
          <Plus className="h-4 w-4" />
          <span>Post New Job</span>
        </button>
      </div>

      {/* MOBILE LIST */}
      <div className="md:hidden">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => <MobileJobCard key={job._id} job={job} />)
        ) : (
          <p className="text-center py-10 text-gray-500">
            No job postings found matching your criteria.
          </p>
        )}
      </div>

      {/* DESKTOP TABLE */}
      <div className="hidden md:block bg-white rounded-lg shadow-md border border-gray-100 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-2/5">
                Job Title & Company
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-1/5">
                Applicants
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-1/5">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-1/5">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {filteredJobs.map((job) => (
              <tr key={job._id} className="hover:bg-purple-50/30 transition duration-150">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-base font-semibold text-gray-800">{job.title}</div>
                  <div className="text-sm text-gray-500 mt-0.5">{job.company}</div>
                  
                  {/* 💥 CORRECTED: Status Badge Re-inserted */}
                  <span
                    className={`mt-1 px-2.5 py-0.5 inline-flex text-xs font-medium rounded-full ${getStatusClasses(
                      job.status
                    )}`}
                  >
                    {job.status}
                  </span>
                  {/* End Status Badge */}

                  <div className="text-xs text-gray-400 mt-2">Posted: {job.posted}</div>
                </td>
                
                {/* Applicants Count */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-purple-600 font-bold text-lg">
                    {job.applicants}
                  </span>
                </td>

                {/* Status Dropdown - This now manages the status, while the badge provides quick status display */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <select
                    value={job.status}
                    onChange={(e) => handleStatusChange(job._id, e.target.value)}
                    className="px-3 py-1.5 border border-gray-300 rounded-md text-sm shadow-sm focus:ring-purple-500 focus:border-purple-500 transition duration-150"
                  >
                    <option value="Active">Active</option>
                    <option value="Paused">Paused</option>
                    <option value="Closed">Closed</option>
                  </select>
                </td>

                {/* Actions */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex space-x-1">
                    <button
                      onClick={() =>
                        setCurrentView({ view: "applicants", id: job._id })
                      }
                      className="text-purple-600 hover:bg-purple-50 p-2 rounded-md transition duration-150 flex items-center space-x-1 text-sm font-medium"
                      title="View Applicants"
                    >
                      <Eye className="h-4 w-4" /> <span>Applicants</span>
                    </button>

                    <button
                      onClick={() =>
                        setCurrentView({ view: "editjob", id: job._id })
                      }
                      className="text-gray-600 hover:bg-gray-100 p-2 rounded-md transition duration-150 flex items-center space-x-1 text-sm font-medium"
                      title="Edit Job"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>

                    <button
                      onClick={() => handleDelete(job._id)}
                      className="text-red-600 hover:bg-red-50 p-2 rounded-md transition duration-150 flex items-center space-x-1 text-sm font-medium"
                      title="Delete Job"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Empty State */}
        {!filteredJobs.length && (
          <p className="p-10 text-center text-gray-500 font-medium">
            No job postings found matching your criteria.
          </p>
        )}
      </div>
    </div>
  );
};

export default MyJobsTable;