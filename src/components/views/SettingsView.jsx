import React, { useState, useEffect } from "react";
import { Loader2, User, Building2, Settings } from "lucide-react"; // Added Settings icon for the header

// Firebase - NO CHANGE
import { auth, db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

// Components - NO CHANGE
import ProfileSettings from "./SettingsComponents/ProfileSettings";
import CompanySettings from "./SettingsComponents/CompanySettings";

const SettingsView = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const [settingsData, setSettingsData] = useState({
    profile: { name: "", email: "", phone: "", role: "" },
    company: { companyName: "", website: "", companyDescription: "" },
  });

  const [loading, setLoading] = useState(true);

  // =====================================================
  // 🔥 LOAD USER DATA FROM FIRESTORE (/users/{uid}) - NO CHANGE TO LOGIC
  // =====================================================
  useEffect(() => {
    const loadData = async () => {
      try {
        const user = auth.currentUser;
        if (!user) return;

        const ref = doc(db, "users", user.uid);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          const data = snap.data();

          setSettingsData({
            profile: {
              name: data.name || "",
              email: data.email || "",
              phone: data.phone || "",
              role: data.role || "",
            },
            company: {
              companyName: data.companyName || "",
              website: data.website || "",
              companyDescription: data.companyDescription || "",
            },
          });
        }
      } catch (err) {
        console.error("Failed to load settings:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // =====================================================
  // TAB CONTENT - NO CHANGE TO LOGIC
  // =====================================================
  const renderContent = () => {
    if (loading) {
      return (
        <div className="text-center py-10">
          <Loader2 className="animate-spin h-8 w-8 mx-auto text-purple-600" />
          <p className="mt-2 text-gray-600 font-medium">Loading settings…</p>
        </div>
      );
    }

    if (activeTab === "profile") {
      // NOTE: ProfileSettings will be expected to contain refined, professional inputs.
      return <ProfileSettings initialData={settingsData.profile} />;
    }

    if (activeTab === "company") {
      // NOTE: CompanySettings will be expected to contain refined, professional inputs.
      return <CompanySettings initialData={settingsData.company} />;
    }
  };

  // =====================================================
  // TABS - NO CHANGE TO LOGIC
  // =====================================================
  const tabs = [
    { id: "profile", name: "My Profile", icon: User },
    { id: "company", name: "Company Details", icon: Building2 },
  ];

  // =====================================================
  // MAIN RENDER - Refined UI
  // =====================================================
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
      {/* Header - Refined Typography and Icon */}
      <header className="mb-8 flex items-center">
        <Settings className="h-6 w-6 text-purple-600 mr-3 hidden sm:block" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Account Settings
          </h1>
          <p className="text-base text-gray-600 mt-1">
            Manage your personal profile and company information.
          </p>
        </div>
      </header>

      <div className="bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden">

        {/* Tabs - Modernized and Purple Theme */}
        <div className="border-b border-gray-200 bg-gray-50/50">
          <nav className="flex space-x-0 sm:space-x-8 px-4 sm:px-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                // Elegant tab styling: subtle border transition, purple highlight
                className={`group inline-flex items-center whitespace-nowrap py-3 px-3 sm:px-1 border-b-2 font-medium text-sm sm:text-base transition-all duration-200 ${
                  activeTab === tab.id
                    ? "border-purple-600 text-purple-600"
                    : "border-transparent text-gray-600 hover:text-purple-700 hover:border-purple-300"
                }`}
              >
                <tab.icon
                  className={`mr-2 h-5 w-5 transition ${
                    activeTab === tab.id
                      ? "text-purple-600"
                      : "text-gray-400 group-hover:text-purple-500"
                  }`}
                />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Content Area */}
        {/* Padding adjusted for better content flow, especially for forms */}
        <div className="p-4 sm:p-6 lg:p-8">
            {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default SettingsView;