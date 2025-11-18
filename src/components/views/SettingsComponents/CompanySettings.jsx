import React, { useState } from "react";
import { Loader2, Save, Building2 } from "lucide-react"; // Added Save and Loader icons

// Firebase - NO CHANGE
import { auth, db } from "../../../firebase";
import { doc, updateDoc } from "firebase/firestore";

const CompanySettings = ({ initialData }) => {
  const user = auth.currentUser;

  // --- State and Handlers (NO CHANGE TO LOGIC) ---
  const [form, setForm] = useState({
    companyName: initialData?.companyName || "",
    website: initialData?.website || "",
    companyDescription: initialData?.companyDescription || "",
  });

  const [isSaving, setIsSaving] = useState(false); // Added saving state for professional feedback

  const handleChange = (e) =>
    setForm({ ...form, [e.target.id]: e.target.value });

  // ================================
  // SAVE COMPANY DETAILS (FIREBASE) - NO CHANGE TO LOGIC
  // ================================
  const handleSave = async () => {
    setIsSaving(true);
    try {
      const ref = doc(db, "users", user.uid);

      await updateDoc(ref, {
        companyName: form.companyName.trim(),
        website: form.website.trim(),
        companyDescription: form.companyDescription.trim(),
      });

      alert("Company details updated successfully!");

    } catch (err) {
      console.error("Company update failed:", err);
      alert(err.message || "Failed to update company details");
    } finally {
        setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">

      {/* Card - Refined Typography and Shadow */}
      <div className="p-6 bg-white rounded-lg shadow-md border border-gray-100 space-y-4">
        <h2 className="flex items-center text-xl font-semibold text-gray-900 pb-3 border-b border-gray-100">
          <Building2 className="h-5 w-5 mr-2 text-purple-600" /> Company Information
        </h2>

        {/* Inputs Grid - Reduced spacing for compactness */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          {["companyName", "website"].map((item) => (
            <div key={item}>
              <label 
                htmlFor={item} 
                className="block text-sm font-medium text-gray-700 capitalize mb-1"
              >
                {item}
              </label>
              <input
                id={item}
                value={form[item]}
                onChange={handleChange}
                // 💥 PROFESSIONAL INPUT FIELD STYLE 💥
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 outline-none transition duration-150 text-sm"
                placeholder={`Enter your ${item}...`}
              />
            </div>
          ))}
        </div>

        {/* Description Field */}
        <div className="pt-2">
          <label 
            htmlFor="companyDescription" 
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Company Description
          </label>
          <textarea
            id="companyDescription"
            rows="4"
            value={form.companyDescription}
            onChange={handleChange}
            // 💥 PROFESSIONAL TEXTAREA STYLE 💥
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 outline-none transition duration-150 text-sm"
            placeholder="Provide a detailed description of your company, culture, and mission..."
          />
        </div>
      </div>

      {/* Save Button with Loading State */}
      <div className="flex justify-end pt-4">
        <button
          onClick={handleSave}
          disabled={isSaving}
          className={`px-6 py-2 rounded-md shadow-lg flex items-center space-x-2 font-medium transition duration-150 ${
            isSaving
              ? "bg-purple-400 cursor-not-allowed"
              : "bg-purple-600 text-white hover:bg-purple-700"
          }`}
        >
          {isSaving ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Saving...</span>
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              <span>Save Company Details</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default CompanySettings;