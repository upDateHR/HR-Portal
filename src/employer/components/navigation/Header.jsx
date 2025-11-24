import React, { useState, useEffect } from "react";
import {
  Plus,
  Bell,
  ChevronDown,
  ChevronUp,
  User,
  LogOut,
  Menu,
  X,
} from "lucide-react";

const Header = ({
  setCurrentView,
  currentView,
  navigation,
  setAuthToken,
}) => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuMenuOpen] = useState(false);

  const [userData, setUserData] = useState({
    name: "",
    companyName: "",
    initial: "A",
  });

  // [REMAINDER OF LOGIC IS UNCHANGED]

  const parseStoredUser = (raw) => {
    if (!raw) return null;
    try {
      const parsed = typeof raw === "string" ? JSON.parse(raw) : raw;
      if (parsed.user && typeof parsed.user === "object") {
        return parsed.user;
      }
      if (parsed.name || parsed.companyName || parsed.email) {
        return parsed;
      }
      if (parsed.name === undefined && parsed.companyName === undefined) {
        return null;
      }
      return parsed;
    } catch (e) {
      return { name: raw, companyName: "" };
    }
  };

  useEffect(() => {
    const raw = localStorage.getItem("hr_user");
    const user = parseStoredUser(raw);

    if (user) {
      const name = user.name || "";
      const company = user.companyName || "";

      const initial = company
        ? company.charAt(0).toUpperCase()
        : name
          ? name.charAt(0).toUpperCase()
          : "A";

      setUserData({
        name,
        companyName: company,
        initial,
      });
    } else {
      setUserData({ name: "", companyName: "", initial: "A" });
    }

    const onStorage = (e) => {
      if (e.key === "hr_user") {
        const other = parseStoredUser(e.newValue);
        if (other) {
          const name = other.name || "";
          const company = other.companyName || "";
          const initial = company
            ? company.charAt(0).toUpperCase()
            : name
              ? name.charAt(0).toUpperCase()
              : "A";
          setUserData({ name, companyName: company, initial });
        } else {
          setUserData({ name: "", companyName: "", initial: "A" });
        }
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const handleLogout = () => {
    // clear authentication state and localStorage keys
    setAuthToken(null);
    localStorage.removeItem('hr_token');
    localStorage.removeItem('token');
    localStorage.removeItem('hr_user');
    localStorage.removeItem('user');
    console.log('Logged out!');

    // navigate to root so the user returns to the public landing page
    // use location.replace to avoid keeping the protected route in history
    window.location.replace('/');
  };

  const handleNavClick = (view) => {
    setCurrentView(view);
    setIsMobileMenuMenuOpen(false);
  };

  return (
    // UI REFINEMENT: Increased padding, professional shadow (sticky + shadow-lg)
    <div className="flex justify-between items-center px-6 py-4 bg-white sticky top-0 z-20 shadow-lg">
      {/* FONT REVERT: Original font sizing/weight maintained */}
      <h1 className="flex items-center gap-3" >
        <img className="h-10" src="/hr1.png" alt="Job Portal Logo" />
      </h1>

      {/* NAVIGATION: Added transition/smoothness */}
      <nav className="hidden md:flex space-x-8 text-sm">
        {navigation.map((item) => (
          <button
            key={item.name}
            onClick={() => setCurrentView(item.view)}
            // UI REFINEMENT: Added `transition duration-200` and focused active state on background/text color
            className={`flex items-center space-x-1 p-2 rounded-lg transition-all duration-200 ${item.view === currentView
              ? "text-purple-600 font-semibold bg-purple-50" // Original font-semibold used
              : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
              }`}
          >
            <item.icon className="h-4 w-4" />
            <span>{item.name}</span>
          </button>
        ))}
      </nav>

      <div className="flex items-center space-x-4 relative">
        {/* POST JOB BUTTON: Rounded-full design, added hover/transition effects */}
        <button
          onClick={() => setCurrentView("postjob")}
          className="hidden sm:flex items-center space-x-2 bg-purple-600 text-white font-medium px-4 py-2 rounded-full shadow-md hover:bg-purple-700 hover:shadow-lg transition duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
        >
          <Plus className="h-4 w-4" />
          <span>Post Job</span>
        </button>

        <Bell className="h-5 w-5 text-gray-500 cursor-pointer hover:text-gray-700 transition duration-150 hidden md:block" />

        <button
          className="md:hidden text-gray-600 hover:text-gray-900 transition duration-150"
          onClick={() => setIsMobileMenuMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* PROFILE DROPDOWN TRIGGER: Added border/shadow/transition for smooth clickable block */}
        <div
          onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
          className="flex items-center space-x-2 p-1 pr-2 bg-white border border-gray-200 rounded-full cursor-pointer shadow-sm hover:shadow-md transition duration-200"
        >
          {/* FONT REVERT: Kept original text size/weight */}
          <span className="text-sm font-medium text-gray-800 hidden sm:inline">
            {userData.companyName || userData.name || ""}
          </span>

          <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
            {userData.initial}
          </div>

          {isProfileMenuOpen ? (
            <ChevronUp className="h-4 w-4 text-gray-500 flex-shrink-0" />
          ) : (
            <ChevronDown className="h-4 w-4 text-gray-500 flex-shrink-0" />
          )}
        </div>

        {/* PROFILE DROPDOWN MENU: Rounded design, elevated shadow */}
        {isProfileMenuOpen && (
          <div className="absolute right-0 top-14 w-56 bg-white rounded-xl shadow-2xl ring-1 ring-black ring-opacity-5 z-30 transform origin-top transition-all duration-300 ease-out">
            <div className="p-2">
              <div className="px-4 py-2 text-sm text-gray-500 border-b border-gray-100 mb-1">
                Signed in as: <span className="font-semibold text-gray-700 block">{userData.companyName || userData.name}</span>
              </div>
              <button
                onClick={() => {
                  setCurrentView("profile_details");
                  setIsProfileMenuOpen(false);
                }}
                className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-lg w-full transition duration-150"
              >
                <User className="h-4 w-4 mr-2 opacity-80" />
                Profile Details
              </button>

              <button
                onClick={handleLogout}
                className="flex items-center px-3 py-2 text-sm text-red-500 hover:bg-red-50 rounded-lg w-full transition duration-150 mt-1 border-t border-gray-100"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        )}
      </div>

      {/* MOBILE MENU: Added shadow for better separation */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-100 shadow-xl z-10 p-4 space-y-1">
          {navigation.map((item) => (
            <button
              key={item.name}
              onClick={() => handleNavClick(item.view)}
              className={`flex items-center w-full space-x-3 p-3 rounded-lg transition-colors duration-150 text-base font-medium ${item.view === currentView
                ? "bg-purple-100 text-purple-700"
                : "text-gray-700 hover:bg-gray-100"
                }`}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.name}</span>
            </button>
          ))}
          <button
            onClick={() => handleNavClick("postjob")}
            className="flex items-center w-full space-x-3 p-3 rounded-lg mt-2 bg-purple-600 text-white font-semibold transition duration-200 hover:bg-purple-700"
          >
            <Plus className="h-5 w-5" />
            <span>Post Job</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;