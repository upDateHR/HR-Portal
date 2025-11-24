import React, { useEffect, useState } from "react";
import JobHome from "../Components/CandidateContent/JobHome";
import Footer from "../Components/Footer";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../api";
import { motion } from "framer-motion";

const JobPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(false);
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    if (!id) return;

    const load = async () => {
      setLoading(true);

      try {
        const res = await API.get(`/jobs/public/${id}`);
        setJob(res.data.job);

        // check if already applied
        const appliedRes = await API.get(`/applications/check/${id}`);
        setApplied(appliedRes.data.applied);
      } catch (err) {
        console.error("Failed to load job", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  const applyToJob = async () => {
    try {
      const res = await API.post("/applications", { jobId: id });

      if (res.data.success) {
        setApplied(true);
        alert("Application submitted!");
      }
    } catch (err) {
      if (err.response?.status === 400) {
        alert("You already applied for this job.");
        setApplied(true);
      } else {
        alert("Error submitting application");
      }
    }
  };

  if (id) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <button
          onClick={() => navigate("/jobpage")}
          className="text-sm text-purple-600 mb-4"
        >
          &larr; Back to jobs
        </button>

        {loading ? (
          <div className="py-10 text-center">Loading job...</div>
        ) : job ? (
          <div className="bg-white rounded-lg shadow p-6">
            <h1 className="text-2xl font-bold mb-2">{job.title}</h1>
            <div className="text-sm text-gray-600 mb-4">
              {job.companyName} {job.location ? `• ${job.location}` : ""}
            </div>

            <div className="prose max-w-none mb-4">{job.description}</div>

            <div className="flex items-center gap-3">
              <button
                onClick={applyToJob}
                disabled={applied}
                className={`px-4 py-2 rounded text-white 
                  ${
                    applied
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-indigo-600 hover:bg-indigo-700"
                  }
                `}
              >
                {applied ? "Already Applied ✔" : "Apply"}
              </button>

              <button
                onClick={() => navigate("/candidate/dashboard")}
                className="px-4 py-2 border rounded"
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        ) : (
          <div className="py-10 text-center">Job not found.</div>
        )}
      </div>
    );
  }

  return (
    <>
      <JobHome />
    </>
  );
};

export default JobPage;
