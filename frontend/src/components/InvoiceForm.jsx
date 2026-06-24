import React, { useEffect, useState } from 'react';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import PDFTemplate from './PDFTemplate'; // Ensure right path for PDFTemplate file

const InvoiceForm = ({ onInvoiceSaved, onCancel, editData }) => {
  const [customers, setCustomers] = useState([]);
  const [meta, setMeta] = useState({
    customerName: '',
    location: 'Corporate',
    invoiceNumber: 'RAJ/INV-000000',
    orderNumber: '',
    invoiceDate: '2026-05-18', // Format updated to YYYY-MM-DD for standard native pickers
    terms: 'Net 7',
    dueDate: '2026-05-25',
    customerNotes: 'Thank you for the payment.',
    termsConditions: 'Terms and conditions go here...',
    shippingCharges: 0,
    tdsTcsOption: 'TDS',
    taxSelect: 'Select a Tax'
  });

  const [tableItems, setTableItems] = useState([
    { itemDetails: '', quantity: 1, rate: 0, discount: 0, tax: 'Select Tax', amount: 0 }
  ]);

  const [savedPayload, setSavedPayload] = useState(null);
  const [showPDFSection, setShowPDFSection] = useState(false);

  useEffect(() => {
    fetch(' https://ass-1-9y1a.onrender.com/api/customers/all')
      .then(res => res.json())
      .then(data => setCustomers(data))
      .catch(err => console.error(err));

    if (editData) {
      setMeta(editData);
      setTableItems(editData.items || []);
    }
  }, [editData]);

  const handleTableChange = (index, field, value) => {
    const updated = [...tableItems];
    updated[index][field] = value;

    if (field === 'quantity' || field === 'rate' || field === 'discount') {
      const qty = Number(updated[index].quantity) || 0;
      const price = Number(updated[index].rate) || 0;
      const disc = Number(updated[index].discount) || 0;
      const gross = qty * price;
      updated[index].amount = Math.max(0, gross - (gross * (disc / 100)));
    }
    setTableItems(updated);
  };

  const subTotal = tableItems.reduce((acc, row) => acc + (row.amount || 0), 0);
  const totalAmount = subTotal + (Number(meta.shippingCharges) || 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!meta.customerName) {
      alert("⚠️ Please pick or input a valid Customer Name!");
      return;
    }

    const payload = { ...meta, items: tableItems, subTotal, total: totalAmount };
    
    const url = editData 
      ? ` https://ass-1-9y1a.onrender.com/api/invoices/${editData._id}`
      : ' https://ass-1-9y1a.onrender.com/api/invoices/add';
    const method = editData ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const resData = await response.json();
      
      if (resData.success) {
        alert(editData ? '🎉 Invoice Updated Successfully!' : '🎉 Invoice Registered & Dispatched!');
        setSavedPayload(payload);
        setShowPDFSection(true);
      }
    } catch (err) {
      alert('⚠️ Database pipeline linkage error.');
    }
  };

  return (
    <div className="bg-[#fbfbfb] min-h-screen p-4 md:p-6 font-sans text-sm text-[#333333]">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 max-w-6xl mx-auto overflow-hidden">
        
        {/* Header Block */}
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50/70">
          <h2 className="text-base font-semibold text-gray-800 flex items-center gap-2">
            <span className="text-blue-600 font-bold">➕</span> 
            {editData ? 'Edit Invoice Profile' : 'New Invoice Ledger'}
          </h2>
          <span className="text-[11px] font-medium text-gray-400 uppercase tracking-widest bg-gray-200/60 px-2 py-0.5 rounded">
            Zoho Automation Protocol
          </span>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          
          {/* Metadata Block */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 max-w-5xl">
            
            {/* Left Side fields */}
            <div className="space-y-4">
              <div className="grid grid-cols-3 items-center gap-2">
                <label className="text-xs font-medium text-gray-600">
                  Customer Name <span className="text-red-500">*</span>
                </label>
                <div className="col-span-2 relative">
                  <input 
                    type="text"
                    list="customer-list"
                    value={meta.customerName} 
                    onChange={e => setMeta({...meta, customerName: e.target.value})} 
                    className="w-full border border-gray-300 rounded px-3 py-1.5 bg-white text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none" 
                    placeholder="Select or add a customer"
                    required 
                  />
                  <datalist id="customer-list">
                    {customers.map(c => (
                      <option key={c._id || c.displayName} value={c.displayName} />
                    ))}
                  </datalist>
                </div>
              </div>

              <div className="grid grid-cols-3 items-center gap-2">
                <label className="text-xs font-medium text-gray-500">Location</label>
                <select 
                  value={meta.location} 
                  onChange={e => setMeta({...meta, location: e.target.value})} 
                  className="col-span-2 border border-gray-300 rounded px-3 py-1.5 bg-white text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none"
                >
                  <option value="Corporate">Corporate</option>
                  <option value="Branch">Branch</option>
                </select>
              </div>
            </div>

            {/* Right Side Fields */}
            <div className="space-y-4">
              <div className="grid grid-cols-3 items-center gap-2">
                <label className="text-xs font-medium text-gray-600">
                  Invoice# <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  value={meta.invoiceNumber} 
                  onChange={e => setMeta({...meta, invoiceNumber: e.target.value})} 
                  className="col-span-2 border border-gray-300 bg-gray-50 font-mono font-semibold rounded px-3 py-1.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none" 
                  required 
                />
              </div>
              
              <div className="grid grid-cols-3 items-center gap-2">
                <label className="text-xs font-medium text-gray-500">Order Number</label>
                <input 
                  type="text" 
                  value={meta.orderNumber} 
                  onChange={e => setMeta({...meta, orderNumber: e.target.value})} 
                  className="col-span-2 border border-gray-300 rounded px-3 py-1.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none" 
                />
              </div>
            </div>
          </div>

          {/* Timeline Dates Container */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-b border-gray-100 py-5 max-w-5xl">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-gray-600">Invoice Date <span className="text-red-500">*</span></label>
              <input 
                type="date" 
                value={meta.invoiceDate} 
                onChange={e => setMeta({...meta, invoiceDate: e.target.value})} 
                className="border border-gray-300 rounded px-3 py-1.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none bg-white" 
                required 
              />
            </div>
            
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-gray-500">Terms</label>
              <select 
                value={meta.terms} 
                onChange={e => setMeta({...meta, terms: e.target.value})} 
                className="border border-gray-300 rounded px-3 py-1.5 bg-white text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none"
              >
                <option value="Net 7">Net 7 Days</option>
                <option value="Net 15">Net 15 Days</option>
                <option value="Due on Receipt">Due on Receipt</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-gray-500">Due Date</label>
              <input 
                type="date" 
                value={meta.dueDate} 
                onChange={e => setMeta({...meta, dueDate: e.target.value})} 
                className="border border-gray-300 rounded px-3 py-1.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none bg-white" 
              />
            </div>
          </div>

          {/* Line Items Table Block */}
          <div className="border border-gray-200 rounded-lg overflow-hidden shadow-2xs">
            <div className="px-4 py-2 bg-slate-100 border-b border-gray-200 font-semibold text-gray-500 uppercase tracking-wider text-[10px]">
              🛡️ Scan Item Bulk Actions Available
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200 text-gray-400 font-semibold text-[11px] uppercase">
                    <th className="p-3 w-5/12">Item Details</th>
                    <th className="p-3 text-center w-24">Quantity</th>
                    <th className="p-3 text-center w-28">Rate (₹)</th>
                    <th className="p-3 text-center w-28">Discount (%)</th>
                    <th className="p-3 text-center w-36">Tax</th>
                    <th className="p-3 text-right pr-6 w-32">Amount (₹)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-700">
                  {tableItems.map((row, idx) => (
                    <tr key={idx} className="hover:bg-gray-50/60 transition-colors">
                      <td className="p-3">
                        <input 
                          type="text" 
                          placeholder="Type or select an item details..." 
                          value={row.itemDetails} 
                          onChange={e => handleTableChange(idx, 'itemDetails', e.target.value)} 
                          className="w-full border border-gray-200 rounded px-3 py-1.5 bg-white text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none" 
                          required 
                        />
                      </td>
                      <td className="p-3 text-center">
                        <input 
                          type="number" 
                          value={row.quantity} 
                          onChange={e => handleTableChange(idx, 'quantity', e.target.value)} 
                          className="w-full border border-gray-200 rounded px-2 py-1.5 text-center text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none" 
                        />
                      </td>
                      <td className="p-3 text-center">
                        <input 
                          type="number" 
                          value={row.rate} 
                          onChange={e => handleTableChange(idx, 'rate', e.target.value)} 
                          className="w-full border border-gray-200 rounded px-2 py-1.5 text-center font-medium text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none" 
                        />
                      </td>
                      <td className="p-3 text-center">
                        <input 
                          type="number" 
                          value={row.discount} 
                          onChange={e => handleTableChange(idx, 'discount', e.target.value)} 
                          className="w-full border border-gray-200 rounded px-2 py-1.5 text-center text-orange-600 font-medium text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none" 
                        />
                      </td>
                      <td className="p-3">
                        <select 
                          value={row.tax} 
                          onChange={e => handleTableChange(idx, 'tax', e.target.value)} 
                          className="w-full border border-gray-200 rounded px-2 py-1.5 bg-white text-xs focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                        >
                          <option value="Select Tax">Select a Tax</option>
                          <option value="GST18">GST [18%]</option>
                          <option value="Exempt">Exempt</option>
                        </select>
                      </td>
                      <td className="p-3 text-right pr-6 text-gray-900 font-semibold tabular-nums text-sm">
                        {row.amount.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Action Row Addition */}
          <div className="flex gap-2.5">
            <button 
              type="button" 
              onClick={() => setTableItems([...tableItems, { itemDetails: '', quantity: 1, rate: 0, discount: 0, tax: 'Select Tax', amount: 0 }])} 
              className="border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 font-semibold px-4 py-1.5 rounded text-xs shadow-xs transition cursor-pointer"
            >
              ➕ Add New Line Row
            </button>
            <button 
              type="button" 
              className="border border-gray-200 bg-gray-50 text-gray-400 font-semibold px-4 py-1.5 rounded text-xs cursor-not-allowed"
            >
              Bulk Import Items
            </button>
          </div>

          {/* Footer Blocks (Notes & Calculations Matrix) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-6 border-t border-gray-200">
            
            {/* Left Note Block */}
            <div className="md:col-span-7 space-y-4">
              <div className="flex flex-col gap-1.5">
                <label className="font-semibold text-gray-500 uppercase text-[10px] tracking-wider">Customer Notes</label>
                <textarea 
                  rows="2" 
                  value={meta.customerNotes} 
                  onChange={e => setMeta({...meta, customerNotes: e.target.value})} 
                  className="w-full border border-gray-200 rounded-lg p-3 text-xs text-gray-600 bg-gray-50/50 resize-none focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none"
                />
              </div>
              
              <div className="flex flex-col gap-1.5">
                <label className="font-semibold text-gray-500 uppercase text-[10px] tracking-wider">Terms & Conditions</label>
                <textarea 
                  rows="2" 
                  value={meta.termsConditions} 
                  onChange={e => setMeta({...meta, termsConditions: e.target.value})} 
                  className="w-full border border-gray-200 rounded-lg p-3 text-xs text-gray-600 bg-gray-50/50 resize-none focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none"
                />
              </div>
            </div>

            {/* Right Summary Calculations Block */}
            <div className="md:col-span-5 bg-gray-50/60 rounded-xl p-5 border border-gray-200 space-y-4 text-xs font-medium text-gray-500 max-w-md ml-auto w-full">
              <div className="flex justify-between items-center">
                <span>Sub Total</span>
                <span className="font-semibold text-gray-800 tabular-nums text-sm">₹ {subTotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between items-center gap-4">
                <span>Shipping Charges</span>
                <input 
                  type="number" 
                  value={meta.shippingCharges} 
                  onChange={e => setMeta({...meta, shippingCharges: Number(e.target.value)})} 
                  className="w-28 text-right border border-gray-300 bg-white rounded px-3 py-1 font-medium text-gray-800 outline-none focus:border-blue-500" 
                />
              </div>

              {/* Zoho Style TDS / TCS Segment */}
              <div className="flex justify-between items-start border-y border-gray-200 py-3 border-dashed">
                <div className="flex flex-col gap-2">
                  <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-700">
                    <input type="radio" name="tdsTcsOption" value="TDS" checked={meta.tdsTcsOption === 'TDS'} onChange={e => setMeta({...meta, tdsTcsOption: e.target.value})} className="text-blue-600 focus:ring-blue-500" /> TDS Applicability
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-700">
                    <input type="radio" name="tdsTcsOption" value="TCS" checked={meta.tdsTcsOption === 'TCS'} onChange={e => setMeta({...meta, tdsTcsOption: e.target.value})} className="text-blue-600 focus:ring-blue-500" /> TCS Applicability
                  </label>
                </div>
                <select 
                  value={meta.taxSelect} 
                  onChange={e => setMeta({...meta, taxSelect: e.target.value})} 
                  className="border border-gray-300 bg-white rounded px-2 py-1 text-xs outline-none focus:border-blue-500"
                >
                  <option value="Select a Tax">Select Tax Type</option>
                  <option value="No-Tax">No Tax Deductible</option>
                </select>
              </div>

              <div className="flex justify-between items-center text-gray-900 pt-2">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-700">Total (₹)</span>
                <span className="text-lg font-bold tabular-nums text-blue-600">₹ {totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Form Action Controls Trigger Bottom Bar */}
          <div className="flex gap-3 pt-5 border-t border-gray-200">
            <button 
              type="submit" 
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs px-6 py-2.5 rounded shadow-xs transition-all cursor-pointer"
            >
              Save and Send
            </button>
            <button 
              type="button" 
              onClick={onCancel} 
              className="border border-gray-300 bg-white hover:bg-gray-50 text-gray-600 font-semibold text-xs px-5 py-2.5 rounded cursor-pointer transition-all"
            >
              Cancel Action
            </button>
          </div>
        </form>

        {/* --- LIVE PREVIEW ACTIONS PDF WORKFLOW PANEL --- */}
        {showPDFSection && savedPayload && (
          <div className="px-6 pb-6 border-t-2 border-dashed border-gray-200 pt-6 bg-slate-50/50">
            <div className="flex flex-col md:flex-row md:items-center justify-between bg-emerald-50 border border-emerald-200 p-4 rounded-xl mb-6 gap-4">
              <div>
                <h3 className="text-sm font-bold text-emerald-900">🎉 Professional Tax Invoice Document Ready!</h3>
                <p className="text-emerald-700 text-xs mt-0.5">The local data synchronized smoothly with the system payload rendering structures.</p>
              </div>
              
              <div className="flex gap-2">
                <PDFDownloadLink 
                  document={<PDFTemplate invoiceData={savedPayload} />} 
                  fileName={`Invoice_${savedPayload.invoiceNumber || 'Doc'}.pdf`}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs px-4 py-2.5 rounded shadow-xs transition-all text-center inline-block cursor-pointer"
                >
                  {({ loading }) => loading ? 'Generating Node Structure...' : '📥 Download Invoice PDF'}
                </PDFDownloadLink>

                <button 
                  type="button"
                  onClick={() => { if (onInvoiceSaved) onInvoiceSaved(); }}
                  className="bg-gray-800 hover:bg-gray-900 text-white font-semibold text-xs px-4 py-2.5 rounded shadow-xs transition-all text-center cursor-pointer"
                >
                  ⬅️ Back to Invoices List
                </button>
              </div>
            </div>

            {/* Sandboxed PDF View Window Frame */}
            <div className="w-full h-[650px] bg-white rounded-xl overflow-hidden border border-gray-300 shadow-inner">
              <PDFViewer width="100%" height="100%" className="border-none">
                <PDFTemplate invoiceData={savedPayload} />
              </PDFViewer>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InvoiceForm;