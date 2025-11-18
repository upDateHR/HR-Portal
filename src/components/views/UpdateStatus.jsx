import React from "react";
import { updateJobStatus } from "../../helpers/employerService";

const UpdateStatus = ({ jobId, newStatus, setCurrentView }) => {

  const save = async () => {
    const token = localStorage.getItem("hr_token");

    await updateJobStatus(jobId, newStatus, token);

    // UI REFINEMENT: Changed alert to console/notification
    console.log("Status updated!");
    setCurrentView("myjobs");
  };

  return (
    // UI REFINEMENT: Consistent card block, shadow-xl, rounded-2xl, increased padding
    <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 max-w-sm mx-auto my-12 text-center">
      {/* FONT REVERT: Original font size/weight maintained */}
      <h2 className="text-xl font-bold text-gray-900 mb-4">Update Job Status</h2>

      <p className="text-base text-gray-600 mb-6">
        Are you sure you want to change the job status to 
        <strong className="text-purple-600"> {newStatus}</strong>?
      </p>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4">
          
          {/* Primary Button Refinement: Rounded-full, shadow/hover elevation, smooth transition */}
          <button
            onClick={save}
            className="bg-purple-600 text-white px-6 py-2.5 rounded-full font-semibold shadow-lg hover:bg-purple-700 hover:shadow-xl transition duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            Confirm
          </button>

          {/* Secondary Button Refinement: Clean, light hover state */}
          <button
            onClick={() => setCurrentView("myjobs")}
            className="text-gray-600 px-6 py-2.5 rounded-full font-medium hover:text-gray-900 hover:bg-gray-50 transition duration-200"
          >
            Cancel
          </button>
      </div>
    </div>
  );
};

export default UpdateStatus;