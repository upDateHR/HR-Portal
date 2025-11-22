import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import "./Candidate.css"; // reuse or adapt Signup.css

import api from "../../api";
import { toast } from "react-toastify";

export default function Candidate() {
  const location = useLocation();
  const navigate = useNavigate();
  const selected = location.state?.selected; // "candidate" | "recruiter"

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    company: "",
  });
  const [loading, setLoading] = useState(false);

  // If someone lands here directly (no selected), send them back to signup
  useEffect(() => {
    if (!selected) {
      navigate("/signup", { replace: true });
    }
  }, [selected, navigate]);

  const validate = () => {
    if (!form.name.trim()) {
      toast.warn("Please enter your full name.", { position: "top-center" });
      return false;
    }
    if (!form.email.includes("@")) {
      toast.warn("Please enter a valid email address.", {
        position: "top-center",
      });
      return false;
    }
    if (form.password.length < 6) {
      toast.warn("Password must be at least 6 characters.", {
        position: "top-center",
      });
      return false;
    }
    if (selected === "recruiter" && !form.company.trim()) {
      toast.warn("Please enter your company name.", { position: "top-center" });
      return false;
    }
    return true;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (loading) return;
    if (!validate()) return;

    setLoading(true);
    try {
      const payload = {
        name: form.name,
        email: form.email,
        password: form.password,
        role: selected,
        company: form.company,
      };
      const res = await api.post("/auth/register", payload);
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("hr_token", token);
      toast.success("Account created — welcome!", { position: "top-center" });

      if (user?.role === "employer" || user?.role === "recruiter") {
        navigate("/company", { replace: true });
        return;
      }
      navigate("/candidate", { replace: true });
    } catch (error) {
      console.error("register error:", error?.response?.data || error.message);
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Registration failed. Please try again.";
      toast.error(message, { position: "bottom-center" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        {/* Left (same look) */}
        <div className="signup-left">
          <div className="left-gradient" />
          <div className="left-circle left-circle1" />
          <div className="left-circle left-circle2" />
          <h1 className="logo">IamHR</h1>
          <p className="left-desc">
            Join IamHR and find your dream job or recruit talented candidates.
          </p>
        </div>

        {/* Right (form) */}
        <div className="signup-right">
          <div className="step-header">
            <button
              className="back-btn"
              onClick={() => navigate(-1)}
              aria-label="Go back"
            >
              <i className="fa-solid fa-arrow-left" /> Back
            </button>
            <span className="pill">
              {selected === "candidate" ? "Candidate" : "Recruiter"}
            </span>
          </div>

          <h2 className="right-title">Tell us about you</h2>
          <p className="right-sub">
            Create your {selected} account to get started.
          </p>

          <form className="form" onSubmit={handleRegister}>
            <div className="form-row">
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="John Doe"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                aria-required="true"
                autoComplete="name"
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
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                aria-required="true"
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
                aria-required="true"
                autoComplete="new-password"
                disabled={loading}
              />
              <small className="hint">At least 6 characters</small>
            </div>

            {selected === "recruiter" && (
              <div className="form-row">
                <label htmlFor="company">Company</label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  placeholder="Acme Corp"
                  value={form.company}
                  onChange={(e) =>
                    setForm({ ...form, company: e.target.value })
                  }
                  disabled={loading}
                />
              </div>
            )}

            <button
              type="submit"
              className="continue-btn"
              disabled={loading}
              aria-busy={loading}
            >
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>

          <p className="login-text form-login">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
