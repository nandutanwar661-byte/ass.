import React, { useEffect, useState } from 'react';

const EstimateDetailsView = ({ onAddNewClick, onEditClick, refreshTrigger }) => {
  const [estimates, setEstimates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Sahi Tarika: URL ko template literal me environment variable ke sath set kiya
const baseUrl = import.meta.env.VITE_API_BASE_URL || 'https://ass-1-9y1a.onrender.com';    
    fetch(`${baseUrl}/api/estimates/all`)
      .then(res => res.json())
      .then(result => { 
        if (result.success) setEstimates(result.data); 
      })
      .catch(err => console.error("Error fetching estimates:", err))
      .finally(() => setLoading(false));
  }, [refreshTrigger]); // refreshTrigger add kiya taaki data add hone ke baad list auto-refresh ho

  return (
    <div className="space-y-6 max-w-5xl mx-auto text-sm text-[#333333] font-sans antialiased">
      
      {/* Top Header Section */}
      <div className="flex justify-between items-center border-b border-gray-200 bg-white p-6 rounded-xl shadow-xs border">
        <div>
          <h2 className="text-base font-bold text-gray-800 flex items-center gap-2">
            📊 Estimates Quotations Logbook
          </h2>
          <p className="text-xs text-gray-400 mt-0.5 font-medium">
            Track commercial pricing quotes compiled for active business clients
          </p>
        </div>
        <button 
          onClick={onAddNewClick}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded shadow-xs text-xs cursor-pointer transition-all duration-150"
        >
          ➕ New Estimate
        </button>
      </div>

      {/* Main List Container */}
      {loading ? (
        <div className="text-center py-24 text-gray-400 bg-white border border-gray-200 rounded-xl font-medium shadow-2xs">
          🔄 Loading dynamic estimates indexes logs...
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {estimates.map((est) => (
            <div 
              key={est._id} 
              className="bg-white rounded-xl border border-gray-200/90 p-5 shadow-2xs flex gap-5 items-center hover:shadow-xs hover:border-gray-300 transition-all duration-200"
            >
              <div className="w-14 h-14 bg-gray-50 border border-gray-100 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                {est.items && est.items[0]?.itemImageUrl ? (
                  <img src={est.items[0].itemImageUrl} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-gray-400 text-xl font-bold">📄</span>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-1">
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 truncate">
                      {est.customerName || "Walk-in Customer"}
                    </h3>
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-gray-400 font-medium mt-0.5">
                      <span className="font-mono text-blue-600 font-semibold bg-blue-50 px-1.5 py-0.5 rounded text-[11px]">
                        {est.estimateNumber || "EST-0000"}
                      </span>
                      <span className="text-gray-300">|</span>
                      <span>Issued: {est.estimateDate || "N/A"}</span>
                    </div>
                  </div>

                  <div className="md:text-right flex md:flex-col items-baseline md:items-end gap-2 md:gap-0 mt-1 md:mt-0">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                      Estimated Volume
                    </span>
                    <span className="text-base font-extrabold text-gray-900 font-mono block">
                      ₹ {est.total ? est.total.toFixed(2) : "0.00"}
                    </span>
                  </div>
                </div>

                <div className="mt-3 px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-md text-gray-500 text-xs truncate">
                  <span className="font-semibold text-gray-400 uppercase text-[10px] tracking-wider mr-2">Core Scope:</span>
                  {est.items && est.items.length > 0 ? (
                    est.items.map(i => `${i.itemDetails || 'Item'} (x${i.quantity || 1})`).join(', ')
                  ) : (
                    <span className="italic text-gray-400">No items specified under this scope</span>
                  )}
                </div>
              </div>

              {/* Action Node Hub */}
              <div className="flex items-center gap-1 border-l border-gray-100 pl-4 self-stretch my-1">
                 <button
                    onClick={() => onEditClick(est)} // 👈 FIXED: 'inv' ko badal kar 'est' kiya
                    className="text-xs border border-gray-300 hover:border-blue-500 bg-gray-50 text-gray-600 hover:text-blue-600 font-bold px-3 py-1.5 rounded-lg shadow-3xs cursor-pointer transition"
                  >
                    📝 Edit Estimate
                  </button>
              </div>

            </div>
          ))}

          {estimates.length === 0 && (
            <div className="p-24 text-center text-gray-400 font-medium bg-white rounded-xl border border-dashed border-gray-200">
              📁 No estimates found inside database.
            </div>
          )}
        </div>
      )}

    </div>
  );
};

export default EstimateDetailsView;