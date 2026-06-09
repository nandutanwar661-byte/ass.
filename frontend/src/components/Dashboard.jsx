import React, { useState } from 'react';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';

const Dashboard = ({ summary = {} }) => {
  // Navigation State setup
  const [activeTab, setActiveTab] = useState('dashboard'); 

  // Indian currency (₹) formatting helper function
  const formatCurrency = (num) => {
    if (num === undefined || num === null) return '₹0.00';
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(num);
  };

  // ==========================================
  // 🎯 DASHBOARD DATA BACKPACK (UNTOUCHED)
  // ==========================================
  const cashFlowData = [
    { month: 'Jan', value: 25000 }, { month: 'Feb', value: 42000 },
    { month: 'Mar', value: 38000 }, { month: 'Apr', value: 52000 },
    { month: 'May', value: 48000 }, { month: 'Jun', value: 31000 },
    { month: 'Jul', value: 40000 }, { month: 'Aug', value: 41000 },
    { month: 'Sep', value: 39000 }, { month: 'Oct', value: 32000 },
    { month: 'Nov', value: 30000 }, { month: 'Dec', value: 45000 },
  ];

  const incomeExpenseData = [
    { month: 'Jan', Income: 55000, Expense: 20000 }, { month: 'Feb', Income: 75000, Expense: 22000 },
    { month: 'Mar', Income: 62000, Expense: 18000 }, { month: 'Apr', Income: 58000, Expense: 25000 },
    { month: 'May', Income: 50000, Expense: 30000 }, { month: 'Jun', Income: 45000, Expense: 21000 },
    { month: 'Jul', Income: 52000, Expense: 24000 }, { month: 'Aug', Income: 40000, Expense: 28000 },
    { month: 'Sep', Income: 68000, Expense: 19000 }, { month: 'Oct', Income: 88000, Expense: 22000 },
    { month: 'Nov', Income: 70000, Expense: 21000 }, { month: 'Dec', Income: 65000, Expense: 23000 },
  ];

  const pieData = [
    { name: 'Automobile Expense', value: 44.62, color: '#2dd4bf' },
    { name: 'IT and Internet Expenses', value: 18.66, color: '#f97316' },
    { name: 'Cost of Goods Sold', value: 12.78, color: '#3b82f6' },
    { name: 'Consultant Expense', value: 9.76, color: '#eab308' },
    { name: 'Office Supplies', value: 5.79, color: '#a855f7' },
    { name: 'Others', value: 8.39, color: '#64748b' },
  ];

  const projects = [
    { id: 1, name: 'Licensed Bronze Chair', client: 'John Smith Cus...', percentage: 27, circumference: 113 },
    { id: 2, name: 'Rustic Cotton Sausages', client: 'Emily Johnson ...', percentage: 59, circumference: 113 },
    { id: 3, name: 'Unbranded Plastic Fish', client: 'David Williams ...', percentage: 51, circumference: 113 },
  ];

  const bankAccounts = [
    { name: 'Bank Account', number: '₹99615477' },
    { name: 'Cash Account', number: '₹99615477' },
    { name: 'Credit Card Account', number: '₹99615477' },
    { name: 'Payment Clearing Account', number: '₹99615477' },
  ];

  return (
    <div className="w-full min-h-screen bg-[#fbfbfc] p-6 text-[#1e293b] font-sans antialiased space-y-6">
      
      {/* Profile Welcome Header */}
      <div className="bg-white p-5 rounded-lg border border-gray-100 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gray-50 border border-gray-200 text-gray-500 font-bold flex items-center justify-center rounded-lg text-[11px] tracking-wider shadow-sm">
            SUITS
          </div>
          <div>
            <h1 className="text-xl font-medium text-gray-900">Hello, Naresh Tailor</h1>
            <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
              Suits Workspaces Private Limited <span className="text-gray-400 cursor-pointer hover:text-gray-600">▪ All Locations ▾</span>
            </p>
          </div>
        </div>
      </div>

      {/* Tabs Menu Navigation */}
      <div className="flex gap-6 text-[13px] font-medium text-gray-400 border-b border-gray-200">
        <span 
          onClick={() => setActiveTab('dashboard')}
          className={`pb-2 cursor-pointer transition-all ${activeTab === 'dashboard' ? 'text-[#0066cc] border-b-2 border-[#0066cc] font-semibold' : 'hover:text-gray-700'}`}
        >
          Dashboard
        </span>
        <span 
          onClick={() => setActiveTab('fiscal-tasks')}
          className={`pb-2 cursor-pointer transition-all ${activeTab === 'fiscal-tasks' ? 'text-[#0066cc] border-b-2 border-[#0066cc] font-semibold' : 'hover:text-gray-700'}`}
        >
          Fiscal Year-End Tasks
        </span>
        <span 
          onClick={() => setActiveTab('getting-started')}
          className={`pb-2 cursor-pointer transition-all ${activeTab === 'getting-started' ? 'text-[#0066cc] border-b-2 border-[#0066cc] font-semibold' : 'hover:text-gray-700'}`}
        >
          Getting Started ▾
        </span>
        <span 
          onClick={() => setActiveTab('announcements')}
          className={`pb-2 cursor-pointer transition-all ${activeTab === 'announcements' ? 'text-[#0066cc] border-b-2 border-[#0066cc] font-semibold' : 'hover:text-gray-700'}`}
        >
          Announcements
        </span>
        <span 
          onClick={() => setActiveTab('recent-updates')}
          className={`pb-2 cursor-pointer transition-all ${activeTab === 'recent-updates' ? 'text-[#0066cc] border-b-2 border-[#0066cc] font-semibold' : 'hover:text-gray-700'}`}
        >
          Recent Updates
        </span>
      </div>

      {/* ========================================================
         1️⃣ DASHBOARD VIEW (SAME AS BEFORE)
         ======================================================== */}
      {activeTab === 'dashboard' && (
        <>
          {/* Receivables & Payables Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg border border-gray-200 p-5 flex flex-col justify-between shadow-sm">
              <div>
                <div className="flex justify-between items-center text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  <span>Total Receivables ⓘ</span>
                  <span className="text-[#0066cc] text-xs cursor-pointer">+ New</span>
                </div>
                <p className="text-xs text-gray-500 mt-3">Total Unpaid Invoices: {formatCurrency(summary.totalReceivables || 10111285.98)}</p>
                <h2 className="text-2xl font-semibold text-gray-900 mt-1 tracking-tight">{formatCurrency(summary.totalReceivables || 10111285.98)}</h2>
              </div>
              <div className="mt-5">
                <div className="w-full bg-gray-100 h-2 rounded-full flex overflow-hidden">
                  <div className="bg-[#3b82f6] h-full" style={{ width: '28%' }}></div>
                  <div className="bg-[#ff9f1c] h-full" style={{ width: '72%' }}></div>
                </div>
                <div className="flex items-center gap-4 text-xs text-gray-500 mt-3">
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 bg-[#3b82f6] rounded-full"></span>Current: {formatCurrency(2823213.40)}</span>
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 bg-[#ff9f1c] rounded-full"></span>Overdue: {formatCurrency(7288072.58)}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-5 flex flex-col justify-between shadow-sm">
              <div>
                <div className="flex justify-between items-center text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  <span>Total Payables ⓘ</span>
                  <span className="text-[#0066cc] text-xs cursor-pointer">+ New</span>
                </div>
                <p className="text-xs text-gray-500 mt-3">Total Unpaid Bills: {formatCurrency(summary.totalPayables || 7988831.60)}</p>
                <h2 className="text-2xl font-semibold text-gray-900 mt-1 tracking-tight">{formatCurrency(summary.totalPayables || 7988831.60)}</h2>
              </div>
              <div className="mt-5">
                <div className="w-full bg-gray-100 h-2 rounded-full flex overflow-hidden">
                  <div className="bg-[#3b82f6] h-full" style={{ width: '11%' }}></div>
                  <div className="bg-[#ff9f1c] h-full" style={{ width: '89%' }}></div>
                </div>
                <div className="flex items-center gap-4 text-xs text-gray-500 mt-3">
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 bg-[#3b82f6] rounded-full"></span>Current: {formatCurrency(900956.60)}</span>
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 bg-[#ff9f1c] rounded-full"></span>Overdue: {formatCurrency(7087875.00)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Cash Flow Line Chart */}
          <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
            <div className="flex justify-between items-center border-b border-gray-100 pb-4 mb-4">
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Cash Flow ⓘ</h3>
              <select className="text-gray-600 border border-gray-200 rounded px-2 py-1 bg-white text-xs font-medium focus:outline-none">
                <option>This Fiscal Year</option>
              </select>
            </div>
            <div className="flex flex-col lg:flex-row gap-8 items-stretch">
              <div className="flex-1 min-h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={cashFlowData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3, fill: '#3b82f6' }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="w-full lg:w-[340px] flex flex-col justify-center divide-y divide-gray-100 bg-gray-50/50 p-4 rounded-lg border border-gray-100">
                <div className="pb-3 flex flex-col">
                  <span className="text-xs text-gray-400 font-medium">Cash as on 01/04/2026</span>
                  <span className="text-lg font-semibold text-gray-900 mt-0.5">{formatCurrency(10836412.60)}</span>
                </div>
                <div className="py-3 flex justify-between items-center">
                  <span className="text-xs text-[#22c55e] font-semibold uppercase">Incoming</span>
                  <span className="text-sm font-medium text-gray-800">{formatCurrency(0.00)} +</span>
                </div>
                <div className="pt-3 flex justify-between items-center">
                  <span className="text-xs text-pink-600 font-semibold uppercase">Outgoing</span>
                  <span className="text-sm font-medium text-gray-800">{formatCurrency(17671.00)} -</span>
                </div>
              </div>
            </div>
          </div>

          {/* Income Expense & Pie Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
              <div className="flex justify-between items-center border-b border-gray-100 pb-4 mb-4">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Income and Expense</h3>
              </div>
              <div className="h-[240px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={incomeExpenseData} margin={{ top: 10, right: 5, left: -25, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                    <Tooltip />
                    <Bar dataKey="Income" fill="#2dd4bf" barSize={7} />
                    <Bar dataKey="Expense" fill="#f97316" barSize={7} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-around border-t border-gray-100 pt-3 mt-2 text-center">
                <div>
                  <p className="text-[11px] font-medium text-gray-400 uppercase">Total Income</p>
                  <p className="text-sm font-bold text-gray-800 mt-0.5">{formatCurrency(7790083.99)}</p>
                </div>
                <div className="border-l border-gray-200 h-8"></div>
                <div>
                  <p className="text-[11px] font-medium text-gray-400 uppercase">Total Expenses</p>
                  <p className="text-sm font-bold text-gray-800 mt-0.5">{formatCurrency(2166598.51)}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
              <div className="flex justify-between items-center border-b border-gray-100 pb-4 mb-4">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Top Expenses</h3>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="w-[160px] h-[160px] shrink-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={pieData} cx="50%" cy="50%" innerRadius={0} outerRadius={70} dataKey="value">
                        {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex-1 space-y-2 w-full">
                  {pieData.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-xs font-medium text-gray-600">
                      <span className="flex items-center gap-2 truncate max-w-[180px]">
                        <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }}></span>
                        <span className="truncate">{item.name}</span>
                      </span>
                      <span className="text-gray-900 font-semibold">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Lower Projects & Watchlist Block */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
              <div className="border-b border-gray-100 pb-3 mb-4 flex justify-between items-center">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Projects ⓘ</h3>
                <div className="flex gap-4 text-xs font-semibold text-gray-700">
                  <span className="flex flex-col items-end">🕒 12:00 <span className="text-[10px] font-normal text-gray-400">UNBILLED HOURS</span></span>
                  <span className="flex flex-col items-end">💵 ₹100.00 <span className="text-[10px] font-normal text-gray-400">UNBILLED EXPENSES</span></span>
                </div>
              </div>
              <div className="space-y-4 max-h-[250px] overflow-y-auto">
                {projects.map((proj) => (
                  <div key={proj.id} className="flex items-center gap-4 border-b border-gray-50 pb-3 last:border-none">
                    <div className="relative w-11 h-11 flex items-center justify-center shrink-0">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle cx="22" cy="22" r="18" stroke="#f1f5f9" strokeWidth="3" fill="transparent" />
                        <circle cx="22" cy="22" r="18" stroke="#3b82f6" strokeWidth="3" fill="transparent" strokeDasharray={proj.circumference} strokeDashoffset={proj.circumference - (proj.percentage / 100) * proj.circumference} />
                      </svg>
                      <span className="absolute text-[10px] font-bold text-gray-700">{proj.percentage}%</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-[#0066cc] truncate cursor-pointer hover:underline">{proj.name}</h4>
                      <p className="text-[11px] text-gray-400 truncate mt-0.5">{proj.client}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
              <div className="border-b border-gray-100 pb-3 mb-2">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Bank and Credit Cards ⓘ</h3>
              </div>
              <div className="divide-y divide-gray-100">
                {bankAccounts.map((acc, index) => (
                  <div key={index} className="py-3 flex justify-between items-center text-xs font-medium">
                    <span className="text-gray-700 hover:text-[#0066cc] cursor-pointer">{acc.name}</span>
                    <span className="text-[#0066cc] font-semibold">{acc.number}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* ========================================================
         2️⃣ FISCAL YEAR-END TASKS VIEW (CUSTOM ADDITION)
         ======================================================== */}
      {activeTab === 'fiscal-tasks' && (
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm max-w-5xl mx-auto animate-fadeIn">
          <div className="border-b border-gray-100 pb-4 mb-6">
            <h2 className="text-base font-semibold text-gray-800">Financial Year-End Checklist (FY 2026-27)</h2>
            <p className="text-xs text-gray-400 mt-0.5">Ensure your books are accurate before closing the fiscal calendar period.</p>
          </div>
          
          <div className="space-y-4">
            <div className="p-4 border border-gray-100 bg-slate-50/50 rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-3">
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-blue-600" />
                <div>
                  <h4 className="text-xs font-semibold text-gray-800">Reconcile All Bank Accounts</h4>
                  <p className="text-[11px] text-gray-400">Match bank statements with recorded entries to ensure zero differences.</p>
                </div>
              </div>
              <span className="text-[10px] font-bold uppercase text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">Completed</span>
            </div>

            <div className="p-4 border border-gray-100 bg-slate-50/50 rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-3">
                <input type="checkbox" className="w-4 h-4 rounded text-blue-600" />
                <div>
                  <h4 className="text-xs font-semibold text-gray-800">Run Asset Depreciation Schedules</h4>
                  <p className="text-[11px] text-gray-400">Calculate and post automated depreciation journal logs for company fixed assets.</p>
                </div>
              </div>
              <span className="text-[10px] font-bold uppercase text-amber-600 bg-amber-50 px-2 py-0.5 rounded">Pending</span>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
         3️⃣ GETTING STARTED VIEW (SAME AS BEFORE)
         ======================================================== */}
      {activeTab === 'getting-started' && (
        <div className="space-y-8 animate-fadeIn">
          <div className="text-center py-4">
            <h2 className="text-xl font-normal text-gray-800">Welcome to Zoho Books <span className="text-xs text-blue-500 cursor-pointer ml-1 hover:underline">Overview of Zoho Books</span></h2>
            <p className="text-xs text-gray-400 mt-1">Your journey to effortlessly manage your accounting starts here.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {/* Card 1 */}
            <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm flex items-start gap-4 hover:border-blue-300">
              <div className="text-xl p-2 bg-blue-50 text-blue-500 rounded">📄</div>
              <div>
                <h4 className="text-sm font-semibold text-gray-800">Configure Chart of Accounts</h4>
                <p className="text-xs text-gray-400 mt-1 leading-relaxed">The Chart of Accounts in Zoho Books contains a list of default accounts that can be used by any type of business. If there are other accounts that your business needs, you can create them. <span className="text-blue-500 cursor-pointer hover:underline">Learn More</span></p>
                <div className="flex gap-4 mt-4">
                  <button className="bg-blue-500 text-white text-xs px-3 py-1.5 rounded font-medium hover:bg-blue-600">Configure</button>
                  <button className="text-gray-500 text-xs font-medium flex items-center gap-1 hover:text-gray-700">▶ Watch & Learn</button>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm flex items-start gap-4 hover:border-blue-300">
              <div className="text-xl p-2 bg-emerald-50 text-emerald-500 rounded">💵</div>
              <div>
                <h4 className="text-sm font-semibold text-gray-800">Enter Opening Balances</h4>
                <p className="text-xs text-gray-400 mt-1 leading-relaxed">If you're migrating from another software you must enter the opening balances in Zoho Books before you start creating transactions to keep your books intact. <span className="text-blue-500 cursor-pointer hover:underline">Learn More</span></p>
                <div className="flex gap-4 mt-4">
                  <button className="bg-blue-500 text-white text-xs px-3 py-1.5 rounded font-medium hover:bg-blue-600">Configure</button>
                  <button className="text-gray-500 text-xs font-medium flex items-center gap-1 hover:text-gray-700">▶ Watch & Learn</button>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm flex items-start gap-4 hover:border-blue-300">
              <div className="text-xl p-2 bg-amber-50 text-amber-500 rounded">💳</div>
              <div>
                <h4 className="text-sm font-semibold text-gray-800">Connect with Payment Gateways</h4>
                <p className="text-xs text-gray-400 mt-1 leading-relaxed">Integrate with one of the leading payment gateways and collect payments faster from your customers. <span className="text-blue-500 cursor-pointer hover:underline">Learn More</span></p>
                <div className="mt-2 flex gap-2 items-center opacity-70">
                  <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded border font-bold text-blue-800">stripe</span>
                  <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded border font-bold text-indigo-800">PayPal</span>
                </div>
                <div className="flex gap-4 mt-4">
                  <button className="bg-blue-500 text-white text-xs px-3 py-1.5 rounded font-medium hover:bg-blue-600">Configure</button>
                  <button className="text-gray-500 text-xs font-medium flex items-center gap-1 hover:text-gray-700">▶ Watch & Learn</button>
                </div>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm flex items-start gap-4 hover:border-blue-300">
              <div className="text-xl p-2 bg-indigo-50 text-indigo-500 rounded">👥</div>
              <div>
                <h4 className="text-sm font-semibold text-gray-800">Enable Customer and Vendor Portals</h4>
                <p className="text-xs text-gray-400 mt-1 leading-relaxed">Customer and vendor portals allow your customers and vendors to keep track and communicate with you about all the transactions. <span className="text-blue-500 cursor-pointer hover:underline">Learn More</span></p>
                <p className="text-[11px] text-blue-500 mt-1 select-all truncate max-w-xs">URL: https://books.zoho.com/portal/demoorg_portal 🔗</p>
                <div className="flex gap-4 mt-4">
                  <button className="border border-gray-300 text-gray-700 text-xs px-3 py-1.5 rounded font-medium hover:bg-gray-50">Set up</button>
                  <button className="text-gray-500 text-xs font-medium flex items-center gap-1 hover:text-gray-700">▶ Watch & Learn</button>
                </div>
              </div>
            </div>
          </div>

          {/* Advanced Features */}
          <div className="max-w-5xl mx-auto border-t border-gray-200 pt-6">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Other Advanced Features</h3>
            <div className="flex flex-wrap gap-8 text-xs font-medium text-blue-600">
              <span className="cursor-pointer hover:underline">➕ Add a Custom Field</span>
              <span className="cursor-pointer hover:underline">🔄 Set Up Approval Flow</span>
              <span className="cursor-pointer hover:underline">🏷️ Create Tag</span>
              <span className="cursor-pointer hover:underline">⚙️ Create Custom Functions</span>
            </div>
          </div>

          {/* Video Guide Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <div className="bg-slate-50 border border-gray-200 rounded-lg p-5 flex items-center gap-4">
              <div className="w-16 h-16 bg-emerald-500 text-white font-bold flex items-center justify-center text-xl rounded shadow-inner shrink-0">▶</div>
              <div>
                <h5 className="text-xs font-bold text-gray-800">Configure automated email alerts</h5>
                <ul className="text-[11px] text-gray-500 mt-1 space-y-0.5 list-disc list-inside">
                  <li>Define the criteria in the workflow rule</li>
                  <li>Create an email alert</li>
                  <li>Receive automated email alerts</li>
                </ul>
              </div>
            </div>

            <div className="bg-slate-50 border border-gray-200 rounded-lg p-5 flex items-center gap-4">
              <div className="w-16 h-16 bg-emerald-500 text-white font-bold flex items-center justify-center text-xl rounded shadow-inner shrink-0">▶</div>
              <div>
                <h5 className="text-xs font-bold text-gray-800">Make your transactions reflect your brand</h5>
                <ul className="text-[11px] text-gray-500 mt-1 space-y-0.5 list-disc list-inside">
                  <li>Customize your templates</li>
                  <li>Add your organization's logo to the templates</li>
                  <li>Add the bank details to the template</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
         4️⃣ ANNOUNCEMENTS VIEW (SAME AS BEFORE)
         ======================================================== */}
      {activeTab === 'announcements' && (
        <div className="w-full flex flex-col items-center justify-center py-16 px-4 animate-fadeIn">
          <div className="relative w-72 h-44 flex items-center justify-center mb-6">
            <div className="absolute inset-0 bg-gradient-to-b from-gray-50/20 to-gray-100/50 rounded-xl border border-gray-100/40 -z-10 shadow-sm" />
            <div className="absolute top-2 left-16 bg-purple-50 text-purple-500 border border-purple-100 w-8 h-8 rounded-lg flex items-center justify-center text-sm shadow-sm animate-bounce">✓</div>
            <div className="absolute top-6 right-20 bg-emerald-50 text-emerald-500 border border-emerald-100 w-8 h-8 rounded-lg flex items-center justify-center text-sm shadow-sm animate-bounce">📅</div>
            <div className="absolute top-16 right-6 bg-blue-50 text-blue-500 border border-blue-100 w-8 h-8 rounded-lg flex items-center justify-center text-sm shadow-sm">📣</div>
            <div className="absolute bottom-12 right-12 bg-amber-50 text-amber-500 border border-amber-100 w-8 h-8 rounded-lg flex items-center justify-center text-sm shadow-sm">ⓘ</div>
            <div className="absolute bottom-4 right-24 bg-orange-50 text-orange-400 border border-orange-100 w-8 h-8 rounded-lg flex items-center justify-center text-sm shadow-sm">⚠</div>
            <div className="flex flex-col items-center justify-center">
              <div className="relative transform -rotate-12 translate-x-2">
                <div className="w-20 h-14 bg-gradient-to-r from-slate-200 to-slate-300 rounded-r-full border-y-2 border-r-2 border-slate-300 flex items-center justify-end pr-1">
                  <div className="w-3 h-10 bg-slate-400 rounded-full" />
                </div>
                <div className="w-6 h-8 bg-slate-400 absolute left-0 top-3 -translate-x-3 rounded-l-md" />
              </div>
              <div className="w-4 h-12 bg-slate-800 rounded-b-md mt-1" />
            </div>
          </div>
          <div className="text-center max-w-md space-y-2">
            <h3 className="text-[15px] font-semibold text-slate-800 tracking-tight">Never miss an announcement</h3>
            <p className="text-[12px] text-slate-400 leading-relaxed font-normal px-4">This tab is your one-stop hub to keep track of our latest events, webinars, and important updates.</p>
          </div>
        </div>
      )}

      {/* ========================================================
         🚀 5️⃣ RECENT UPDATES VIEW (CUSTOM ADDITION)
         ======================================================== */}
      {activeTab === 'recent-updates' && (
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm max-w-5xl mx-auto animate-fadeIn">
          <div className="border-b border-gray-100 pb-4 mb-6">
            <h2 className="text-base font-semibold text-gray-800">System Activity & Changelogs</h2>
            <p className="text-xs text-gray-400 mt-0.5">Stay informed about the latest software changes and platform upgrades.</p>
          </div>

          <div className="relative border-l border-gray-200 ml-4 space-y-8">
            <div className="relative pl-6">
              <div className="absolute w-3 h-3 bg-blue-500 rounded-full -left-[7px] top-1 ring-4 ring-blue-50" />
              <span className="text-[10px] font-bold text-gray-400 uppercase">June 2026</span>
              <h4 className="text-xs font-semibold text-gray-800 mt-0.5">Automated E-Invoicing Integration V2</h4>
              <p className="text-[11px] text-gray-500 mt-1 max-w-2xl leading-relaxed">
                Direct integration with Tax Portal pipelines setup complete. System will now push ledger invoices instantly.
              </p>
            </div>

            <div className="relative pl-6">
              <div className="absolute w-3 h-3 bg-purple-500 rounded-full -left-[7px] top-1 ring-4 ring-purple-50" />
              <span className="text-[10px] font-bold text-gray-400 uppercase">May 2026</span>
              <h4 className="text-xs font-semibold text-gray-800 mt-0.5">Optimized MongoDB Pipeline Performance</h4>
              <p className="text-[11px] text-gray-500 mt-1 max-w-2xl leading-relaxed">
                Resolved query timeouts during heavy background calculations. Overall fetch requests speed increased by 14%.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Persistent Global App Footer Layout */}
      <div className="max-w-5xl mx-auto border-t border-gray-200 pt-8 mt-12 bg-white/50 p-6 rounded-lg grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="flex flex-col items-center text-center">
          <h4 className="text-sm font-bold text-gray-800">Account on the go!</h4>
          <p className="text-xs text-gray-400 mt-1 max-w-xs">Download the Zoho Books app for Android and iOS to manage your finances from anywhere, anytime!</p>
          <div className="w-20 h-20 bg-gray-100 border border-gray-300 rounded mt-3 flex items-center justify-center font-bold text-[10px] text-gray-400">[QR Code]</div>
        </div>
        <div className="grid grid-cols-2 gap-4 text-[11px] font-medium text-gray-500">
          <div className="space-y-1.5">
            <p className="font-bold text-gray-400 uppercase tracking-wider text-[9px]">Other Zoho Apps</p>
            <p className="hover:text-blue-500 cursor-pointer">Ecommerce Software</p>
            <p className="hover:text-blue-500 cursor-pointer">Expense Reporting</p>
          </div>
          <div className="space-y-1.5">
            <p className="font-bold text-gray-400 uppercase tracking-wider text-[9px]">Help & Support</p>
            <p className="hover:text-blue-500 cursor-pointer">Contact Support</p>
            <p className="hover:text-blue-500 cursor-pointer">Knowledge Base</p>
          </div>
        </div>
        <div className="text-center lg:text-left flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-gray-200 pt-4 lg:pt-0 lg:pl-6">
          <p className="text-xs font-medium text-gray-600">You can directly talk to us every Monday to Friday 9:00 AM to 7:00 PM</p>
          <p className="text-sm font-bold text-slate-800 mt-1">Zoho Books India Helpline: <span className="text-blue-600">18005726671</span></p>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;