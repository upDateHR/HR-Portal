import React, { useEffect, useState } from "react";
import { getJobById, updateJob } from "../../helpers/employerService";
import { Loader2 } from "lucide-react";

const EditJobForm = ({ jobId, setCurrentView }) => {
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

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

  if (loading || !job) {
    return (
      <div className="text-center py-20">
        {/* UI REFINEMENT: Consistent loading spinner style */}
        <Loader2 className="animate-spin h-8 w-8 mx-auto text-purple-600" />
        <p className="mt-2 text-gray-600 font-medium">Loading job...</p>
      </div>
    );
  }

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await updateJob(jobId, job);
      // UI REFINEMENT: Reverting alert to console.log/message system
      console.log("Job updated successfully!");
      setCurrentView("myjobs");
    } catch (err) {
      console.error("Update failed:", err);
      // UI REFINEMENT: Reverting alert to console.log/message system
      console.log("Error saving changes");
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      {/* FONT REVERT: Original font size/weight maintained */}
      <h1 className="text-3xl font-bold text-gray-900 mb-6 tracking-tight">Edit Job Posting</h1>

      {/* MAIN BLOCK: Consistent card block, shadow-xl, p-8, rounded-2xl */}
      <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 space-y-8">
        
        {/* Job Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            
            {/* Title */}
            <div>
              <label className="block text-sm text-gray-700 font-medium mb-1">
                Job Title
              </label>
              <input
                name="title"
                value={job.title}
                onChange={handleChange}
                // UI REFINEMENT: Smoother input style (py-2.5, rounded-lg, transition/focus ring)
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 outline-none transition duration-150"
                placeholder="e.g., Senior Software Engineer"
              />
            </div>

            {/* Company Name (Read-only suggestion for professionalism) */}
            <div>
              <label className="block text-sm text-gray-700 font-medium mb-1">
                Company Name
              </label>
              <input
                name="companyName"
                value={job.companyName}
                onChange={handleChange}
                // UI REFINEMENT: Smoother input style
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 outline-none transition duration-150"
                placeholder="e.g., Tech Corp"
              />
            </div>

            {/* Department */}
            <div>
              <label className="block text-sm text-gray-700 font-medium mb-1">
                Department
              </label>
              <input
                name="department"
                value={job.department}
                onChange={handleChange}
                // UI REFINEMENT: Smoother input style
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 outline-none transition duration-150"
                placeholder="e.g., Engineering"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm text-gray-700 font-medium mb-1">
                Location
              </label>
              <input
                name="location"
                value={job.location}
                onChange={handleChange}
                // UI REFINEMENT: Smoother input style
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 outline-none transition duration-150"
                placeholder="e.g., Bangalore, IN (Remote)"
              />
            </div>
        </div>

        {/* Salary Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Min Salary */}
          <div>
            <label className="block text-sm text-gray-700 font-medium mb-1">
              Minimum Salary
            </label>
            <input
              type="number"
              name="minSalary"
              value={job.minSalary}
              onChange={handleChange}
              // UI REFINEMENT: Smoother input style
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 outline-none transition duration-150"
              placeholder="e.g., 50000"
            />
          </div>

          {/* Max Salary */}
          <div>
            <label className="block text-sm text-gray-700 font-medium mb-1">
              Maximum Salary
            </label>
            <input
              type="number"
              name="maxSalary"
              value={job.maxSalary}
              onChange={handleChange}
              // UI REFINEMENT: Smoother input style
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 outline-none transition duration-150"
              placeholder="e.g., 80000"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm text-gray-700 font-medium mb-1">
            Job Description
          </label>
          <textarea
            rows={6}
            name="description"
            value={job.description}
            onChange={handleChange}
            // UI REFINEMENT: Smoother textarea style
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 outline-none transition duration-150"
            placeholder="Outline the responsibilities and requirements..."
          ></textarea>
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-4">
          <button
            onClick={handleSave}
            // UI REFINEMENT: Consistent rounded-full button with hover elevation
            className="bg-purple-600 text-white px-8 py-2.5 rounded-full font-semibold shadow-lg hover:bg-purple-700 hover:shadow-xl transition duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditJobForm;