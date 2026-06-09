import React, { useEffect, useState } from 'react';

const CustomerList = ({ onAddNewCustomerClick, onEditCustomerClick, refreshTrigger }) => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCustomers = async () => {
    try {

     // सही तरीका: Environment Variable का उपयोग करके यूआरएल बनाना
      const baseUrl = import.meta.env.VITE_API_BASE_URL || 'https://ass-1-saa5.onrender.com';
      const res = await fetch(`${baseUrl}/api/customers`);

      const data = await res.json();
      setCustomers(data);
    } catch (err) {
      console.error("Error fetching customers:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, [refreshTrigger]);

  return (
    <div className="space-y-6 max-w-5xl mx-auto text-xs text-gray-700 font-sans">
      
      {/* Top Professional Action Header Row Block */}
      <div className="flex justify-between items-center border-b pb-4 bg-white p-5 rounded-xl shadow-xs border border-gray-100">
        <div>
          <h2 className="text-sm font-bold text-gray-800 flex items-center gap-2">👤 Corporate Customers Directory</h2>
          <p className="text-[11px] text-gray-400 mt-0.5">Real-time ledger profiles displaying financial opening limits balances</p>
        </div>
        <button 
          onClick={onAddNewCustomerClick}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded shadow-sm transition text-xs cursor-pointer"
        >
          + New Customer
        </button>
      </div>

      {/* Main Core Render Profiles View Section */}
      {loading ? (
        <div className="text-center py-20 text-gray-400 font-medium bg-white border rounded-xl">Loading custom ledger books...</div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 shadow-xs overflow-hidden">
          
          <div className="p-4 bg-gray-50/50 font-bold text-slate-800 border-b flex items-center gap-2 text-xs">
            👥 Saved Customers Configuration Profiles ({customers.length})
          </div>

          <div className="divide-y divide-gray-100">
            {customers.map((cust) => (
              <div key={cust._id} className="p-5 flex items-center justify-between hover:bg-slate-50/40 transition gap-4">
                
                {/* Left Block info structure details */}
                <div className="flex gap-4 items-center">
                  {/* Round Dynamic Image profile avatar wrapper */}
                  <div className="w-12 h-12 rounded-full border border-gray-200 bg-gray-50 overflow-hidden flex items-center justify-center flex-shrink-0 shadow-inner">
                    {cust.imageUrl ? (
                      <img src={cust.imageUrl} alt={cust.displayName} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-[10px] font-bold text-gray-400 uppercase">No Img</span>
                    )}
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                      {cust.displayName}
                      <span className={`text-[9px] font-black px-1.5 py-0.5 rounded uppercase ${cust.type === 'Business' ? 'bg-indigo-50 text-indigo-600 border border-indigo-100' : 'bg-amber-50 text-amber-600 border border-amber-100'}`}>
                        {cust.type}
                      </span>
                    </h3>
                    {cust.companyName && <p className="text-xs text-gray-500 font-medium">🏢 Company: <span className="text-gray-700 font-semibold">{cust.companyName}</span></p>}
                    <p className="text-[11px] text-gray-400 font-medium">✉️ {cust.email || 'N/A'} | 📞 Work: {cust.phone || '—'} | 📱 Mob: {cust.mobile || '—'}</p>
                  </div>
                </div>

                {/* Right Block accounting parameters tracking logs + Edit Trigger layout buttons */}
                <div className="flex items-center gap-6">
                  {/* Ledger metric data blocks items row details values */}
                  <div className="flex gap-4 text-right font-medium">
                    <div className="bg-slate-50/50 border px-3 py-1.5 rounded-md min-w-[100px]">
                      <span className="text-[9px] text-gray-400 uppercase font-bold tracking-wider block">Receivables</span>
                      <span className={`text-xs font-bold block mt-0.5 ${cust.openingReceivables > 0 ? 'text-blue-600' : 'text-slate-500'}`}>
                        ₹ {cust.openingReceivables || 0}
                      </span>
                    </div>
                    <div className="bg-slate-50/50 border px-3 py-1.5 rounded-md min-w-[100px]">
                      <span className="text-[9px] text-gray-400 uppercase font-bold tracking-wider block">Payables</span>
                      <span className={`text-xs font-bold block mt-0.5 ${cust.openingPayables > 0 ? 'text-orange-600' : 'text-slate-500'}`}>
                        ₹ {cust.openingPayables || 0}
                      </span>
                    </div>
                  </div>

                  {/* Actions Trigger parameters button */}
                  <button
                    onClick={() => onEditCustomerClick(cust)}
                    className="text-xs border border-gray-300 text-gray-600 hover:bg-white hover:text-blue-600 hover:border-blue-500 px-3 py-2 rounded-lg font-bold transition shadow-2xs bg-gray-50 cursor-pointer"
                  >
                    📝 Edit Profile
                  </button>
                </div>

              </div>
            ))}

            {customers.length === 0 && (
              <div className="p-20 text-center text-gray-400 font-medium text-xs">
                No profiles configured inside directory yet. Click the "+ New Customer" button at top to get started.
              </div>
            )}
          </div>

        </div>
      )}

    </div>
  );
};

export default CustomerList;
