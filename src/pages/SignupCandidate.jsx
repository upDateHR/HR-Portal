import React, { useState } from "react";
import "./AuthStyles.css";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase";

const SignupCandidate = ({ setCurrentView }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ---------------------------
  // 🔥 Candidate Signup Logic
  // ---------------------------
  const handleSignup = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);

    try {
      // 1️⃣ Create Firebase Auth user
      const userCred = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      const uid = userCred.user.uid;

      // 2️⃣ Save profile in Firestore
      await setDoc(doc(db, "users", uid), {
        uid,
        name: form.name,
        email: form.email,
        role: "candidate",
        createdAt: serverTimestamp(),

        // future fields for profile page
        skills: [],
        resumeUrl: "",
        profilePic: "",
      });

      // 3️⃣ Temporary manual redirect (App.jsx authentication listener will also handle it)
      alert("Signup Successful! 🎉");
      setCurrentView("student_home");
    } catch (err) {
      console.error("SIGNUP ERROR:", err);
      alert(err.message || "Signup failed");
    }

    setLoading(false);
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        
        <div className="signup-left">
          <div className="left-gradient" />
          <div className="left-circle left-circle1" />
          <div className="left-circle left-circle2" />
          <h1 className="logo">IamHR</h1>
          <p className="left-desc">
            Compete, learn, and apply for jobs and internships.
          </p>
        </div>

        <div className="signup-right">
          <h2 className="right-title">Candidate Signup</h2>
          <p className="right-sub">Create your account to start applying.</p>

          <form onSubmit={handleSignup}>
            <div className="form-row">
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="John Doe"
                value={form.name}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>

            <div className="form-row">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>

            <div className="form-row">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>

            <button 
              type="submit" 
              className="continue-btn"
              disabled={loading}
            >
              {loading ? "Signing up…" : "Sign Up"}
            </button>
          </form>

          <p className="login-text">
            Already have an account?{" "}
            <span 
              className="link"
              onClick={() => setCurrentView("firebase_login")}
            >
              Login
            </span>
          </p>
        </div>

      </div>
    </div>
  );
};

export default SignupCandidate;
