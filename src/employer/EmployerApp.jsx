import React, { useEffect, useState } from "react";

import Header from "./components/navigation/Header";
import DashboardView from "./components/views/DashboardView";
import MyJobsTable from "./components/views/MyJobsTable";
import ApplicantsView from "./components/views/ApplicantsView";
import AnalyticsView from "./components/views/AnalyticsView";
import SettingsView from "./components/views/SettingsView";
import ProfileDetailsView from "./components/views/ProfileDetailsView";
import PostJobForm from "./components/views/PostJobForm";
import HomeView from "./components/views/HomeView";
import MyHirings from "./components/views/MyHirings";

import EditJobForm from "./components/views/EditJobForm";   // ✅ Added

import {
  LayoutDashboard,
  Briefcase,
  Users,
  LineChart,
  Settings,
  Home,
  UserCheck
} from "lucide-react";

// NAVIGATION MENU
const navigation = [
  { name: "Home", icon: Home, view: "home" },
  { name: "Dashboard", icon: LayoutDashboard, view: "dashboard" },
  { name: "My Jobs", icon: Briefcase, view: "myjobs" },
  { name: "Applicants", icon: Users, view: "applicants" },
  { name: "Analytics", icon: LineChart, view: "analytics" },
  { name: "My Hirings", icon: UserCheck, view: "myhirings" },
  { name: "Settings", icon: Settings, view: "settings" }
];

const App = ({ initialView }) => {
  const [currentView, setCurrentView] = useState(initialView || "home");
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  // Load token from storage so child views receive it
  const [token, setToken] = useState(() => {
    try {
      return localStorage.getItem("hr_token") || localStorage.getItem("token");
    } catch {
      return null;
    }
  });

  const setAuthToken = (newToken) => {
    try {
      if (newToken) localStorage.setItem("hr_token", newToken);
      else localStorage.removeItem("hr_token");
    } catch (e) { }
    setToken(newToken);
  };

  // Sync token between tabs
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === "hr_token") setToken(e.newValue);
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // -------------------------------
  // RENDER VIEW SWITCHER
  // -------------------------------
  const renderView = () => {
    const viewName = currentView.view || currentView;



    switch (viewName) {
      case "home":
        return <HomeView setCurrentView={setCurrentView} token={token} />;

      case "dashboard":
        return <DashboardView setCurrentView={setCurrentView} token={token} />;

      case "myjobs":
        return <MyJobsTable setCurrentView={setCurrentView} token={token} />;

      case "postjob":
        return <PostJobForm setCurrentView={setCurrentView} token={token} />;

      case "editjob":
        return (
          <EditJobForm
            jobId={currentView.id}
            setCurrentView={setCurrentView}
            token={token}
          />
        );

      case "applicants":
        return <ApplicantsView token={token} />;

      case "myhirings": // <-- ADD THIS CASE
        return <MyHirings setCurrentView={setCurrentView} token={token} />;

      case "analytics":
        return <AnalyticsView token={token} />;

      case "settings":
        return <SettingsView token={token} />;

      case "profile_details":
        return <ProfileDetailsView setCurrentView={setCurrentView} token={token} />;



      default:
        return <HomeView setCurrentView={setCurrentView} token={token} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">

      {/* HEADER ONLY WHEN LOGGED IN */}
      <Header
        setCurrentView={setCurrentView}
        currentView={currentView}
        isProfileMenuOpen={isProfileMenuOpen}
        setIsProfileMenuOpen={setIsProfileMenuOpen}
        navigation={navigation}
        setAuthToken={setAuthToken}
      />

      {/* PAGE CONTENT */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderView()}
      </main>

      
    </div>
  );
};

export default App;
