import React, { useState } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';

const BankingOverview = () => {
  const [showChart, setShowChart] = useState(true);

  // ==========================================
  // 📈 FIXED HORIZONTAL DATA POINTS (For Straight Parallel Lines)
  // ==========================================
  const bankingTimelineData = [
    { date: '05 May', bank: 1000, card: 1200, cash: 1300, clearing: 1100 },
    { date: '07 May', bank: 1000, card: 1200, cash: 1300, clearing: 1100 },
    { date: '09 May', bank: 1000, card: 1200, cash: 1300, clearing: 1100 },
    { date: '11 May', bank: 1000, card: 1200, cash: 1300, clearing: 1100 }, // image_d8ed82.png dynamic indicator
    { date: '13 May', bank: 1000, card: 1200, cash: 1300, clearing: 1100 },
    { date: '15 May', bank: 1000, card: 1200, cash: 1300, clearing: 1100 },
    { date: '17 May', bank: 1000, card: 1200, cash: 1300, clearing: 1100 },
    { date: '19 May', bank: 1000, card: 1200, cash: 1300, clearing: 1100 },
    { date: '21 May', bank: 1000, card: 1200, cash: 1300, clearing: 1100 },
    { date: '23 May', bank: 1000, card: 1200, cash: 1300, clearing: 1100 },
    { date: '25 May', bank: 1000, card: 1200, cash: 1300, clearing: 1100 },
    { date: '27 May', bank: 1000, card: 1200, cash: 1300, clearing: 1100 },
    { date: '29 May', bank: 1000, card: 1200, cash: 1300, clearing: 1100 },
    { date: '31 May', bank: 1000, card: 1200, cash: 1300, clearing: 1100 },
    { date: '01 Jun', bank: 1000, card: 1200, cash: 1300, clearing: 1100 },
  ];

  const accountRows = [
    { name: 'Bank Account', id: '95629', uncategorized: '155 transactions', bankAmt: '₹67757913', zohoAmt: '₹24714691', type: 'bank' },
    { name: 'Cash Account', id: '6242', uncategorized: '155 transactions', bankAmt: '₹67757913', zohoAmt: '₹24714691', type: 'cash' },
    { name: 'Credit Card Account', id: '85235', uncategorized: '155 transactions', bankAmt: '₹67757913', zohoAmt: '₹24714691', type: 'card' },
    { name: 'Payment Clearing Account', id: '80542', uncategorized: '67757913', bankAmt: '₹67757913', zohoAmt: '₹24714691', type: 'clearing', hideUncat: true },
  ];

  // Custom Interactive Tooltip box matching original Zoho box layout
  const CustomHoverTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-gray-100 p-4 shadow-xl rounded text-xs font-sans min-w-[220px] text-left leading-relaxed">
          <p className="font-bold text-gray-900 mb-2">{label} 2026</p>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-2 text-gray-600 text-[11px]"><span className="w-2 h-2 rounded-full bg-[#10b981]" /> Bank Balance</span>
              <span className="font-medium text-gray-900">₹{payload[0].value}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-2 text-gray-600 text-[11px]"><span className="w-2 h-2 rounded-full bg-[#a855f7]" /> Card Balance</span>
              <span className="font-medium text-gray-900">₹{payload[1].value}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-2 text-gray-600 text-[11px]"><span className="w-2 h-2 rounded-full bg-[#64748b]" /> Cash In Hand</span>
              <span className="font-medium text-gray-900">₹{payload[2].value}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-2 text-gray-600 text-[11px]"><span className="w-2 h-2 rounded-full bg-[#3b82f6]" /> Payment Clearing</span>
              <span className="font-medium text-gray-900">₹{payload[3].value}</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full min-h-screen bg-[#fbfbfc] text-[#1e293b] font-sans antialiased selection:bg-blue-100">
      
      {/* 🟢 ACTION HEADER */}
      <div className="bg-white px-6 py-3.5 border-b border-gray-200 flex items-center justify-between">
        <h1 className="text-xl font-medium text-gray-800 tracking-tight">Banking Overview</h1>
        <div className="flex items-center gap-3 text-xs">
          <span className="text-blue-600 cursor-pointer hover:underline">Auto-upload bank statements from email</span>
          <button className="bg-white border border-gray-300 px-3 py-1.5 text-gray-700 font-medium rounded hover:bg-gray-50 transition-colors">
            Import Statement
          </button>
          <button className="bg-[#2563eb] text-white px-3 py-1.5 font-medium rounded hover:bg-blue-600 transition-colors shadow-sm">
            Add Bank or Credit Card
          </button>
          <span className="bg-orange-500 text-white w-5 h-5 flex items-center justify-center rounded cursor-pointer font-bold text-[10px]">?</span>
        </div>
      </div>

      <div className="p-6 space-y-6">
        
        {/* 🟢 METRICS GRID OVERVIEW */}
        <div className="bg-white rounded border border-gray-200 p-5 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <span className="text-sm font-semibold text-blue-600 cursor-pointer flex items-center gap-1">All Accounts ▾</span>
            <span className="text-xs text-gray-500 flex items-center gap-1 cursor-pointer">📅 Last 30 days ▾</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-center">
            <div className="flex items-center gap-3 p-1">
              <div className="w-10 h-10 bg-emerald-50 text-emerald-600 flex items-center justify-center rounded text-lg border border-emerald-100">🏦</div>
              <div>
                <p className="text-[11px] font-medium text-gray-400">Bank Balance</p>
                <p className="text-sm font-bold text-gray-800">₹9057</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-1">
              <div className="w-10 h-10 bg-purple-50 text-purple-600 flex items-center justify-center rounded text-lg border border-purple-100">💳</div>
              <div>
                <p className="text-[11px] font-medium text-gray-400">Card Balance</p>
                <p className="text-sm font-bold text-gray-800">₹-5191</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-1">
              <div className="w-10 h-10 bg-slate-100 text-slate-600 flex items-center justify-center rounded text-lg border border-slate-200">💼</div>
              <div>
                <p className="text-[11px] font-medium text-gray-400">Cash In Hand</p>
                <p className="text-sm font-bold text-gray-800">₹-9822</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-1">
              <div className="w-10 h-10 bg-blue-50 text-blue-600 flex items-center justify-center rounded text-lg border border-blue-100">🔄</div>
              <div>
                <p className="text-[11px] font-medium text-gray-400">Payment Clearing</p>
                <p className="text-sm font-bold text-gray-800">₹7877</p>
              </div>
            </div>
            <div className="bg-red-50/40 border border-red-100 p-3 rounded flex items-center justify-between lg:col-span-1 sm:col-span-2">
              <span className="text-sm font-bold text-red-700 bg-red-100/60 px-2 py-1 rounded">20073</span>
              <div className="text-right">
                <p className="text-[11px] font-semibold text-gray-800">Uncategorized Transactions</p>
                <span className="text-[11px] text-blue-600 cursor-pointer hover:underline block">Categorize now ▸</span>
              </div>
            </div>
          </div>

          <div className="mt-5 border-t border-gray-100 pt-3">
            <button 
              onClick={() => setShowChart(!showChart)} 
              className="text-xs text-blue-600 font-medium flex items-center gap-1 hover:underline"
            >
              {showChart ? '▲ Hide Chart' : '▼ Show Chart'}
            </button>
          </div>

          {/* 🟢 THE EXACT FLAT RECTILINEAR HORIZONTAL GRAPH */}
          {showChart && (
            <div className="w-full h-56 mt-4 pr-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={bankingTimelineData} margin={{ top: 15, right: 5, left: -25, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="0 0" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <YAxis 
                    ticks={[1000, 1050, 1100, 1150, 1200, 1250, 1300]} 
                    tickFormatter={(v) => `${v / 1000} K`} 
                    tick={{ fontSize: 10, fill: '#94a3b8' }} 
                    axisLine={false} 
                    tickLine={false} 
                  />
                  
                  {/* Thin vertical line follows the cursor left/right perfectly */}
                  <Tooltip content={<CustomHoverTooltip />} cursor={{ stroke: '#cbd5e1', strokeWidth: 1.2 }} />
                  
                  {/* Absolutely flat clean connected straight horizontal paths */}
                  <Line type="linear" dataKey="bank" stroke="#10b981" strokeWidth={1.2} dot={false} activeDot={{ r: 4, strokeWidth: 0 }} />
                  <Line type="linear" dataKey="card" stroke="#a855f7" strokeWidth={1.2} dot={false} activeDot={{ r: 4, strokeWidth: 0 }} />
                  <Line type="linear" dataKey="cash" stroke="#64748b" strokeWidth={1.2} dot={false} activeDot={{ r: 4, strokeWidth: 0 }} />
                  <Line type="linear" dataKey="clearing" stroke="#3b82f6" strokeWidth={1.2} dot={false} activeDot={{ r: 4, strokeWidth: 0 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* 🟢 LOWER ACTIVE ACCOUNTS DATATABLE */}
        <div className="bg-white rounded border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100 bg-white">
            <span className="text-sm font-semibold text-gray-800 cursor-pointer flex items-center gap-1">Active Accounts ▾</span>
          </div>
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200 bg-slate-50 text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                  <th className="py-3 px-5">Account Details</th>
                  <th className="py-3 px-5">Uncategorized</th>
                  <th className="py-3 px-5 text-right">Amount in Bank</th>
                  <th className="py-3 px-5 text-right">Amount in Zoho Books</th>
                  <th className="py-3 px-5 text-center w-12"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs">
                {accountRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/60 transition-colors group">
                    <td className="py-3.5 px-5 flex items-start gap-3">
                      <span className="text-base p-1.5 bg-gray-50 border border-gray-200 rounded text-gray-500 group-hover:bg-white">
                        {row.type === 'bank' && '🏛️'}
                        {row.type === 'cash' && '💵'}
                        {row.type === 'card' && '💳'}
                        {row.type === 'clearing' && '🔄'}
                      </span>
                      <div>
                        <span className="text-blue-600 font-semibold cursor-pointer block hover:underline">{row.name}</span>
                        <span className="text-[11px] text-gray-400">{row.id}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-5">
                      {!row.hideUncat ? (
                        <span className="text-red-500 font-medium cursor-pointer hover:underline">{row.uncategorized}</span>
                      ) : (
                        <span className="text-gray-300">—</span>
                      )}
                    </td>
                    <td className="py-3.5 px-5 text-right font-medium text-gray-600">{row.bankAmt}</td>
                    <td className="py-3.5 px-5 text-right font-medium text-gray-600">{row.zohoAmt}</td>
                    <td className="py-3.5 px-5 text-center text-gray-400 cursor-pointer font-bold hover:text-gray-700">
                      ▾
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default BankingOverview;