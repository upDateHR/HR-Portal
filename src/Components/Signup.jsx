import React, { useState } from "react";
import "./Signup.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function Signup() {
  const [selected, setSelected] = useState(null);

  const navigate = useNavigate();

  const options = [
    {
      key: "candidate",
      title: "Sign up as a Candidate",
      desc: "Compete, learn, and apply for jobs and internships",
      icon: faUser,
    },
    {
      key: "recruiter",
      title: "Sign up as a Recruiter",
      desc: "Host competitions, hire talent, and offer career opportunities",
      icon: faMagnifyingGlass,
    },
  ];

  const handleContinue = () => {
    if (!selected) return;
    // Route to the appropriate registration page based on selection
    if (selected === "candidate") {
      navigate("/candidate/signup", { state: { selected } });
    } else {
      // recruiter -> employer/company signup
      navigate("/company/signup", { state: { selected } });
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        {/* Left section */}
        <div className="signup-left">
          <div className="left-gradient"></div>
          <div className="left-circle left-circle1"></div>
          <div className="left-circle left-circle2"></div>
          <h1 className="logo">IamHR</h1>
          <p className="left-desc">
            Join IamHR and find your dream job or recruit talented candidates.
          </p>
        </div>

        {/* Right section */}
        <div className="signup-right">
          <h2 className="right-title">Create a new account</h2>
          <p className="right-sub">Choose how you want to get started</p>

          <div className="options">
            {options.map(({ key, title, desc, icon }) => {
              const active = selected === key;
              return (
                <button
                  key={key}
                  className={`option ${active ? "active" : ""}`}
                  onClick={() => setSelected(key)}
                >
                  <div className={`icon-box ${active ? "active-icon" : ""}`}>
                    <FontAwesomeIcon icon={icon} className="fa-icon" />
                  </div>
                  <div className="option-text">
                    <h3>{title}</h3>
                    <p>{desc}</p>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="signup-footer">
            <p className="login-text">
              Already have an account? <a href="/login">Login</a>
            </p>
            <button
              className={`continue-btn ${!selected ? "disabled" : ""}`}
              disabled={!selected}
              onClick={handleContinue}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
