import React, { useState } from 'react';
import Header from './components/navigation/Header';
import DashboardView from './components/views/DashboardView';
import MyJobsTable from './components/views/MyJobsTable';
import ApplicantsView from './components/views/ApplicantsView';
import AnalyticsView from './components/views/AnalyticsView';
import SettingsView from './components/views/SettingsView';
import ProfileDetailsView from './components/views/ProfileDetailsView';
import PostJobForm from './components/views/PostJobForm';
import HomeView from './components/views/HomeView'; // <-- NEW IMPORT
import { LayoutDashboard, Briefcase, Users, LineChart, Settings, Home } from 'lucide-react'; // <-- ADD Home icon

// --- Navigation Data (Updated to include Home first) ---
const navigation = [
    { name: 'Home', icon: Home, view: 'home' }, // <-- NEW HOME LINK
    { name: 'Dashboard', icon: LayoutDashboard, view: 'dashboard' },
    { name: 'My Jobs', icon: Briefcase, view: 'myjobs' },
    { name: 'Applicants', icon: Users, view: 'applicants' },
    { name: 'Analytics', icon: LineChart, view: 'analytics' },
    { name: 'Settings', icon: Settings, view: 'settings' },
];
// --- End Navigation Data ---

const App = () => {
  const [currentView, setCurrentView] = useState('home'); // <-- START ON HOME VIEW
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const renderView = () => {
    switch (currentView) {
      case 'home': // <-- NEW ROUTE
        return <HomeView setCurrentView={setCurrentView} />;
      case 'dashboard':
        return <DashboardView setCurrentView={setCurrentView} />;
      case 'myjobs':
        return <MyJobsTable setCurrentView={setCurrentView} />;
      case 'postjob':
        return <PostJobForm setCurrentView={setCurrentView} />;
      case 'applicants': 
        return <ApplicantsView />;
      case 'analytics':
        return <AnalyticsView />;
      case 'settings':
        return <SettingsView />;
      case 'profile_details': 
        return <ProfileDetailsView setCurrentView={setCurrentView} />;
      default:
        return <HomeView setCurrentView={setCurrentView} />; // Default to Home
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Header 
        setCurrentView={setCurrentView} 
        currentView={currentView} 
        isProfileMenuOpen={isProfileMenuOpen} 
        setIsProfileMenuOpen={setIsProfileMenuOpen}
        navigation={navigation} // Passing navigation data
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderView()}
      </main>
      
      <footer className="mt-16 text-center text-xs text-gray-400 p-4 border-t border-gray-100">
          © {new Date().getFullYear()} I am HR Portal. All rights reserved.
      </footer>
    </div>
  );
};

export default App;