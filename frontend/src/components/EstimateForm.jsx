import React, { useState, useEffect } from 'react';

const EstimateInvoiceForm = ({ refreshDashboard, editData, onCancelEdit }) => {
  const [activeTab, setActiveTab] = useState('items');
  
  // Core Complex Form States Matrix
  const [formData, setFormData] = useState({
    customerName: '',
    gstTreatment: 'Registered Business - Regular',
    gstin: '33LDAFV3105H9Z5',
    billingAddress: 'Jewel\n4238 Don Junction Suite 574\n5629 Ana Lights Suite 242\nFort Natalie',
    shippingAddress: 'Katelyn\n5013 Little Wells Suite 661\n474 Kirlin Gardens Apt. 494\nDaliastead',
    placeOfSupply: '',
    estimateNumber: 'EST-0000',
    referenceNumber: '',
    invoiceDate: new Date().toISOString().split('T')[0], 
    expiryDate: '', 
    salesperson: '',
    projectName: '',
    customerNotes: 'Thanks for your business.',
    termsAndConditions: '',
    shippingCharges: 0,
    adjustment: 0,
    subTotal: 0,
    totalAmount: 0
  });

  // Dynamic Item Grid Table Rows Setup
  const [items, setItems] = useState([
    { id: Date.now(), details: '', quantity: 1, rate: 0, discount: 0, discountType: '%', taxPercent: 0, amount: 0 }
  ]);

  const calculateRowAmount = (quantity, rate, discount, discountType, taxPercent) => {
    const grossAmount = (Number(quantity) || 0) * (Number(rate) || 0);
    let itemDiscount = discountType === '%' ? (grossAmount * (Number(discount) || 0)) / 100 : Number(discount) || 0;
    const discountedAmount = grossAmount - itemDiscount;
    return discountedAmount + (discountedAmount * (Number(taxPercent) || 0)) / 100;
  };

  useEffect(() => {
    if (formData.invoiceDate) {
      const baseDate = new Date(formData.invoiceDate);
      if (!isNaN(baseDate.getTime())) {
        baseDate.setDate(baseDate.getDate() + 7); 
        setFormData(prev => ({ ...prev, expiryDate: baseDate.toISOString().split('T')[0] }));
      }
    }
  }, [formData.invoiceDate]);

  useEffect(() => {
    if (editData) {
      setFormData(editData);
      if (editData.items) setItems(editData.items);
    }
  }, [editData]);

  useEffect(() => {
    const sub = items.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
    setFormData(prev => ({
      ...prev,
      subTotal: sub,
      totalAmount: sub + (Number(formData.shippingCharges) || 0) + (Number(formData.adjustment) || 0)
    }));
  }, [items, formData.shippingCharges, formData.adjustment]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleItemRowChange = (id, field, value) => {
    setItems(prevItems => prevItems.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        updatedItem.amount = calculateRowAmount(updatedItem.quantity, updatedItem.rate, updatedItem.discount, updatedItem.discountType, updatedItem.taxPercent);
        return updatedItem;
      }
      return item;
    }));
  };

  const addNewItemRow = () => {
    setItems([...items, { id: Date.now(), details: '', quantity: 1, rate: 0, discount: 0, discountType: '%', taxPercent: 0, amount: 0 }]);
  };

  const deleteItemRow = (id) => {
    if (items.length > 1) setItems(items.filter(item => item.id !== id));
  };

   const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const finalPayload = { ...formData, items };
      
      // Fallback directly to your live Render link if environment variable isn't set
      const baseUrl = import.meta.env.VITE_API_BASE_URL || 'https://onrender.com';
      
      const response = await fetch(`${baseUrl}/api/estimates`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalPayload)
      });

      if (response.ok) {
        alert('Data saved successfully to your live server!');
        if (refreshDashboard) refreshDashboard();
      } else {
        alert('Failed to save data. Check your backend endpoints.');
      }
    } catch (error) {
      console.error("API Connection Error:", error);
      alert('Could not connect to the live server.');
    }
  };


  return (
    <div className="bg-[#f8f9fa] min-h-screen p-6 font-sans text-[13px] text-gray-700 antialiased">
      <form onSubmit={handleSubmit} className="max-w-5xl mx-auto bg-white rounded-md shadow-sm border border-gray-200 overflow-hidden">
        
        {/* Top Header Section */}
        <div className="bg-slate-900 px-6 py-3 flex items-center justify-between text-white">
          <h2 className="text-sm font-bold tracking-wide">📄 New Estimate / Invoice Ledger</h2>
          <span className="text-[11px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded">Demo Org</span>
        </div>

        <div className="p-8 space-y-8">
          
          {/* STEP 1: Zoho Books Standard Form Layout (Stacked Rows with exact gaps) */}
          <div className="space-y-4 max-w-2xl">
            
            {/* Row 1: Customer Name */}
            <div className="grid grid-cols-12 items-start gap-4">
              <label className="col-span-3 font-medium text-red-500 pt-1.5">Customer Name*</label>
              <div className="col-span-9 space-y-2">
                <input type="text" name="customerName" placeholder="Search or Enter Customer Profile..." value={formData.customerName} onChange={handleInputChange} className="w-full border border-gray-300 rounded px-3 py-1.5 focus:outline-none focus:border-blue-500" required />
              </div>
            </div>

            {/* Row 2: Place Of Supply (Exactly like image_4ced87.png) */}
            <div className="grid grid-cols-12 items-center gap-4 pt-2">
              <label className="col-span-3 font-medium text-red-500">Place Of Supply*</label>
              <div className="col-span-9">
                <select name="placeOfSupply" value={formData.placeOfSupply} onChange={handleInputChange} className="w-full max-w-md border border-gray-300 rounded px-3 py-1.5 bg-white focus:outline-none focus:border-blue-500" required>
                  <option value="">Select Place of Supply</option>
                  <option value="Rajasthan">Rajasthan [RJ]</option>
                  <option value="Maharashtra">Maharashtra [MH]</option>
                  <option value="Delhi">Delhi [DL]</option>
                </select>
              </div>
            </div>

            <hr className="border-gray-100 my-4" />

            {/* Row 3: Estimate / Invoice Number */}
            <div className="grid grid-cols-12 items-center gap-4">
              <label className="col-span-3 font-medium text-red-500">Estimate#*</label>
              <div className="col-span-9">
                <input type="text" name="estimateNumber" value={formData.estimateNumber} onChange={handleInputChange} className="w-full max-w-md border border-gray-300 rounded px-3 py-1.5 bg-gray-50 font-mono font-bold" required />
              </div>
            </div>

            {/* Row 4: Reference Number */}
            <div className="grid grid-cols-12 items-center gap-4">
              <label className="col-span-3 font-medium text-gray-600">Reference#</label>
              <div className="col-span-9">
                <input type="text" name="referenceNumber" placeholder="Ref#" value={formData.referenceNumber} onChange={handleInputChange} className="w-full max-w-md border border-gray-300 rounded px-3 py-1.5 focus:outline-none focus:border-blue-500" />
              </div>
            </div>

            {/* Row 5: Dates Row Block (Side-by-Side inline layout as requested) */}
            <div className="grid grid-cols-12 items-center gap-4">
              <label className="col-span-3 font-medium text-red-500">Estimate Date*</label>
              <div className="col-span-9 flex items-center gap-8">
                <input type="date" name="invoiceDate" value={formData.invoiceDate} onChange={handleInputChange} className="w-48 border border-gray-300 rounded px-3 py-1.5 focus:outline-none focus:border-blue-500 cursor-pointer" required />
                
                <div className="flex items-center gap-4">
                  <label className="font-medium text-gray-600">Expiry Date</label>
                  <input type="date" name="expiryDate" value={formData.expiryDate} onChange={handleInputChange} className="w-48 border border-gray-300 rounded px-3 py-1.5 bg-gray-50 text-gray-700" />
                </div>
              </div>
            </div>

            {/* Row 6: Salesperson Row Layout */}
            <div className="grid grid-cols-12 items-center gap-4 pt-1">
              <label className="col-span-3 font-medium text-gray-600">Salesperson</label>
              <div className="col-span-9">
                <select name="salesperson" value={formData.salesperson} onChange={handleInputChange} className="w-full max-w-md border border-gray-300 rounded px-3 py-1.5 bg-white text-gray-400 focus:outline-none">
                  <option value="">Select or Add Salesperson</option>
                  <option value="Sales Executive 1">Sales Executive 1</option>
                </select>
              </div>
            </div>

          </div>

          {/* STEP 2: Address Section Divider blocks */}
          <div className="grid grid-cols-2 gap-8 bg-gray-50 p-4 border border-gray-200 rounded-md text-[12px]">
            <div>
              <span className="font-bold text-gray-400 uppercase tracking-wider block text-[10px] mb-1">Billing Address 📝</span>
              <pre className="font-sans whitespace-pre-line text-gray-600 bg-white p-3 rounded border border-gray-200 leading-relaxed">{formData.billingAddress}</pre>
            </div>
            <div>
              <span className="font-bold text-gray-400 uppercase tracking-wider block text-[10px] mb-1">Shipping Address 🚚</span>
              <pre className="font-sans whitespace-pre-line text-gray-600 bg-white p-3 rounded border border-gray-200 leading-relaxed">{formData.shippingAddress}</pre>
            </div>
          </div>

          {/* STEP 3: Tab Configuration & Items Matrix Layout */}
          <div className="pt-2">
            <div className="flex border-b border-gray-200 text-xs font-bold gap-6 text-gray-400">
              <button type="button" onClick={() => setActiveTab('items')} className={`pb-2.5 px-1 cursor-pointer border-b-2 ${activeTab === 'items' ? 'text-blue-600 border-blue-600 font-extrabold' : 'border-transparent'}`}>Item Matrix Configuration</button>
              <button type="button" onClick={() => setActiveTab('terms')} className={`pb-2.5 px-1 cursor-pointer border-b-2 ${activeTab === 'terms' ? 'text-blue-600 border-blue-600 font-extrabold' : 'border-transparent'}`}>Terms & Operations Notes</button>
            </div>

            <div className="py-4">
              {activeTab === 'items' && (
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded overflow-hidden bg-white">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-900 text-white font-bold text-[11px] uppercase">
                          <th className="p-3 w-5/12">Item Details Description</th>
                          <th className="p-3 w-1/12 text-center">Qty</th>
                          <th className="p-3 w-1.5/12 text-right">Rate (₹)</th>
                          <th className="p-3 w-2/12 text-center">Discount</th>
                          <th className="p-3 w-1.5/12 text-right">Tax (GST %)</th>
                          <th className="p-3 w-1.5/12 text-right">Amount (₹)</th>
                          <th className="p-3 w-0.5/12 text-center"></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {items.map((item) => (
                          <tr key={item.id} className="hover:bg-gray-50/50">
                            <td className="p-2.5">
                              <input type="text" placeholder="Item description..." value={item.details} onChange={e => handleItemRowChange(item.id, 'details', e.target.value)} className="w-full border border-gray-200 rounded px-2.5 py-1.5 focus:outline-none focus:border-blue-500 text-gray-800" />
                            </td>
                            <td className="p-2.5">
                              <input type="number" min="0" value={item.quantity} onChange={e => handleItemRowChange(item.id, 'quantity', Number(e.target.value))} className="w-full text-center border border-gray-200 rounded px-1.5 py-1.5 focus:outline-none focus:border-blue-500 font-bold" />
                            </td>
                            <td className="p-2.5">
                              <input type="number" min="0" placeholder="0.00" value={item.rate || ''} onChange={e => handleItemRowChange(item.id, 'rate', Number(e.target.value))} className="w-full text-right border border-gray-200 rounded px-2 py-1.5 focus:outline-none focus:border-blue-500 font-mono font-bold" />
                            </td>
                            <td className="p-2.5">
                              <div className="flex items-center gap-1">
                                <input type="number" min="0" value={item.discount || ''} placeholder="0" onChange={e => handleItemRowChange(item.id, 'discount', Number(e.target.value))} className="w-full text-right border border-gray-200 rounded px-1.5 py-1.5 focus:outline-none" />
                                <select value={item.discountType} onChange={e => handleItemRowChange(item.id, 'discountType', e.target.value)} className="border border-gray-200 rounded p-1.5 bg-gray-50 font-bold">
                                  <option value="%">%</option>
                                  <option value="₹">₹</option>
                                </select>
                              </div>
                            </td>
                            <td className="p-2.5">
                              <select value={item.taxPercent} onChange={e => handleItemRowChange(item.id, 'taxPercent', Number(e.target.value))} className="w-full border border-gray-200 rounded px-1.5 py-1.5 bg-white text-right focus:outline-none">
                                <option value="0">Non-Taxable (0%)</option>
                                <option value="5">GST @ 5%</option>
                                <option value="12">GST @ 12%</option>
                                <option value="18">GST @ 18%</option>
                                <option value="28">GST @ 28%</option>
                              </select>
                            </td>
                            <td className="p-2.5 text-right font-mono font-bold text-gray-900 pr-4">
                              {(Number(item.amount) || 0).toFixed(2)}
                            </td>
                            <td className="p-2.5 text-center">
                              <button type="button" onClick={() => deleteItemRow(item.id)} className="text-gray-300 hover:text-red-500 text-base disabled:opacity-20" disabled={items.length === 1}>×</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <button type="button" onClick={addNewItemRow} className="bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300 font-bold px-3 py-1.5 rounded text-xs">
                    ➕ Add New Row Line
                  </button>

                  {/* Calculations breakdown block */}
                  <div className="grid grid-cols-12 pt-4 border-t border-gray-100 gap-4">
                    <div className="col-span-7">
                      <div className="flex flex-col gap-1.5 max-w-md">
                        <label className="font-bold text-gray-400 text-[11px] uppercase">Customer Notes</label>
                        <textarea name="customerNotes" rows="3" value={formData.customerNotes} onChange={handleInputChange} className="border border-gray-300 rounded p-3 focus:outline-none focus:border-blue-500" />
                      </div>
                    </div>

                    <div className="col-span-5 bg-gray-50 p-5 border border-gray-200 rounded space-y-3.5 font-medium text-gray-600">
                      <div className="flex justify-between items-center">
                        <span>Sub Total:</span>
                        <span className="font-bold text-gray-900 font-mono">₹{formData.subTotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Shipping Charges:</span>
                        <input type="number" name="shippingCharges" min="0" value={formData.shippingCharges || ''} onChange={handleInputChange} className="w-28 border border-gray-300 rounded px-2.5 py-1 text-right font-mono" />
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Adjustment:</span>
                        <input type="number" name="adjustment" value={formData.adjustment || ''} onChange={handleInputChange} className="w-28 border border-gray-300 rounded px-2.5 py-1 text-right font-mono" />
                      </div>
                      <div className="border-b border-gray-200 my-1"></div>
                      <div className="flex justify-between items-center text-xs font-black text-blue-900 bg-blue-50 p-3 rounded border border-blue-200">
                        <span>TOTAL AMOUNT DUE (₹) :</span>
                        <span className="text-sm font-mono font-extrabold">₹{formData.totalAmount.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                </div>
              )}
            </div>
          </div>

          {/* Footer Controls */}
          <div className="flex justify-between items-center pt-5 border-t border-gray-200">
            <div className="flex gap-2">
              <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2 rounded shadow-sm text-xs">
                {editData ? 'Update Invoice' : 'Save and Send'}
              </button>
              <button type="button" onClick={onCancelEdit} className="border border-gray-300 bg-white hover:bg-gray-50 text-gray-600 font-bold px-4 py-2 rounded text-xs">
                Cancel
              </button>
            </div>
          </div>

        </div>
      </form>
    </div>
  );
};

export default EstimateInvoiceForm;