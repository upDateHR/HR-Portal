import React, { useState } from "react";
import "./AuthStyles.css";

import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

const LoginPage = ({ setCurrentView }) => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  // -----------------------------
  // LOGIN HANDLER (FIREBASE)
  // -----------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    try {
      // 1️⃣ Login with Firebase Auth
      const userCred = await signInWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      const uid = userCred.user.uid;

      // 2️⃣ Fetch user role from Firestore
      const ref = doc(db, "users", uid);
      const snap = await getDoc(ref);

      if (!snap.exists()) {
        alert("User record missing in database.");
        setLoading(false);
        return;
      }

      const data = snap.data();
      const role = data.role;

      console.log("LOGIN SUCCESS:", role);

      // 3️⃣ TEMPORARY UI redirect (Actual routing handled by App.jsx listener)
      if (role === "candidate") {
        setCurrentView("student_home");
      } else if (role === "recruiter") {
        setCurrentView("home");
      } else {
        alert("Invalid role.");
      }
    } catch (err) {
      console.error("LOGIN ERROR:", err);
      alert("Invalid email or password.");
    }

    setLoading(false);
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        {/* LEFT SIDE */}
        <div className="signup-left">
          <div className="left-gradient" />
          <div className="left-circle left-circle1" />
          <div className="left-circle left-circle2" />
          <h1 className="logo">IamHR</h1>
          <p className="left-desc">
            Empowering your career — whether you're hiring or getting hired.
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="signup-right">
          <h2 className="right-title">Welcome back</h2>
          <p className="right-sub">Log in to your account</p>

          <form className="form" onSubmit={handleSubmit}>
            <div className="form-row">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
                required
                disabled={loading}
              />
            </div>

            <div className="form-row">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
                required
                disabled={loading}
              />
            </div>

            <button type="submit" className="continue-btn" disabled={loading}>
              {loading ? "Logging in…" : "Log in"}
            </button>
          </form>

          <p className="login-text form-login">
            Don't have an account?{" "}
            <span
              className="link"
              onClick={() => setCurrentView("signup_role")}
            >
              Sign up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
