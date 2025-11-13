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
      </Routes>

      <ToastContainer />
    </>
  );
}

export default App;
