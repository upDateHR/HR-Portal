import React, { useState } from "react";
import { Lock } from "lucide-react";
import { updateProfile } from "../../../helpers/employerService";

const ProfileSettings = ({ initialData }) => {
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

  const handleChange = (e) =>
    setForm({ ...form, [e.target.id]: e.target.value });

  const handlePasswordChange = (e) =>
    setPasswordForm({ ...passwordForm, [e.target.id]: e.target.value });

  const handleSave = async () => {
    try {
      const payload = {
        name: form.name,
        phone: form.phone,
        role: form.role || "HR Manager",
      };

      if (passwordForm.currentPwd.trim() && passwordForm.newPwd.trim()) {
        payload.currentPassword = passwordForm.currentPwd;
        payload.newPassword = passwordForm.newPwd;
      }
      const res = await updateProfile(payload);
      console.log(res.message || "Profile updated successfully!");
      setPasswordForm({ currentPwd: "", newPwd: "" });
    } catch (err) {
      console.error("Profile update failed:", err);
      console.log(err.response?.data?.message || "Failed to update profile.");
    }
  };

  return (
    // UI REFINEMENT: Increased space-y for better vertical separation
    <div className="space-y-10">
      
      {/* --- Personal Information Section --- */}
      {/* UI REFINEMENT: Clean card block with shadow/border/rounded-xl */}
      <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-100 space-y-6">
        {/* FONT REVERT: Original font size/weight maintained */}
        <h2 className="text-lg font-bold text-gray-900 mb-6 border-b border-gray-100 pb-3">
            Personal Details
        </h2>

        {/* UI REFINEMENT: Increased gap for better column separation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {["name", "phone", "role"].map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-700 capitalize mb-1">
                {field}
              </label>
              <input
                id={field}
                value={form[field]}
                onChange={handleChange}
                // UI REFINEMENT: Smoother input style (py-2.5, transition/focus ring)
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 outline-none transition duration-150"
                placeholder={`Enter your ${field}`}
              />
            </div>
          ))}

          {/* Email - Read Only */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email (locked)
            </label>
            <div className="relative">
                <input
                    id="email"
                    value={form.email}
                    disabled
                    // UI REFINEMENT: Better disabled style with lock icon
                    className="w-full px-4 py-2.5 border border-gray-200 bg-gray-50 text-gray-500 rounded-lg cursor-not-allowed shadow-inner pr-10"
                />
                <Lock className="h-5 w-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2" />
            </div>
          </div>
        </div>
      </div>

      {/* --- Password Section --- */}
      {/* UI REFINEMENT: Clean card block with shadow/border/rounded-xl */}
      <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-100 space-y-6">
        {/* FONT REVERT: Original font size/weight maintained */}
        <h3 className="flex items-center text-lg font-bold text-gray-900 mb-6 border-b border-gray-100 pb-3">
          <Lock className="h-5 w-5 mr-3 text-purple-600" /> Change Password
        </h3>

        {/* UI REFINEMENT: Increased gap for better column separation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Current Password
            </label>
            <input
              id="currentPwd"
              type="password"
              value={passwordForm.currentPwd}
              onChange={handlePasswordChange}
              // UI REFINEMENT: Smoother input style (py-2.5, transition/focus ring)
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 outline-none transition duration-150"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <input
              id="newPwd"
              type="password"
              value={passwordForm.newPwd}
              onChange={handlePasswordChange}
              // UI REFINEMENT: Smoother input style (py-2.5, transition/focus ring)
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 outline-none transition duration-150"
              placeholder="••••••••"
            />
          </div>
        </div>
      </div>

      {/* --- Save Button --- */}
      <div className="flex justify-end pt-4">
        <button
          onClick={handleSave}
          // BUTTON: Rounded-full design (original), added hover/transition, and light elevation
          className="px-6 py-2 bg-purple-600 text-white rounded-full shadow-md hover:bg-purple-700 hover:shadow-lg transition duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
        >
          Save Profile Changes
        </button>
      </div>
    </div>
  );
};

export default ProfileSettings;