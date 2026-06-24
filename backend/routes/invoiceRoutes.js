const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const Invoice = require('../models/Invoice'); // Path cross-check kar lein

// ✅ REAL GMAIL DIRECT PIPELINE (Using Strict SSL Port 465)
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',         // Official Gmail SMTP Host
  port: 465,                      // 👈 Strict SSL Port (Yeh Render par block nahi hota)
  secure: true,                   // 👈 Port 465 ke liye ise TRUE hona zaroori hai
  auth: {
    user: "nandutanwar661@gmail.com", // Aapka real Gmail account
    pass: "xoemvfpqrovhnyyg"          // Aapka 16-digit Google App Password
  },
  tls: {
    rejectUnauthorized: false     // Network verification bypass for Render
  }
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

// 2. 🔥 MAIN REAL EMAIL ROUTE
router.post('/send-email', async (req, res) => {
  const { invoiceIds } = req.body;
  console.log("📡 Live Real Mail request received for IDs:", invoiceIds);

  try {
    if (!invoiceIds || invoiceIds.length === 0) {
      return res.status(400).json({ success: false, message: "No invoices selected" });
    }

    const selectedInvoices = await Invoice.find({ _id: { $in: invoiceIds } });

    for (const invoice of selectedInvoices) {
      // Agar invoice me real customer email na mile toh backup me isi par mail bhej dega
      const customerEmail = invoice.customerEmail || invoice.email || 'nandutanwar661@gmail.com'; 

      const mailOptions = {
        from: '"Suits Workspaces" <nandutanwar661@gmail.com>', // Sender details
        to: customerEmail,                                   // 🚀 Ab yeh direct is REAL address par jayega!
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

      // Real email transmission
      await transporter.sendMail(mailOptions);
    }

    return res.status(200).json({ success: true, message: "Real Emails delivered successfully directly to Inbox!" });

  } catch (error) {
    console.error("Nodemailer Real Error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
