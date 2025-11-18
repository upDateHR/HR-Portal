import React, { useState } from "react";
import "./AuthStyles.css"; 

const SignupRole = ({ setCurrentView }) => {
  const [selected, setSelected] = useState(null);

  const options = [
    {
      key: "candidate",
      title: "Sign up as a Candidate",
      desc: "Compete, learn, and apply for jobs and internships",
      icon: "fa-solid fa-user",
      targetView: "signup_candidate",
    },
    {
      key: "recruiter",
      title: "Sign up as a Recruiter",
      desc: "Host competitions, hire talent, and offer career opportunities",
      icon: "fa-solid fa-magnifying-glass",
      targetView: "signup_recruiter",
    },
  ];

  const handleContinue = () => {
    if (!selected) return;

    const target = options.find(opt => opt.key === selected);
    if (target) {
      setCurrentView(target.targetView);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        
        {/* LEFT UI */}
        <div className="signup-left">
          <div className="left-gradient"></div>
          <div className="left-circle left-circle1"></div>
          <div className="left-circle left-circle2"></div>
          <h1 className="logo">IamHR</h1>
          <p className="left-desc">
            Join and find your dream job or recruit talented candidates.
          </p>
        </div>

        {/* RIGHT UI */}
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
                    <i className={icon}></i>
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
              Already have an account?
              <span 
                className="link"
                onClick={() => setCurrentView("firebase_login")} 
                role="button"
              >
                Login
              </span>
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
};

export default SignupRole;
