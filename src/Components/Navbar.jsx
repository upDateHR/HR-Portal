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

  return (
    <nav
      ref={navRef}
      className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40"
    >
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* brand */}
          <Link to="/" className="flex items-center gap-3">
            {/* <svg
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
              className="shrink-0"
            >
              <rect width="24" height="24" rx="6" fill="#8200DA" />
              <path d="M7 13h10v2H7z" fill="white" opacity="0.95" />
            </svg> */}
            <span className="text-2xl font-semibold text-gray-900 select-none">
              IamHR
            </span>
          </Link>

          {/* center - nav links (md+) */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <NavLink className="font-bold text-2xl" to="/" label="Home" active />
            <NavLink to="/dashboard" label="Dashboard" />
            <NavLink to="/jobpage" label="Jobs" />
            <NavLink to="/internshippage" label="Internship" />
            <NavLink to="/applicants" label="Applicants" />
            <NavLink to="/analytics" label="Analytics" />
            <NavLink to="/settings" label="Settings" />
          </div>

          {/* right - actions */}
          <div className="flex items-center gap-3">
            {/* Post a Job (hidden on very small screens) */}

            <Link
              to="/post-job"
              className="inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-500 text-white px-4 py-2 shadow-lg hover:from-indigo-700 hover:to-violet-600 focus:outline-none focus:ring-4 focus:ring-indigo-200 text-sm font-medium"
            >
              Post a Job
            </Link>

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
                      onClick={() => {
                        /* example: mark all as read */
                        setNotifOpen(false);
                      }}
                      className="text-xs text-violet-600 hover:underline focus:outline-none"
                    >
                      Mark all read
                    </button>
                  </div>
                </div>
                <div className="divide-y">
                  {/* placeholder items */}
                  <div className="p-3">
                    <p className="text-sm font-medium text-gray-800">
                      No new notifications
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      You're all caught up 🎉
                    </p>
                  </div>

                  {/* footer */}
                  <div className="p-2 text-center">
                    <Link
                      to="/notifications"
                      className="text-sm px-3 py-2 rounded-md hover:bg-gray-50 text-gray-700 inline-block"
                    >
                      View all
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Login button */}
            <Link
              to="/signup"
              className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-indigo-600 to-violet-500 text-white px-4 py-2 shadow-lg hover:from-indigo-700 hover:to-violet-600 focus:outline-none focus:ring-4 focus:ring-indigo-200 text-sm font-medium"
            >
              Sign Up
            </Link>

            <Link
              to="/login"
              className="px-4 py-2 rounded-full border border-slate-400 text-sm font-medium"
            >
              Sign In
            </Link>

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
                    Bonnie Green
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    name@flowbite.com
                  </p>
                </div>
                <div className="py-1">
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm hover:bg-gray-50 text-gray-700"
                  >
                    Dashboard
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm hover:bg-gray-50 text-gray-700"
                  >
                    Settings
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm hover:bg-gray-50 text-gray-700"
                  >
                    Earnings
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm hover:bg-gray-50 text-gray-700"
                  >
                    Sign out
                  </a>
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
          <MobileLink to="/" label="Home" />
          <MobileLink to="/dashboard" label="Dashboard" />
          <MobileLink to="/jobs" label="My Jobs" />
          <MobileLink to="/applicants" label="Applicants" />
          <MobileLink to="/analytics" label="Analytics" />
          <MobileLink to="/settings" label="Settings" />

          <div className="pt-2">
            <Link
              to="/signup"
              className="block w-full text-center py-2 rounded-full bg-violet-600 text-white font-medium"
            >
              Login
            </Link>
          </div>

          <div className="pt-2">
            <Link
              to="/post-job"
              className="block w-full text-center py-2 rounded-full border border-violet-600 text-violet-600 font-medium"
            >
              Post a Job
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

/* helpers */
function NavLink({ to = "#", label = "", active = false }) {
  return (
    <Link
      to={to}
      className={`px-3 py-2 rounded-md text-sm font-medium transition ${
        active
          ? "text-indigo-500  hover:text-indigo-500 font-bold hover:bg-gray-50"
          : "text-gray-700 hover:text-indigo-500 font-bold hover:bg-gray-50"
      }`}
    >
      {label}
    </Link>
  );
}

function MobileLink({ to = "#", label = "" }) {
  return (
    <Link
      to={to}
      className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
    >
      {label}
    </Link>
  );
}
