import React, { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Plus,
  ChevronDown,
  Loader2,
  Eye, // Added for View Applicants icon
  Pencil, // Added for Edit icon
  Trash2, // Added for Delete icon
} from "lucide-react";

import { getStatusClasses } from "../../helpers/utils";
import {
  getMyJobs,
  deleteJob,
  updateJobStatus,
} from "../../helpers/employerService";

const MyJobsTable = ({ setCurrentView }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  // ---------------- DELETE JOB ----------------
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to permanently delete this job posting?")) return; // UI REFINEMENT: More professional confirm message

    try {
      await deleteJob(id);
      setJobs((prev) => prev.filter((j) => j._id !== id));
      console.log("Job deleted"); // UI REFINEMENT: Changed alert to console/notification
    } catch (err) {
      console.error("Delete failed:", err);
      console.log("Failed to delete job"); // UI REFINEMENT: Changed alert to console/notification
    }
  };

  // ---------------- UPDATE STATUS ----------------
  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateJobStatus(id, newStatus);

      setJobs((prev) =>
        prev.map((job) =>
          job._id === id ? { ...job, status: newStatus } : job
        )
      );

      console.log("Status updated"); // UI REFINEMENT: Changed alert to console/notification
    } catch (err) {
      console.error("Status update failed:", err);
      console.log("Failed to update status"); // UI REFINEMENT: Changed alert to console/notification
    }
  };

  // ---------------- LOAD JOBS ----------------
  useEffect(() => {
    const loadJobs = async () => {
      try {
        const data = await getMyJobs();

        const normalized = (data || []).map((job) => ({
          ...job,
          company: job.companyName,
          // use createdAt as posted date if available
          posted: job.createdAt ? new Date(job.createdAt).toLocaleDateString() : "N/A",
          // prefer applicantsCount from server, fall back to applicants array length or 0
          applicants: job.applicantsCount ?? job.applicants?.length ?? 0,
          newCount: 0,
          // if view metric not available, reflect applicant activity so metrics change
          views: job.views ?? job.applicantsCount ?? job.applicants?.length ?? 0,
          matches: job.matches ?? 0,
          response: job.response ?? "N/A",
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

  // FILTERS
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "All" || job.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  // LOADING SCREEN
  if (loading) {
    return (
      <div className="text-center py-20">
        {/* UI REFINEMENT: Consistent loading spinner style */}
        <Loader2 className="animate-spin h-8 w-8 mx-auto text-purple-600" />
        <p className="mt-2 text-gray-600 font-medium">Loading Job Postings...</p>
      </div>
    );
  }

  // ---------------- MOBILE CARD ----------------
  const MobileJobCard = ({ job }) => (
    // UI REFINEMENT: Consistent card styling (shadow-lg, hover, rounded-xl)
    <div className="bg-white p-5 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition duration-200 mb-4">
      <div className="flex justify-between items-start border-b border-gray-100 pb-3 mb-3">
        <div>
          {/* FONT REVERT: Original font size/weight maintained */}
          <h4 className="text-lg font-bold text-gray-900">{job.title}</h4>
          <p className="text-sm text-gray-500 mt-0.5">
            {job.company} • Posted {job.posted}
          </p>
        </div>
        {/* Status Badge */}
        <span
          className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full shadow-inner ${getStatusClasses(
            job.status
          )}`}
        >
          {job.status}
        </span>
      </div>

      {/* Metrics Block */}
      <div className="grid grid-cols-2 gap-y-2 text-sm border-b border-gray-100 pb-3 mb-3">
        <p className="text-gray-700 font-medium">
          Applicants: <span className="font-bold text-gray-900">{job.applicants}</span>
        </p>
        <p className="text-gray-700 font-medium">Views: <span className="font-semibold text-gray-800">{job.views}</span></p>
        <p className="text-gray-700 font-medium">Match Avg: <span className="font-semibold text-gray-800">{job.matches}</span></p>
        <p className="text-gray-700 font-medium">Response: <span className="font-semibold text-gray-800">{job.response}</span></p>
      </div>

      {/* Action Block */}
      <div className="flex justify-between items-center pt-3">

        {/* Status Dropdown */}
        <select
          value={job.status}
          onChange={(e) => handleStatusChange(job._id, e.target.value)}
          // UI REFINEMENT: Consistent dropdown styling (py-1.5, rounded-lg, focus ring)
          className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg bg-white shadow-sm focus:ring-purple-500 focus:border-purple-500 transition duration-150 cursor-pointer"
        >
          <option value="Active">Active</option>
          <option value="Paused">Paused</option>
          <option value="Closed">Closed</option>
        </select>

        <div className="flex space-x-3">
          {/* View Applicants Button */}
          <button
            onClick={() => setCurrentView({ view: "applicants", id: job._id })}
            className="text-sm text-purple-600 hover:text-purple-800 flex items-center space-x-1.5 p-2 rounded-lg transition duration-150 hover:bg-purple-50"
          >
            <Eye className="h-4 w-4" />
            <span>Applicants</span>
          </button>
          {/* Edit Button */}
          <button
            onClick={() =>
              setCurrentView({ view: "editjob", id: job._id })
            }
            className="text-gray-600 hover:text-gray-900 flex items-center space-x-1.5 p-2 rounded-lg transition duration-150 hover:bg-gray-100"
          >
            <Pencil className="h-4 w-4" />
            <span>Edit</span>
          </button>
          {/* Delete Button */}
          <button
            onClick={() => handleDelete(job._id)}
            className="text-red-500 hover:text-red-700 flex items-center space-x-1.5 p-2 rounded-lg transition duration-150 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4" />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="py-6">
      {/* FONT REVERT: Original font size/weight maintained */}
      <h1 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">
        My Job Postings
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Manage the lifecycle of all your active, paused, and closed listings.
      </p>

      {/* FILTER BAR */}
      {/* UI REFINEMENT: Consistent card block, shadow-xl, rounded-2xl */}
      <div className="bg-white p-5 rounded-2xl shadow-xl border border-gray-100 mb-8 
        flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 items-center"
      >

        {/* Search */}
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by Title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            // UI REFINEMENT: Smoother input style (py-2.5, rounded-full, transition/focus ring)
            className="w-full pl-11 pr-4 py-2.5 border border-gray-300 rounded-full shadow-inner focus:border-purple-500 focus:ring-purple-500 outline-none transition duration-150"
          />
        </div>

        {/* Filter Status */}
        <div className="relative w-full md:w-40">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            // UI REFINEMENT: Smoother select style (py-2.5, rounded-full, transition/focus ring)
            className="w-full pl-10 pr-8 py-2.5 border border-gray-300 rounded-full bg-white shadow-sm appearance-none focus:ring-purple-500 focus:border-purple-500 outline-none transition duration-150 cursor-pointer"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Paused">Paused</option>
            <option value="Closed">Closed</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
        </div>

        {/* Post Job Button */}
        <button
          onClick={() => setCurrentView("postjob")}
          // UI REFINEMENT: Consistent rounded-full button with hover elevation
          className="bg-purple-600 text-white px-6 py-2.5 rounded-full font-semibold shadow-lg hover:bg-purple-700 hover:shadow-xl transition duration-300 flex items-center space-x-2 w-full md:w-auto focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
        >
          <Plus className="h-4 w-4" />
          <span>Post New Job</span>
        </button>
      </div>

      {/* MOBILE VIEW */}
      <div className="md:hidden">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <MobileJobCard key={job._id} job={job} />
          ))
        ) : (
          <p className="text-center py-10 text-lg text-gray-500 font-medium bg-white rounded-xl shadow-lg border border-gray-100">
            No job postings found.
          </p>
        )}
      </div>

      {/* DESKTOP TABLE */}
      {/* UI REFINEMENT: Consistent card block, shadow-xl, rounded-2xl */}
      <div className="hidden md:block bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-100">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                {/* UI REFINEMENT: Clean header text and padding (py-4) */}
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Job Title & Company
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Status Update
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Applicants
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Metrics
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-100">
              {filteredJobs.map((job) => (
                // UI REFINEMENT: Smooth row hover effect
                <tr key={job._id} className="hover:bg-purple-50/50 transition duration-150">
                  {/* Title & Info */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-base font-semibold text-gray-900">
                      {job.title}
                    </div>
                    <div className="text-sm text-gray-500 mt-0.5">
                      {job.company} • {job.posted}
                    </div>
                    {/* Status Badge */}
                    <span
                      className={`mt-2 px-3 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full shadow-inner ${getStatusClasses(
                        job.status
                      )}`}
                    >
                      {job.status}
                    </span>
                  </td>

                  {/* Status Dropdown */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={job.status}
                      onChange={(e) => handleStatusChange(job._id, e.target.value)}
                      // UI REFINEMENT: Consistent dropdown styling
                      className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg bg-white shadow-sm focus:ring-purple-500 focus:border-purple-500 outline-none transition duration-150 cursor-pointer"
                    >
                      <option value="Active">Active</option>
                      <option value="Paused">Paused</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </td>

                  {/* Applicants */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-lg font-bold text-purple-600">
                      {job.applicants}
                    </div>
                  </td>

                  {/* Metrics */}
                  <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">
                    <p>Views: <span className="font-semibold text-gray-800">{job.views}</span></p>
                    <p>Match: <span className="font-semibold text-gray-800">{job.matches}</span></p>
                    <p>Response: <span className="font-semibold text-gray-800">{job.response}</span></p>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col space-y-1.5 items-start">
                      {/* View Applicants Button */}
                      <button
                        onClick={() =>
                          setCurrentView({ view: "applicants", id: job._id })
                        }
                        className="text-sm text-purple-600 hover:text-purple-800 flex items-center space-x-1 p-2 rounded-lg transition duration-150 hover:bg-purple-50 font-medium"
                      >
                        <Eye className="h-4 w-4" />
                        <span>View Applicants</span>
                      </button>
                      {/* Edit Button */}
                      <button
                        onClick={() =>
                          setCurrentView({ view: "editjob", id: job._id })
                        }
                        className="text-sm text-gray-600 hover:text-gray-900 flex items-center space-x-1 p-2 rounded-lg transition duration-150 hover:bg-gray-100 font-medium"
                      >
                        <Pencil className="h-4 w-4" />
                        <span>Edit</span>
                      </button>
                      {/* Delete Button */}
                      <button
                        onClick={() => handleDelete(job._id)}
                        className="text-sm text-red-500 hover:text-red-700 flex items-center space-x-1 p-2 rounded-lg transition duration-150 hover:bg-red-50 font-medium"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Fallback for no results */}
        {!loading && filteredJobs.length === 0 && (
          <p className="p-10 text-center text-lg text-gray-500 font-medium">
            No job postings found matching your filters.
          </p>
        )}
      </div>
    </div>
  );
};

export default MyJobsTable;