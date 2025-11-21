import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Navbar1 from "./Components/Navbar1";
import { useLocation } from "react-router-dom";
// Signup/Login handled by top-level App — remove local routes
import { ToastContainer } from "react-toastify";
import RecruiterPage from "./Pages/RecruiterPage";
import HomePage from "./Components/HomePage";
import Footer from "./Components/Footer";

import InternshipPage from "./Pages/InternshipPage";
import JobPage from "./Pages/JobPage";
import Dashboard from "./Pages/Dashboard";
import Applicants from "./Pages/Applicants";
import Analytics from "./Pages/Analytics";
import Settings from "./Pages/Settings";
import ResumeBuilder from "./Pages/ResumeBuilder";

function CandidateApp() {
  const location = useLocation();
  const hideFooter = location.pathname.includes("/dashboard");
  return (
    <>
      {/* <h1 class="text-3xl text-red-500 font-bold underline">Hello world!</h1> */}
      <Navbar1 />
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* auth routes removed — protected area assumed behind App-level auth */}
        <Route path="/recruiterpage" element={<RecruiterPage />} />
        <Route path="/internshippage" element={<InternshipPage />} />
        <Route path="/jobpage" element={<JobPage />} />
        <Route path="/jobpage/:id" element={<JobPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/applicants" element={<Applicants />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/resumebuilder" element={<ResumeBuilder />} />
      </Routes>
      {!hideFooter && <Footer />}
      <ToastContainer />
    </>
  );
}

export default CandidateApp;
