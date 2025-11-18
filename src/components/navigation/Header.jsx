import React, { useState } from "react";
import {
  Plus, Bell, ChevronDown, ChevronUp, User, LogOut, Menu, X, Briefcase, // Added Briefcase for the Post Job button
} from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

const Header = ({ setCurrentView, currentView, navigation, userData }) => {

  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 🔥 REAL INITIAL FROM FIREBASE (NO CHANGE TO LOGIC)
  const initial =
    userData?.companyName?.charAt(0)?.toUpperCase() ||
    userData?.name?.charAt(0)?.toUpperCase() ||
    "A";

  const displayName = userData?.companyName || userData?.name || "Recruiter";

  // --- Logout Handler (NO CHANGE TO LOGIC) ---
  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem("hr_user");
    setCurrentView("main_home");
  };

  const handleNavClick = (view) => {
      setCurrentView(view);
      setIsMobileMenuOpen(false); // Close mobile menu on navigation
      setIsProfileMenuOpen(false); // Close profile menu
  }

  return (
    <header className="sticky top-0 z-20 bg-white shadow-lg border-b border-gray-100">
      <div className="flex justify-between items-center px-4 sm:px-6 py-3">

        {/* Branding/Logo */}
        <span className="text-2xl font-bold text-purple-700 tracking-tight">IamHR</span>

        {/* --- Desktop Navigation --- */}
        <nav className="hidden md:flex space-x-2 lg:space-x-4 text-sm font-medium">
          {navigation.map(item => (
            <button
              key={item.name}
              onClick={() => handleNavClick(item.view)}
              // 🎨 PROFESSIONAL NAV EFFECT
              // Increased padding, cleaner hover, smooth transition
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                item.view === currentView
                  ? "text-purple-600 font-semibold bg-purple-100/70"
                  : "text-gray-600 hover:text-purple-600 hover:bg-gray-50"
              }`}
            >
              <item.icon className="h-4 w-4" />
              <span>{item.name}</span>
            </button>
          ))}
        </nav>

        {/* --- Right Side: Actions & Profile --- */}
        <div className="flex items-center space-x-3 relative">

          {/* Post Job Button */}
          <button
            onClick={() => handleNavClick("postjob")}
            className="hidden sm:flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-md font-medium shadow-md hover:bg-purple-700 transition duration-150"
            title="Post a New Job"
          >
            <Briefcase className="h-4 w-4" />
            <span>Post Job</span>
          </button>
          
          {/* Notifications/Alerts (Placeholder for future) */}
          <button className="text-gray-500 hover:text-purple-600 p-2 rounded-full hover:bg-gray-50 transition duration-150 hidden sm:block">
            <Bell className="h-5 w-5" />
          </button>

          {/* Profile Button / Dropdown Toggle */}
          <div
            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            className={`flex items-center space-x-2 p-1 pl-2 border border-gray-200 rounded-full cursor-pointer hover:bg-gray-50 transition duration-150 ${isProfileMenuOpen ? 'bg-gray-50' : ''}`}
          >
            <span className="text-sm hidden sm:inline text-gray-700 font-medium">{displayName}</span>

            {/* Avatar (PURPLE Theme Corrected) */}
            <div className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center text-base font-semibold flex-shrink-0">
              {initial}
            </div>

            {isProfileMenuOpen ? (
                <ChevronUp className="h-4 w-4 text-gray-500 mr-1" />
            ) : (
                <ChevronDown className="h-4 w-4 text-gray-500 mr-1" />
            )}
          </div>

          {/* Profile Dropdown Menu */}
          {isProfileMenuOpen && (
            <div className="absolute right-0 top-12 sm:top-14 bg-white rounded-lg shadow-xl py-1 z-30 min-w-[180px] border border-gray-100 transform translate-y-1">
              {/* Profile Details Button */}
              <button
                onClick={() => handleNavClick("profile_details")}
                className="flex items-center w-full px-4 py-2 text-gray-700 text-sm hover:bg-purple-50 transition duration-150"
              >
                <User className="mr-3 h-4 w-4 text-purple-500" /> My Profile
              </button>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-2 text-red-600 text-sm hover:bg-red-50 border-t border-gray-100 mt-1"
              >
                <LogOut className="mr-3 h-4 w-4" /> Logout
              </button>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button className="md:hidden p-1 text-gray-600 hover:text-purple-600" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

        </div>
      </div>
      
      {/* --- Mobile Menu Drawer (Overlay) --- */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-2xl border-t border-gray-100 pb-4 z-10">
          <nav className="flex flex-col p-4 space-y-1">
            {navigation.map(item => (
              <button
                key={`mobile-${item.name}`}
                onClick={() => handleNavClick(item.view)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md transition duration-150 text-base ${
                  item.view === currentView
                    ? "text-purple-600 font-semibold bg-purple-100/70"
                    : "text-gray-700 hover:text-purple-600 hover:bg-gray-50"
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </button>
            ))}
            
            {/* Mobile Post Job Button (Primary Action) */}
            <button
                onClick={() => handleNavClick("postjob")}
                className="flex items-center space-x-2 bg-purple-600 text-white px-3 py-2 rounded-md font-medium shadow-md hover:bg-purple-700 transition duration-150 mt-2"
                title="Post a New Job"
            >
                <Briefcase className="h-5 w-5" />
                <span>Post New Job</span>
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;