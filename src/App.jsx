import './App.css'
import EmployerApp from './employer/EmployerApp.jsx'
import CandidateApp from './candidate/CandidateApp.jsx'
import Signup from './components/Signup.jsx'
import { Routes, Route, Link, Navigate } from 'react-router-dom'
import Login from './components/Login.jsx'
import Navbar from './components/Navbar.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import CandidateRegister from './candidate/Components/Candidate.jsx'
import CompanyRegister from './components/Register.jsx'
import MainHomePage from './components/MainHomePage.jsx'

function LandingPage() {
  return (
    <>
      <Navbar />
      <MainHomePage/>
     
    </>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      {/* Top-level auth pages */}
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      {/* Registration pages for each portal */}
      <Route path="/candidate/signup" element={
        <CandidateRegister />
      } />
      <Route path="/company/signup" element={
        <CompanyRegister />
      } />

      {/* Employer Portal (protected) */}
      <Route
        path="/company/*"
        element={
          <ProtectedRoute allowedRole={'employer'}>
            <EmployerApp />
          </ProtectedRoute>
        }
      />

      {/* Candidate Portal (protected) */}
      <Route
        path="/candidate/*"
        element={
          <ProtectedRoute allowedRole={'candidate'}>
            <CandidateApp />
          </ProtectedRoute>
        }
      />

      {/* Fallback Redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
