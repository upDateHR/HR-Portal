import React, { useState, useEffect } from "react";
import { Loader2, Settings, UserCircle } from "lucide-react"; // Added UserCircle for better icon usage
import DetailItem from "../ui/DetailItem";

// Firebase
import { auth, db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

const ProfileDetailsView = ({ setCurrentView }) => {
  const [profileData, setProfileData] = useState({});
  const [companyData, setCompanyData] = useState({});
  const [loading, setLoading] = useState(true);

  // ======================================================
  // 🔥 Load user profile & company information from Firestore (NO CHANGE TO LOGIC)
  // ======================================================
  useEffect(() => {
    const loadData = async () => {
      try {
        const user = auth.currentUser;
        if (!user) return;

        const ref = doc(db, "users", user.uid);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          const data = snap.data();

          setProfileData({
            name: data.name || "",
            email: data.email || "",
            phone: data.phone || "",
            role: data.role || "",
          });

          setCompanyData({
            companyName: data.companyName || "",
            website: data.website || "",
            companyDescription: data.companyDescription || "",
          });
        }
      } catch (err) {
        console.error("Failed to load profile:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Show loading screen (PURPLE Theme)
  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <Loader2 className="animate-spin h-8 w-8 mx-auto text-purple-600" />
          <p className="mt-4 text-gray-600 font-medium">
            Loading Profile Details...
          </p>
        </div>
      </div>
    );
  }

  // Extract and default details
  const name = profileData.name || "Recruiter";
  const role = profileData.role || "HR Manager";
  const email = profileData.email || "Not Available";
  const phone = profileData.phone || "Not Available";
  const companyName = companyData.companyName || "Your Company";
  const website = companyData.website || "Not Provided";
  
  // Calculate initials (NO CHANGE TO LOGIC)
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase(); // Ensure uppercase for cleaner look

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-3xl mx-auto">
      
      {/* Header (Elegant Typography) */}
      <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
        My Profile Details
      </h1>
      <p className="text-base text-gray-600 mb-6">
        Overview of your personal and company information.
      </p>

      {/* Profile Card (Refined Card Style) */}
      <div className="bg-white rounded-lg shadow-md border border-gray-100 p-6 space-y-6">
        
        {/* Header/Avatar Block */}
        <div className="flex items-center space-x-6 pb-6 border-b border-gray-100">
          
          {/* Avatar/Initials (PURPLE Theme Corrected) */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold text-2xl sm:text-3xl border-4 border-purple-100 shadow-md flex-shrink-0">
            {initials.length > 0 ? initials : <UserCircle className="h-full w-full p-2" />}
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900">{name}</h2>
            <p className="text-base text-gray-500 mt-0.5">{role}</p>
            <p className="text-sm text-gray-400 mt-0.5">{companyName}</p>
          </div>
        </div>

        {/* Details Grid (Assuming DetailItem handles its own padding) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          <DetailItem icon="Mail" title="Email" value={email} />
          <DetailItem icon="Phone" title="Phone" value={phone} />
          <DetailItem icon="Building2" title="Company" value={companyName} />
          <DetailItem icon="Globe" title="Website" value={website} />
        </div>

        {/* Action Button */}
        <div className="pt-6 border-t border-gray-100 flex justify-end">
          <button
            onClick={() => setCurrentView("settings")}
            className="flex items-center space-x-2 bg-purple-600 text-white px-6 py-2 rounded-md font-medium shadow-md hover:bg-purple-700 transition duration-300"
          >
            <Settings className="h-4 w-4" />
            <span>Edit Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetailsView;