const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const Invoice = require('../models/Invoice'); // Apne model ka sahi path check kar lein

// Nodemailer Transporter Setup
const transporter = nodemailer.createTransport({
  host: '74.125.142.108', // Gmail Official direct IP
  port: 465,              // 👈 Hum port badal kar 465 (SSL) secure use karenge, ise block nahi kiya jata!
  secure: true,           // 👈 Ise TRUE kariye kyunki port 465 strict SSL demand karta hai
  auth: {
    user: "nandutanwar661@gmail.com", 
    pass: "xoemvfpqrovhnyyg"          // Aapka 16-digit Google App Password
  },
  tls: {
    rejectUnauthorized: false
  },
  family: 4
});

// 1. GET ALL INVOICES ROUTE
router.get('/all', async (req, res) => {
  try {
    const invoices = await Invoice.find({}).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: invoices });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// 2. 🔥 MAIN EMAIL ROUTE (Ise ensure karein)
router.post('/send-email', async (req, res) => {
  const { invoiceIds } = req.body;
  console.log("📡 Mail request received for IDs:", invoiceIds);

  try {
    if (!invoiceIds || invoiceIds.length === 0) {
      return res.status(400).json({ success: false, message: "No invoices selected" });
    }

    const selectedInvoices = await Invoice.find({ _id: { $in: invoiceIds } });

    for (const invoice of selectedInvoices) {
      // Schema ke according field check karein (customerEmail ya email)
      const customerEmail = invoice.customerEmail || invoice.email || 'test-customer@gmail.com'; 

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: customerEmail,
        subject: `Tax Invoice ${invoice.invoiceNumber} From Suits Workspaces`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
            <h2 style="color: #1e3a8a;">Suits Workspaces Private Limited</h2>
            <hr style="border: 0; border-top: 1px solid #e2e8f0; margin-bottom: 20px;"/>
            <h3>Hello ${invoice.customerName || 'Customer'},</h3>
            <p>Please find the transaction details for your invoice <b>${invoice.invoiceNumber}</b>.</p>
            <p><b>Total Amount:</b> ₹${Number(invoice.total || 0).toFixed(2)}</p>
            <p>Thank you for your business!</p>
          </div>
        `
      };

      await transporter.sendMail(mailOptions);
    }

    // Frontend ko response bhejna zaroori h
    return res.status(200).json({ success: true, message: "Emails sent successfully!" });

  } catch (error) {
    console.error("Nodemailer Error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
