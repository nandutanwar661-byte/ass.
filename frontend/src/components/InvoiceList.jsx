import React, { useEffect, useState } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import PDFTemplate from './PDFTemplate'; // Make sure the path to PDFTemplate is correct

const InvoiceList = ({ onAddNewClick, onEditClick, refreshTrigger }) => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Localhost backend API endpoint
    fetch(' https://ass-1-saa5.onrender.com/api/invoices/all')
      .then(res => res.json())
      .then(resData => { if (resData.success) setInvoices(resData.data); })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [refreshTrigger]);

  return (
    <div className="space-y-6 max-w-5xl mx-auto text-xs text-gray-700 font-sans">
      
      {/* Top Header Controls row */}
      <div className="flex justify-between items-center border-b pb-4 bg-white p-5 rounded-xl shadow-xs border border-gray-100">
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

      {loading ? (
        <div className="text-center py-20 text-gray-400 bg-white border rounded-xl">Loading visual system balances ledgers...</div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 shadow-2xs overflow-hidden">
          <div className="p-4 bg-gray-50/60 font-bold border-b text-gray-700 uppercase tracking-wider text-[10px]">
            Invoiced Accounts Lists ({invoices.length})
          </div>
          <div className="divide-y">
            {invoices.map((inv) => (
              <div key={inv._id} className="p-5 flex justify-between items-center hover:bg-slate-50/30 transition gap-4">
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                    {inv.customerName}
                    <span className="text-[9px] font-black bg-blue-50 text-blue-600 border border-blue-100 px-1.5 rounded uppercase">
                      {inv.terms}
                    </span>
                  </h3>
                  <p className="text-[11px] text-gray-400 font-medium">
                    Invoice: <span className="text-gray-700 font-bold">{inv.invoiceNumber}</span> | Order No: {inv.orderNumber || '—'} | Date Issued: {inv.invoiceDate}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right min-w-[120px] bg-slate-50 border px-3 py-1.5 rounded-lg">
                    <span className="text-[9px] text-gray-400 uppercase font-black block">Total Volume</span>
                    <span className="text-xs font-black text-slate-900 block mt-0.5">₹ {inv.total.toFixed(2)}</span>
                  </div>

                  {/* --- NEW: PDF Download Button Integration --- */}
                  <PDFDownloadLink 
                    document={<PDFTemplate invoiceData={inv} />} 
                    fileName={`Invoice_${inv.invoiceNumber || 'Doc'}.pdf`}
                    className="text-xs bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1.5 rounded-lg shadow-3xs cursor-pointer transition flex items-center gap-1"
                  >
                    {({ blob, url, loading, error }) => 
                      loading ? '⏳' : '📥 Download PDF'
                    }
                  </PDFDownloadLink>

                  <button
                    onClick={() => onEditClick(inv)}
                    className="text-xs border border-gray-300 hover:border-blue-500 bg-gray-50 text-gray-600 hover:text-blue-600 font-bold px-3 py-1.5 rounded-lg shadow-3xs cursor-pointer transition"
                  >
                    📝 Edit Invoice
                  </button>
                </div>
              </div>
            ))}

            {invoices.length === 0 && (
              <div className="p-20 text-center text-gray-400 font-medium bg-white text-xs">
                No invoices recorded inside directory database yet. Click "+ New Invoice" to initiate formulation maps.
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

export default InvoiceList;