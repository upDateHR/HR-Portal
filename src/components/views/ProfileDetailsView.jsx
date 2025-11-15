import React, { useState, useEffect } from "react";
import { Settings, Loader2 } from "lucide-react";
import DetailItem from "../ui/DetailItem";
import { getInitialSettings } from "../../helpers/employerService";

const ProfileDetailsView = ({ setCurrentView }) => {
  const [profileData, setProfileData] = useState({});
  const [companyData, setCompanyData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await getInitialSettings();
        setProfileData(data.profile || {});
        setCompanyData(data.company || {});
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-20">
        {/* UI REFINEMENT: Consistent loading spinner style */}
        <Loader2 className="animate-spin h-8 w-8 mx-auto text-purple-600" />
        <p className="mt-2 text-gray-600 font-medium">Loading Profile Details...</p>
      </div>
    );
  }

  const name = profileData.name || "Recruiter";
  const role = profileData.role || "HR Manager";
  const email = profileData.email || "Not Available";
  const phone = profileData.phone || "Not Available";
  const companyName = companyData.companyName || "Your Company";
  const website = companyData.website || "Not Provided";

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    // UI REFINEMENT: Increased vertical padding and centered content
    <div className="py-8 max-w-3xl mx-auto"> 
      {/* FONT REVERT: Original font size/weight maintained */}
      <h1 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">
        My Profile Details
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Overview of your personal and company information.
      </p>

      {/* MAIN BLOCK: Consistent card block, shadow-xl, rounded-2xl, p-8 */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 space-y-8"> 
        
        {/* Header (Profile Info) */}
        <div className="flex items-center space-x-6 pb-6 border-b border-gray-100">
          {/* Avatar Refinement: Increased size, consistent indigo color, added border */}
          <div className="w-20 h-20 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-3xl flex-shrink-0 border-4 border-indigo-100 shadow-md">
            {initials}
          </div>

          <div>
            {/* FONT REVERT: Original font size/weight maintained */}
            <h2 className="text-2xl font-semibold text-gray-900">{name}</h2>
            <p className="text-base text-gray-500 mt-1">{role}</p>
            <p className="text-sm text-gray-400">{companyName}</p>
          </div>
        </div>

        {/* Details Grid */}
        {/* UI REFINEMENT: Increased gap for better spacing */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6"> 
          <DetailItem icon="Mail" title="Email" value={email} />
          <DetailItem icon="Phone" title="Phone" value={phone} />
          <DetailItem icon="Building2" title="Company" value={companyName} />
          <DetailItem icon="Globe" title="Website" value={website} />
        </div>

        {/* Button */}
        <div className="pt-6 border-t border-gray-100 flex justify-end">
          <button
            onClick={() => setCurrentView("settings")}
            // UI REFINEMENT: Consistent rounded-full button with hover elevation, py-2.5
            className="flex items-center space-x-2 bg-purple-600 text-white px-8 py-2.5 rounded-full font-semibold shadow-lg hover:bg-purple-700 hover:shadow-xl transition duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            <Settings className="h-4 w-4" />
            <span>Edit Profile & Company Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetailsView;