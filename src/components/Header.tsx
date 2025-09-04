import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Bell, User, ChevronDown } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const Header: React.FC = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'TV Shows', path: '/browse/tv' },
    { name: 'Movies', path: '/browse/movies' },
    { name: 'New & Popular', path: '/browse/new' },
    { name: 'My List', path: '/my-list' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md transition-all duration-300">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Navigation */}
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-red-600 text-2xl font-bold">
              NETFLIX
            </Link>
            
            <nav className="hidden lg:flex space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-sm transition-colors hover:text-gray-300 ${
                    isActive(item.path) ? 'text-white font-medium' : 'text-gray-400'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              <button
                onClick={() => setShowSearch(!showSearch)}
                className="p-2 rounded-full hover:bg-gray-800 transition-colors"
              >
                <Search className="w-5 h-5 text-white" />
              </button>
              
              {showSearch && (
                <div className="absolute right-0 top-12 w-80 bg-black/95 rounded-lg border border-gray-700 p-3">
                  <input
                    type="text"
                    placeholder="Search movies and TV shows..."
                    className="w-full bg-gray-800 text-white px-4 py-2 rounded-md border border-gray-600 focus:border-red-600 focus:outline-none"
                    autoFocus
                  />
                </div>
              )}
            </div>

            {/* Notifications */}
            <button className="p-2 rounded-full hover:bg-gray-800 transition-colors">
              <Bell className="w-5 h-5 text-white" />
            </button>

            {/* Profile */}
            <div className="relative">
              <button
                onClick={() => setShowProfile(!showProfile)}
                className="flex items-center space-x-2 hover:bg-gray-800 rounded-lg p-2 transition-colors"
              >
                <img
                  src={user?.avatar}
                  alt="Profile"
                  className="w-8 h-8 rounded-md object-cover"
                />
                <ChevronDown className="w-4 h-4 text-white" />
              </button>
              
              {showProfile && (
                <div className="absolute right-0 top-12 w-56 bg-black/95 rounded-lg border border-gray-700 py-2">
                  <Link
                    to="/profile"
                    className="flex items-center space-x-3 px-4 py-2 hover:bg-gray-800 transition-colors"
                  >
                    <User className="w-4 h-4 text-white" />
                    <span className="text-white">{user?.name}</span>
                  </Link>
                  <hr className="border-gray-700 my-2" />
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2 text-white hover:bg-gray-800 transition-colors"
                  >
                    Sign out of Netflix
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;