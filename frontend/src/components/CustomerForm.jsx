import React, { useState, useEffect } from 'react';

const CustomerForm = ({ refreshDashboard, editCustomerData, onCancelEdit }) => {
  const [activeTab, setActiveTab] = useState('other');
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const [formData, setFormData] = useState({
    type: 'Business',
    salutation: 'Salutation',
    firstName: '',
    lastName: '',
    companyName: '',
    displayName: '',
    email: '',
    phone: '',
    mobile: '',
    openingReceivables: 0,
    openingPayables: 0,
    gstTreatment: 'Select a GST treatment',
    placeOfSupply: 'Select a Place of Supply',
    pan: '',
    taxPreference: 'Taxable'
  });

  useEffect(() => {
    if (editCustomerData) {
      setFormData(editCustomerData);
      if (editCustomerData.imageUrl) setImagePreview(editCustomerData.imageUrl);
    }
  }, [editCustomerData]);

  // Name update hote hi display name automatic generate karne ke liye handler
  const handleNameInputChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...formData, [name]: value };
    
    if (name === 'firstName' || name === 'lastName') {
      updated.displayName = `${updated.firstName} ${updated.lastName}`.trim();
    }
    setFormData(updated);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.firstName.trim() || !formData.displayName.trim()) {
      alert("⚠️ First Name & Customer Display Name are mandatory fields!");
      return;
    }

    const dataToSend = new FormData();
    Object.keys(formData).forEach(key => {
      dataToSend.append(key, formData[key]);
    });
    if (imageFile) dataToSend.append('image', imageFile);

    const isEditing = !!editCustomerData;
    
    // सही तरीका: Environment Variable का उपयोग करके यूआरएल बनाना
    const baseUrl = import.meta.env.VITE_API_BASE_URL || 'https://ass-1-9y1a.onrender.com';
    
    const url = isEditing
      ? `${baseUrl}/api/customers/${editCustomerData._id}`
      : `${baseUrl}/api/customers/add`;


    try {
      const response = await fetch(url, {
        method: isEditing ? 'PUT' : 'POST',
        body: dataToSend
      });
      const result = await response.json();
      if (result.success) {
        alert(isEditing ? '🎉 Profile Updated Successfully!' : '🎉 New Customer Added!');
        if (refreshDashboard) refreshDashboard();
        if (onCancelEdit) onCancelEdit();
      }
    } catch (err) {
      alert('⚠️ Connection Error with Node API Server.');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 max-w-5xl mx-auto text-xs text-gray-700 font-sans overflow-hidden">
      
      {/* Upper Information Banner */}
      <div className="bg-[#f8f9fc] px-6 py-3 border-b border-gray-100 flex items-center justify-between">
        <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2">
          👤 {editCustomerData ? 'Modify Customer Profile' : 'New Customer Configuration'}
        </h2>
        <span className="text-[10px] text-gray-400 font-medium">Suits Workspace Integration Ledger</span>
      </div>

      {/* Info notification message */}
      <div className="mx-6 mt-4 bg-blue-50/50 border border-blue-100 rounded-lg p-3 text-blue-800 flex items-center justify-between">
        <p className="font-medium">ℹ️ Prefill Customer details from the GST portal using the Customer's GSTIN. <span className="font-bold underline cursor-pointer ml-1">Prefill &gt;</span></p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        
        {/* Core Field Set Block */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
          
          {/* Main Input Column parameters */}
          <div className="md:col-span-3 space-y-4">
            
            {/* Customer Type */}
            <div className="grid grid-cols-3 items-center">
              <label className="font-semibold text-gray-500">Customer Type</label>
              <div className="col-span-2 flex gap-6 font-medium text-gray-800">
                <label className="flex items-center gap-2 cursor-pointer text-xs"><input type="radio" name="type" value="Business" checked={formData.type === 'Business'} onChange={e => setFormData({...formData, type: e.target.value})} className="w-3.5 h-3.5 text-blue-600 focus:ring-0" /> Business</label>
                <label className="flex items-center gap-2 cursor-pointer text-xs"><input type="radio" name="type" value="Individual" checked={formData.type === 'Individual'} onChange={e => setFormData({...formData, type: e.target.value})} className="w-3.5 h-3.5 text-blue-600 focus:ring-0" /> Individual</label>
              </div>
            </div>

            {/* Primary Contact */}
            <div className="grid grid-cols-3 items-center">
              <label className="font-semibold text-red-500">Primary Contact*</label>
              <div className="col-span-2 flex gap-2">
                <select name="salutation" value={formData.salutation} onChange={e => setFormData({...formData, salutation: e.target.value})} className="border border-gray-300 rounded px-2 py-1.5 bg-white text-xs text-gray-700 focus:outline-none focus:border-blue-500">
                  <option value="Salutation">Salutation</option>
                  <option value="Mr.">Mr.</option>
                  <option value="Mrs.">Mrs.</option>
                  <option value="Ms.">Ms.</option>
                </select>
                <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleNameInputChange} className="w-full border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:border-blue-500" required />
                <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleNameInputChange} className="w-full border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:border-blue-500" />
              </div>
            </div>

            {/* Company Name */}
            <div className="grid grid-cols-3 items-center">
              <label className="font-semibold text-gray-500">Company Name</label>
              <input type="text" name="companyName" value={formData.companyName} onChange={e => setFormData({...formData, companyName: e.target.value})} className="col-span-2 border border-gray-300 rounded px-3 py-1.5 focus:outline-none focus:border-blue-500" />
            </div>

            {/* Customer Display Name */}
            <div className="grid grid-cols-3 items-center">
              <label className="font-semibold text-red-500">Customer Display Name*</label>
              <input type="text" name="displayName" value={formData.displayName} onChange={e => setFormData({...formData, displayName: e.target.value})} className="col-span-2 border-2 border-slate-700 bg-slate-50/50 font-bold text-slate-900 rounded px-3 py-1.5 focus:outline-none focus:border-blue-500" required />
            </div>

            {/* Email Address */}
            <div className="grid grid-cols-3 items-center">
              <label className="font-semibold text-gray-500">Email Address</label>
              <div className="col-span-2 relative flex items-center">
                <span className="absolute left-3 text-gray-300">✉️</span>
                <input type="email" name="email" placeholder="email@domain.com" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full border border-gray-300 rounded pl-8 pr-3 py-1.5 focus:outline-none focus:border-blue-500" />
              </div>
            </div>

            {/* Phone Layout row fields */}
            <div className="grid grid-cols-3 items-center">
              <label className="font-semibold text-gray-500">Phone</label>
              <div className="col-span-2 grid grid-cols-2 gap-2">
                <div className="flex">
                  <span className="bg-gray-50 border border-r-0 border-gray-300 rounded-l px-2 py-1 text-[10px] text-gray-400 flex items-center">+91</span>
                  <input type="text" name="phone" placeholder="Work Phone" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full border border-gray-300 rounded-r px-2 py-1 focus:outline-none focus:border-blue-500" />
                </div>
                <div className="flex">
                  <span className="bg-gray-50 border border-r-0 border-gray-300 rounded-l px-2 py-1 text-[10px] text-gray-400 flex items-center">+91</span>
                  <input type="text" name="mobile" placeholder="Mobile" value={formData.mobile} onChange={e => setFormData({...formData, mobile: e.target.value})} className="w-full border border-gray-300 rounded-r px-2 py-1 focus:outline-none focus:border-blue-500" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Side Rounded Square Box Image Field */}
          <div className="flex flex-col items-center justify-center p-3 border border-dashed rounded-lg bg-gray-50/50 h-40 relative group">
            {imagePreview ? (
              <img src={imagePreview} alt="Profile" className="w-full h-full object-cover rounded-md" />
            ) : (
              <div className="text-center text-gray-400 space-y-1">
                <span className="text-xl">📸</span>
                <p className="text-[10px] font-medium text-gray-500">Upload Image</p>
              </div>
            )}
            <input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" />
          </div>

        </div>

        {/* Tab Selection Blocks */}
        <div className="pt-6">
          <div className="flex border-b text-xs font-semibold gap-4 text-gray-400">
            <button type="button" onClick={() => setActiveTab('other')} className={`pb-2 px-1 cursor-pointer transition ${activeTab === 'other' ? 'text-blue-600 border-b-2 border-blue-600 font-bold' : 'hover:text-gray-700'}`}>Other Details</button>
            <button type="button" onClick={() => setActiveTab('address')} className={`pb-2 px-1 cursor-pointer transition ${activeTab === 'address' ? 'text-blue-600 border-b-2 border-blue-600 font-bold' : 'hover:text-gray-700'}`}>Address info</button>
            <button type="button" onClick={() => setActiveTab('remarks')} className={`pb-2 px-1 cursor-pointer transition ${activeTab === 'remarks' ? 'text-blue-600 border-b-2 border-blue-600 font-bold' : 'hover:text-gray-700'}`}>Remarks</button>
          </div>

          {/* Dynamic Tab Body panel elements */}
          <div className="py-6 space-y-4 max-w-2xl">
            {activeTab === 'other' && (
              <>
                <div className="grid grid-cols-3 items-center">
                  <label className="font-semibold text-gray-500">GST Treatment*</label>
                  <select name="gstTreatment" value={formData.gstTreatment} onChange={e => setFormData({...formData, gstTreatment: e.target.value})} className="col-span-2 border border-gray-300 rounded px-3 py-1.5 bg-white text-xs focus:outline-none focus:border-blue-500">
                    <option value="Select a GST treatment">Select a GST treatment</option>
                    <option value="Registered Business">Registered Business - Regular</option>
                    <option value="Consumer">Consumer / Unregistered</option>
                  </select>
                </div>

                <div className="grid grid-cols-3 items-center">
                  <label className="font-semibold text-gray-500">Place of Supply*</label>
                  <select name="placeOfSupply" value={formData.placeOfSupply} onChange={e => setFormData({...formData, placeOfSupply: e.target.value})} className="col-span-2 border border-gray-300 rounded px-3 py-1.5 bg-white text-xs focus:outline-none focus:border-blue-500">
                    <option value="Select a Place of Supply">Select a Place of Supply</option>
                    <option value="Rajasthan">Rajasthan [RJ]</option>
                    <option value="Maharashtra">Maharashtra [MH]</option>
                    <option value="Delhi">Delhi [DL]</option>
                  </select>
                </div>

                <div className="grid grid-cols-3 items-center">
                  <label className="font-semibold text-gray-500">PAN Card No.</label>
                  <input type="text" name="pan" placeholder="ABCDE1234F" value={formData.pan} onChange={e => setFormData({...formData, pan: e.target.value.toUpperCase()})} className="col-span-2 border border-gray-300 rounded px-3 py-1.5 tracking-wider focus:outline-none focus:border-blue-500" maxLength="10" />
                </div>

                <div className="grid grid-cols-3 items-center">
                  <label className="font-semibold text-gray-500">Tax Preference*</label>
                  <div className="col-span-2 flex gap-4 font-medium text-gray-800">
                    <label className="flex items-center gap-1.5 cursor-pointer"><input type="radio" name="taxPreference" value="Taxable" checked={formData.taxPreference === 'Taxable'} onChange={e => setFormData({...formData, taxPreference: e.target.value})} /> Taxable</label>
                    <label className="flex items-center gap-1.5 cursor-pointer"><input type="radio" name="taxPreference" value="Tax Exempt" checked={formData.taxPreference === 'Tax Exempt'} onChange={e => setFormData({...formData, taxPreference: e.target.value})} /> Tax Exempt</label>
                  </div>
                </div>

                {/* Opening Balances Sub Segment block from image 1 */}
                <div className="border-t pt-4 mt-4 space-y-4">
                  <div className="grid grid-cols-3 items-center">
                    <label className="font-semibold text-gray-500">Opening Receivables (₹)</label>
                    <input type="number" name="openingReceivables" value={formData.openingReceivables} onChange={e => setFormData({...formData, openingReceivables: Number(e.target.value)})} className="col-span-2 border border-gray-300 rounded px-3 py-1.5 focus:outline-none focus:border-blue-500 font-medium" />
                  </div>
                  <div className="grid grid-cols-3 items-center">
                    <label className="font-semibold text-gray-500">Opening Payables (₹)</label>
                    <input type="number" name="openingPayables" value={formData.openingPayables} onChange={e => setFormData({...formData, openingPayables: Number(e.target.value)})} className="col-span-2 border border-gray-300 rounded px-3 py-1.5 focus:outline-none focus:border-blue-500 font-medium" />
                  </div>
                </div>
              </>
            )}

            {activeTab === 'address' && (
              <p className="text-gray-400 font-medium py-4 text-center border border-dashed rounded-lg">Billing Address & Shipping coordinates config profiles coming soon.</p>
            )}

            {activeTab === 'remarks' && (
              <p className="text-gray-400 font-medium py-4 text-center border border-dashed rounded-lg">Internal corporate administrative notes panel logs coming soon.</p>
            )}
          </div>
        </div>

        {/* Master Trigger Submission Button Blocks */}
        <div className="flex gap-2 pt-4 border-t border-gray-100">
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2 rounded shadow-sm cursor-pointer transition text-xs">
            {editCustomerData ? 'Update Profile Data' : 'Save Customer Profile'}
          </button>
          <button type="button" onClick={onCancelEdit} className="border border-gray-300 hover:bg-gray-50 text-gray-600 font-semibold px-4 py-2 rounded cursor-pointer transition text-xs">
            Cancel
          </button>
        </div>

      </form>
    </div>
  );
};

export default CustomerForm;
