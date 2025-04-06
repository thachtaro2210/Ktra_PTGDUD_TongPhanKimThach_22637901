import React from 'react';
import U2 from "../../assets/User/2.png";
import SearchIcon from "../../assets/search-icon.png"; 
import BellIcon from "../../assets/bell-icon.png"; 
import HelpIcon from "../../assets/help-icon.png"; 

export default function Header() {
  return (
    <header className="shadow-md ">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Trái - Dashboard */}
        <div>
          <h1 className="text-xl font-bold text-pink-500">Dashboard</h1>
        </div>

        {/* Phải - Search + Icons */}
        <div className="flex items-center space-x-4">
          {/* Ô tìm kiếm có kính lúp bên trái */}
          <div className="relative">
            <span className="absolute left-3 top-2.5">
              <img src={SearchIcon} alt="Search" className="h-4 w-4" />
            </span>
            <input 
              type="text" 
              placeholder="Search..." 
              className="bg-gray-100 rounded-full py-2 pl-10 pr-4 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-300 w-64"
            />
          </div>

          {/* Bell Icon */}
          <button className="relative">
            <img src={BellIcon} alt="Notifications" className="h-6 w-6" />
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center text-xs text-white">1</span>
          </button>

          {/* Help Icon */}
          <button>
            <img src={HelpIcon} alt="Help" className="h-6 w-6" />
          </button>

          {/* Avatar - giữ nguyên */}
          <div className="h-8 w-8 rounded-full bg-pink-500 text-white flex items-center justify-center overflow-hidden">
            <img src={U2} alt="Profile" />
          </div>
        </div>
      </div>
    </header>
  );
}