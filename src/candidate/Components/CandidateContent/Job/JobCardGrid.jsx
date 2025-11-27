import React, { useState, useEffect } from "react";
import JobCards from "./JobCards";
import API from "../../../../api";

const CardGrid = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const res = await API.get('/jobs/public');
        const list = res?.data?.jobs || [];
        // filter out internships for the jobs page
        const jobList = list.filter(j => (j.type || '').toLowerCase() !== 'internship');
        if (mounted) setJobs(jobList);
      } catch (err) {
        console.error('Failed to load jobs for candidate:', err);
        if (mounted) setJobs([]);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => { mounted = false };
  }, []);

  if (loading) {
    return (
      <section className="max-w-7xl mx-auto px-10 py-10 text-center">Loading jobs...</section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-10 py-5">
      <h2 className="text-2xl text-start font-bold mb-2">Jobs</h2>
      {jobs.length === 0 ? (
        <p className="text-gray-600">No jobs available right now.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {jobs.map((j) => (
            <JobCards
              key={j._id}
              id={j._id}
              title={j.title}
              company={j.companyName || j.company}
              location={j.location || 'Not available'}
              employees={j.companySize || ''}
              remote={(j.workplace || '').toLowerCase() === 'remote'}
              skills={j.skills || []}
              stipend={j.minSalary ? `₹${j.minSalary}` : 'Not available'}
              duration={j.duration || j.jobLevel || 'Not available'}
              img={j.img || '/js.png'}
              alt={j.companyName || 'Company logo'}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default CardGrid;
