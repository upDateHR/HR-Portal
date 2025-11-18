import React, { useState } from "react";
import { Loader2, Lock, Save } from "lucide-react"; // Added Save icon

// Firebase - NO CHANGE
import { auth, db } from "../../../firebase";
import {
  doc,
  updateDoc,
} from "firebase/firestore";
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";

const ProfileSettings = ({ initialData }) => {
  const user = auth.currentUser;

  // --- State and Handlers (NO CHANGE TO LOGIC) ---
  const [form, setForm] = useState({
    name: initialData?.name || "",
    email: initialData?.email || "",
    phone: initialData?.phone || "",
    role: initialData?.role || "HR Manager",
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPwd: "",
    newPwd: "",
  });
  
  const [isSaving, setIsSaving] = useState(false); // Added saving state for button feedback

  const handleChange = (e) =>
    setForm({ ...form, [e.target.id]: e.target.value });

  const handlePasswordChange = (e) =>
    setPasswordForm({ ...passwordForm, [e.target.id]: e.target.value });

  // ===========================
  // SAVE PROFILE (FIREBASE) - NO CHANGE TO LOGIC
  // ===========================
  const handleSave = async () => {
    setIsSaving(true);
    try {
      // UPDATE FIRESTORE PROFILE
      const ref = doc(db, "users", user.uid);

      await updateDoc(ref, {
        name: form.name,
        phone: form.phone,
        role: form.role,
      });

      // OPTIONAL: CHANGE PASSWORD
      if (passwordForm.currentPwd && passwordForm.newPwd) {
        const credential = EmailAuthProvider.credential(
          user.email,
          passwordForm.currentPwd
        );

        // Re-authenticate user
        await reauthenticateWithCredential(user, credential);

        // Update password
        await updatePassword(user, passwordForm.newPwd);
      }

      alert("Profile updated successfully!");

      setPasswordForm({ currentPwd: "", newPwd: "" });

    } catch (err) {
      console.error("Profile update failed:", err);
      alert(err.message || "Failed to update profile. Check console for details.");
    } finally {
        setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">

      {/* --- Personal Info Card --- */}
      <div className="p-6 bg-white rounded-lg shadow-md border border-gray-100 space-y-4">
        <h2 className="text-xl font-semibold text-gray-900 pb-3 border-b border-gray-100">
          Personal Details
        </h2>

        {/* Form Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          {["name", "phone", "role"].map((field) => (
            <div key={field}>
              <label 
                htmlFor={field} 
                className="block text-sm font-medium text-gray-700 capitalize mb-1"
              >
                {field}
              </label>
              <input
                id={field}
                value={form[field]}
                onChange={handleChange}
                // 💥 PROFESSIONAL INPUT FIELD STYLE 💥
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 outline-none transition duration-150 text-sm"
                placeholder={`Enter your ${field}`}
                type={field === 'phone' ? 'tel' : 'text'}
              />
            </div>
          ))}

          {/* Email (Locked Field) */}
          <div>
            <label 
              htmlFor="email" 
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email (locked)
            </label>
            <div className="relative">
              <input
                id="email"
                value={form.email}
                disabled
                // 💥 PROFESSIONAL INPUT FIELD STYLE 💥
                className="w-full px-3 py-2 border border-gray-200 bg-gray-50 text-gray-500 rounded-md cursor-not-allowed shadow-inner pr-8 text-sm"
              />
              <Lock className="h-4 w-4 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2" />
            </div>
          </div>
        </div>
      </div>

      {/* --- Password Section Card --- */}
      <div className="p-6 bg-white rounded-lg shadow-md border border-gray-100 space-y-4">
        <h3 className="flex items-center text-xl font-semibold text-gray-900 pb-3 border-b border-gray-100">
          <Lock className="h-5 w-5 mr-2 text-purple-600" /> Change Password
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          <div>
            <label 
              htmlFor="currentPwd" 
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Current Password
            </label>
            <input
              id="currentPwd"
              type="password"
              value={passwordForm.currentPwd}
              onChange={handlePasswordChange}
              // 💥 PROFESSIONAL INPUT FIELD STYLE 💥
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 transition duration-150 text-sm"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label 
              htmlFor="newPwd" 
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              New Password
            </label>
            <input
              id="newPwd"
              type="password"
              value={passwordForm.newPwd}
              onChange={handlePasswordChange}
              // 💥 PROFESSIONAL INPUT FIELD STYLE 💥
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 transition duration-150 text-sm"
              placeholder="••••••••"
            />
          </div>
        </div>
      </div>

      {/* --- Save Button --- */}
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
              <span>Save Profile Changes</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ProfileSettings;