import React from 'react';
import { Lock } from 'lucide-react';

const ProfileSettings = ({ initialData }) => (
    <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Recruiter Name</label>
                <input type="text" id="name" defaultValue={initialData.name || "Jane Doe"} className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500" />
            </div>
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                <input type="email" id="email" defaultValue={initialData.email || "jane.d@acme.com"} disabled className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm bg-gray-50 cursor-not-allowed" />
            </div>
            <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Contact Phone</label>
                <input type="text" id="phone" defaultValue={initialData.phone || ""} placeholder="Enter phone number" className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500" />
            </div>
            <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role in Company</label>
                <input type="text" id="role" defaultValue={initialData.role || "HR Manager"} className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500" />
            </div>
        </div>
        
        <div className="pt-4 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center"><Lock className="h-4 w-4 mr-2" /> Change Password</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="currentPwd" className="block text-sm font-medium text-gray-700">Current Password</label>
                    <input type="password" id="currentPwd" className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500" />
                </div>
                <div>
                    <label htmlFor="newPwd" className="block text-sm font-medium text-gray-700">New Password</label>
                    <input type="password" id="newPwd" className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500" />
                </div>
            </div>
        </div>

        <div className="flex justify-end pt-6">
            <button className="px-6 py-2 rounded-full text-white font-semibold bg-purple-600 hover:bg-purple-700 shadow-md transition-colors">
                Save Profile Changes
            </button>
        </div>
    </div>
);

export default ProfileSettings;