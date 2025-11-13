import React, { useEffect, useState } from "react";
import { auth, db } from "../Components/firebase";

import { doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";

const CandidatePage = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Subscribe to auth state changes and cleanup on unmount
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      try {
        if (!user) {
          // not logged in
          setUserDetails(null);
          setLoading(false);
          return;
        }

        // logged in — fetch user doc
        const docRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserDetails(docSnap.data());
        } else {
          // user doc missing — you might route to a profile setup page here
          console.warn("User document not found for uid:", user.uid);
          setUserDetails({ email: user.email }); // minimal fallback
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to load user data.");
      } finally {
        setLoading(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      toast.success("Logged out successfully.", { position: "top-center" });
      navigate("/login", { replace: true });
    } catch (err) {
      console.error("Error signing out:", err);
      toast.error("Failed to log out. Try again.", {
        position: "bottom-center",
      });
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

export default CandidatePage;
