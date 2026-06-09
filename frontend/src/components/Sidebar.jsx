import React, { useState } from 'react';

const Sidebar = ({ setActivePage, activePage }) => {
  // Items menu ko default open rakhne ke liye base state
  const [openSubMenu, setOpenSubMenu] = useState('items');

  const toggleSubMenu = (menu) => {
    setOpenSubMenu(openSubMenu === menu ? null : menu);
  };

  const handleNav = (page) => {
    setActivePage(page);
    // Jab user directly core sub-pages par navigate kare, toh automatic main drop-down toggle maintain rahe
    if (page === 'estimates' || page === 'customers') {
      setOpenSubMenu('sales');
    } else if (page === 'new-items' || page === 'price-lists') {
      setOpenSubMenu('items');
    }
  };

  return (
    <div className="w-64 bg-[#191925] text-[#b7b7cc] flex flex-col h-full border-r border-slate-800 select-none text-[13px]">
      <nav className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-1">
        
        {/* 1. Home / Dashboard */}
        <button 
          onClick={() => handleNav('dashboard')}
          className={`w-full text-left px-3 py-2 rounded flex items-center gap-2 font-medium transition cursor-pointer ${activePage === 'dashboard' ? 'bg-[#232333] text-blue-400 border-l-4 border-blue-500' : 'hover:bg-[#20202f] hover:text-white'}`}
        >
          <span>🏠</span> Home / Dashboard
        </button>

        {/* 2. Items Module */}
        <div>
          <button 
            type="button"
            onClick={() => toggleSubMenu('items')}
            className={`w-full text-left px-3 py-2 rounded flex justify-between items-center transition cursor-pointer hover:bg-[#20202f] hover:text-white ${openSubMenu === 'items' ? 'text-white font-medium' : ''}`}
          >
            <div className="flex items-center gap-2"><span>📁</span> Items</div>
            <span className="text-[10px]">{openSubMenu === 'items' ? '▼' : '▶'}</span>
          </button>
          
          {openSubMenu === 'items' && (
            <div className="pl-8 py-1 space-y-1 bg-[#14141e] rounded mt-0.5">
              <button 
                type="button"
                onClick={() => handleNav('new-items')} 
                className={`w-full text-left py-1.5 cursor-pointer block transition ${activePage === 'new-items' || activePage === 'items' ? 'text-blue-400 font-bold' : 'hover:text-white'}`}
              >
                • New items
              </button>
              <button 
                type="button"
                onClick={() => handleNav('price-lists')} 
                className={`w-full text-left py-1.5 cursor-pointer block transition ${activePage === 'price-lists' ? 'text-blue-400 font-bold' : 'hover:text-white'}`}
              >
                • Price Lists
              </button>
            </div>
          )}
        </div>

        {/* 3. Inventory Module */}
        <div>
          <button 
            type="button"
            onClick={() => toggleSubMenu('inventory')}
            className="w-full text-left px-3 py-2 rounded flex justify-between items-center transition cursor-pointer hover:bg-[#20202f] hover:text-white"
          >
            <div className="flex items-center gap-2"><span>📦</span> Inventory</div>
            <span className="text-[10px]">{openSubMenu === 'inventory' ? '▼' : '▶'}</span>
          </button>
          {openSubMenu === 'inventory' && (
            <div className="pl-8 py-1 space-y-1 bg-[#14141e] rounded mt-0.5">
              <button type="button" className="w-full text-left py-1.5 hover:text-white cursor-pointer block">• Inventory Adjustments</button>
            </div>
          )}
        </div>

        {/* 4. Sales Module */}
        <div>
          <button 
            type="button"
            onClick={() => toggleSubMenu('sales')}
            className={`w-full text-left px-3 py-2 rounded flex justify-between items-center transition cursor-pointer hover:bg-[#20202f] hover:text-white ${openSubMenu === 'sales' ? 'text-white font-medium' : ''}`}
          >
            <div className="flex items-center gap-2"><span>💼</span> Sales</div>
            <span className="text-[10px]">{openSubMenu === 'sales' ? '▼' : '▶'}</span>
          </button>
          
          {openSubMenu === 'sales' && (
            <div className="pl-8 py-1 space-y-1 bg-[#14141e] rounded mt-0.5">
              {/* Customers Link */}
              <button 
                type="button"
                onClick={() => handleNav('customers')} 
                className={`w-full text-left py-1.5 cursor-pointer block transition ${activePage === 'customers' ? 'text-blue-400 font-bold' : 'hover:text-white'}`}
              >
                • Customers
              </button>
              
              {/* FIX: Estimates Link button pe standard handler trigger add kiya */}
              <button 
                type="button"
                onClick={() => handleNav('estimates')} 
                className={`w-full text-left py-1.5 cursor-pointer block transition ${activePage === 'estimates' ? 'text-blue-400 font-bold' : 'hover:text-white'}`}
              >
                • Estimates
              </button>
              
              <button type="button" className="w-full text-left py-1.5 hover:text-white cursor-pointer block">• Retainer Invoices</button>
              <button type="button" className="w-full text-left py-1.5 hover:text-white cursor-pointer block">• Sales Orders</button>
              
              <button 
              type="button"
                onClick={() => handleNav('invoices')} 
              className={`w-full text-left py-1.5 cursor-pointer block transition ${activePage === 'invoices' ? 'text-blue-400 font-bold' : 'hover:text-white'}`}
              >
                • Invoices
              </button>

              <button type="button" className="w-full text-left py-1.5 hover:text-white cursor-pointer block">• Recurring Invoices</button>
              <button type="button" className="w-full text-left py-1.5 hover:text-white cursor-pointer block">• Delivery challans</button>
              <button type="button" className="w-full text-left py-1.5 hover:text-white cursor-pointer block">• Payment Links</button>
              <button type="button" className="w-full text-left py-1.5 hover:text-white cursor-pointer block">• Payments Received</button>
              <button type="button" className="w-full text-left py-1.5 hover:text-white cursor-pointer block">• Credit Notes</button>
              <button type="button" className="w-full text-left py-1.5 hover:text-white cursor-pointer block">• e-way Bills</button>
            </div>
          )}
        </div>

        {/* 5. Purchases Module */}
        <div>
          <button 
            type="button"
            onClick={() => toggleSubMenu('purchases')}
            className="w-full text-left px-3 py-2 rounded flex justify-between items-center transition cursor-pointer hover:bg-[#20202f] hover:text-white"
          >
            <div className="flex items-center gap-2"><span>🛒</span> Purchases</div>
            <span className="text-[10px]">{openSubMenu === 'purchases' ? '▼' : '▶'}</span>
          </button>
          {openSubMenu === 'purchases' && (
            <div className="pl-8 py-1 space-y-1 bg-[#14141e] rounded mt-0.5">
              <button type="button" className="w-full text-left py-1.5 hover:text-white cursor-pointer block">• Vendors</button>
              <button type="button" className="w-full text-left py-1.5 hover:text-white cursor-pointer block">• Expenses</button>
              <button type="button" className="w-full text-left py-1.5 hover:text-white cursor-pointer block">• Recurring Expenses</button>
              <button type="button" className="w-full text-left py-1.5 hover:text-white cursor-pointer block">• Purchase Orders</button>
              <button type="button" className="w-full text-left py-1.5 hover:text-white cursor-pointer block">• Bills</button>
              <button type="button" className="w-full text-left py-1.5 hover:text-white cursor-pointer block">• Recurring Bills</button>
              <button type="button" className="w-full text-left py-1.5 hover:text-white cursor-pointer block">• Payments Made</button>
              <button type="button" className="w-full text-left py-1.5 hover:text-white cursor-pointer block">• vendor Credits</button>
            </div>
          )}
        </div>

        {/* 6. Time Tracking */}
        <div>
          <button 
            type="button"
            onClick={() => toggleSubMenu('time')}
            className="w-full text-left px-3 py-2 rounded flex justify-between items-center transition cursor-pointer hover:bg-[#20202f] hover:text-white"
          >
            <div className="flex items-center gap-2"><span>⌛</span> Time Tracking</div>
            <span className="text-[10px]">{openSubMenu === 'time' ? '▼' : '▶'}</span>
          </button>
          {openSubMenu === 'time' && (
            <div className="pl-8 py-1 space-y-1 bg-[#14141e] rounded mt-0.5">
              <button type="button" className="w-full text-left py-1.5 hover:text-white cursor-pointer block">• Projects</button>
              <button type="button" className="w-full text-left py-1.5 hover:text-white cursor-pointer block">• Timesheet</button>
            </div>
          )}
        </div>

        {/* 7. Banking */}
        <button 
          type="button"
          onClick={() => handleNav('banking')}
          className={`w-full text-left px-3 py-2 rounded flex items-center gap-2 font-medium transition cursor-pointer ${activePage === 'banking' ? 'bg-[#232333] text-blue-400 border-l-4 border-blue-500' : 'hover:bg-[#20202f] hover:text-white'}`}
        >
          <span>🏛️</span> Banking
        </button>

        {/* Static Bottom Links */}
        <button type="button" className="w-full text-left px-3 py-2 rounded flex items-center gap-2 hover:bg-[#20202f] transition text-slate-500 cursor-not-allowed"><span>📄</span> filling & compliance</button>
        <button type="button" className="w-full text-left px-3 py-2 rounded flex items-center gap-2 hover:bg-[#20202f] transition text-slate-500 cursor-not-allowed"><span>👥</span> Accounts</button>
        <button type="button" className="w-full text-left px-3 py-2 rounded flex items-center gap-2 hover:bg-[#20202f] transition text-slate-500 cursor-not-allowed"><span>📈</span> Reports</button>
        <button type="button" className="w-full text-left px-3 py-2 rounded flex items-center gap-2 hover:bg-[#20202f] transition text-slate-500 cursor-not-allowed"><span>📁</span> Documents</button>

      </nav>
    </div>
  );
};

export default Sidebar;