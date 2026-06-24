const nodemailer = require('nodemailer');

// 🔒 Nodemailer Transporter Setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'suitsworkspaces@gmail.com', // Aapka official email direct yahan add kar diya h
    pass: 'nandani0n'       // Aapka Gmail App Password (.env file se aayega)
  }
});

// 🔥 INVOICE EMAIL SENDING FUNCTION
exports.sendInvoiceEmail = async (req, res) => {
  const { invoiceNumber, customerName, customerEmail, totalAmount, dueDate, invoiceDate } = req.body;

  if (!customerEmail) {
    return res.status(400).json({ success: false, message: 'Is customer ka email address added nahi hai!' });
  }

  // Zoho Books Style Professional HTML Template
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; padding: 20px; color: #333;">
      <h2 style="color: #1e3a8a; border-bottom: 2px solid #1e3a8a; padding-bottom: 10px;">Suits Workspaces Private Limited</h2>
      <p>Dear <strong>${customerName}</strong>,</p>
      <p>Thank you for your business. Please find the details of your invoice <strong>#${invoiceNumber}</strong> generated on ${invoiceDate}.</p>
      
      <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; padding: 15px; border-radius: 4px; margin: 20px 0;">
        <table style="width: 100%; font-size: 14px;">
          <tr>
            <td style="padding: 5px 0; color: #64748b;">Invoice Number:</td>
            <td style="padding: 5px 0; font-weight: bold; text-align: right;">${invoiceNumber}</td>
          </tr>
          <tr>
            <td style="padding: 5px 0; color: #64748b;">Due Date:</td>
            <td style="padding: 5px 0; font-weight: bold; text-align: right; color: #dc2626;">${dueDate}</td>
          </tr>
          <tr style="font-size: 16px; font-weight: bold;">
            <td style="padding: 10px 0; border-top: 1px dashed #cbd5e1; color: #0f172a;">Total Amount Due:</td>
            <td style="padding: 10px 0; border-top: 1px dashed #cbd5e1; text-align: right; color: #1e3a8a;">₹${Number(totalAmount).toFixed(2)}</td>
          </tr>
        </table>
      </div>

      <p style="font-size: 13px; color: #475569;">Agar aap payment kar chuke hain toh kripya is email ko ignore karein. Kisi bhi sahayata ke liye humse sampark karein.</p>
      <br />
      <p style="margin-bottom: 0;">Regards,</p>
      <p style="margin-top: 5px; font-weight: bold; color: #0f172a;">Suits Workspaces Team</p>
    </div>
  `;

  const mailOptions = {
    from: `"Suits Workspaces" <suitsworkspaces@gmail.com>`, // From field me bhi aapka gmail set kar diya h
    to: customerEmail, 
    subject: `Invoice - ${invoiceNumber} from Suits Workspaces Private Limited`,
    html: htmlContent
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: `Email successfully sent to ${customerEmail}` });
  } catch (error) {
    console.error("Email Error:", error);
    res.status(500).json({ success: false, message: "Email send karne me error aayi." });
  }
};