const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  type: { type: String, enum: ['Goods', 'Service'], default: 'Goods' },
  name: { type: String, required: true },
  sku: { type: String },
  unit: { type: String, default: 'BOX' },
  hsnCode: { type: String },
  taxPreference: { type: String, default: 'Taxable' },
  isSellable: { type: Boolean, default: true },
  sellingPrice: { type: Number, default: 0 },
  salesAccount: { type: String, default: 'Sales' },
  salesDescription: { type: String },
  isPurchasable: { type: Boolean, default: true },
  costPrice: { type: Number, default: 0 },
  purchaseAccount: { type: String, default: 'Cost of Goods Sold' },
  purchaseDescription: { type: String },
  preferredVendor: { type: String },
  imageUrl: { type: String, default: '' } // <-- Image path save karne ke liye field
}, { timestamps: true });

module.exports = mongoose.model('Item', itemSchema);