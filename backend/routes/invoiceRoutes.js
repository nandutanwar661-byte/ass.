const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const Invoice = require('../models/Invoice'); 

// ✅ STRICT GMAIL DIRECT WEBSERVICE PIPELINE (Bypasses standard SMTP blocks)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // Strict SSL encryption channel
  auth: {
    user: "nandutanwar661@gmail.com", // Aapki asli Gmail ID
    pass: "xoemvfpqrovhnyyg"          // Aapka 16-digit Google App Password जो आपने बनाया है
  },
  tls: {
    rejectUnauthorized: false // Render network protocol verification bypass
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

// 2. 🔥 MAIN DIRECT GMAIL TRANSMISSION ROUTE
router.post('/send-email', async (req, res) => {
  const { invoiceIds } = req.body;
  console.log("📡 Direct Gmail send request triggered for IDs:", invoiceIds);

  try {
    if (!invoiceIds || invoiceIds.length === 0) {
      return res.status(400).json({ success: false, message: "No invoices selected" });
    }

    const selectedInvoices = await Invoice.find({ _id: { $in: invoiceIds } });

    for (const invoice of selectedInvoices) {
      // 🚀 Aapko Mailtrap par nahi chahiye, isliye target direct aapki Gmail hi rahegi!
      const targetEmail = 'nandutanwar661@gmail.com'; 

      const mailOptions = {
        from: '"Suits Workspaces" <nandutanwar661@gmail.com>', // Sender details
        to: targetEmail,                                     // 📬 Delivered straight to your Gmail Inbox
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

      // Direct native transmission
      await transporter.sendMail(mailOptions);
    }

    return res.status(200).json({ success: true, message: "Emails pushed directly to your real Gmail Inbox!" });

  } catch (error) {
    console.error("Direct Gmail Transport Error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
