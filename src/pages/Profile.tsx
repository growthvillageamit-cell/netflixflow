import React from 'react';
import Header from '../components/Header';
import { User, Settings, CreditCard, Bell, Shield, HelpCircle } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const Profile: React.FC = () => {
  const { user } = useAuth();

  const menuItems = [
    { icon: User, label: 'Manage Profiles', desc: 'Create, edit or delete profiles' },
    { icon: CreditCard, label: 'Account', desc: 'Membership & billing details' },
    { icon: Settings, label: 'Settings', desc: 'Preferences and parental controls' },
    { icon: Bell, label: 'Notifications', desc: 'Manage your notification settings' },
    { icon: Shield, label: 'Privacy', desc: 'Control your privacy settings' },
    { icon: HelpCircle, label: 'Help Center', desc: 'Get help and support' },
  ];

  return (
    <div className="bg-black min-h-screen">
      <Header />
      
      <div className="pt-24 px-6 max-w-4xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-8">Account</h1>
          
          {/* Profile Section */}
          <div className="bg-gray-900/50 rounded-lg p-8 mb-8">
            <div className="flex items-center space-x-6 mb-6">
              <img
                src={user?.avatar}
                alt="Profile"
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div>
                <h2 className="text-2xl font-bold text-white">{user?.name}</h2>
                <p className="text-gray-400">{user?.email}</p>
                <p className="text-gray-500 text-sm mt-1">Netflix Member since 2020</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gray-800/50 rounded-lg p-4">
                <h3 className="text-white font-semibold mb-2">Plan</h3>
                <p className="text-gray-300">Premium</p>
                <p className="text-gray-500 text-sm">4K Ultra HD</p>
              </div>
              
              <div className="bg-gray-800/50 rounded-lg p-4">
                <h3 className="text-white font-semibold mb-2">Next billing</h3>
                <p className="text-gray-300">Jan 15, 2025</p>
                <p className="text-gray-500 text-sm">$15.99</p>
              </div>
              
              <div className="bg-gray-800/50 rounded-lg p-4">
                <h3 className="text-white font-semibold mb-2">My List</h3>
                <p className="text-gray-300">{user?.myList.length} items</p>
                <p className="text-gray-500 text-sm">Shows & movies</p>
              </div>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="space-y-4">
          {menuItems.map((item) => (
            <button
              key={item.label}
              className="w-full bg-gray-900/50 hover:bg-gray-800/50 rounded-lg p-6 transition-all duration-200 group"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-red-600/20 rounded-lg flex items-center justify-center group-hover:bg-red-600/30 transition-colors">
                  <item.icon className="w-6 h-6 text-red-500" />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="text-white font-semibold text-lg">{item.label}</h3>
                  <p className="text-gray-400">{item.desc}</p>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                </div>
              </div>
            </button>
          ))}
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800">
          <button className="text-gray-400 hover:text-white transition-colors">
            Sign out of Netflix
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;