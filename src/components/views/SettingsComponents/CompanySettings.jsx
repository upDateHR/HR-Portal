import React from 'react';

const CompanySettings = ({ initialData }) => (
    <div className="space-y-6">
        <div>
            <label className="block text-sm font-medium text-gray-700">Company Logo</label>
            <div className="mt-1 flex items-center space-x-4">
                <div className="w-16 h-16 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-xl">A</div>
                <button className="px-4 py-2 border border-gray-300 rounded-full text-gray-700 font-semibold hover:bg-gray-100 transition-colors text-sm">
                    Change Logo
                </button>
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">Company Legal Name</label>
                <input type="text" id="companyName" defaultValue={initialData.companyName || "Acme Corporation Ltd."} className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500" />
            </div>
            <div>
                <label htmlFor="website" className="block text-sm font-medium text-gray-700">Website URL</label>
                <input type="url" id="website" defaultValue={initialData.website || "https://www.acmecorp.com"} className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500" />
            </div>
        </div>
        <div>
            <label htmlFor="companyDescription" className="block text-sm font-medium text-gray-700">Company Description (Visible to Students)</label>
            <textarea id="companyDescription" rows="4" defaultValue={initialData.companyDescription || "Acme Corp is a leader in advanced manufacturing, committed to innovation and sustainability."} className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"></textarea>
        </div>
        
        <div className="flex justify-end pt-6">
            <button className="px-6 py-2 rounded-full text-white font-semibold bg-purple-600 hover:bg-purple-700 shadow-md transition-colors">
                Save Company Details
            </button>
        </div>
    </div>
);

export default CompanySettings;