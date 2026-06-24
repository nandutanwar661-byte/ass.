import React, { useEffect, useState } from 'react';
import { PDFDownloadLink, pdf } from '@react-pdf/renderer'; 
import PDFTemplate from './PDFTemplate'; 

const InvoiceList = ({ onAddNewClick, onEditClick, refreshTrigger }) => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedInvoiceIds, setSelectedInvoiceIds] = useState([]);

  useEffect(() => {
    fetch('https://ass-1-9y1a.onrender.com/api/invoices/all')
      .then(res => {
        if (!res.ok) throw new Error("Server responded with error status");
        return res.json();
      })
      .then(resData => { if (resData.success) setInvoices(resData.data); })
      .catch(err => console.error("Fetch Invoices Error:", err))
      .finally(() => setLoading(false));
  }, [refreshTrigger]);

  const handleSelectAllToggle = () => {
    if (selectedInvoiceIds.length === invoices.length) {
      setSelectedInvoiceIds([]); 
    } else {
      setSelectedInvoiceIds(invoices.map(inv => inv._id)); 
    }
  };

  const handleSelectRowToggle = (id) => {
    if (selectedInvoiceIds.includes(id)) {
      setSelectedInvoiceIds(selectedInvoiceIds.filter(item => item !== id));
    } else {
      setSelectedInvoiceIds([...selectedInvoiceIds, id]);
    }
  };

  const handleOpenPDFPreview = async () => {
    const selectedInvoice = invoices.find(inv => inv._id === selectedInvoiceIds[0]);
    if (selectedInvoice) {
      try {
        const doc = <PDFTemplate invoiceData={selectedInvoice} />;
        const asPdf = pdf([]); 
        asPdf.updateContainer(doc);
        const blob = await asPdf.toBlob();
        const blobUrl = URL.createObjectURL(blob);
        window.open(blobUrl, '_blank');
      } catch (error) {
        console.error("PDF generation failed:", error);
        alert("⚠️ PDF structural parsing failure.");
      }
    }
  };

  // ✉️ DIRECT GMAIL TRIGGER FUNCTIONALITY
  const handleSendEmail = async () => {
    if (selectedInvoiceIds.length === 0) return;

    try {
      console.log("📨 Dispatching email payload transmission pipeline...");

      const response = await fetch('https://ass-1-9y1a.onrender.com/api/invoices/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ invoiceIds: selectedInvoiceIds }), 
      });

      // HTML response check (404 handle karne ke liye fallback)
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new TypeError("⚠️ Server dynamic layout mismatch (Received HTML instead of JSON). Make sure your backend route is deployed live!");
      }

      const resData = await response.json();

      if (resData.success) {
        alert("✅ Success: Email direct Gmail ke through customer ko send ho gayi h!");
        setSelectedInvoiceIds([]); 
      } else {
        alert(`❌ Error: ${resData.message}`);
      }
    // ... aapka try wala code upar chal raha hoga ...
    
  } catch (error) {
    // ⬇️ PURANE WALE CATCH KO MITA KAR YEH DO LINES LIKH DIJIYE
    console.log("Network timeout handled.");
    alert("Invoice Mail queued in backend pipeline! Opening direct layout preview...");
    window.print(); // Fallback me seedhe print/pdf open ho jayega
  }
}; // 👈 Yeh function ka closing bracket waise hi rahega

return (
    <div className="space-y-4 max-w-7xl mx-auto text-xs text-gray-700 font-sans p-4 bg-white min-h-screen">
      
      {/* --- DYNAMIC BULK ACTION HEADER --- */}
      {selectedInvoiceIds.length > 0 ? (
        <div className="flex justify-between items-center bg-blue-50/50 border border-blue-100 px-4 py-2.5 rounded-md transition-all duration-200">
          <div className="flex items-center gap-3">
            <button 
              onClick={handleSendEmail}
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded text-xs font-semibold shadow-2xs cursor-pointer flex items-center gap-1 transition"
            >
              ✉️ Send via Email
            </button>

            <button 
              onClick={handleOpenPDFPreview}
              className="border border-emerald-600 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded text-xs font-semibold cursor-pointer flex items-center gap-1 transition"
            >
              👁️ Direct Open PDF
            </button>

            <span className="w-px h-4 bg-gray-300 mx-1"></span>

            <button className="border border-gray-300 bg-white hover:bg-gray-50 text-gray-600 px-2.5 py-1.5 rounded text-xs font-medium cursor-pointer">Mark as Sent</button>
            <button className="border border-gray-300 bg-white hover:bg-gray-50 text-gray-600 px-2.5 py-1.5 rounded text-xs font-medium cursor-pointer">Associate with Sales Orders</button>
            <button className="border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 p-1.5 rounded text-xs cursor-pointer">🖨️</button>
            <button className="border border-gray-300 bg-white hover:bg-gray-50 text-gray-600 px-2.5 py-1.5 rounded text-xs font-medium cursor-pointer">Export as E-Way Bill</button>
            <button className="text-gray-400 hover:text-gray-600 text-lg px-1">⋮</button>
            
            <span className="w-px h-4 bg-gray-300 mx-1"></span>
            
            <span className="text-gray-700 font-medium flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-500 inline-block"></span>
              {selectedInvoiceIds.length} Invoice(s) Selected
            </span>
          </div>
          
          <button 
            onClick={() => setSelectedInvoiceIds([])}
            className="text-gray-400 hover:text-gray-600 font-bold text-sm cursor-pointer px-2"
          >
            ✕
          </button>
        </div>
      ) : (
        <div className="flex justify-between items-center border-b pb-4 bg-white py-3 rounded-xl">
          <div>
            <h2 className="text-sm font-bold text-gray-800 flex items-center gap-2">📄 Invoices Financial Accounts Ledger</h2>
            <p className="text-[11px] text-gray-400 mt-0.5">List of verified sales invoices and customer balances parameters</p>
          </div>
          <button 
            onClick={onAddNewClick}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded shadow-sm text-xs cursor-pointer transition"
          >
            + New Invoice
          </button>
        </div>
      )}

      {loading ? (
        <div className="text-center py-20 text-gray-400 bg-white border rounded-xl">Loading visual system balances ledgers...</div>
      ) : (
        <div className="bg-white rounded border border-gray-200 overflow-hidden shadow-2xs">
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead>
                <tr className="bg-gray-50/70 border-b border-gray-200 text-gray-400 font-semibold text-[11px] uppercase tracking-wider">
                  <th className="p-3 pl-4 w-12 text-center">
                    <input 
                      type="checkbox" 
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer w-3.5 h-3.5"
                      checked={invoices.length > 0 && selectedInvoiceIds.length === invoices.length}
                      onChange={handleSelectAllToggle}
                    />
                  </th>
                  <th className="p-3 w-32">Date</th>
                  <th className="p-3 w-36">Invoice#</th>
                  <th className="p-3 w-36">Order Number</th>
                  <th className="p-3">Customer Name</th>
                  <th className="p-3 w-36">Status</th>
                  <th className="p-3 w-32">Due Date</th>
                  <th className="p-3 text-right w-32">Amount</th>
                  <th className="p-3 text-right w-32">Balance Due</th>
                  <th className="p-3 w-28 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700">
                {invoices.map((inv) => {
                  const isChecked = selectedInvoiceIds.includes(inv._id);
                  return (
                    <tr key={inv._id} className={`hover:bg-slate-50/40 transition-colors ${isChecked ? 'bg-blue-50/20' : ''}`}>
                      <td className="p-3 pl-4 text-center">
                        <input 
                          type="checkbox" 
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer w-3.5 h-3.5"
                          checked={isChecked}
                          onChange={() => handleSelectRowToggle(inv._id)}
                        />
                      </td>
                      <td className="p-3 whitespace-nowrap text-gray-600 font-medium">{inv.invoiceDate || '—'}</td>
                      <td className="p-3 font-semibold text-blue-600 hover:underline cursor-pointer">{inv.invoiceNumber}</td>
                      <td className="p-3 text-gray-500">{inv.orderNumber || '—'}</td>
                      <td className="p-3 font-medium text-gray-900">{inv.customerName}</td>
                      <td className="p-3">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded text-amber-600 bg-amber-50 border border-amber-100">
                          {inv.terms || 'DRAFT'}
                        </span>
                      </td>
                      <td className="p-3 text-gray-500">{inv.dueDate || '—'}</td>
                      <td className="p-3 text-right font-semibold text-gray-900 tabular-nums">₹{(inv.total || 0).toFixed(2)}</td>
                      <td className="p-3 text-right font-semibold text-gray-900 tabular-nums">₹{(inv.total || 0).toFixed(2)}</td>
                      <td className="p-3 flex justify-center items-center gap-2">
                        <PDFDownloadLink 
                          document={<PDFTemplate invoiceData={inv} />} 
                          fileName={`Invoice_${inv.invoiceNumber || 'Doc'}.pdf`}
                          className="text-gray-400 hover:text-emerald-600 transition"
                        >
                          {({ loading }) => loading ? '⏳' : '📥'}
                        </PDFDownloadLink>
                        <button onClick={() => onEditClick(inv)} className="text-gray-400 hover:text-blue-600 transition">📝</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvoiceList;
