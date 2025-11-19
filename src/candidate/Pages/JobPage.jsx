import React, { useEffect, useState } from "react";
import JobHome from "../Components/CandidateContent/JobHome";
import Footer from "../Components/Footer";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../api";

const JobPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    const load = async () => {
      setLoading(true);
      try {
        const res = await API.get(`/jobs/public/${id}`);
        setJob(res.data.job);
      } catch (err) {
        console.error("Failed to load job", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (id) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <button onClick={() => navigate('/jobpage')} className="text-sm text-indigo-600 mb-4">&larr; Back to jobs</button>
        {loading ? (
          <div className="py-10 text-center">Loading job...</div>
        ) : job ? (
          <div className="bg-white rounded-lg shadow p-6">
            <h1 className="text-2xl font-bold mb-2">{job.title}</h1>
            <div className="text-sm text-gray-600 mb-4">{job.companyName} {job.location ? `• ${job.location}` : ''}</div>
            <div className="prose max-w-none mb-4">{job.description}</div>
            <div className="flex items-center gap-3">
              <a href="#" onClick={(e) => { e.preventDefault(); /* allow applying from card */ }} className="px-4 py-2 bg-indigo-600 text-white rounded">Apply</a>
              <a href="#" onClick={(e) => { e.preventDefault(); navigate('/candidate/dashboard'); }} className="px-4 py-2 border rounded">Go to Dashboard</a>
            </div>
          </div>
        ) : (
          <div className="py-10 text-center">Job not found.</div>
        )}
        <Footer />
      </div>
    );
  }

  return (
    <>
      <JobHome />
      <Footer />
    </>
  );
};

export default JobPage;
