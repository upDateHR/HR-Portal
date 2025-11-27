import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Bell,
  ChevronDown,
  ChevronUp,
  User as UserIcon, // Renamed to avoid conflict with 'user' state
  LogOut,
  Menu,
  X,
  Home,        // Icon for Home
  LayoutDashboard, // Icon for Dashboard
  Briefcase,   // Icon for Jobs
  Award,       // Icon for Internship (or specific relevant icon)
  BarChart2,   // Icon for Analytics
  FileText,    // Icon for Resume Maker
  Settings    // Icon for Settings
} from 'lucide-react';

import API from "../../api";

// Consistent color definitions based on Upstox theme
const UPSTOX_TEXT_PURPLE = 'purple-600';
const UPSTOX_HOVER_PURPLE = 'purple-700';
const UPSTOX_LIGHT_PURPLE_BG = 'purple-50';

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

  useEffect(() => {
    try {
      const raw =
        localStorage.getItem("hr_user") || localStorage.getItem("user");
      if (raw) {
        const parsed = JSON.parse(raw);
        setUser(parsed.user || parsed);
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

  // Helper to map paths to icons and labels
  const navItems = [
    { to: "/candidate", label: "Home", icon: Home },
    { to: "/candidate/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/candidate/jobpage", label: "Jobs", icon: Briefcase },
    { to: "/candidate/internshippage", label: "Internship", icon: Award },
    // { to: "/candidate/analytics", label: "Analytics", icon: BarChart2 },
    { to: "/candidate/resumepage", label: "Resume Maker", icon: FileText },
    // { to: "/candidate/settings", label: "Settings", icon: Settings },
  ];

  // Mobile menu link helper
  function MobileLink({ to, label, Icon }) {
    const isActive = location.pathname === to || (to !== '/candidate' && location.pathname.startsWith(to));
    
    return (
      <Link
        to={to}
        className={`flex items-center gap-3 py-3 px-4 rounded-lg transition duration-150 text-base font-medium ${
            isActive
              ? `bg-${UPSTOX_LIGHT_PURPLE_BG} text-${UPSTOX_TEXT_PURPLE} font-semibold`
              : 'text-gray-700 hover:bg-gray-100'
        }`}
        onClick={() => setMobileOpen(false)}
      >
        <Icon className="h-5 w-5" />
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
    window.location.replace("/");
  };

  const activeClass = (path) =>
    location.pathname === path || (path !== '/candidate' && location.pathname.startsWith(path))
      ? `font-semibold text-${UPSTOX_TEXT_PURPLE} p-2 rounded-lg bg-${UPSTOX_LIGHT_PURPLE_BG}`
      : `text-gray-700 hover:text-gray-900 hover:bg-gray-50 p-2 rounded-lg`;

  const getInitial = (name) => (name ? name.charAt(0).toUpperCase() : 'U');

  return (
    <nav
      ref={navRef}
      className="bg-white border-b border-gray-100 shadow-lg sticky top-0 z-40"
    >
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand/Logo - Reverted to image as requested */}
          <Link to="/candidate" className="flex items-center gap-3">
            <img className="h-10" src="/hr1.png" alt="Job Portal Logo" />
          </Link>

          {/* Center - Nav Links (md+) with Icons */}
          <div className="hidden md:flex md:items-center md:space-x-1 text-sm">
            {navItems.map(item => (
              <Link key={item.to} className={`flex items-center gap-2 ${activeClass(item.to)}`} to={item.to} aria-label={item.label}>
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right - Actions */}
          <div className="flex items-center space-x-3">
            {/* Notification bell */}
            <div className="relative hidden sm:block" ref={notifRef}>
              <button
                onClick={() => setNotifOpen((s) => !s)}
                className={`relative p-2 rounded-full hover:bg-${UPSTOX_LIGHT_PURPLE_BG} focus:outline-none focus:ring-2 focus:ring-${UPSTOX_TEXT_PURPLE}`}
                aria-label="Open notifications"
                type="button"
              >
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-0.5 right-0.5 block w-2 h-2 bg-red-500 rounded-full ring-1 ring-white"></span>
              </button>

              <div
                role="menu"
                className={`origin-top-right absolute right-0 mt-2 w-80 rounded-xl shadow-2xl bg-white ring-1 ring-black ring-opacity-5 transform transition-all duration-300 ease-out z-50 ${
                  notifOpen
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-95 pointer-events-none"
                }`}
              >
                <div className="px-4 py-3">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-2 mb-1">
                    <p className="text-sm font-semibold text-gray-900">
                      Notifications
                    </p>
                    <button
                      onClick={() => setNotifOpen(false)}
                      className={`text-xs text-${UPSTOX_TEXT_PURPLE} hover:underline focus:outline-none`}
                    >
                      Mark all read
                    </button>
                  </div>
                </div>
                <div className="divide-y divide-gray-100">
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
                      className={`text-sm px-3 py-2 rounded-lg hover:bg-${UPSTOX_LIGHT_PURPLE_BG} text-gray-700 inline-block transition duration-150`}
                      onClick={() => setNotifOpen(false)}
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
                className={`inline-flex items-center space-x-2 p-1 pr-2 bg-white border border-gray-200 rounded-full cursor-pointer shadow-sm hover:shadow-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${UPSTOX_TEXT_PURPLE}`}
                aria-label="Open user menu"
                type="button"
              >
                 <div className={`w-8 h-8 rounded-full bg-${UPSTOX_TEXT_PURPLE} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
                    {getInitial(user?.name)}
                </div>
                {userOpen ? (
                    <ChevronUp className="h-4 w-4 text-gray-500 flex-shrink-0 hidden sm:block" />
                ) : (
                    <ChevronDown className="h-4 w-4 text-gray-500 flex-shrink-0 hidden sm:block" />
                )}
              </button>

              <div
                role="menu"
                className={`origin-top-right absolute right-0 mt-2 w-56 rounded-xl shadow-2xl bg-white ring-1 ring-black ring-opacity-5 transform transition-all duration-300 ease-out z-50 ${
                  userOpen
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-95 pointer-events-none"
                }`}
              >
                <div className="p-2">
                    <div className="px-4 py-2 text-sm text-gray-500 border-b border-gray-100 mb-1">
                        Signed in as: 
                        <span className="font-semibold text-gray-700 block truncate">{user?.name || "Guest"}</span>
                        <span className="text-xs text-gray-400 block truncate">{user?.email || "not-signed-in"}</span>
                    </div>
                    
                    <Link
                        to="/candidate/dashboard"
                        className={`flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-${UPSTOX_LIGHT_PURPLE_BG} hover:text-${UPSTOX_TEXT_PURPLE} rounded-lg w-full transition duration-150`}
                        onClick={() => setUserOpen(false)}
                    >
                        <LayoutDashboard className="h-4 w-4" />
                        Dashboard
                    </Link>
                    <Link
                        to="/candidate/settings"
                        className={`flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-${UPSTOX_LIGHT_PURPLE_BG} hover:text-${UPSTOX_TEXT_PURPLE} rounded-lg w-full transition duration-150`}
                        onClick={() => setUserOpen(false)}
                    >
                        <Settings className="h-4 w-4" />
                        Settings
                    </Link>
                    <button
                        onClick={handleSignOut}
                        className="flex items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-red-50 rounded-lg w-full transition duration-150 mt-1 border-t border-gray-100"
                    >
                        <LogOut className="h-4 w-4" />
                        Sign out
                    </button>
                </div>
              </div>
            </div>

            {/* mobile menu toggle */}
            <button
              onClick={() => setMobileOpen((s) => !s)}
              className={`md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-${UPSTOX_TEXT_PURPLE}`}
              type="button"
            >
              <span className="sr-only">Toggle navigation</span>
              {mobileOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
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
            {navItems.map(item => (
                <MobileLink key={item.to} to={item.to} label={item.label} Icon={item.icon} />
            ))}
          <div className="pt-4 border-t border-gray-100">
            <button
              onClick={handleSignOut}
              className={`flex items-center justify-center gap-2 w-full text-center py-2 rounded-xl bg-${UPSTOX_TEXT_PURPLE} text-white font-medium hover:bg-${UPSTOX_HOVER_PURPLE} transition duration-150`}
            >
              <LogOut className="h-5 w-5" />
              Sign out
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}