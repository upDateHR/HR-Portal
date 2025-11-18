import React from "react";

const MainHomePage = ({ setCurrentView }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        Main Home Page
      </h1>
      <p className="text-gray-500 mb-6">
        This is the blank main homepage. We will style it later.
      </p>

      <button
        onClick={() => setCurrentView("firebase_login")}
        className="px-6 py-2 bg-purple-600 text-white rounded-full shadow-md hover:bg-purple-700"
      >
        Go to Login
      </button>
    </div>
  );
};

export default MainHomePage;
