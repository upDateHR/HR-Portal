import React, { useEffect, useState } from "react";
import { getJobById, updateJob } from "../../helpers/employerService";
import { Loader2, Save, ArrowLeft } from "lucide-react"; // Added Save and ArrowLeft icons

const EditJobForm = ({ jobId, setCurrentView }) => {
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false); // Added for professional UX feedback

  // --- Data Loading Logic (NO CHANGE) ---
  useEffect(() => {
    const load = async () => {
      try {
        const data = await getJobById(jobId);
        setJob(data);
      } catch (err) {
        console.error("Error loading job:", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [jobId]);

  // --- Loading State (PURPLE Theme) ---
  if (loading || !job) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <Loader2 className="animate-spin h-8 w-8 mx-auto text-purple-600" />
          <p className="mt-4 text-gray-600 font-medium">Loading job details...</p>
        </div>
      </div>
    );
  }

  // --- Handlers (NO CHANGE TO FUNCTIONALITY) ---
  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateJob(jobId, job);
      // Retaining original log/view change logic
      console.log("Job updated successfully!");
      setCurrentView("myjobs");
    } catch (err) {
      console.error("Update failed:", err);
      console.log("Error saving changes");
    } finally {
      setIsSaving(false);
    }
  };
  
  // --- New Back Button Handler ---
  const handleGoBack = () => {
    setCurrentView("dashboard");
  };

  // --- Main Render ---
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
      {/* Header with Back Button */}
      <header className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Edit Job Posting</h1>
          <p className="text-base text-gray-600 mt-1">Review and modify the details of your active job listing.</p>
        </div>
        
        {/* Go Back Button (NEW) */}
        <button
          onClick={handleGoBack}
          className="flex items-center space-x-1 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition duration-150 shadow-sm"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Listings</span>
        </button>
      </header>

      {/* MAIN FORM BLOCK: Elegant card style */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 space-y-6">
        
        {/* Job Details Section (Compact Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          
          {/* Title */}
          <div>
            <label className="block text-sm text-gray-700 font-medium mb-1" htmlFor="title">
              Job Title
            </label>
            <input
              name="title"
              id="title"
              value={job.title}
              onChange={handleChange}
              // Compact, professional input style
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 outline-none transition duration-150 text-sm"
              placeholder="e.g., Senior Software Engineer"
            />
          </div>

          {/* Company Name */}
          <div>
            <label className="block text-sm text-gray-700 font-medium mb-1" htmlFor="companyName">
              Company Name
            </label>
            <input
              name="companyName"
              id="companyName"
              value={job.companyName}
              onChange={handleChange}
              // Compact, professional input style
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 outline-none transition duration-150 text-sm"
              placeholder="e.g., Tech Corp"
            />
          </div>

          {/* Department */}
          <div>
            <label className="block text-sm text-gray-700 font-medium mb-1" htmlFor="department">
              Department
            </label>
            <input
              name="department"
              id="department"
              value={job.department}
              onChange={handleChange}
              // Compact, professional input style
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 outline-none transition duration-150 text-sm"
              placeholder="e.g., Engineering"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm text-gray-700 font-medium mb-1" htmlFor="location">
              Location
            </label>
            <input
              name="location"
              id="location"
              value={job.location}
              onChange={handleChange}
              // Compact, professional input style
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 outline-none transition duration-150 text-sm"
              placeholder="e.g., Bangalore, IN (Remote)"
            />
          </div>
        </div>

        {/* Salary Section (Separated by border) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 pt-4 border-t border-gray-100">
          {/* Min Salary */}
          <div>
            <label className="block text-sm text-gray-700 font-medium mb-1" htmlFor="minSalary">
              Minimum Salary (in ₹)
            </label>
            <input
              type="number"
              name="minSalary"
              id="minSalary"
              value={job.minSalary}
              onChange={handleChange}
              // Compact, professional input style
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 outline-none transition duration-150 text-sm"
              placeholder="e.g., 50000"
            />
          </div>

          {/* Max Salary */}
          <div>
            <label className="block text-sm text-gray-700 font-medium mb-1" htmlFor="maxSalary">
              Maximum Salary (in ₹)
            </label>
            <input
              type="number"
              name="maxSalary"
              id="maxSalary"
              value={job.maxSalary}
              onChange={handleChange}
              // Compact, professional input style
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 outline-none transition duration-150 text-sm"
              placeholder="e.g., 80000"
            />
          </div>
        </div>

        {/* Description (Separated by border) */}
        <div className="pt-4 border-t border-gray-100">
          <label className="block text-sm text-gray-700 font-medium mb-1" htmlFor="description">
            Job Description
          </label>
          <textarea
            rows={6}
            name="description"
            id="description"
            value={job.description}
            onChange={handleChange}
            // Compact, professional textarea style
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 outline-none transition duration-150 text-sm"
            placeholder="Outline the responsibilities and requirements..."
          ></textarea>
        </div>

        {/* Save Button with Loading State */}
        <div className="flex justify-end pt-4">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className={`px-6 py-2 rounded-md shadow-lg flex items-center space-x-2 font-medium transition duration-150 ${
              isSaving
                ? "bg-purple-400 cursor-not-allowed"
                : "bg-purple-600 text-white hover:bg-purple-700"
            }`}
          >
            {isSaving ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                <span>Save Changes</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditJobForm;