import React, { useEffect, useState } from "react";
import api from '../../api'
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";

const RecruiterPage = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadMe() {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setUserDetails(null);
          setLoading(false);
          return;
        }
        const res = await api.get('/auth/me', { headers: { Authorization: `Bearer ${token}` } });
        setUserDetails(res.data.user);
      } catch (err) {
        console.error('Error fetching user data:', err?.response?.data || err.message);
        setError(err?.response?.data?.message || 'Failed to load user data.');
        setUserDetails(null);
      } finally {
        setLoading(false);
      }
    }

    loadMe();
  }, []);

  const handleLogout = async () => {
    try {
      // clear local token and redirect
      localStorage.removeItem('token');
      toast.success('Logged out successfully.', { position: 'top-center' });
      navigate('/login', { replace: true });
    } catch (err) {
      console.error('Error signing out:', err);
      toast.error('Failed to log out. Try again.', { position: 'bottom-center' });
    }
  };

  // While we check auth state, show loading
  if (loading) {
    return <div>Loading...</div>;
  }

  // If not logged in, redirect to login
  if (!userDetails) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="home-container">
      {error && <p className="error-text">{error}</p>}


      {/* Left section  */}
      <div className="signup-container">
        <div className="signup-card">
          <div className="signup-left">
            <div className="left-gradient" />
            <div className="left-circle left-circle1" />
            <div className="left-circle left-circle2" />
            <h1 className="logo">IamHR</h1>
          </div>

          {/* Right section */}
          <div className="signup-right">
            <h2 className="right-title">Welcome</h2>
            <div className="user-card">
              <p>
                <strong>Email:</strong> {userDetails.email}
              </p>
              <p>
                <strong>Full Name:</strong> {userDetails.name || "—"}
              </p>
              {userDetails.company && (
                <p>
                  <strong>Company:</strong> {userDetails.company}
                </p>
              )}
              {userDetails.role && (
                <p>
                  <strong>Role:</strong> {userDetails.role}
                </p>
              )}
            </div>
            <div style={{ marginTop: 16 }}>
              <button className="continue-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterPage;
