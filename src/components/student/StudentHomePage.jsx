import React from "react";
import StudentHeader from "./StudentHeader";
import { Briefcase, ClipboardList, User } from "lucide-react";

const StudentHomePage = ({ setCurrentView }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      

      {/* MAIN CONTAINER */}
      <div className="max-w-6xl mx-auto px-6 py-14">

        {/* TITLE */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
            Welcome Student 🎓
          </h1>
          <p className="text-gray-600 text-lg mt-2">
            Discover jobs, apply instantly, and track your journey.
          </p>
        </div>

        {/* FEATURE CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* BROWSE JOBS CARD */}
          <div
            onClick={() => setCurrentView("#")}
            className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition cursor-pointer border border-gray-100 hover:border-purple-300"
          >
            <div className="flex justify-center mb-4">
              <Briefcase className="h-12 w-12 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 text-center">
              Browse Jobs
            </h3>
            <p className="text-center text-gray-500 mt-2">
              Explore job listings tailored for freshers and students.
            </p>
          </div>

          {/* APPLIED JOBS CARD */}
          <div
            onClick={() => setCurrentView("student_applied")}
            className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition cursor-pointer border border-gray-100 hover:border-purple-300"
          >
            <div className="flex justify-center mb-4">
              <ClipboardList className="h-12 w-12 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 text-center">
              Applied Jobs
            </h3>
            <p className="text-center text-gray-500 mt-2">
              Track all your job applications in one place.
            </p>
          </div>

          {/* PROFILE CARD */}
          <div
            onClick={() => setCurrentView("student_profile")}
            className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition cursor-pointer border border-gray-100 hover:border-purple-300"
          >
            <div className="flex justify-center mb-4">
              <User className="h-12 w-12 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 text-center">
              Your Profile
            </h3>
            <p className="text-center text-gray-500 mt-2">
              Upload resume, add skills, and improve your visibility.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default StudentHomePage;
