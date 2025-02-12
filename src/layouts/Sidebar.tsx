import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Settings } from 'lucide-react';
import { useAuthContext } from '../components/auth/AuthContext';


const Sidebar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  const { logout, user } = useAuthContext();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };

  console.log("username", user?.userName)

  return (
    <div className="w-64 min-h-screen bg-gray-900 text-gray-300 p-4 flex flex-col">
      <div className="flex items-center space-x-2 mb-8">
        <span className="text-xl font-semibold">Blog Post Manager</span>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="font-medium">Posts</span>
          <Link to="/editor" className="p-1 hover:bg-gray-800 rounded">+</Link>
        </div>
        <nav className="space-y-1 pl-4 text-gray-400">
             <Link 
            to="/" 
            className={`block p-2 rounded-md ${
              isActiveRoute('/') 
                ? 'bg-gray-800 text-white' 
                : 'hover:bg-gray-800'
            }`}
          >
            All Posts
          </Link>
          <Link 
            to="/drafts" 
            className={`block p-2 rounded-md ${
              isActiveRoute('/drafts') 
                ? 'bg-gray-800 text-white' 
                : 'hover:bg-gray-800'
            }`}
          >
            Drafts
          </Link>
          <Link 
            to="/published" 
            className={`block p-2 rounded-md ${
              isActiveRoute('/published') 
                ? 'bg-gray-800 text-white' 
                : 'hover:bg-gray-800'
            }`}
          >
            Published
          </Link>
        </nav>
      </div>

{/* TODO:add tags later */}
      {/* <div className="mb-6">
        <Link 
          to="/tags" 
          className={`flex items-center space-x-2 p-2 rounded-md ${
            isActiveRoute('/tags') 
              ? 'bg-gray-800 text-white' 
              : 'hover:bg-gray-800 text-gray-400'
          }`}
        >
          <Tag className="w-5 h-5" />
          <span>Tags</span>
        </Link>
      </div> */}

      <div className="mt-auto">
        <div className="relative">
          <button 
            onClick={toggleDropdown}
            className="w-full flex items-center justify-between p-2 hover:bg-gray-800 rounded-md"
          >
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                {user?.userName.charAt(0)}
              </div>
              <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'transform rotate-180' : ''}`} />
            </div>
            <Settings className="w-5 h-5" />
          </button>

          {isDropdownOpen && (
            <div className="absolute bottom-full left-0 w-full mb-2 bg-gray-800 rounded-md shadow-lg overflow-hidden">
              <div className="p-3 border-b border-gray-700">
                <div className="font-medium">{user?.userName}</div>
                <div className="text-sm text-gray-500">{user?.email}</div>
              </div>
              <button 
                onClick={logout}
                className="w-full text-left px-4 py-2 text-red-400 hover:bg-gray-700"
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;