import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { User, Building2, Loader2, Settings } from 'lucide-react';
import ProfileSettings from './SettingsComponents/ProfileSettings';
import CompanySettings from './SettingsComponents/CompanySettings';

const SettingsView = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const [settingsData, setSettingsData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSettingsData = async () => {
            try {
                // NOTE: Replace with actual backend endpoint to fetch initial settings data
                const response = await axios.get('/api/employer/settings/initial'); 
                setSettingsData(response.data);
            } catch (error) {
                console.error("Error fetching settings data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchSettingsData();
    }, []);

    const renderContent = () => {
        if (loading) {
            return <div className="text-center py-10"><Loader2 className="animate-spin h-6 w-6 mx-auto text-purple-600" /> <p className="mt-2 text-gray-500">Loading settings forms...</p></div>
        }

        switch (activeTab) {
            // Passing fetched data down to the editable components
            case 'profile': return <ProfileSettings initialData={settingsData.profile || {}} />;
            case 'company': return <CompanySettings initialData={settingsData.company || {}} />;
            default: return <ProfileSettings initialData={settingsData.profile || {}} />;
        }
    }

    const tabs = [
        { id: 'profile', name: 'My Profile', icon: User },
        { id: 'company', name: 'Company Details', icon: Building2 },
    ];

    return (
        <div className="py-4">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Account Settings</h1>
            <p className="text-lg text-gray-600 mb-8">Manage your personal profile and company information.</p>

            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="border-b border-gray-200">
                    <nav className="-mb-px flex space-x-6 px-6" aria-label="Tabs">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`group inline-flex items-center py-4 px-1 border-b-2 font-medium text-base transition-colors ${
                                    activeTab === tab.id
                                        ? 'border-purple-600 text-purple-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                            >
                                <tab.icon className={`-ml-0.5 mr-2 h-5 w-5 ${activeTab === tab.id ? 'text-purple-600' : 'text-gray-400 group-hover:text-gray-500'}`} />
                                <span>{tab.name}</span>
                            </button>
                        ))}
                    </nav>
                </div>

                <div className="p-6">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default SettingsView;