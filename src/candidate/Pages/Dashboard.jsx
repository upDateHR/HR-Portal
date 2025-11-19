import React, { useEffect, useState } from "react";
import API from "../../api";

const Dashboard = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await API.get('/applications');
        // API returns an array
        setApplications(res.data || []);
      } catch (err) {
        console.error('Failed to load applications', err);
        setApplications([]);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center h-48">
      <p className="text-lg text-gray-600">Loading your applications...</p>
    </div>
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Applications</h1>

      {applications.length === 0 ? (
        <div className="rounded-lg bg-white shadow p-6 text-center">
          <p className="text-gray-600">You haven't applied to any jobs or internships yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {applications.map((a) => (
            <div key={a._id} className="bg-white rounded-lg shadow p-4 flex justify-between items-center">
              <div>
                <div className="text-lg font-semibold">{a.job?.title ?? 'Unknown Role'}</div>
                <div className="text-sm text-gray-500">{a.job?.companyName ?? ''} {a.job?.location ? `• ${a.job.location}` : ''}</div>
                <div className="text-sm text-gray-400 mt-1">Applied {new Date(a.createdAt).toLocaleString()}</div>
              </div>
              <div className="flex flex-col items-end space-y-2">
                <div className={`px-3 py-1 rounded-full text-sm font-semibold ${a.status === 'submitted' ? 'bg-yellow-100 text-yellow-800' : a.status === 'accepted' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                  {a.status}
                </div>
                <div>
                  <a
                    className="inline-block mt-1 px-3 py-1 bg-white border border-gray-200 rounded text-sm text-indigo-600 hover:bg-indigo-50"
                    href={`/jobpage/${a.job?._id}`}
                  >
                    View Post
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
