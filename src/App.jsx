import "./App.css";
import EmployerApp from "./employer/EmployerApp.jsx";
import CandidateApp from "./candidate/CandidateApp.jsx";
import Signup from "./components/Signup.jsx";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import Login from "./components/Login.jsx";
import Navbar from "./components/Navbar.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import CandidateRegister from "./candidate/Components/Candidate.jsx";
import CompanyRegister from "./components/Register.jsx";
import MainHomePage from "./MainHomePage.jsx";
// <<<<<<< HEAD
import Footer from "./candidate/Components/Footer.jsx";

import ChatWidget from "./components/ChatWidget.jsx";
// >>>>>>> 4ea7dc1a30a24df122223876e3cef9356f2e3264

function LandingPage() {
  return (
    <>
      <Navbar />
      <MainHomePage />
      <div className=" bg-linear-to-br from-purple-50 to-white flex flex-col items-center px-6 pt-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 text-center leading-tight">
          Find Internships & Hire Talent
        </h1>

        <p className="text-gray-600 text-center mt-4 max-w-2xl text-lg">
          Join our internship platform where students explore real opportunities
          and companies discover skilled candidates ready to grow.
        </p>

        <div className="mt-10 flex flex-col md:flex-row gap-4">
          <Link
            to="/signup"
            state={{ role: "candidate" }}
            className="px-8 py-3  text-white rounded-lg shadow-lg text-center text-lg font-medium transition-all bg-gradient-to-r from-purple-600 to-violet-500 hover:from-purple-700 hover:to-violet-600 focus:outline-none focus:ring-4"
          >
            I'm Looking for Internships
          </Link>

          <Link
            to="/signup"
            state={{ role: "company" }}
            className="px-8 py-3 border border-violet-600 text-violet-600 rounded-lg hover:bg-violet-50 shadow-lg text-center text-lg font-medium transition-all"
          >
            I Want to Hire Interns
          </Link>
        </div>

        <div className="flex flex-col gap-3 py-10 items-center">
          <span className="text-gray-500">Already have an account?</span>

          <div className="flex gap-4">
            <Link
              to="/login"
              className="px-6 py-2 text-gray-800 font-medium hover:text-purple-600 transition-all"
            >
              Login
            </Link>
          </div>
        </div>
      </div>

      <Footer />
      {/* <<<<<<< HEAD
      
=======

      {/* 🟣 Chatbot available on Landing page */}
      {/* <ChatWidget /> */}
      {/* >>>>>>> 4ea7dc1a30a24df122223876e3cef9356f2e3264 */}
    </>
  );
}

function App() {
  return (
    <>
      {/* 🟣 Chatbot available on ALL pages (before & after login) */}
      <ChatWidget />

      <Routes>
        <Route path="/" element={<LandingPage />} />

        {/* Auth Pages */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Registration Pages */}
        <Route path="/candidate/signup" element={<CandidateRegister />} />
        <Route path="/company/signup" element={<CompanyRegister />} />

        {/* Employer Portal (protected) */}
        <Route
          path="/company/*"
          element={
            <ProtectedRoute allowedRole={"employer"}>
              <EmployerApp />
            </ProtectedRoute>
          }
        />

        {/* Candidate Portal (protected) */}
        <Route
          path="/candidate/*"
          element={
            <ProtectedRoute allowedRole={"candidate"}>
              <CandidateApp />
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
