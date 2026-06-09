const mongoose = require('mongoose');

const estimateSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  location: { type: String, default: 'Corporate' },
  estimateNumber: { type: String, required: true },
  estimateDate: { type: String, required: true },
  expiryDate: { type: String },
  subject: { type: String },
  items: [{
    itemDetails: { type: String, required: true },
    quantity: { type: Number, default: 1 },
    rate: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    tax: { type: String, default: 'Select Tax' },
    amount: { type: Number, default: 0 },
    itemImageUrl: { type: String, default: '' }
  }],
  customerNotes: { type: String, default: 'Our Facilities Include:' },
  termsConditions: { type: String, default: 'This is a customised estimate provided according to demands...' },
  shippingCharges: { type: Number, default: 0 },
  adjustment: { type: Number, default: 0 },
  subTotal: { type: Number, default: 0 },
  total: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Estimate', estimateSchema);
