import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../Components/firebase";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  // Map common Firebase errors to friendlier messages
  const friendlyMessage = (err) => {
    const code = err?.code || "";
    if (code.includes("auth/wrong-password")) return "Incorrect password.";
    if (code.includes("auth/user-not-found")) return "No account found with that email.";
    if (code.includes("auth/invalid-email")) return "Please enter a valid email address.";
    if (code.includes("auth/too-many-requests")) return "Too many attempts — try again later.";
    return err?.message || "Login failed — please try again.";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    try {
      const credential = await signInWithEmailAndPassword(auth, form.email, form.password);

      toast.success("Logged in successfully!", { position: "top-center" });

      // Optional: fetch user doc to route based on role (candidate / recruiter)
      try {
        const uid = credential.user?.uid;
        if (uid) {
          const userDoc = await getDoc(doc(db, "Users", uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            // route based on stored role (adjust paths as needed)
            if (data?.role === "recruiter") {
              navigate("/RecruiterPage", { replace: true });
              return;
            } else if (data?.role === "candidate") {
              navigate("/CandidatePage", { replace: true });
              return;
            }
          }
        }
      } catch (fetchErr) {
        // non-fatal: if fetching fails just fall back to default route
        console.error("Failed to fetch user doc:", fetchErr);
      }

      // default route if role not found
      navigate("/signup", { replace: true });
    } catch (error) {
      console.error("login error:", error.code, error.message);
      toast.error(friendlyMessage(error), { position: "bottom-center" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        {/* Left section (same as Signup) */}
        <div className="signup-left">
          <div className="left-gradient" />
          <div className="left-circle left-circle1" />
          <div className="left-circle left-circle2" />
          <h1 className="logo">IamHR</h1>
          <p className="left-desc">
            Empowering your career — whether you're hiring or getting hired.
          </p>
        </div>

        {/* Right section (login form) */}
        <div className="signup-right">
          <h2 className="right-title">Welcome back</h2>
          <p className="right-sub">Log in to your account</p>

          <form className="form" onSubmit={handleSubmit}>
            <div className="form-row">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                autoComplete="email"
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
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
                autoComplete="current-password"
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              className="continue-btn"
              disabled={loading}
              aria-busy={loading}
            >
              {loading ? "Signing in…" : "Log in"}
            </button>
          </form>

          <p className="login-text form-login">
            Don't have an account?{" "}
            <Link to="/signup" className="link">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
