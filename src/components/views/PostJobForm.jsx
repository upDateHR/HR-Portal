import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  FileText,
  MapPin,
  DollarSign,
  Loader2,
  Send,
} from "lucide-react";

import { auth, db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { createJobPosting } from "../../helpers/employerService";

const hourOptions = [12, 24, 36, 48, 72];
const dayOptions = [1, 2, 3, 4, 5, 6, 7];

const PostJobForm = ({ setCurrentView }) => {
  const [recruiterData, setRecruiterData] = useState(null);

  const [isPosting, setIsPosting] = useState(false);
  const [responseTimeType, setResponseTimeType] = useState("days");
  const [responseTimeValue, setResponseTimeValue] = useState(1);

  const [formData, setFormData] = useState({
    type: "Full-time",
    workplace: "Remote",
    jobLevel: "Beginner",
    companyName: "",
    title: "",
    department: "",
    location: "",
    minSalary: "",
    maxSalary: "",
    description: "",
  });

  // -----------------------------------------------------
  //  🔥 FETCH LOGGED-IN RECRUITER DATA FROM FIRESTORE (NO CHANGE TO LOGIC)
  // -----------------------------------------------------
  useEffect(() => {
    const loadRecruiter = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        const data = snap.data();
        setRecruiterData(data);

        setFormData((prev) => ({
          ...prev,
          companyName: data.companyName || "",
        }));
      }
    };

    loadRecruiter();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // -----------------------------------------------------
  //  🔥 FIREBASE JOB CREATE (NO CHANGE TO LOGIC)
  // -----------------------------------------------------
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
      await createJobPosting(finalPayload);
      console.log("Job Posted Successfully!");
      setCurrentView("dashboard");
    } catch (error) {
      console.error("Error posting job:", error);
      console.log("Failed to post job.");
    } finally {
      setIsPosting(false);
    }
  };

  // If recruiter data not yet loaded show nothing (using a null render)
  if (!recruiterData) return null;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
      
      {/* Back Button */}
      <button
        onClick={() => setCurrentView("dashboard")}
        className="flex items-center space-x-1 px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition duration-150 shadow-sm mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Dashboard</span>
      </button>

      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
        Post a New Job
      </h1>
      <p className="text-base text-gray-600 mb-8">
        Fill in the details below to create a new listing.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* ------------------ 1. JOB DETAILS BLOCK ------------------ */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-100 pb-4 mb-5 flex items-center">
            <FileText className="h-5 w-5 mr-2 text-purple-600" />
            Job Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4">
            
            {/* Job Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Job Title *
              </label>
              <input
                id="title"
                required
                placeholder="e.g., Frontend Developer"
                value={formData.title}
                className="block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500 outline-none transition duration-150 text-sm"
                onChange={handleChange}
              />
            </div>

            {/* Company Name */}
            <div>
              <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
                Company Name *
              </label>
              <input
                id="companyName"
                required
                placeholder="e.g., Acme Corp"
                value={formData.companyName}
                className="block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500 outline-none transition duration-150 text-sm"
                onChange={handleChange}
              />
            </div>

            {/* Department */}
            <div>
              <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
                Department *
              </label>
              <input
                id="department"
                required
                placeholder="e.g., Engineering"
                value={formData.department}
                className="block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500 outline-none transition duration-150 text-sm"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-100">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Job Description *
            </label>
            <textarea
              id="description"
              required
              rows="6"
              value={formData.description}
              placeholder="Describe the role, responsibilities, expectations..."
              className="block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500 outline-none transition duration-150 text-sm"
              onChange={handleChange}
            ></textarea>
          </div>
        </div>

        {/* ------------------ 2. LOCATION & INFO BLOCK ------------------ */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-100 pb-4 mb-5 flex items-center">
            <MapPin className="h-5 w-5 mr-2 text-purple-600" />
            Location & Job Info
          </h2>

          {/* This grid defines the alignment. Now using 5 equal columns. */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-x-6 gap-y-4">
            
            {/* Location */}
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                Location *
              </label>
              <input
                id="location"
                required
                placeholder="e.g., Pune"
                value={formData.location}
                className="block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500 outline-none transition duration-150 text-sm"
                onChange={handleChange}
              />
            </div>

            {/* Job Type */}
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                Job Type
              </label>
              <select
                id="type"
                value={formData.type}
                className="block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500 outline-none transition duration-150 cursor-pointer text-sm"
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
              <label htmlFor="workplace" className="block text-sm font-medium text-gray-700 mb-1">
                Workplace
              </label>
              <select
                id="workplace"
                value={formData.workplace}
                className="block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500 outline-none transition duration-150 cursor-pointer text-sm"
                onChange={handleChange}
              >
                <option>Remote</option>
                <option>On-site</option>
                <option>Hybrid</option>
              </select>
            </div>

            {/* Job Level */}
            <div>
              <label htmlFor="jobLevel" className="block text-sm font-medium text-gray-700 mb-1">
                Job Level
              </label>
              <select
                id="jobLevel"
                value={formData.jobLevel}
                className="block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500 outline-none transition duration-150 cursor-pointer text-sm"
                onChange={handleChange}
              >
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
                <option>Executive</option>
              </select>
            </div>

            {/* 💥 CORRECTED: MAX RESPONSE TIME (Split into two columns within its grid column) */}
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Max Response Time
              </label>
              
              <div className="grid grid-cols-2 gap-2"> {/* Inner grid for value + type */}
                <select
                  value={responseTimeValue}
                  onChange={(e) =>
                    setResponseTimeValue(parseInt(e.target.value))
                  }
                  className="px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500 outline-none transition duration-150 cursor-pointer text-sm"
                >
                  {(responseTimeType === "hours" ? hourOptions : dayOptions).map((i) => (
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
                  className="px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500 outline-none transition duration-150 cursor-pointer text-sm"
                >
                  <option value="hours">Hrs</option>
                  <option value="days">Days</option>
                </select>
              </div>
            </div>
            {/* END CORRECTION */}
            
          </div>
        </div>

        {/* ------------------ 3. SALARY BLOCK ------------------ */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-100 pb-4 mb-5 flex items-center">
            <DollarSign className="h-5 w-5 mr-2 text-purple-600" />
            Salary Range (Annual)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <label htmlFor="minSalary" className="block text-sm font-medium text-gray-700 mb-1">
                Minimum Salary (in ₹)
              </label>
              <input
                id="minSalary"
                type="number"
                placeholder="e.g., 400000"
                value={formData.minSalary}
                className="block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500 outline-none transition duration-150 text-sm"
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="maxSalary" className="block text-sm font-medium text-gray-700 mb-1">
                Maximum Salary (in ₹)
              </label>
              <input
                id="maxSalary"
                type="number"
                placeholder="e.g., 700000"
                value={formData.maxSalary}
                className="block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500 outline-none transition duration-150 text-sm"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={isPosting}
            className={`flex items-center px-6 py-2 rounded-md text-white font-medium shadow-lg transition duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${
              isPosting
                ? "bg-purple-400 cursor-not-allowed shadow-md"
                : "bg-purple-600 hover:bg-purple-700 hover:shadow-xl"
            }`}
          >
            {isPosting && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            <Send className="h-4 w-4 mr-2" />
            {isPosting ? "Publishing..." : "Publish Job"}
          </button>
        </div>

      </form>
    </div>
  );
};

export default PostJobForm;