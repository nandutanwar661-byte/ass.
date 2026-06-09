const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  location: { type: String, default: 'Corporate' },
  invoiceNumber: { type: String, required: true },
  orderNumber: { type: String },
  invoiceDate: { type: String, required: true },
  terms: { type: String, default: 'Net 7' },
  dueDate: { type: String },
  items: [{
    itemDetails: { type: String, required: true },
    quantity: { type: Number, default: 1 },
    rate: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    tax: { type: String, default: 'Select Tax' },
    amount: { type: Number, default: 0 }
  }],
  customerNotes: { type: String, default: 'Thank you for the payment.' },
  termsConditions: { type: String, default: 'Terms and conditions go here...' },
  shippingCharges: { type: Number, default: 0 },
  tdsTcsOption: { type: String, default: 'TDS' },
  taxSelect: { type: String, default: 'Select a Tax' },
  subTotal: { type: Number, default: 0 },
  total: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Invoice', invoiceSchema);