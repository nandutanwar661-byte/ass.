const express = require('express');
const router = express.Router();
const { Resend } = require('resend');
const Invoice = require('../models/Invoice'); 

// ✅ Initialize Resend with your API Key (Bypasses Render SMTP ports completely!)
const resend = new Resend('PASTE_YOUR_RESEND_API_KEY_HERE');

// 1. GET ALL INVOICES ROUTE
router.get('/all', async (req, res) => {
  try {
    const invoices = await Invoice.find({}).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: invoices });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// 2. 🔥 MAIN LIVE EMAIL ROUTE (Uses HTTP/HTTPS API)
router.post('/send-email', async (req, res) => {
  const { invoiceIds } = req.body;
  console.log("📡 Resend API request received for IDs:", invoiceIds);

  try {
    if (!invoiceIds || invoiceIds.length === 0) {
      return res.status(400).json({ success: false, message: "No invoices selected" });
    }

    const selectedInvoices = await Invoice.find({ _id: { $in: invoiceIds } });

    for (const invoice of selectedInvoices) {
      // Free testing tiers on Resend deliver directly to your registered account email
      const targetEmail = 'nandutanwar661@gmail.com'; 

      await resend.emails.send({
        from: 'Suits Workspaces <onboarding@resend.dev>', // Resend free tier default verified sender
        to: targetEmail,                                  // 🚀 Deliver directly to your real Gmail inbox
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
      });
    }

    return res.status(200).json({ success: true, message: "Real Emails sent directly to Gmail Inbox!" });

  } catch (error) {
    console.error("Resend API Error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;