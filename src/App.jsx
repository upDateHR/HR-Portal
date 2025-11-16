import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Navbar from "./Components/Navbar";

import Signup from "./Pages/Signup";
import { ToastContainer, toast } from "react-toastify";
import Login from "./Pages/Login";
import Candidate from "./Components/Candidate";
import CandidatePage from "./Pages/CandidatePage";
import RecruiterPage from "./Pages/RecruiterPage";
import HomePage from "./Components/HomePage";
import Footer from "./Components/Footer";

import CardGrid from "./Components/CandidateContent/Intern/CardGrid";
import Cards from "./Components/CandidateContent/Intern/Cards";
import JobCardGrid from "./Components/CandidateContent/Job/JobCardGrid";
import JobCards from "./Components/CandidateContent/Job/JobCards";
import CandidateHome from "./Components/CandidateContent/CandidateHome";
import InternshipPage from "./Pages/InternshipPage";
import JobPage from "./Pages/JobPage";


function App() {
  return (
    <>
      {/* <h1 class="text-3xl text-red-500 font-bold underline">Hello world!</h1> */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/navbar" element={<Navbar />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/candidate" element={<Candidate />} />
        <Route path="/candidatepage" element={<CandidatePage />} />
        <Route path="/recruiterpage" element={<RecruiterPage />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/footer" element={<Footer />} />
        
        <Route path="/cardgrid" element={<CardGrid />} />
        <Route path="/cards" element={<Cards />} />
        <Route path="/jobcardgrid" element={<JobCardGrid />} />
        <Route path="/jobcards" element={<JobCards />} />
        <Route path="/candidatehome" element={<CandidateHome />} />
        <Route path="/internshippage" element={<InternshipPage />} />
        <Route path="/jobpage" element={<JobPage />} />
        
      </Routes>

      <ToastContainer />
    </>
  );
}

export default App;
