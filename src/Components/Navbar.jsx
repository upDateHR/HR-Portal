import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const navRef = useRef(null);
  const userRef = useRef(null);
  const notifRef = useRef(null);

  // close dropdowns on outside click or Esc
  useEffect(() => {
    function onDocClick(e) {
      // if click is outside the whole nav, close mobile menu
      if (navRef.current && !navRef.current.contains(e.target)) {
        setMobileOpen(false);
      }

      // close user dropdown when click outside it
      if (userRef.current && !userRef.current.contains(e.target)) {
        setUserOpen(false);
      }

      // close notifications when click outside it
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotifOpen(false);
      }
    }
    function onKey(e) {
      if (e.key === "Escape") {
        setMobileOpen(false);
        setUserOpen(false);
        setNotifOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  // small helper used by the mobile menu items
  function MobileLink({ to, label }) {
    return (
      <Link
        to={to}
        className="block py-2 px-3 rounded-md hover:bg-gray-100"
        onClick={() => setMobileOpen(false)}
      >
        {label}
      </Link>
    );
  }

  return (
    <nav
      ref={navRef}
      className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40"
    >
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* brand */}
          <Link to="/" className="flex items-center gap-3">
            {/* <h1 className="text-2xl font-bold text-indigo-600">
              Iam<span className="text-gray-800">HR</span>
            </h1> */}
            {/* <img className="h-10" src="/hr.png" alt="" /> */}
            <img className="h-10" src="/hr1.png" alt="" />
          </Link>

          {/* center - nav links (md+) */}
          {/* <div className="hidden md:flex md:items-center md:space-x-6">
            <Link className="font-bold text-2xl" to="." label="Home">
              Home
            </Link>
            <Link to="dashboard" label="Dashboard">
              Dashboard
            </Link>
            <Link to="jobpage" label="Jobs">
              Jobs
            </Link>
            <Link to="internshippage" label="Internship">
              Internship
            </Link>
            <Link to="applicants" label="Applicants">
              Applicants
            </Link>
            <Link to="analytics" label="Analytics">
              Analytics
            </Link>
            <Link to="settings" label="Settings">
              Settings
            </Link>
          </div> */}

          {/* right - actions */}
          <div className="flex items-center gap-3">

            {/* Login button */}
            <Link
              to="signup"
              className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-purple-600 to-violet-500 text-white px-4 py-2 shadow-lg hover:from-purple-700 hover:to-violet-600 focus:outline-none focus:ring-4 focus:ring-indigo-200 text-sm font-medium"
            >
              Sign Up
            </Link>

            <Link
              to="login"
              className="px-4 py-2 rounded-full border border-slate-400 text-sm font-medium"
            >
              Sign In
            </Link>

            {/* mobile menu toggle */}
            <button
              onClick={() => setMobileOpen((s) => !s)}
              aria-controls="mobile-menu"
              aria-expanded={mobileOpen}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-violet-400"
              type="button"
            >
              <span className="sr-only">Toggle navigation</span>
              {mobileOpen ? (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M6 18L18 6M6 6l12 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M3 6h18M3 12h18M3 18h18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* mobile menu */}
      <div
        id="mobile-menu"
        className={`${mobileOpen ? "block" : "hidden"} md:hidden`}
      >
        <div className="px-4 pt-4 pb-6 space-y-2 border-t border-gray-100">
          {/* <MobileLink to="." label="Home" />
          <MobileLink to="dashboard" label="Dashboard" />
          <MobileLink to="jobs" label="My Jobs" />
          <MobileLink to="applicants" label="Applicants" />
          <MobileLink to="analytics" label="Analytics" />
          <MobileLink to="settings" label="Settings" /> */}

          <div className="pt-2">
            <Link
              to="signup"
              className="block w-full text-center py-2 rounded-full bg-violet-600 text-white font-medium"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
