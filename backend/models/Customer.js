const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  type: { type: String, enum: ['Business', 'Individual'], default: 'Business' },
  salutation: { type: String, default: 'Mr.' },
  firstName: { type: String, required: true },
  lastName: { type: String },
  companyName: { type: String },
  displayName: { type: String, required: true },
  email: { type: String },
  phone: { type: String },
  mobile: { type: String },
  openingReceivables: { type: Number, default: 0 },
  openingPayables: { type: Number, default: 0 },
  imageUrl: { type: String, default: '' },
  gstTreatment: { type: String, default: 'Consumer' },
  placeOfSupply: { type: String, default: 'State' },
  pan: { type: String },
  taxPreference: { type: String, default: 'Taxable' }
}, { timestamps: true });

module.exports = mongoose.model('Customer', customerSchema);