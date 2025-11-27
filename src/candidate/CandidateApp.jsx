import "./App.css";
import { Routes, Route } from "react-router-dom";
// NOTE: We assume your NavBar component is imported as Navbar from the Components folder, 
// matching the style we enhanced earlier.
import Navbar from "./Components/Navbar1"; 
import { useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// Imported Components (assuming these are in ./Pages and ./Components)
import RecruiterPage from "./Pages/RecruiterPage";
import HomePage from "./Components/HomePage"; // The main Student homepage we enhanced
import Footer from "./Components/Footer"; // Your custom Footer

import InternshipPage from "./Pages/InternshipPage";
import JobPage from "./Pages/JobPage";
import Dashboard from "./Pages/Dashboard";
import Applicants from "./Pages/Applicants";
import Analytics from "./Pages/Analytics";
import Settings from "./Pages/Settings";
import ResumeBuilder from "./Pages/ResumeBuilder";
import ResumePage from "./Pages/ResumePage";

function CandidateApp() {
  // Use useLocation, but remove the conditional logic for the footer
  // const location = useLocation();
  
  return (
    // CRITICAL: Use flex column structure to ensure the footer sticks to the bottom
    <div className="min-h-screen flex flex-col"> 
      
      {/* Navbar always at the top */}
      <Navbar /> 
      
      {/* Routes wrapped in <main> with flex-grow to push footer down */}
      <main className="flex-grow">
        <Routes>
          {/* Public/Candidate Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/recruiterpage" element={<RecruiterPage />} />
          <Route path="/internshippage" element={<InternshipPage />} />
          <Route path="/jobpage" element={<JobPage />} />
          <Route path="/jobpage/:id" element={<JobPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/applicants" element={<Applicants />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/resumebuilder" element={<ResumeBuilder />} />
          <Route path="/resumepage" element={<ResumePage />} />
        </Routes>
      </main>
      
       
      
      <ToastContainer />
    </div>
  );
}

export default CandidateApp;