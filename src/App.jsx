import React, { useEffect, useState } from "react";


import MainHomePage from "./components/views/MainHomePage";
import Header from "./components/navigation/Header"; // <-- Recruiter Header
import StudentHeader from "./components/student/StudentHeader"; // 💥 ADDED: Student Header Import

import DashboardView from "./components/views/DashboardView";
import MyJobsTable from "./components/views/MyJobsTable";
import ApplicantsView from "./components/views/ApplicantsView";
import AnalyticsView from "./components/views/AnalyticsView";
import SettingsView from "./components/views/SettingsView";
import ProfileDetailsView from "./components/views/ProfileDetailsView";
import PostJobForm from "./components/views/PostJobForm";
import HomeView from "./components/views/HomeView";
import EditJobForm from "./components/views/EditJobForm";

// STUDENT SIDE
import StudentHomePage from "./components/student/StudentHomePage";





// FIREBASE AUTH PAGES
import LoginPage from "./pages/Login";
import SignupRole from "./pages/SignupRole";
import SignupCandidate from "./pages/SignupCandidate";
import SignupRecruiter from "./pages/SignupRecruiter";

// FIREBASE
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

// Navigation Icons
import {
  LayoutDashboard,
  Briefcase,
  User2,
  BarChart2,
  Settings,
  Home
} from "lucide-react";

const App = () => {
  const [currentView, setCurrentView] = useState("main_home");
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  // ================================
  // FIREBASE AUTH LISTENER (Logic remains untouched)
  // ================================
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setUserData(null);
        setRole(null);
        setCurrentView("main_home");
        setLoading(false);
        return;
      }

      // fetch Firestore profile
      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        setUserData(snap.data());
        setRole(snap.data().role);

        if (snap.data().role === "candidate") {
          setCurrentView("student_home");
        } else if (snap.data().role === "recruiter") {
          setCurrentView("home");
        }
      }

      setLoading(false);
    });

    return () => unsub();
  }, []);

  // ======================================
  // RECRUITER NAVIGATION (Content remains untouched)
  // ======================================
  const navigation = [
  { name: "Home", icon: Home, view: "home" },
  { name: "Dashboard", icon: LayoutDashboard, view: "dashboard" },
  { name: "My Jobs", icon: Briefcase, view: "myjobs" },
  { name: "Applicants", icon: User2, view: "applicants" },
  { name: "Analytics", icon: BarChart2, view: "analytics" },
  { name: "Settings", icon: Settings, view: "settings" }
];


  // ======================================
  // MAIN VIEW RENDERER (Logic remains untouched)
  // ======================================
  const renderView = () => {
    // 🔵 Public Landing Page
    if (currentView === "main_home") {
      return <MainHomePage setCurrentView={setCurrentView} />;
    }

    // 🔵 Auth Pages
    if (currentView === "firebase_login") {
      return <LoginPage setCurrentView={setCurrentView} />;
    }
    if (currentView === "signup_role") {
      return <SignupRole setCurrentView={setCurrentView} />;
    }
    if (currentView === "signup_candidate") {
      return <SignupCandidate setCurrentView={setCurrentView} />;
    }
    if (currentView === "signup_recruiter") {
      return <SignupRecruiter setCurrentView={setCurrentView} />;
    }

    // ==============================
    // 🔵 STUDENT (Firebase)
    // ==============================
    if (role === "candidate") {
      switch (currentView) {
        case "student_home":
          return <StudentHomePage setCurrentView={setCurrentView} currentView={currentView} />;
        default:
          return <StudentHomePage setCurrentView={setCurrentView} currentView={currentView} />;
      }
    }

    // ==============================
    // 🔵 RECRUITER (Firebase)
    // ==============================
    if (role === "recruiter") {
      const viewName = currentView.view || currentView;

      switch (viewName) {
        case "home":
          return <HomeView setCurrentView={setCurrentView} />;

        case "dashboard":
          return <DashboardView setCurrentView={setCurrentView} />;

        case "myjobs":
          return <MyJobsTable setCurrentView={setCurrentView} />;

        case "postjob":
          return <PostJobForm setCurrentView={setCurrentView} />;

        case "editjob":
          return (
            <EditJobForm
              jobId={currentView.id}
              setCurrentView={setCurrentView}
            />
          );

        case "applicants":
          return <ApplicantsView />;

        case "analytics":
          return <AnalyticsView />;

        case "settings":
          return <SettingsView />;

        case "profile_details":
          return (
            <ProfileDetailsView setCurrentView={setCurrentView} />
          );

        default:
          return <HomeView setCurrentView={setCurrentView} />;
      }
    }

    return <MainHomePage setCurrentView={setCurrentView} />;
  };

  if (loading) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      
      {/* 💥 RECRUITER HEADER (Conditional Rendering) */}
      {role === "recruiter" && (
        <Header
            currentView={currentView}
            setCurrentView={setCurrentView}
            navigation={navigation}
            userData={userData}
          />
      )}
      
      {/* 💥 STUDENT HEADER (Conditional Rendering) */}
      {role === "candidate" && (
        <StudentHeader
            currentView={currentView}
            setCurrentView={setCurrentView}
            userData={userData}
          />
      )}
      
      {/* FIX: Removed max-w-7xl mx-auto p-6 from main. */}
      <main>{renderView()}</main>

      {role === "recruiter" && (
        <footer className="text-center text-xs text-gray-400 p-4 border-t w-full">
          © {new Date().getFullYear()} I am HR Portal.
        </footer>
      )}
    </div>
  );
};

export default App;