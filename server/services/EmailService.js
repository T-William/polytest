const nodemailer = require('nodemailer');

// Create reusable transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

const sendReceiptEmail = async (toEmail, orderId, receiptPath) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: toEmail,
      subject: 'Your Compost Store Order Receipt',
      html: `
        <h2>Thank you for your order!</h2>
        <p>Your order has been successfully processed.</p>
        <p>Order ID: ${orderId}</p>
        <p>Please find your receipt attached.</p>
        <p>For any questions, please contact us at support@compoststore.com</p>
      `,
      attachments: [
        {
          filename: path.basename(receiptPath),
          path: receiptPath,
          contentType: 'application/pdf'
        }
      ]
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

module.exports = {
  sendReceiptEmail
};
