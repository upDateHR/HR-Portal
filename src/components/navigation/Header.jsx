import React, { useState } from 'react';
// REMOVED: import { navigation } from '../../data/mockData';
import { Plus, Bell, ChevronDown, ChevronUp, User, LogOut, Menu, X } from 'lucide-react';

// Header now accepts 'navigation' as a prop
const Header = ({ setCurrentView, currentView, navigation }) => { 
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); 
    // ... (rest of the component logic remains the same) ...
    // Note: The map function inside the JSX will now correctly use the 'navigation' prop.

    const handleLogout = () => {
        alert('Logging out...'); 
    };

    const handleNavClick = (view) => {
        setCurrentView(view);
        setIsMobileMenuOpen(false); // Close mobile menu on click
    };

    return (
      <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200 sticky top-0 bg-white z-20 shadow-sm">
        <div className="flex items-center">
          <span className="text-2xl font-bold text-gray-900">I am HR</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 text-sm">
          {navigation.map((item) => (
            <a
              key={item.name}
              href="#"
              onClick={() => setCurrentView(item.view)}
              className={`flex items-center space-x-1 p-2 rounded-lg transition-all ${
                item.view === currentView
                  ? 'text-purple-600 font-semibold border-b-2 border-purple-600'
                  : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <item.icon className="h-4 w-4" />
              <span>{item.name}</span>
            </a>
          ))}
        </nav>

        {/* Right Section & Mobile Menu Button */}
        <div className="flex items-center space-x-4 relative">
          <button 
            onClick={() => setCurrentView('postjob')}
            className="flex items-center space-x-2 bg-purple-600 text-white font-medium px-4 py-2 rounded-full shadow-md hover:bg-purple-700 transition-colors hidden sm:flex"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Post Job</span>
          </button>
          
          <Bell className="h-5 w-5 text-gray-500 cursor-pointer hover:text-gray-700 hidden md:block" />
          
          {/* Mobile Menu Toggle Button (Visible on Small Screens) */}
          <button 
              className="md:hidden text-gray-600 hover:text-gray-900"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle navigation menu"
          >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {/* Profile Dropdown Trigger */}
          <div 
              className="flex items-center space-x-2 p-1 pl-3 bg-gray-100 rounded-full cursor-pointer hover:bg-gray-200 transition-colors relative"
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              aria-expanded={isProfileMenuOpen}
              aria-controls="profile-menu"
          >
              <span className="text-sm font-medium text-gray-800 hidden sm:inline">Acme Corp</span>
              <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-sm shrink-0">A</div>
              {isProfileMenuOpen ? <ChevronUp className="h-4 w-4 text-gray-500 mr-1" /> : <ChevronDown className="h-4 w-4 text-gray-500 mr-1" />}
          </div>

          {/* Profile Dropdown Menu */}
          {isProfileMenuOpen && (
              <div 
                  id="profile-menu"
                  className="absolute right-0 top-12 mt-2 w-48 bg-white rounded-lg shadow-xl ring-1 ring-black ring-opacity-5 z-30"
                  role="menu"
              >
                  <div className="py-1">
                      <button
                          onClick={() => {
                              setCurrentView('profile_details');
                              setIsProfileMenuOpen(false);
                          }}
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                          role="menuitem"
                          tabIndex={0}
                      >
                          <User className="h-4 w-4 mr-2 text-purple-500" />
                          Profile Details
                      </button>
                      <button
                          onClick={handleLogout}
                          className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left border-t border-gray-100 mt-1"
                          role="menuitem"
                          tabIndex={0}
                      >
                          <LogOut className="h-4 w-4 mr-2" />
                          Logout
                      </button>
                  </div>
              </div>
          )}
        </div>

        {/* Collapsible Mobile Menu (NEW) */}
        {isMobileMenuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg z-10 p-4 space-y-2">
                {navigation.map((item) => (
                    <button
                        key={item.name}
                        onClick={() => handleNavClick(item.view)}
                        className={`flex items-center w-full space-x-2 p-2 rounded-lg transition-all text-sm font-medium ${
                            item.view === currentView
                                ? 'bg-purple-50 text-purple-600'
                                : 'text-gray-700 hover:bg-gray-50'
                        }`}
                    >
                        <item.icon className="h-4 w-4" />
                        <span>{item.name}</span>
                    </button>
                ))}
            </div>
        )}
      </div>
    );
};

export default Header;