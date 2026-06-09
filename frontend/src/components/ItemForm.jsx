import React, { useState } from 'react';
import ItemDetailsView from './ItemDetailsView';

const ItemForm = ({ onItemSaved }) => {
  const [refreshKey, setRefreshKey] = useState(0);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [formData, setFormData] = useState({
    type: 'Goods',
    name: '',
    sku: '',
    unit: 'BOX',
    hsnCode: '',
    taxPreference: 'Taxable',
    isSellable: true,
    sellingPrice: '',
    salesAccount: 'Sales',
    salesDescription: '',
    isPurchasable: true,
    costPrice: '',
    purchaseAccount: 'Cost of Goods Sold',
    purchaseDescription: '',
    preferredVendor: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
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
    if (!formData.name.trim()) {
      alert("⚠️ Error: Name field cannot be empty!");
      return;
    }

    // Image transfer handles multi-part form stream objects
    const dataToSend = new FormData();
    Object.keys(formData).forEach(key => {
      dataToSend.append(key, formData[key]);
    });
    
    if (imageFile) {
      dataToSend.append('image', imageFile);
    }

    try {
      // Yahan localhost link ko badal kar live backend submit route set kiya hai
      const response = await fetch(' https://ass-1-saa5.onrender.com/api/items/add', {
        method: 'POST',
        body: dataToSend
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Server status: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.success) {
        alert('🎉 Item with Image Saved Successfully!');
        
        // Form states reload fields cleanup parameter data resets
        setFormData({
          type: 'Goods', name: '', sku: '', unit: 'BOX', hsnCode: '',
          taxPreference: 'Taxable', isSellable: true, sellingPrice: '',
          salesAccount: 'Sales', salesDescription: '', isPurchasable: true,
          costPrice: '', purchaseAccount: 'Cost of Goods Sold',
          purchaseDescription: '', preferredVendor: ''
        });
        setImageFile(null);
        setImagePreview(null);
        
        // Dynamic lower card reload updates
        setRefreshKey(prev => prev + 1);
        if (onItemSaved) onItemSaved();
      } else {
        alert('❌ Backend Error: ' + result.message);
      }
    } catch (error) {
      console.error("Error saving item:", error);
      alert('⚠️ Connection Error: Live Server or response stream pipeline mapping issues.');
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto text-sm text-gray-700 font-sans">
      
      {/* 1. Master Input Elements Block Data Row Sheet Entry */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex justify-between items-center border-b pb-3 mb-6">
          <h2 className="text-base font-bold flex items-center gap-2 text-gray-800">
            📦 New Item Details Configuration
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex gap-10 items-start">
            
            {/* Left Side core dynamic entries layout fields input parameter rows */}
            <div className="flex-1 space-y-5">
              {/* Type Grid toggles options row */}
              <div className="grid grid-cols-4 items-center">
                <label className="font-medium text-gray-600">Type</label>
                <div className="col-span-3 flex gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="type" value="Goods" checked={formData.type === 'Goods'} onChange={handleChange} className="text-blue-600" />
                    Goods
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="type" value="Service" checked={formData.type === 'Service'} onChange={handleChange} className="text-blue-600" />
                    Service
                  </label>
                </div>
              </div>

              {/* Name Data Box Row Input */}
              <div className="grid grid-cols-4 items-center">
                <label className="font-medium text-red-500">Name*</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} className="col-span-2 border border-gray-300 rounded px-3 py-1.5 focus:outline-none focus:border-blue-500 bg-white" required />
              </div>

              {/* SKU Data Box Row Input */}
              <div className="grid grid-cols-4 items-center">
                <label className="font-medium text-gray-600">SKU</label>
                <input type="text" name="sku" value={formData.sku} onChange={handleChange} className="col-span-2 border border-gray-300 rounded px-3 py-1.5 focus:outline-none focus:border-blue-500 bg-white" />
              </div>

              {/* Unit Dropdown Row Options Elements */}
              <div className="grid grid-cols-4 items-center">
                <label className="font-medium text-gray-600">Unit</label>
                <select name="unit" value={formData.unit} onChange={handleChange} className="col-span-2 border border-gray-300 bg-white rounded px-3 py-1.5 focus:outline-none focus:border-blue-500">
                  <option value="BOX">BOX</option>
                  <option value="pcs">pcs</option>
                  <option value="dz">dozen</option>
                  <option value="kg">kg</option>
                  <option value="unit">Unit</option>
                  <option value="cabin">Cabin</option>
                  <option value="mitter">Mitter</option>
                  <option value="ml">ML</option>
                  <option value="squire">Squire</option>

                </select>
              </div>

              {/* HSN Code Search parameters context line */}
              <div className="grid grid-cols-4 items-center">
                <label className="font-medium text-gray-600">HSN Code</label>
                <div className="col-span-2 relative flex items-center">
                  <input type="text" name="hsnCode" value={formData.hsnCode} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-1.5 focus:outline-none focus:border-blue-500 bg-white" />
                  <span className="absolute right-3 text-gray-400">🔍</span>
                </div>
              </div>

              {/* Tax Settings Dropdown list */}
              <div className="grid grid-cols-4 items-center">
                <label className="font-medium text-red-500">Tax Preference*</label>
                <select name="taxPreference" value={formData.taxPreference} onChange={handleChange} className="col-span-2 border border-gray-300 bg-white rounded px-3 py-1.5 focus:outline-none focus:border-blue-500">
                  <option value="Taxable">Taxable</option>
                  <option value="Non-Taxable">Non-Taxable</option>
                </select>
              </div>
            </div>

            {/* Right Side: Dashed Square Profile Drag-and-drop Image Area box block component matching screenshots design */}
            <div className="w-48 flex flex-col items-center">
              <label className="w-full h-40 border-2 border-dashed border-gray-300 hover:border-blue-500 rounded-lg flex flex-col items-center justify-center p-2 text-center bg-gray-50 cursor-pointer transition overflow-hidden group">
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-contain" />
                ) : (
                  <div className="space-y-2 flex flex-col items-center justify-center">
                    <span className="text-2xl opacity-60 group-hover:scale-110 transition">🖼️</span>
                    <p className="text-[11px] text-gray-500 leading-tight">Drag image(s) here or <span className="text-blue-600 font-bold underline">Browse images</span></p>
                  </div>
                )}
                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              </label>
            </div>

          </div>

          {/* Dual Multi pricing accounts columns setup grids section lines info layout split wrapper */}
          <div className="grid grid-cols-2 gap-8 pt-4 border-t border-gray-100">
            {/* Sales Section block */}
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-1 border-b text-xs font-bold text-gray-400 uppercase">
                <span className="text-gray-700">Sales Information</span>
                <label className="flex items-center gap-1.5 text-gray-500 normal-case font-medium cursor-pointer">
                  <input type="checkbox" name="isSellable" checked={formData.isSellable} onChange={handleChange} className="rounded text-blue-600" />
                  Sellable
                </label>
              </div>
              {formData.isSellable && (
                <div className="space-y-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-red-500 text-xs font-semibold">Selling Price*</label>
                    <div className="flex">
                      <span className="bg-gray-50 border border-r-0 border-gray-300 rounded-l px-2.5 py-1 text-xs flex items-center text-gray-400 font-bold">INR</span>
                      <input type="number" name="sellingPrice" value={formData.sellingPrice} onChange={handleChange} className="w-full border border-gray-300 rounded-r px-3 py-1 focus:outline-none focus:border-blue-500" required />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-red-500 text-xs font-semibold">Account*</label>
                    <select name="salesAccount" value={formData.salesAccount} onChange={handleChange} className="w-full border border-gray-300 bg-white rounded px-3 py-1 focus:outline-none focus:border-blue-500">
                      <option value="Sales">Sales</option>
                      <option value="General Income">General Income</option>
                    </select>
                  </div>
                </div>
              )}
            </div>

            {/* Purchases Section block */}
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-1 border-b text-xs font-bold text-gray-400 uppercase">
                <span className="text-gray-700">Purchase Information</span>
                <label className="flex items-center gap-1.5 text-gray-500 normal-case font-medium cursor-pointer">
                  <input type="checkbox" name="isPurchasable" checked={formData.isPurchasable} onChange={handleChange} className="rounded text-blue-600" />
                  Purchasable
                </label>
              </div>
              {formData.isPurchasable && (
                <div className="space-y-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-red-500 text-xs font-semibold">Cost Price*</label>
                    <div className="flex">
                      <span className="bg-gray-50 border border-r-0 border-gray-300 rounded-l px-2.5 py-1 text-xs flex items-center text-gray-400 font-bold">INR</span>
                      <input type="number" name="costPrice" value={formData.costPrice} onChange={handleChange} className="w-full border border-gray-300 rounded-r px-3 py-1 focus:outline-none focus:border-blue-500" required />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-red-500 text-xs font-semibold">Account*</label>
                    <select name="purchaseAccount" value={formData.purchaseAccount} onChange={handleChange} className="w-full border border-gray-300 bg-white rounded px-3 py-1 focus:outline-none focus:border-blue-500">
                      <option value="Cost of Goods Sold">Cost of Goods Sold</option>
                      <option value="Materials">Materials</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Lower action bar button */}
          <div className="flex gap-2 pt-4 border-t border-gray-100">
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs px-6 py-2 rounded shadow-sm cursor-pointer transition">
              Save Item
            </button>
          </div>
        </form>
      </div>

      {/* 2. Embedded Dynamic profile cards list layout logic inside standalone clean view rows section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <ItemDetailsView refreshKey={refreshKey} />
      </div>

    </div>
  );
};

export default ItemForm;
