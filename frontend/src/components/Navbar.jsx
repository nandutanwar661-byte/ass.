import React, { useState, useEffect, useRef } from 'react';

const Navbar = ({ 
  setActivePage, 
  setIsAddingCustomer, 
  setSelectedEditCustomer,
  setIsAddingInvoice,
  setSelectedEditInvoice,
  setIsAddingItem,
  setIsAddingEstimate
}) => {
  const [isQuickCreateOpen, setIsQuickCreateOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  // 📸 Profile Image State (Default: Unsplash Avatar, ya fir LocalStorage se aayegi)
  const [profileImage, setProfileImage] = useState(
    localStorage.getItem('zb_profile_img') || 
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=60"
  );

  const quickCreateRef = useRef(null);
  const profileRef = useRef(null);
  const fileInputRef = useRef(null); // Hidden File Input ke liye Ref

  // आउटसाइड क्लिक डिटेक्ट करने का लॉजिक
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (quickCreateRef.current && !quickCreateRef.current.contains(event.target)) {
        setIsQuickCreateOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 📂 File change hone par handle karne ka function (Base64 Convertor)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setProfileImage(base64String); // UI Instant Update करेगा
        localStorage.setItem('zb_profile_img', base64String); // Browser storage me hamesha ke liye save
      };
      reader.readAsDataURL(file);
    }
  };

  // 🎯 Centralized Navigation Handler
  const handleNavigation = (page, actionType = null) => {
    setSelectedEditCustomer(null);
    setSelectedEditInvoice(null);
    setIsAddingCustomer(false);
    setIsAddingInvoice(false);
    setIsAddingItem(false);
    setIsAddingEstimate(false);

    if (actionType === 'add-customer') setIsAddingCustomer(true);
    else if (actionType === 'add-invoice') setIsAddingInvoice(true);
    else if (actionType === 'add-item') setIsAddingItem(true);
    else if (actionType === 'add-estimate') setIsAddingEstimate(true);

    setActivePage(page);
    setIsQuickCreateOpen(false);
    setIsProfileOpen(false);
  };

  return (
    <div className="bg-[#191925] text-white h-12 px-4 flex items-center justify-between border-b border-slate-800 text-sm relative z-50 select-none">
      
      {/* Hidden File Input for Profile Upload */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleImageChange} 
        accept="image/*" 
        className="hidden" 
      />

      {/* Left Side: Logo and Title */}
      <div 
        className="flex items-center gap-3 cursor-pointer hover:opacity-90"
        onClick={() => handleNavigation('dashboard')}
      >
        <div className="bg-white text-[#191925] p-1 rounded font-black text-xs flex items-center justify-center w-6 h-6 shadow">
          ZB
        </div>
        <span className="font-bold text-base tracking-wide">Zoho Books</span>
        <button className="text-slate-400 hover:text-white transition cursor-pointer text-xs ml-1">🔄</button>
      </div>

      {/* Middle Side: Search Bar */}
      <div className="flex-1 max-w-xl mx-8">
        <div className="relative flex items-center">
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
        <div className="flex items-center gap-1 cursor-pointer hover:text-slate-200 transition text-xs font-medium">
          <span>Suits Workspace...</span>
          <span className="text-[10px] text-slate-400">▼</span>
        </div>

        {/* ➕ QUICK CREATE DROP-DOWN */}
        <div className="relative" ref={quickCreateRef}>
          <button 
            onClick={() => setIsQuickCreateOpen(!isQuickCreateOpen)}
            className="bg-blue-600 hover:bg-blue-700 text-white w-6 h-6 rounded flex items-center justify-center font-bold text-sm cursor-pointer shadow transition"
          >
            +
          </button>

          {isQuickCreateOpen && (
            <div className="absolute right-0 mt-3 w-[720px] bg-white text-slate-800 rounded-lg shadow-2xl border border-slate-200 p-6 grid grid-cols-4 gap-6 z-50">
              {/* GENERAL */}
              <div>
                <h3 className="text-xs font-bold text-slate-400 tracking-wider mb-3">㗊 GENERAL</h3>
                <ul className="space-y-2.5 text-xs text-slate-600">
                  <li className="hover:text-blue-600 cursor-pointer flex items-center gap-1">⊕ Add Users</li>
                  <li onClick={() => handleNavigation('items', 'add-item')} className="hover:text-blue-600 cursor-pointer flex items-center gap-1 font-medium text-slate-700">⊕ Item</li>
                  <li className="hover:text-blue-600 cursor-pointer flex items-center gap-1">⊕ Inventory Adjustments</li>
                  <li className="hover:text-blue-600 cursor-pointer flex items-center gap-1">⊕ Journal Entry</li>
                </ul>
              </div>

              {/* SALES */}
              <div>
                <h3 className="text-xs font-bold text-slate-400 tracking-wider mb-3">🛒 SALES</h3>
                <ul className="space-y-2.5 text-xs text-slate-600">
                  <li onClick={() => handleNavigation('customers', 'add-customer')} className="hover:text-blue-600 cursor-pointer flex items-center gap-1 font-medium text-slate-700">⊕ Customer</li>
                  <li onClick={() => handleNavigation('estimates', 'add-estimate')} className="hover:text-blue-600 cursor-pointer flex items-center gap-1">⊕ Estimates</li>
                  <li className="hover:text-blue-600 cursor-pointer flex items-center gap-1">⊕ Delivery Challan</li>
                  <li onClick={() => handleNavigation('invoices', 'add-invoice')} className="hover:text-blue-600 cursor-pointer flex items-center gap-1 font-medium text-slate-700">⊕ Invoices</li>
                </ul>
              </div>

              {/* PURCHASES */}
              <div>
                <h3 className="text-xs font-bold text-slate-400 tracking-wider mb-3">🛍️ PURCHASES</h3>
                <ul className="space-y-2.5 text-xs text-slate-600">
                  <li className="hover:text-blue-600 cursor-pointer flex items-center gap-1">⊕ Vendor</li>
                  <li className="hover:text-blue-600 cursor-pointer flex items-center gap-1">⊕ Expenses</li>
                  <li className="hover:text-blue-600 cursor-pointer flex items-center gap-1">⊕ Bills</li>
                </ul>
              </div>

              {/* BANKING */}
              <div>
                <h3 className="text-xs font-bold text-slate-400 tracking-wider mb-3">🏦 BANKING</h3>
                <ul className="space-y-2.5 text-xs text-slate-600">
                  <li onClick={() => handleNavigation('banking')} className="hover:text-blue-600 cursor-pointer flex items-center gap-1 font-medium text-slate-700">⊕ Bank Transfer</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-3 text-slate-400 text-base">
          <button className="hover:text-white transition text-sm">👥</button>
          <button className="hover:text-white transition text-sm relative">
            🔔<span className="absolute top-0 right-0 w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
          </button>
          <button className="hover:text-white transition text-sm">⚙️</button>
        </div>

        {/* 👤 PROFILE AVATAR (DYNAMIC) */}
        <div className="relative" ref={profileRef}>
          <div 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="w-7 h-7 rounded-full overflow-hidden border border-slate-700 shadow-inner cursor-pointer ml-1 active:scale-95 transition"
          >
            {/* Navbar image uses profileImage state */}
            <img 
              src={profileImage} 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </div>

          {isProfileOpen && (
            <div className="absolute right-0 mt-3 w-80 bg-white text-slate-800 rounded-lg shadow-2xl border border-slate-200 overflow-hidden z-50 animate-in slide-in-from-top-2 duration-150">
              
              {/* Identity Box */}
              <div className="p-4 bg-slate-50 border-b border-slate-100 relative">
                <button onClick={() => setIsProfileOpen(false)} className="absolute top-3 right-3 text-slate-400 hover:text-slate-600 text-sm">✕</button>
                
                <div className="flex items-center gap-3">
                  {/* Big Image inside Profile Dropdown with an Edit Camera overlay */}
                  <div 
                    onClick={() => fileInputRef.current.click()} // Click karne par device gallery khulegi
                    className="w-12 h-12 rounded-full overflow-hidden border border-slate-200 relative group cursor-pointer shadow-sm"
                    title="Click to change photo"
                  >
                    <img 
                      src={profileImage} 
                      alt="Avatar" 
                      className="w-full h-full object-cover group-hover:brightness-75 transition"
                    />
                    {/* Hover text over image */}
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition text-[9px] text-white font-medium text-center leading-tight">
                      Change
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold text-sm text-slate-900">Naresh Tailor</h4>
                    <p className="text-xs text-slate-500">demouser@zylker.com</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">User ID: 123456 • Org ID: 12345678</p>
                  </div>
                </div>
                
                <div className="flex justify-between items-center mt-4 pt-2 border-t border-slate-200 text-xs">
                  <span onClick={() => fileInputRef.current.click()} className="text-blue-600 hover:underline cursor-pointer font-medium">📷 Change Photo</span>
                  <span className="text-red-500 hover:underline cursor-pointer font-medium">➔ Sign Out</span>
                </div>
              </div>

              {/* Grid Resources */}
              <div className="p-4 grid grid-cols-3 gap-3 text-center border-b border-slate-100 bg-white">
                <div className="p-2 hover:bg-slate-50 rounded cursor-pointer border border-slate-100 flex flex-col items-center justify-center"><span className="text-xl mb-1">📋</span><span className="text-[10px] font-medium text-slate-700">Help Docs</span></div>
                <div className="p-2 hover:bg-slate-50 rounded cursor-pointer border border-slate-100 flex flex-col items-center justify-center"><span className="text-xl mb-1">💬</span><span className="text-[10px] font-medium text-slate-700">FAQs</span></div>
                <div className="p-2 hover:bg-slate-50 rounded cursor-pointer border border-slate-100 flex flex-col items-center justify-center"><span className="text-xl mb-1">👥</span><span className="text-[10px] font-medium text-slate-700">Forum</span></div>
              </div>

              <div className="p-3 bg-slate-50 text-center text-xs text-slate-600">
                <p className="font-medium mb-1">Need Assistance?</p>
                <button className="text-blue-600 font-semibold hover:underline flex items-center justify-center gap-1 mx-auto">✉ Send an email</button>
              </div>

            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default Navbar;