import React, { useEffect, useState } from 'react';

const ItemDetailsView = ({ onAddNewClick }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchItems = async () => {
    try {
      // Localhost ko hata kar Render ki live backend link laga di hai
      const res = await fetch(' https://ass-1-9y1a.onrender.com/api/items/all');
      const result = await res.json();
      if (result.success) {
        setItems(result.data);
      }
    } catch (err) {
      console.error("Error fetching items:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="space-y-6 max-w-5xl mx-auto text-sm text-gray-700 font-sans">
      
      {/* Dynamic clean separate clean view row layout banner */}
      <div className="flex justify-between items-center border-b pb-4 bg-white p-5 rounded-lg shadow-xs border border-gray-200">
        <div>
          <h2 className="text-base font-bold text-gray-800 flex items-center gap-2">📦 Active Items Stock Ledger</h2>
          <p className="text-xs text-gray-400 mt-0.5">List of verified product goods configurations profiles</p>
        </div>
        {/* Right high level + New Item action button trigger click to switch box views */}
        <button 
          onClick={onAddNewClick}
          className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2 rounded shadow transition cursor-pointer"
        >
          + New Item
        </button>
      </div>

      {loading ? (
        <div className="text-center py-20 text-gray-400 text-xs bg-white border rounded-lg">Loading visual product registers...</div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {items.map((item) => (
            <div key={item._id} className="bg-white rounded-lg border border-gray-200 p-5 shadow-xs flex gap-5 items-start hover:shadow-sm transition">
              
              {/* Product Image preview square icon column inside details block card */}
              <div className="w-20 h-20 bg-gray-50 border rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                {item.imageUrl ? (
                  <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-2xl opacity-40">📦</span>
                )}
              </div>

              {/* Detailed information parameters logs values */}
              <div className="flex-1 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-bold text-gray-900">{item.name}</h3>
                    <p className="text-[11px] text-gray-400 font-medium mt-0.5">SKU: {item.sku || 'N/A'} | HSN: {item.hsnCode || '—'} | Unit: {item.unit}</p>
                  </div>
                  <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-[10px] font-bold border border-gray-200 uppercase">
                    {item.type}
                  </span>
                </div>

                {/* Sub grid values log box metrics */}
                <div className="grid grid-cols-2 gap-4 text-xs pt-2 border-t border-gray-50">
                  <div className="bg-emerald-50/50 p-2.5 rounded border border-emerald-100/40">
                    <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider block">Selling Price</span>
                    <span className="text-base font-black text-emerald-600 block mt-1">₹ {item.sellingPrice || '0.00'}</span>
                    <span className="text-[10px] text-gray-400 block">Account: {item.salesAccount}</span>
                  </div>
                  <div className="bg-orange-50/50 p-2.5 rounded border border-orange-100/40">
                    <span className="text-[10px] text-orange-600 font-bold uppercase tracking-wider block">Cost Price</span>
                    <span className="text-base font-black text-orange-600 block mt-1">₹ {item.costPrice || '0.00'}</span>
                    <span className="text-[10px] text-gray-400 block">Account: {item.purchaseAccount}</span>
                  </div>
                </div>
              </div>

            </div>
          ))}

          {items.length === 0 && (
            <div className="p-20 text-center text-gray-400 font-medium bg-white rounded-lg border text-xs">
              No items created yet. Click "+ New Item" at top right corner to get started.
            </div>
          )}
        </div>
      )}

    </div>
  );
};

export default ItemDetailsView;
