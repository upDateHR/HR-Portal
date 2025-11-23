import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import API from "../../api";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const navRef = useRef(null);
  const userRef = useRef(null);
  const notifRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(null);

  // load user from localStorage or from backend when token present
  useEffect(() => {
    try {
      const raw =
        localStorage.getItem("hr_user") || localStorage.getItem("user");
      if (raw) {
        setUser(JSON.parse(raw));
        return;
      }
    } catch (e) {
      // ignore parse errors
    }

    const token =
      localStorage.getItem("hr_token") || localStorage.getItem("token");
    if (token) {
      API.get("/auth/me")
        .then((res) => {
          if (res?.data?.user) setUser(res.data.user);
        })
        .catch(() => {});
    }
  }, []);

  // close dropdowns on outside click or Esc
  useEffect(() => {
    function onDocClick(e) {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setMobileOpen(false);
      }
      if (userRef.current && !userRef.current.contains(e.target)) {
        setUserOpen(false);
      }
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

  // Mobile menu link helper
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

  const handleSignOut = () => {
    try {
      localStorage.removeItem("hr_token");
      localStorage.removeItem("token");
      localStorage.removeItem("hr_user");
      localStorage.removeItem("user");
    } catch (e) {}
    // redirect to public landing
    window.location.replace("/");
  };

  const activeClass = (path) =>
    location.pathname === path
      ? "font-bold text-purple-600 text-xl"
      : "text-gray-700";

  return (
    <nav
      ref={navRef}
      className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40"
    >
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* brand */}
          <Link to="/candidate" className="flex items-center gap-3">
            {/* <h1 className="text-2xl font-bold text-indigo-600">
              Iam<span className="text-gray-800">HR</span>
            </h1> */}
            {/* <img className="h-10" src="/hr.png" alt="" /> */}
            <img className="h-10" src="/hr1.png" alt="" />
          </Link>

          {/* center - nav links (md+) */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <Link className={activeClass("/candidate")} to="." aria-label="Home">
              Home
            </Link>
            <Link to="dashboard" className={activeClass("/candidate/dashboard")} aria-label="Dashboard">
              Dashboard
            </Link>
            <Link to="jobpage" className={activeClass("/candidate/jobpage")} aria-label="Jobs">
              Jobs
            </Link>
            <Link to="internshippage" className={activeClass("/candidate/internshippage")} aria-label="Internship">
              Internship
            </Link>
            <Link to="analytics" className={activeClass("/candidate/analytics")} aria-label="Analytics">
              Analytics
            </Link>
            <Link to="resumebuilder" className={activeClass("/candidate/resumebuilder")} aria-label="ResumeBuilder">
              Resume Maker
            </Link>
            <Link to="settings" className={activeClass("/candidate/settings")} aria-label="Settings">
              Settings
            </Link>
          </div>

          {/* right - actions */}
          <div className="flex items-center gap-3">
            {/* Employer CTA removed: Post a Job */}

            {/* Notification bell */}
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => setNotifOpen((s) => !s)}
                aria-haspopup="true"
                aria-expanded={notifOpen}
                className="relative p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-violet-400"
                aria-label="Open notifications"
                type="button"
              >
                <svg
                  className="w-6 h-6 text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>

                {/* unread badge */}
                <span className="absolute top-0.5 right-0.5 block w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white"></span>
              </button>

              {/* notif dropdown */}
              <div
                role="menu"
                className={`origin-top-right absolute right-0 mt-2 w-80 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 transform transition-all duration-150 ${
                  notifOpen
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-95 pointer-events-none"
                }`}
              >
                <div className="px-4 py-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-gray-900">
                      Notifications
                    </p>
                    <button
                      onClick={() => setNotifOpen(false)}
                      className="text-xs text-violet-600 hover:underline focus:outline-none"
                    >
                      Mark all read
                    </button>
                  </div>
                </div>
                <div className="divide-y">
                  <div className="p-3">
                    <p className="text-sm font-medium text-gray-800">
                      No new notifications
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      You're all caught up 🎉
                    </p>
                  </div>
                  <div className="p-2 text-center">
                    <Link
                      to="notifications"
                      className="text-sm px-3 py-2 rounded-md hover:bg-gray-50 text-gray-700 inline-block"
                    >
                      View all
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* user avatar + dropdown */}
            <div className="relative" ref={userRef}>
              <button
                onClick={() => setUserOpen((s) => !s)}
                aria-haspopup="true"
                aria-expanded={userOpen}
                className="inline-flex items-center rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-400"
                aria-label="Open user menu"
                type="button"
              >
                <img
                  src="/logo.png"
                  alt="User avatar"
                  className="w-10 h-10 rounded-full border border-gray-200"
                />
              </button>

              <div
                role="menu"
                className={`origin-top-right absolute right-0 mt-2 w-48 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 transform transition-all duration-150 ${
                  userOpen
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-95 pointer-events-none"
                }`}
              >
                <div className="px-4 py-3">
                  <p className="text-sm font-semibold text-gray-900">
                    {user?.name || "Guest"}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {user?.email || "not-signed-in"}
                  </p>
                </div>
                <div className="py-1">
                  <Link
                    to="dashboard"
                    className="block px-4 py-2 text-sm hover:bg-gray-50 text-gray-700"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="settings"
                    className="block px-4 py-2 text-sm hover:bg-gray-50 text-gray-700"
                  >
                    Settings
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 text-gray-700"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            </div>

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
          <MobileLink to="." label="Home" />
          <MobileLink to="dashboard" label="Dashboard" />
          <MobileLink to="jobs" label="My Jobs" />
          {/* Applicants removed from mobile menu (employer-only) */}
          <MobileLink to="analytics" label="Analytics" />
          <MobileLink to="resumebuilder" label="ResumeBuilder" />
          <MobileLink to="settings" label="Settings" />

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
