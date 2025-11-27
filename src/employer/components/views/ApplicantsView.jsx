import React, { useState, useEffect } from "react";
import {
  Search,
  Loader2,
  FileText,
} from "lucide-react";

import { getApplicants, updateApplicantStatus } from "../../helpers/employerService";

// ------------------
// Mobile Applicant Card
// ------------------
const MobileApplicantCard = ({ app, onStatusChange }) => (
  <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition duration-200 mb-4">
    <div className="flex justify-between items-start border-b border-gray-100 pb-2 mb-2">
      <div>
        <h4 className="text-lg font-bold text-gray-900">{app.name}</h4>
        <p className="text-sm text-gray-500">
          Applied for{" "}
          <span className="font-semibold text-purple-600">
            {app.jobId?.title || "Job"}
          </span>
        </p>
      </div>

      {/* Status Badge with colors */}
      <span
        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full shadow-inner
          ${app.status === "pending" && "bg-gray-200 text-gray-700"}
          ${app.status === "shortlisted" && "bg-green-100 text-green-700"}
          ${app.status === "rejected" && "bg-red-100 text-red-700"}
        `}
      >
        {app.status}
      </span>
    </div>

    <div className="grid grid-cols-1 gap-y-1 text-sm">
      <p className="text-gray-700">
        Email: <span className="font-semibold text-gray-800">{app.email}</span>
      </p>
      <p className="text-gray-700">
        Phone: {app.phone || <span className="italic text-gray-400">N/A</span>}
      </p>
      <p className="text-gray-700">
        Applied: {new Date(app.createdAt).toDateString()}
      </p>
    </div>

    <div className="flex justify-between items-center pt-3 border-t border-gray-100 mt-3">
      <button className="flex items-center space-x-1.5 text-purple-600 hover:text-purple-700 text-sm font-medium transition duration-150 p-2 rounded-lg hover:bg-purple-50">
        <FileText className="h-4 w-4" />
        <span>View Resume</span>
      </button>

      <div className="flex gap-2">
        <button
          onClick={() => onStatusChange(app._id, "shortlisted")}
          className="px-3 py-1 text-xs font-semibold bg-green-100 text-green-700 rounded-full hover:bg-green-200"
        >
          Shortlist
        </button>
        <button
          onClick={() => onStatusChange(app._id, "rejected")}
          className="px-3 py-1 text-xs font-semibold bg-red-100 text-red-700 rounded-full hover:bg-red-200"
        >
          Reject
        </button>
      </div>
    </div>
  </div>
);

// ------------------
// Main Component
// ------------------
const ApplicantsView = () => {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getApplicants();
        setApps(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Applicants fetch failed:", err);
        setApps([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await updateApplicantStatus(id, status);

      setApps((prev) =>
        prev.map((app) =>
          app._id === id ? { ...app, status } : app
        )
      );
    } catch (err) {
      console.error("Status update failed:", err);
    }
  };

  const filteredApps = apps.filter((a) => {
    const name = a.name?.toLowerCase() || "";
    const jobTitle = a.jobId?.title?.toLowerCase() || "";
    const matchesSearch =
      name.includes(searchTerm.toLowerCase()) ||
      jobTitle.includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  if (loading) {
    return (
      <div className="text-center py-20">
        <Loader2 className="animate-spin h-8 w-8 mx-auto text-purple-600" />
        <p className="mt-2 text-gray-500">Loading Applicants...</p>
      </div>
    );
  }

  return (
    <div className="py-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Applicants</h1>
      <p className="text-lg text-gray-600 mb-6">
        Review and manage candidates who applied to your job posts.
      </p>

      <div className="bg-white p-5 rounded-2xl shadow-xl border border-gray-100 mb-8 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 items-center">
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by Name or Job Title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 border border-gray-300 rounded-full shadow-inner text-gray-700 focus:border-purple-500 focus:ring-purple-500 outline-none transition duration-150"
          />
        </div>
      </div>

      {/* MOBILE LIST */}
      <div className="md:hidden">
        {filteredApps.length ? (
          filteredApps.map((app, i) => (
            <MobileApplicantCard
              key={i}
              app={app}
              onStatusChange={handleStatusChange}
            />
          ))
        ) : (
          <p className="text-center py-10 text-lg text-gray-500 font-medium bg-white rounded-xl shadow-lg border border-gray-100">
            No applicants found matching your criteria.
          </p>
        )}
      </div>

      {/* DESKTOP TABLE */}
      <div className="hidden md:block bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                  Applicant
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                  Job Applied
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                  Email
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                  Phone
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                  Applied On
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-100">
              {filteredApps.map((app, i) => (
                <tr
                  key={i}
                  className="hover:bg-purple-50/50 transition duration-150"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-semibold">{app.name}</div>
                    <span
                      className={`px-2 mt-1 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full shadow-inner
                        ${app.status === "pending" && "bg-gray-200 text-gray-700"}
                        ${app.status === "shortlisted" && "bg-green-100 text-green-700"}
                        ${app.status === "rejected" && "bg-red-100 text-red-700"}
                      `}
                    >
                      {app.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-purple-600 font-medium">
                    {app.jobId?.title || "—"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {app.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {app.phone || (
                      <span className="italic text-gray-400">N/A</span>
                    )}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {new Date(app.createdAt).toDateString()}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <button className="flex items-center space-x-1.5 text-purple-600 hover:text-purple-700 text-sm font-medium transition duration-150 p-2 rounded-lg hover:bg-purple-100/70">
                        <FileText className="h-4 w-4" />
                        <span>Resume</span>
                      </button>

                      <button
  onClick={() => handleStatusChange(app._id, "shortlisted")}
  disabled={app.status !== "pending"}
  className={`px-3 py-1 text-xs font-semibold rounded-full transition 
    ${app.status !== "pending"
      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
      : "bg-green-100 text-green-700 hover:bg-green-200"
    }`}
>
  Shortlist
</button>

<button
  onClick={() => handleStatusChange(app._id, "rejected")}
  disabled={app.status !== "pending"}
  className={`px-3 py-1 text-xs font-semibold rounded-full transition 
    ${app.status !== "pending"
      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
      : "bg-red-100 text-red-700 hover:bg-red-200"
    }`}
>
  Reject
</button>

                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {!loading && !filteredApps.length && (
        <div className="hidden md:block text-center py-10 text-lg text-gray-500 font-medium bg-white rounded-xl shadow-lg border border-gray-100 mt-6">
          No applicants found matching your criteria.
        </div>
      )}
    </div>
  );
};

export default ApplicantsView;
