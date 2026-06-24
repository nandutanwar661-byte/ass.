import React, { useState } from 'react';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';

const Dashboard = ({ 
  summary = {}, 
  cashFlowData = [], 
  incomeExpenseData = [], 
  pieData = [], 
  projects = [], 
  bankAccounts = [] 
}) => {
  // Navigation State setup
  const [activeTab, setActiveTab] = useState('dashboard'); 

  // Indian currency (₹) formatting helper function
  const formatCurrency = (num) => {
    if (num === undefined || num === null) return '₹0.00';
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(num);
  };

  return (
    <div className="w-full min-h-screen bg-[#f8fafc] p-6 text-[#1e293b] font-sans antialiased">
      
      {/* Main Container to limit max-width and center align smoothly */}
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Profile Welcome Header */}
        <div className="bg-white p-5 rounded-xl border border-gray-100 flex items-center justify-between shadow-sm transition-all duration-300">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 border border-blue-100 text-blue-600 font-bold flex items-center justify-center rounded-xl text-[11px] tracking-wider shadow-sm">
              SUITS
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900 tracking-tight">Hello, Naresh Tailor</h1>
              <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                Suits Workspaces Private Limited <span className="text-blue-500 font-medium cursor-pointer hover:text-blue-600 transition-colors">▪ All Locations ▾</span>
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-6 border-b border-gray-200 text-xs font-semibold text-gray-500 bg-white px-4 pt-3 rounded-t-xl border-x border-t">
          {[
            { id: 'dashboard', label: 'Dashboard' },
            { id: 'fiscal-tasks', label: 'Fiscal Tasks' },
            { id: 'getting-started', label: 'Getting Started' },
            { id: 'announcements', label: 'Announcements' },
            { id: 'recent-updates', label: 'Recent Updates' }
          ].map((tab) => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)} 
              className={`pb-3 px-1 transition-all duration-200 relative ${
                activeTab === tab.id 
                  ? 'text-blue-600 font-bold border-b-2 border-blue-500' 
                  : 'hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ========================================================
           1️⃣ DASHBOARD VIEW
           ======================================================== */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6 animate-fadeIn transition-all">
            
            {/* Receivables & Payables Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* TOTAL RECEIVABLES */}
              <div className="bg-white rounded-xl border border-gray-200 p-5 flex flex-col justify-between shadow-sm hover:shadow-md transition-all">
                <div>
                  <div className="flex justify-between items-center text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                    <span>Total Receivables ⓘ</span>
                    <span className="text-[#0066cc] text-xs cursor-pointer hover:underline font-semibold">+ New</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-3">
                    Total Unpaid Invoices: {formatCurrency(summary.totalReceivables || 0.00)}
                  </p>
                  <h2 className="text-2xl font-bold text-gray-900 mt-1 tracking-tight">
                    {formatCurrency(summary.totalReceivables || 0.00)}
                  </h2>
                </div>
                <div className="mt-5">
                  <div className="w-full bg-gray-100 h-2 rounded-full flex overflow-hidden">
                    <div className="bg-[#3b82f6] h-full" style={{ width: summary.totalReceivables ? `${(summary.currentReceivables / summary.totalReceivables) * 100}%` : '0%' }}></div>
                    <div className="bg-[#ff9f1c] h-full" style={{ width: summary.totalReceivables ? `${(summary.overdueReceivables / summary.totalReceivables) * 100}%` : '100%' }}></div>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-500 mt-3">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 bg-[#3b82f6] rounded-full"></span>
                      Current: {formatCurrency(summary.currentReceivables || 0.00)}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 bg-[#ff9f1c] rounded-full"></span>
                      Overdue: {formatCurrency(summary.overdueReceivables || 0.00)}
                    </span>
                  </div>
                </div>
              </div>

              {/* TOTAL PAYABLES */}
              <div className="bg-white rounded-xl border border-gray-200 p-5 flex flex-col justify-between shadow-sm hover:shadow-md transition-all">
                <div>
                  <div className="flex justify-between items-center text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                    <span>Total Payables ⓘ</span>
                    <span className="text-[#0066cc] text-xs cursor-pointer hover:underline font-semibold">+ New</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-3">
                    Total Unpaid Bills: {formatCurrency(summary.totalPayables || 0.00)}
                  </p>
                  <h2 className="text-2xl font-bold text-gray-900 mt-1 tracking-tight">
                    {formatCurrency(summary.totalPayables || 0.00)}
                  </h2>
                </div>
                <div className="mt-5">
                  <div className="w-full bg-gray-100 h-2 rounded-full flex overflow-hidden">
                    <div className="bg-[#3b82f6] h-full" style={{ width: summary.totalPayables ? `${(summary.currentPayables / summary.totalPayables) * 100}%` : '0%' }}></div>
                    <div className="bg-[#ff9f1c] h-full" style={{ width: summary.totalPayables ? `${(summary.overduePayables / summary.totalPayables) * 100}%` : '100%' }}></div>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-500 mt-3">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 bg-[#3b82f6] rounded-full"></span>
                      Current: {formatCurrency(summary.currentPayables || 0.00)}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 bg-[#ff9f1c] rounded-full"></span>
                      Overdue: {formatCurrency(summary.overduePayables || 0.00)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Cash Flow Line Chart */}
            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              <div className="flex justify-between items-center border-b border-gray-100 pb-4 mb-4">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Cash Flow ⓘ</h3>
                <select className="text-gray-600 border border-gray-200 rounded-lg px-2 py-1 bg-white text-xs font-medium focus:outline-none focus:ring-1 focus:ring-blue-500">
                  <option>This Fiscal Year</option>
                </select>
              </div>
              <div className="flex flex-col lg:flex-row gap-8 items-stretch">
                <div className="flex-1 min-h-[220px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart 
                      data={cashFlowData && cashFlowData.length ? cashFlowData : [
                        { month: 'Jan', value: 0 }, { month: 'Feb', value: 0 }, { month: 'Mar', value: 0 },
                        { month: 'Apr', value: 0 }, { month: 'May', value: 0 }, { month: 'Jun', value: 0 },
                        { month: 'Jul', value: 0 }, { month: 'Aug', value: 0 }, { month: 'Sep', value: 0 },
                        { month: 'Oct', value: 0 }, { month: 'Nov', value: 0 }, { month: 'Dec', value: 0 }
                      ]} 
                      margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                      <YAxis domain={[0, 'auto']} tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                      <Tooltip />
                      <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2.5} dot={{ r: 4, fill: '#3b82f6' }} activeDot={{ r: 6 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="w-full lg:w-[340px] flex flex-col justify-center divide-y divide-gray-100 bg-gray-50/70 p-4 rounded-xl border border-gray-100">
                  <div className="pb-3 flex flex-col">
                    <span className="text-xs text-gray-400 font-medium">Cash as on 01/04/2026</span>
                    <span className="text-xl font-bold text-gray-900 mt-0.5">
                      {formatCurrency(summary.currentCash || 0.00)}
                    </span>
                  </div>
                  <div className="py-3 flex justify-between items-center">
                    <span className="text-xs text-[#22c55e] font-semibold uppercase tracking-wider">Incoming</span>
                    <span className="text-sm font-semibold text-gray-800">
                      {formatCurrency(summary.incomingCash || 0.00)} +
                    </span>
                  </div>
                  <div className="pt-3 flex justify-between items-center">
                    <span className="text-xs text-pink-600 font-semibold uppercase tracking-wider">Outgoing</span>
                    <span className="text-sm font-semibold text-gray-800">
                      {formatCurrency(summary.outgoingCash || 0.00)} -
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Income Expense & Pie Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Income and Expense Bar Chart */}
              <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                <div className="flex justify-between items-center border-b border-gray-100 pb-4 mb-4">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Income and Expense</h3>
                </div>
                <div className="h-[240px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={incomeExpenseData && incomeExpenseData.length ? incomeExpenseData : []} margin={{ top: 10, right: 5, left: -25, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                      <Tooltip />
                      <Bar dataKey="Income" fill="#2dd4bf" barSize={8} radius={[4, 4, 0, 0]} />
                      <Bar dataKey="Expense" fill="#f97316" barSize={8} radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-around border-t border-gray-100 pt-3 mt-2 text-center">
                  <div>
                    <p className="text-[11px] font-medium text-gray-400 uppercase">Total Income</p>
                    <p className="text-sm font-bold text-gray-800 mt-0.5">
                      {formatCurrency(summary.totalIncome || 0.00)}
                    </p>
                  </div>
                  <div className="border-l border-gray-200 h-8"></div>
                  <div>
                    <p className="text-[11px] font-medium text-gray-400 uppercase">Total Expenses</p>
                    <p className="text-sm font-bold text-gray-800 mt-0.5">
                      {formatCurrency(summary.totalExpenses || 0.00)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Top Expenses Pie Chart */}
              <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                <div className="flex justify-between items-center border-b border-gray-100 pb-4 mb-4">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Top Expenses</h3>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-6 h-[240px] justify-center">
                  <div className="w-[150px] h-[150px] shrink-0">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie 
                          data={pieData && pieData.length ? pieData : [{ name: 'No Expenses', value: 100, color: '#f1f5f9' }]} 
                          cx="50%" 
                          cy="50%" 
                          innerRadius={45} 
                          outerRadius={70} 
                          paddingAngle={3}
                          dataKey="value"
                        >
                          {(pieData && pieData.length ? pieData : [{ color: '#f1f5f9' }]).map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex-1 space-y-2 w-full overflow-y-auto max-h-[200px] pr-2">
                    {pieData && pieData.length ? (
                      pieData.map((item, idx) => (
                        <div key={idx} className="flex justify-between text-xs font-medium text-gray-600">
                          <span className="flex items-center gap-2 truncate max-w-[140px]">
                            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }}></span>
                            <span className="truncate">{item.name}</span>
                          </span>
                          <span className="text-gray-900 font-semibold">{item.value}%</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-gray-400 italic">No expenses recorded yet.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Lower Projects & Watchlist Block */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Projects */}
              <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                <div className="border-b border-gray-100 pb-3 mb-4 flex justify-between items-center">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Projects ⓘ</h3>
                  <div className="flex gap-4 text-xs font-semibold text-gray-700">
                    <span className="flex flex-col items-end">
                      🕒 {summary.unbilledHours || '0:00'} <span className="text-[10px] font-normal text-gray-400">UNBILLED HOURS</span>
                    </span>
                    <span className="flex flex-col items-end">
                      💵 {formatCurrency(summary.unbilledExpenses || 0.00)} <span className="text-[10px] font-normal text-gray-400">UNBILLED EXPENSES</span>
                    </span>
                  </div>
                </div>
                <div className="space-y-4 max-h-[220px] overflow-y-auto">
                  {projects && projects.length ? (
                    projects.map((proj) => (
                      <div key={proj.id} className="flex items-center gap-4 border-b border-gray-50 pb-3 last:border-none">
                        <div className="relative w-11 h-11 flex items-center justify-center shrink-0">
                          <svg className="w-full h-full transform -rotate-90">
                            <circle cx="22" cy="22" r="18" stroke="#f1f5f9" strokeWidth="3" fill="transparent" />
                            <circle cx="22" cy="22" r="18" stroke="#3b82f6" strokeWidth="3" fill="transparent" strokeDasharray={proj.circumference || 113} strokeDashoffset={(proj.circumference || 113) - ((proj.percentage || 0) / 100) * (proj.circumference || 113)} />
                          </svg>
                          <span className="absolute text-[10px] font-bold text-gray-700">{proj.percentage || 0}%</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold text-[#0066cc] truncate cursor-pointer hover:underline">{proj.name}</h4>
                          <p className="text-[11px] text-gray-400 truncate mt-0.5">{proj.client}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-gray-400 italic py-2">No active projects linked.</p>
                  )}
                </div>
              </div>

              {/* Bank and Credit Cards */}
              <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                <div className="border-b border-gray-100 pb-3 mb-2">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Bank and Credit Cards ⓘ</h3>
                </div>
                <div className="divide-y divide-gray-100 max-h-[220px] overflow-y-auto">
                  {bankAccounts && bankAccounts.length ? (
                    bankAccounts.map((acc, index) => (
                      <div key={index} className="py-3 flex justify-between items-center text-xs font-medium">
                        <span className="text-gray-700 hover:text-[#0066cc] cursor-pointer transition-colors">{acc.name}</span>
                        <span className="text-[#0066cc] font-semibold bg-blue-50 px-2 py-0.5 rounded">{acc.number}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-gray-400 italic py-3">No bank accounts integrated yet.</p>
                  )}
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ========================================================
           2️⃣ FISCAL YEAR-END TASKS VIEW
           ======================================================== */}
        {activeTab === 'fiscal-tasks' && (
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm animate-fadeIn">
            <div className="border-b border-gray-100 pb-4 mb-6">
              <h2 className="text-base font-semibold text-gray-800">Financial Year-End Checklist (FY 2026-27)</h2>
              <p className="text-xs text-gray-400 mt-0.5">Ensure your books are accurate before closing the fiscal calendar period.</p>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 border border-gray-100 bg-slate-50/50 rounded-xl flex items-center justify-between hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-3">
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <div>
                    <h4 className="text-xs font-semibold text-gray-800">Reconcile All Bank Accounts</h4>
                    <p className="text-[11px] text-gray-400">Match bank statements with recorded entries to ensure zero differences.</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold uppercase text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">Completed</span>
              </div>

              <div className="p-4 border border-gray-100 bg-slate-50/50 rounded-xl flex items-center justify-between hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-3">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <div>
                    <h4 className="text-xs font-semibold text-gray-800">Run Asset Depreciation Schedules</h4>
                    <p className="text-[11px] text-gray-400">Calculate and post automated depreciation journal logs for company fixed assets.</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold uppercase text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md">Pending</span>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
           3️⃣ GETTING STARTED VIEW
           ======================================================== */}
        {activeTab === 'getting-started' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="text-center py-4 bg-white border border-gray-200 rounded-xl shadow-sm">
              <h2 className="text-xl font-medium text-gray-800">Welcome to Zoho Books <span className="text-xs text-blue-500 cursor-pointer ml-1 hover:underline font-normal">Overview of Zoho Books</span></h2>
              <p className="text-xs text-gray-400 mt-1">Your journey to effortlessly manage your accounting starts here.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { icon: "📄", bg: "bg-blue-50 text-blue-500", title: "Configure Chart of Accounts", desc: "The Chart of Accounts in Zoho Books contains a list of default accounts that can be used by any type of business. If there are other accounts that your business needs, you can create them." },
                { icon: "💵", bg: "bg-emerald-50 text-emerald-500", title: "Enter Opening Balances", desc: "If you're migrating from another software you must enter the opening balances in Zoho Books before you start creating transactions to keep your books intact." },
                { icon: "💳", bg: "bg-amber-50 text-amber-500", title: "Connect with Payment Gateways", desc: "Integrate with one of the leading payment gateways and collect payments faster from your customers.", extra: true },
                { icon: "👥", bg: "bg-indigo-50 text-indigo-500", title: "Enable Customer and Vendor Portals", desc: "Customer and vendor portals allow your customers and vendors to keep track and communicate with you about all the transactions.", url: true }
              ].map((card, i) => (
                <div key={i} className="bg-white p-6 border border-gray-200 rounded-xl shadow-sm flex items-start gap-4 hover:border-blue-400 transition-all group">
                  <div className={`text-xl p-2.5 ${card.bg} rounded-xl group-hover:scale-105 transition-transform`}>{card.icon}</div>
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-gray-800">{card.title}</h4>
                    <p className="text-xs text-gray-400 mt-1 leading-relaxed">{card.desc} <span className="text-blue-500 cursor-pointer hover:underline">Learn More</span></p>
                    
                    {card.extra && (
                      <div className="mt-2 flex gap-2 items-center opacity-80">
                        <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded border font-bold text-blue-800">stripe</span>
                        <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded border font-bold text-indigo-800">PayPal</span>
                      </div>
                    )}
                    
                    {card.url && (
                      <p className="text-[11px] text-blue-500 mt-2 select-all truncate max-w-xs bg-slate-50 p-1.5 rounded border border-dashed">URL: books.zoho.com/portal/demoorg 🔗</p>
                    )}

                    <div className="flex gap-4 mt-4">
                      <button className="bg-blue-500 text-white text-xs px-3 py-1.5 rounded-lg font-medium hover:bg-blue-600 shadow-sm transition-colors">Configure</button>
                      <button className="text-gray-500 text-xs font-medium flex items-center gap-1 hover:text-gray-700 transition-colors">▶ Watch & Learn</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Other Advanced Features</h3>
              <div className="flex flex-wrap gap-6 text-xs font-semibold text-blue-600">
                {["➕ Add a Custom Field", "🔄 Set Up Approval Flow", "🏷️ Create Tag", "⚙️ Create Custom Functions"].map((feat, i) => (
                  <span key={i} className="cursor-pointer hover:underline bg-blue-50/50 px-2.5 py-1 rounded-md border border-blue-100">{feat}</span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-50 border border-gray-200 rounded-xl p-5 flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-500 text-white font-bold flex items-center justify-center text-md rounded-xl shadow-md shrink-0">▶</div>
                <div>
                  <h5 className="text-xs font-bold text-gray-800">Configure automated email alerts</h5>
                  <ul className="text-[11px] text-gray-500 mt-1 space-y-0.5 list-disc list-inside">
                    <li>Define the criteria in the workflow rule</li>
                    <li>Create an email alert</li>
                  </ul>
                </div>
              </div>

              <div className="bg-slate-50 border border-gray-200 rounded-xl p-5 flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-500 text-white font-bold flex items-center justify-center text-md rounded-xl shadow-md shrink-0">▶</div>
                <div>
                  <h5 className="text-xs font-bold text-gray-800">Make your transactions reflect your brand</h5>
                  <ul className="text-[11px] text-gray-500 mt-1 space-y-0.5 list-disc list-inside">
                    <li>Customize your templates</li>
                    <li>Add your organization's logo</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

    

        {/* ========================================================
           4️⃣ ANNOUNCEMENTS VIEW
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
           🚀 5️⃣ RECENT UPDATES VIEW
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
    </div>
  );
};

export default Dashboard;