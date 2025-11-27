import React from "react";

import API from "../../../../api";
import { useState } from "react";

const JobCards = ({
  title,
  company,
  location,
  employees,
  remote,
  skills,
  stipend,
  duration,
  img,
  alt,
  id,
}) => {
  const [applying, setApplying] = useState(false);

  const handleApply = async () => {
    try {
      setApplying(true);
      const res = await API.post('/applications', { jobId: id });
      if (res?.data?.success) {
        alert('Application submitted successfully');
      } else {
        alert('Application submitted');
      }
    } catch (err) {
      console.error('Apply failed:', err);
      alert(err?.response?.data?.message || 'Failed to apply');
    } finally {
      setApplying(false);
    }
  };
  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200 p-4 shadow-sm hover:shadow-lg transition cursor-pointer">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
          <p className="text-sm text-slate-500 mt-1">
            {company} • {location}
          </p>
        </div>

        <span
          className={`px-3 py-1 text-xs rounded-full font-medium ${remote
              ? "bg-emerald-100 text-emerald-700"
              : "bg-slate-100 text-slate-700"
            }`}
        >
          {remote ? "Remote" : "On-site"}
        </span>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        {skills.map((s, i) => (
          <span
            key={i}
            className="px-3 py-1 text-xs bg-purple-50 text-purple-700 rounded-full"
          >
            {s}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-3 mt-4">
        <img
          src={img}
          alt={alt}
          className="w-12 h-12 rounded-lg object-cover"
        />
        <div>
          <h4 className="text-sm font-semibold">{company}</h4>
          <p className="text-xs text-slate-500">
            {location} • {employees}
          </p>
        </div>
      </div>

      <div className="mt-6 flex justify-between items-center border-t border-slate-100 pt-4">
        <div>
          <p className="text-sm text-slate-900 font-medium">{stipend}</p>
          <p className="text-xs text-slate-500 mt-0.5">{duration}</p>
        </div>

        <button onClick={handleApply} disabled={applying} className="px-5 py-2 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 transition disabled:opacity-60">
          {applying ? 'Applying...' : 'Apply Now'}
        </button>
      </div>
    </div>
  );
};

export default JobCards;
