import React, { useState } from "react";
import {
  ArrowLeft,
  FileText,
  MapPin,
  DollarSign,
  Loader2,
} from "lucide-react";

import { createJobPosting } from "../../helpers/employerService";

const hourOptions = [12, 24, 36, 48, 72];
const dayOptions = [1, 2, 3, 4, 5, 6, 7];

const PostJobForm = ({ setCurrentView }) => {

  // Logged-in recruiter info
  const user = JSON.parse(localStorage.getItem("hr_user") || "{}");

  const [isPosting, setIsPosting] = useState(false);
  const [responseTimeType, setResponseTimeType] = useState("days");
  const [responseTimeValue, setResponseTimeValue] = useState(1);

  const [formData, setFormData] = useState({
    type: "Full-time",
    workplace: "Remote",
    jobLevel: "Beginner",
    companyName: user.companyName || user.name || "", // Populating default from user info
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPosting(true);

    const finalPayload = {
      ...formData,
      maxResponseTime: `${responseTimeValue} ${responseTimeType}`,
      minSalary: Number(formData.minSalary || 0),
      maxSalary: Number(formData.maxSalary || 0),
    };

    try {
      const res = await createJobPosting(finalPayload);

      // UI REFINEMENT: Reverting alert to console/notification
      console.log("Job Posted Successfully!");
      setCurrentView("dashboard");

    } catch (error) {
      console.error("Error posting job:", error);
      // UI REFINEMENT: Reverting alert to console/notification
      console.log("Failed to post job.");
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      {/* Back Button Refinement */}
      <button
        onClick={() => setCurrentView("dashboard")}
        // UI REFINEMENT: Added soft hover background and padding for smooth interaction
        className="flex items-center text-purple-600 hover:text-purple-800 transition mb-6 text-sm font-medium p-2 rounded-lg hover:bg-purple-50"
      >
        <ArrowLeft className="h-4 w-4 mr-2" /> Back to Dashboard
      </button>

      {/* FONT REVERT: Original font size/weight maintained */}
      <h1 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">Post a New Job</h1>
      <p className="text-lg text-gray-600 mb-8">
        Fill in the details below to create a new listing.
      </p>

      <form onSubmit={handleSubmit} className="space-y-10">

        {/* JOB DETAILS BLOCK */}
        {/* UI REFINEMENT: Consistent card block, shadow-xl, rounded-2xl */}
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-100 pb-4 mb-6 flex items-center">
            <FileText className="h-5 w-5 mr-3 text-purple-600" />
            Job Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6">
            
            {/* Job Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Job Title
              </label>
              <input
                id="title"
                required
                placeholder="e.g., Frontend Developer"
                // UI REFINEMENT: Smoother input style (py-2.5, rounded-lg, transition/focus ring)
                className="block w-full px-4 py-2.5 rounded-lg border border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500 outline-none transition duration-150"
                onChange={handleChange}
              />
            </div>

            {/* Company Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company Name
              </label>
              <input
                id="companyName"
                required
                placeholder="e.g., Acme Corp"
                value={formData.companyName}
                // UI REFINEMENT: Smoother input style
                className="block w-full px-4 py-2.5 rounded-lg border border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500 outline-none transition duration-150"
                onChange={handleChange}
              />
            </div>

            {/* Department */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Department
              </label>
              <input
                id="department"
                required
                placeholder="e.g., Engineering"
                // UI REFINEMENT: Smoother input style
                className="block w-full px-4 py-2.5 rounded-lg border border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500 outline-none transition duration-150"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mt-8">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Job Description
            </label>
            <textarea
              id="description"
              required
              rows="6"
              placeholder="Describe the role, responsibilities, expectations..."
              // UI REFINEMENT: Smoother textarea style
              className="block w-full px-4 py-2.5 rounded-lg border border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500 outline-none transition duration-150"
              onChange={handleChange}
            ></textarea>
          </div>
        </div>

        {/* LOCATION & INFO BLOCK */}
        {/* UI REFINEMENT: Consistent card block, shadow-xl, rounded-2xl */}
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-100 pb-4 mb-6 flex items-center">
            <MapPin className="h-5 w-5 mr-3 text-purple-600" />
            Location & Job Info
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-x-8 gap-y-6">
            
            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                id="location"
                required
                placeholder="e.g., Pune"
                // UI REFINEMENT: Smoother input style
                className="block w-full px-4 py-2.5 rounded-lg border border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500 outline-none transition duration-150"
                onChange={handleChange}
              />
            </div>

            {/* Job Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Job Type
              </label>
              <select
                id="type"
                value={formData.type}
                // UI REFINEMENT: Smoother select style
                className="block w-full px-4 py-2.5 rounded-lg border border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500 outline-none transition duration-150 cursor-pointer"
                onChange={handleChange}
              >
                <option>Full-time</option>
                <option>Part-time</option>
                <option>Contract</option>
                <option>Internship</option>
              </select>
            </div>

            {/* Workplace */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Workplace
              </label>
              <select
                id="workplace"
                value={formData.workplace}
                // UI REFINEMENT: Smoother select style
                className="block w-full px-4 py-2.5 rounded-lg border border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500 outline-none transition duration-150 cursor-pointer"
                onChange={handleChange}
              >
                <option>Remote</option>
                <option>On-site</option>
                <option>Hybrid</option>
              </select>
            </div>

            {/* Job Level */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Job Level
              </label>
              <select
                id="jobLevel"
                value={formData.jobLevel}
                // UI REFINEMENT: Smoother select style
                className="block w-full px-4 py-2.5 rounded-lg border border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500 outline-none transition duration-150 cursor-pointer"
                onChange={handleChange}
              >
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
                <option>Executive</option>
              </select>
            </div>

            {/* RESPONSE TIME */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Max Response Time
              </label>

              <div className="flex space-x-2">
                <select
                  value={responseTimeValue}
                  onChange={(e) =>
                    setResponseTimeValue(parseInt(e.target.value))
                  }
                  // UI REFINEMENT: Smoother select style
                  className="block w-2/3 px-3 py-2.5 rounded-lg border border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500 outline-none transition duration-150 cursor-pointer"
                >
                  {(responseTimeType === "hours"
                    ? hourOptions
                    : dayOptions
                  ).map((i) => (
                    <option key={i} value={i}>
                      {i}
                    </option>
                  ))}
                </select>

                <select
                  value={responseTimeType}
                  onChange={(e) => {
                    const t = e.target.value;
                    setResponseTimeType(t);
                    setResponseTimeValue(t === "hours" ? 24 : 1);
                  }}
                  // UI REFINEMENT: Smoother select style
                  className="block w-1/3 px-3 py-2.5 rounded-lg border border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500 outline-none transition duration-150 cursor-pointer"
                >
                  <option value="hours">Hrs</option>
                  <option value="days">Days</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* SALARY BLOCK */}
        {/* UI REFINEMENT: Consistent card block, shadow-xl, rounded-2xl */}
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-100 pb-4 mb-6 flex items-center">
            <DollarSign className="h-5 w-5 mr-3 text-purple-600" />
            Salary
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Minimum Salary
              </label>
              <input
                id="minSalary"
                type="number"
                placeholder="e.g., 400000"
                // UI REFINEMENT: Smoother input style
                className="block w-full px-4 py-2.5 rounded-lg border border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500 outline-none transition duration-150"
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Maximum Salary
              </label>
              <input
                id="maxSalary"
                type="number"
                placeholder="e.g., 700000"
                // UI REFINEMENT: Smoother input style
                className="block w-full px-4 py-2.5 rounded-lg border border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500 outline-none transition duration-150"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <div className="flex justify-end space-x-4 pt-4">
          
          <button
            type="submit"
            disabled={isPosting}
            // UI REFINEMENT: Consistent rounded-full button with hover elevation and proper disabled styling
            className={`flex items-center px-8 py-2.5 rounded-full text-white font-semibold shadow-lg transition duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${
              isPosting
                ? "bg-purple-400 cursor-not-allowed shadow-md"
                : "bg-purple-600 hover:bg-purple-700 hover:shadow-xl"
            }`}
          >
            {isPosting && (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            )}
            {isPosting ? "Publishing..." : "Publish Job"}
          </button>
        </div>

      </form>
    </div>
  );
};

export default PostJobForm;