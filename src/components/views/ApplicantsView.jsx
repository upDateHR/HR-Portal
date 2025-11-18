import React, { useEffect, useState } from "react";
import {
  Search,
  Loader2,
  FileText,
  CheckCircle,
  XCircle,
  Mail, 
} from "lucide-react";

import {
  collection,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  query, // 💥 NEEDED FOR FILTERING
  where // 💥 NEEDED FOR FILTERING
} from "firebase/firestore";
import { db, auth } from "../../firebase"; // 💥 auth import is now essential

// =======================
// Helper: Format Date (NO CHANGE)
// =======================
const formatDate = (ts) => {
  try {
    return ts?.toDate().toDateString();
  } catch {
    return "—";
  }
};

// =======================
// Helper: Status Classes (UI REMAINS UNCHANGED)
// =======================
const getAppStatusClasses = (status) => {
    switch (status) {
        case "Shortlisted":
            return "bg-green-100 text-green-700 ring-green-500/50";
        case "Rejected":
            return "bg-red-100 text-red-700 ring-red-500/50";
        case "Interviewing":
            return "bg-yellow-100 text-yellow-700 ring-yellow-500/50";
        case "Hired":
            return "bg-purple-100 text-purple-700 ring-purple-500/50";
        case "Applied":
        default:
            return "bg-blue-100 text-blue-700 ring-blue-500/50";
    }
}

// =======================
// Applicants View Component
// =======================
const ApplicantsView = () => {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  
  const uid = auth.currentUser?.uid; // 💥 Get logged-in user ID

  // =======================
  // 💥 LOAD APPLICANTS LOGIC FIX
  // =======================
  useEffect(() => {
    if (!uid) { // Ensure user is logged in
        setLoading(false);
        return;
    }
    
    const loadApplicants = async () => {
      try {
        // 💥 FIX: Query to fetch only applications matching the recruiterId
        const applicationsQuery = query(
            collection(db, "applications"),
            where("recruiterId", "==", uid) 
        );

        const snap = await getDocs(applicationsQuery);
        const raw = snap.docs.map((d) => ({ id: d.id, ...d.data() }));

        const enriched = await Promise.all(
          raw.map(async (a) => {
            // Fetch job details (unchanged logic, ensures title/company info is displayed)
            let jobTitle = "Job";
            let company = "Company";

            if (a.jobId) {
              const jobSnap = await getDoc(doc(db, "jobs", a.jobId));
              if (jobSnap.exists()) {
                const job = jobSnap.data();
                jobTitle = job.title || "Job";
                company = job.companyName || "Company";
              }
            }

            return {
              ...a,
              jobTitle: jobTitle,
              companyName: company,
              jobDisplay: `${jobTitle} — ${company}`,
              status: a.status || "Applied", 
            };
          })
        );

        setApps(enriched);
      } catch (err) {
        console.error("Applicants load error:", err);
        setApps([]);
      }
      setLoading(false);
    };

    loadApplicants();
  }, [uid]); // Depend on UID

  // =======================
  // UPDATE STATUS (NO CHANGE TO LOGIC)
  // =======================
  const updateStatus = async (appId, newStatus) => {
    try {
      await updateDoc(doc(db, "applications", appId), {
        status: newStatus,
      });

      setApps((prev) =>
        prev.map((a) =>
          a.id === appId ? { ...a, status: newStatus } : a
        )
      );

      alert(`Candidate ${newStatus}!`);
    } catch (err) {
      alert("Failed to update status");
    }
  };

  // =======================
  // Search + Filter (NO CHANGE TO LOGIC)
  // =======================
  const filteredApps = apps.filter((a) => {
    const term = searchTerm.toLowerCase();
    const matchSearch =
      a.name?.toLowerCase().includes(term) ||
      a.jobTitle?.toLowerCase().includes(term) ||
      a.companyName?.toLowerCase().includes(term);

    const matchStatus =
      statusFilter === "All" || 
      (statusFilter === "Applied" && (!a.status || a.status === "Applied")) ||
      a.status === statusFilter;

    return matchSearch && matchStatus;
  });

  // Loading State (UI REMAINS UNCHANGED)
  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <Loader2 className="animate-spin h-8 w-8 text-purple-600 mx-auto" />
          <p className="mt-4 text-gray-600 font-medium">
            Loading Applicants...
          </p>
        </div>
      </div>
    );
  }

  // =======================
  // MOBILE CARD VIEW (UI REMAINS UNCHANGED)
  // =======================
  const MobileApplicantCard = ({ app }) => (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 mb-4 transition duration-150 hover:shadow-md">
      <div className="flex justify-between items-start border-b border-gray-100 pb-3 mb-3">
        {/* Candidate Info */}
        <div>
          <h4 className="text-base font-semibold text-gray-900">{app.name}</h4>
          <p className="text-sm text-purple-600 mt-1">{app.jobTitle}</p>
          <p className="text-xs text-gray-500">{app.companyName}</p>
        </div>

        {/* Status Badge */}
        <span
          className={`px-3 py-1 text-xs font-semibold rounded-full ring-1 ${getAppStatusClasses(
            app.status
          )}`}
        >
          {app.status || "Applied"}
        </span>
      </div>

      <div className="flex justify-between items-center text-sm">
        {/* Contact/Date Info */}
        <div className="space-y-1">
          <p className="text-gray-600 flex items-center">
             <Mail className="h-4 w-4 text-gray-400 mr-2" />
             <a href={`mailto:${app.email}`} className="text-purple-600 hover:underline">{app.email || 'N/A'}</a>
          </p>
          <p className="text-gray-500">
            Applied: <span className="font-medium">{formatDate(app.appliedAt)}</span>
          </p>
        </div>

        {/* Actions */}
        <div className="flex space-x-2">
          {app.resumeURL && (
            <a
              href={app.resumeURL}
              target="_blank"
              rel="noreferrer"
              className="text-purple-600 hover:bg-purple-50 p-2 rounded-full transition duration-150"
              title="View Resume"
            >
              <FileText className="h-5 w-5" />
            </a>
          )}
          <button
            onClick={() => updateStatus(app.id, "Shortlisted")}
            className="text-green-600 hover:bg-green-50 p-2 rounded-full transition duration-150"
            title="Shortlist"
          >
            <CheckCircle className="h-5 w-5" />
          </button>
          <button
            onClick={() => updateStatus(app.id, "Rejected")}
            className="text-red-600 hover:bg-red-50 p-2 rounded-full transition duration-150"
            title="Reject"
          >
            <XCircle className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
  // =======================
  // MAIN RENDER (UI REMAINS UNCHANGED)
  // =======================
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          Applicant Tracking
        </h1>
        <p className="mt-1 text-base text-gray-600">
          Review and manage candidates who applied to your job posts.
        </p>
      </header>

      {/* Search + Filter Bar */}
      <div className="bg-white p-4 rounded-lg shadow-md border border-gray-100 mb-8 flex flex-col md:flex-row md:items-center gap-3">
        
        {/* Search */}
        <div className="relative w-full md:w-1/2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, job title, company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:border-purple-500 focus:ring-purple-500 shadow-sm transition duration-150 text-sm"
          />
        </div>

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:border-purple-500 focus:ring-purple-500 shadow-sm transition duration-150 text-sm w-full md:w-auto"
        >
          <option value="All">All Statuses</option>
          <option value="Applied">Applied</option>
          <option value="Shortlisted">Shortlisted</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>
      
      {/* Mobile List View */}
      <div className="md:hidden">
        {filteredApps.length > 0 ? (
          filteredApps.map((app) => <MobileApplicantCard key={app.id} app={app} />)
        ) : (
          <div className="text-center py-10 text-gray-500 font-medium">
            No applicants found matching your search or filters.
          </div>
        )}
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white rounded-lg shadow-md border border-gray-100 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-1/4">Candidate</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-1/4">Job / Company</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-1/8">Applied</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-1/8">Status</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-1/4">Actions</th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-100">
            {filteredApps.map((app) => (
              <tr key={app.id} className="hover:bg-purple-50/30 transition duration-150">
                {/* Name + Phone/Email */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-base font-semibold text-gray-800">{app.name}</div>
                  <div className="text-sm text-gray-500">{app.email || app.phone || 'N/A'}</div>
                </td>

                {/* Job + Company */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-purple-700">{app.jobTitle}</div>
                  <div className="text-xs text-gray-500">{app.companyName}</div>
                </td>

                {/* Applied Date */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {formatDate(app.appliedAt)}
                </td>

                {/* Status Badge */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ring-1 ${getAppStatusClasses(
                      app.status
                    )}`}
                  >
                    {app.status || "Applied"}
                  </span>
                </td>

                {/* Actions */}
                <td className="px-6 py-4 whitespace-nowrap flex items-center gap-3">
                  {/* Resume */}
                  <a
                    href={app.resumeURL}
                    target="_blank"
                    rel="noreferrer"
                    className={`p-2 rounded-full transition duration-150 ${app.resumeURL ? 'text-purple-600 hover:bg-purple-50' : 'text-gray-400 cursor-not-allowed'}`}
                    title={app.resumeURL ? "View Resume" : "Resume Not Provided"}
                  >
                    <FileText className="h-5 w-5" />
                  </a>

                  {/* Shortlist */}
                  <button
                    onClick={() => updateStatus(app.id, "Shortlisted")}
                    className="text-green-600 hover:bg-green-50 p-2 rounded-full transition duration-150"
                    title="Shortlist Candidate"
                  >
                    <CheckCircle className="h-5 w-5" />
                  </button>

                  {/* Reject */}
                  <button
                    onClick={() => updateStatus(app.id, "Rejected")}
                    className="text-red-600 hover:bg-red-50 p-2 rounded-full transition duration-150"
                    title="Reject Candidate"
                  >
                    <XCircle className="h-5 w-5" />
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredApps.length === 0 && (
          <div className="text-center py-10 text-gray-500 font-medium">
            No applicants found matching your search or filters.
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicantsView;