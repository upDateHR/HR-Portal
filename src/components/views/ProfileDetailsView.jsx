import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Settings, Phone, Mail, Building2, Loader2 } from 'lucide-react';
import DetailItem from '../ui/DetailItem';

// Custom Globe Icon (passed via DetailItem)
const Globe = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"></circle><path d="M12 2a14.5 14.5 0 0 0 0 20A14.5 14.5 0 0 0 12 2Z"></path><path d="M2 12h20"></path></svg>;


const ProfileDetailsView = ({ setCurrentView }) => {
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // NOTE: Replace with actual backend endpoint to fetch profile data
                const response = await axios.get('/api/employer/profile/view'); 
                setUserData(response.data);
            } catch (error) {
                console.error("Error fetching profile data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchUserData();
    }, []);

    if (loading) {
        return <div className="text-center py-20"><Loader2 className="animate-spin h-8 w-8 mx-auto text-purple-600" /> <p className="mt-2 text-gray-500">Loading Profile Details...</p></div>
    }
    
    // Fallback names for rendering if API returned minimal data
    const name = userData.name || "Jane Doe";
    const role = userData.role || "HR Manager";
    const email = userData.email || "N/A";
    const phone = userData.phone || "N/A";
    const companyName = userData.companyName || "Acme Corporation Ltd.";
    const companyWebsite = userData.companyWebsite || "N/A";


    return (
        <div className="py-4 max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile Details</h1>
            <p className="text-lg text-gray-600 mb-6">Read-only overview of your account and company information.</p>

            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 space-y-6">
                
                <div className="flex items-center space-x-4 pb-4 border-b border-gray-100">
                    <div className="w-16 h-16 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-2xl">{name ? name.split(' ').map(n => n[0]).join('') : 'JD'}</div>
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-900">{name}</h2>
                        <p className="text-sm text-gray-500">{role}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                    <DetailItem icon="Mail" title="Email" value={email} />
                    <DetailItem icon="Phone" title="Phone" value={phone} />
                    <DetailItem icon="Building2" title="Company" value={companyName} />
                    <DetailItem icon="Globe" title="Website" value={companyWebsite} />
                </div>
                
                <div className="pt-4 border-t border-gray-100 flex justify-end">
                    <button 
                        onClick={() => setCurrentView('settings')}
                        className="flex items-center space-x-2 bg-purple-600 text-white font-medium px-6 py-2 rounded-full shadow-md hover:bg-purple-700 transition-colors text-sm"
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