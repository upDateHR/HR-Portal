import React, { useState } from "react";
import { updateCompany } from "../../../helpers/employerService";

const CompanySettings = ({ initialData }) => {
  const [form, setForm] = useState({
    companyName: initialData.companyName || "",
    website: initialData.website || "",
    companyDescription: initialData.companyDescription || "",
  });

  const [logo, setLogo] = useState(null);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.id]: e.target.value });

  const handleSave = async () => {
    try {
      const payload = {
        companyName: form.companyName.trim(),
        website: form.website.trim(),
        companyDescription: form.companyDescription.trim(),
      };
      const res = await updateCompany(payload);
      console.log(res.message || "Company updated!");
    } catch (err) {
      console.error("Company update failed:", err);
      console.log(err.response?.data?.message || "Failed to update");
    }
  };

  return (
    // UI REFINEMENT: Increased space-y for better vertical separation
    <div className="space-y-10">
      {/* --- Inputs Section --- */}
      {/* UI REFINEMENT: Clean card block with shadow/border/rounded-xl */}
      <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-100 space-y-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">
            Company Information
        </h2>

        {/* UI REFINEMENT: Increased gap for better column separation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {["companyName", "website"].map((item) => (
            <div key={item}>
              <label className="block text-sm font-medium text-gray-700 capitalize mb-1">
                {item}
              </label>
              <input
                id={item}
                value={form[item]}
                onChange={handleChange}
                // UI REFINEMENT: Smoother input style (py-2.5, transition/focus ring)
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 outline-none transition duration-150"
                placeholder={`Enter your ${item} here...`}
              />
            </div>
          ))}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Company Description
          </label>
          <textarea
            id="companyDescription"
            rows="4"
            value={form.companyDescription}
            onChange={handleChange}
            // UI REFINEMENT: Smoother textarea style (py-2.5, transition/focus ring)
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 outline-none transition duration-150"
            placeholder="Provide a detailed description of your company..."
          />
        </div>
      </div>

      {/* --- Save Button --- */}
      <div className="flex justify-end pt-4">
        <button
          onClick={handleSave}
          // BUTTON: Rounded-full design (original), added hover/transition, and light elevation
          className="px-6 py-2 bg-purple-600 text-white rounded-full shadow-md hover:bg-purple-700 hover:shadow-lg transition duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
        >
          Save Company Details
        </button>
      </div>
    </div>
  );
};

export default CompanySettings;