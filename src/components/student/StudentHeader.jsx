import React, { useState } from "react";
import {
  User, Briefcase, Home, LogOut, FileText, Menu, X, ChevronDown, ChevronUp, Bell, Zap 
} from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

const StudentHeader = ({ setCurrentView, currentView, userData }) => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // --- Logic remains unchanged ---
  const handleNavClick = (view) => {
    setCurrentView(view);
    setIsMobileMenuOpen(false);
    setIsProfileMenuOpen(false);
  };
  
  const isActive = (view) => view === currentView;
  
  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem("hr_user");
    setCurrentView("main_home"); 
  };

  const navItems = [
    { view: "student_home", name: "Home", icon: Home },
    { view: "#", name: "Find Jobs", icon: Briefcase },
    { view: "#", name: "Internships", icon: Zap },
    { view: "#", name: "My Applications", icon: FileText },
  ];
  
  const displayName = userData?.name || "Student";
  const initial = userData?.name?.charAt(0)?.toUpperCase() || "S";
  // ---------------------------------------------

  return (
    // EDGE-TO-EDGE FIX: Outer header spans full width (w-full)
    <header className="sticky top-0 z-20 bg-white shadow-lg border-b border-gray-100 w-full">
      
      {/* Centered Content Container */}
      <div className="max-w-full w-full px-4 sm:px-6 py-3 flex justify-between items-center"div>

        {/* Branding/Logo: Stick to Left (No changes needed, as it is the first flex item) */}
        <h1
          className="text-2xl font-bold text-purple-700 cursor-pointer tracking-tight"
          onClick={() => handleNavClick("student_home")}
        >
          IamHR
        </h1>

        {/* --- Desktop Navigation --- (Identical Styling) */}
        <nav className="hidden md:flex space-x-2 lg:space-x-4 text-sm font-medium">
          {navItems.map(item => (
            <button
              key={item.name}
              onClick={() => handleNavClick(item.view)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-all duration-200 ${
                isActive(item.view)
                  ? "text-purple-600 font-semibold bg-purple-100/70"
                  : "text-gray-600 hover:text-purple-600 hover:bg-gray-50"
              }`}
            >
              <item.icon className="h-4 w-4" />
              <span>{item.name}</span>
            </button>
          ))}
        </nav>

        {/* --- Right Side: Actions & Profile (Identical Structure) --- */}
        <div className="flex items-center space-x-3 relative">

          {/* Notifications/Alerts (Placeholder) */}
          <button className="text-gray-500 hover:text-purple-600 p-2 rounded-full hover:bg-gray-50 transition duration-150 hidden sm:block">
            <Bell className="h-5 w-5" /> 
          </button>

          {/* Profile Button / Dropdown Toggle */}
          <div
            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            className={`flex items-center space-x-2 p-1 pl-2 border border-gray-200 rounded-full cursor-pointer hover:bg-gray-50 transition duration-150 ${isProfileMenuOpen ? 'bg-gray-50' : ''}`}
          >
            <span className="text-sm hidden sm:inline text-gray-700 font-medium">{displayName}</span>

            {/* Avatar (PURPLE Theme) */}
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
                onClick={() => handleNavClick("#")}
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
      
      {/* --- Mobile Menu Drawer --- */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-2xl border-t border-gray-100 pb-4 z-10">
          <nav className="flex flex-col p-4 space-y-1">
            {navItems.map(item => (
              <button
                key={`mobile-${item.name}`}
                onClick={() => handleNavClick(item.view)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md transition duration-150 text-base ${
                  isActive(item.view)
                    ? "text-purple-600 font-semibold bg-purple-100/70"
                    : "text-gray-700 hover:text-purple-600 hover:bg-gray-50"
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </button>
            ))}
            
            {/* Mobile Logout Button */}
            <button
                onClick={handleLogout}
                className="flex items-center space-x-2 bg-red-600 text-white px-3 py-2 rounded-md font-medium shadow-md hover:bg-red-700 transition duration-150 mt-4"
                title="Logout"
            >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default StudentHeader;