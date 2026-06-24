require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

async function sendTestEmail() {
  try {
    await transporter.verify();
    console.log('✅ SMTP Connected');

    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: 'Test Email',
      html: '<h2>Email Successfully Sent ✅</h2>'
    });

    console.log('✅ Email Sent:', info.messageId);
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

sendTestEmail();