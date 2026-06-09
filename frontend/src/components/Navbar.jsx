import React from 'react';

const Navbar = () => {
  return (
    <div className="bg-[#191925] text-white h-12 px-4 flex items-center justify-between border-b border-slate-800 text-sm">
      
      {/* Left Side: Logo and Title */}
      <div className="flex items-center gap-3">
        {/* Zoho Custom Logo Icon Placeholder */}
        <div className="bg-white text-[#191925] p-1 rounded font-black text-xs flex items-center justify-center w-6 h-6 shadow">
          ZB
        </div>
        <span className="font-bold text-base tracking-wide">Zoho Books</span>
        
        {/* Sync/Refresh Icon Button */}
        <button className="text-slate-400 hover:text-white transition cursor-pointer text-xs ml-1">
          🔄
        </button>
      </div>

      {/* Middle Side: Search Bar */}
      <div className="flex-1 max-w-xl mx-8">
        <div className="relative flex items-center">
          {/* Search Glass Icon */}
          <span className="absolute left-3 text-slate-400 text-xs">🔍</span>
          <input 
            type="text" 
            placeholder="Search in customers..." 
            className="w-full bg-[#252538] border border-slate-700 rounded px-9 py-1 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:bg-[#2c2c42] transition"
          />
        </div>
      </div>

      {/* Right Side: Organization & Icons */}
      <div className="flex items-center gap-4">
        {/* Workspace Name Dropdown */}
        <div className="flex items-center gap-1 cursor-pointer hover:text-slate-200 transition text-xs font-medium">
          <span>Suits Workspace...</span>
          <span className="text-[10px] text-slate-400">▼</span>
        </div>

        {/* Quick Create Plus Button */}
        <button className="bg-blue-600 hover:bg-blue-700 text-white w-6 h-6 rounded flex items-center justify-center font-bold text-sm cursor-pointer shadow transition">
          +
        </button>

        {/* Action Utility Icons (User Groups, Bell, Settings) */}
        <div className="flex items-center gap-3 text-slate-400 text-base">
          <button className="hover:text-white transition cursor-pointer text-sm">👥</button>
          <button className="hover:text-white transition cursor-pointer text-sm relative">
            🔔
            {/* Notification Dot */}
            <span className="absolute top-0 right-0 w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
          </button>
          <button className="hover:text-white transition cursor-pointer text-sm">⚙️</button>
        </div>

        {/* User Profile Avatar Image */}
        <div className="w-7 h-7 rounded-full overflow-hidden border border-slate-700 shadow-inner cursor-pointer ml-1">
          <img 
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=60" 
            alt="Profile" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>

    </div>
  );
};

export default Navbar;