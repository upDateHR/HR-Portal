import React, { useState, useEffect } from "react";
import { Settings, Loader2, User, Building2 } from "lucide-react"; // Imported User and Building2 from the component itself, not relying on destructuring in the prompt

import ProfileSettings from "./SettingsComponents/ProfileSettings";
import CompanySettings from "./SettingsComponents/CompanySettings";
import { getInitialSettings } from "../../helpers/employerService";

const SettingsView = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const [settingsData, setSettingsData] = useState({
    profile: { name: "", email: "", phone: "", role: "" },
    company: { companyName: "", website: "", companyDescription: "" },
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await getInitialSettings();
        setSettingsData({
          profile: data?.profile || settingsData.profile,
          company: data?.company || settingsData.company,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const tabs = [
    { id: "profile", name: "My Profile", icon: User },
    { id: "company", name: "Company Details", icon: Building2 },
  ];

  const renderTabContent = () => {
    if (loading) {
      return (
        <div className="text-center py-10">
          {/* UI REFINEMENT: Consistent loading spinner style */}
          <Loader2 className="animate-spin h-8 w-8 mx-auto text-purple-600" />
          <p className="mt-2 text-gray-600 font-medium">Loading settings…</p>
        </div>
      );
    }
    
    // Note: The child components (ProfileSettings/CompanySettings) already contain their own card/shadow styling, 
    // but the content wrapper here must be clean to support them.

    if (activeTab === "profile") {
      // Passes the initialData, ensuring the form components render properly
      return <ProfileSettings initialData={settingsData.profile} />;
    }

    if (activeTab === "company") {
      // Passes the initialData
      return <CompanySettings initialData={settingsData.company} />;
    }
  };

  return (
    <div className="py-8 max-w-4xl mx-auto"> 
      {/* FONT REVERT: Original font size/weight maintained */}
      <h1 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">
        Account Settings
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Manage your personal profile and company information.
      </p>

      {/* MAIN BLOCK: Consistent card block, shadow-xl, rounded-2xl, overflow-hidden */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        
        {/* Tabs Container */}
        {/* UI REFINEMENT: Increased padding, clear border, slightly cleaner background */}
        <div className="border-b border-gray-200 bg-gray-50">
          <nav className="flex space-x-8 px-8" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                // UI REFINEMENT: Added transition to the button, used border-b-4 for a more prominent indicator
                className={`group inline-flex items-center py-4 px-1 border-b-4 font-semibold text-base transition-all duration-200 focus:outline-none ${
                  activeTab === tab.id
                    ? "border-purple-600 text-purple-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <tab.icon
                  // UI REFINEMENT: Ensured icon color transitions correctly with the button
                  className={`mr-3 h-5 w-5 transition duration-200 ${
                    activeTab === tab.id
                      ? "text-purple-600"
                      : "text-gray-400 group-hover:text-gray-600"
                  }`}
                />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Content Area */}
        {/* UI REFINEMENT: Increased padding to match other forms (p-8 vs original p-6) */}
        <div className="p-8">{renderTabContent()}</div>
      </div>
    </div>
  );
};

export default SettingsView;