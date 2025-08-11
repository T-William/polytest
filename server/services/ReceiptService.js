const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const generateReceipt = async (order) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    const fileName = `receipt_${order.orderId}.pdf`;
    const filePath = path.join(__dirname, '../public/receipts', fileName);

    doc.pipe(fs.createWriteStream(filePath));

    // Add header
    doc.fontSize(24).text('Compost Store Receipt', {
      align: 'center'
    });
    doc.moveDown();

    // Add order details
    doc.fontSize(12).text(`Order ID: ${order.orderId}`, {
      align: 'left'
    });
    doc.text(`Date: ${new Date().toLocaleDateString()}`, {
      align: 'left'
    });
    doc.moveDown();

    // Add items table
    doc.fontSize(12).text('Items:', {
      align: 'left'
    });
    doc.moveDown();

    order.items.forEach(item => {
      doc.text(`${item.name} x ${item.quantity} - $${item.price}`, {
        align: 'left'
      });
    });
    doc.moveDown();

    // Add delivery details
    doc.fontSize(12).text('Delivery:', {
      align: 'left'
    });
    doc.text(`Method: ${order.deliveryMethod}`, {
      align: 'left'
    });
    doc.text(`Fee: $${order.deliveryFee}`, {
      align: 'left'
    });
    doc.moveDown();

    // Add totals
    doc.fontSize(12).text('Totals:', {
      align: 'left'
    });
    doc.text(`Subtotal: $${order.subtotal}`, {
      align: 'left'
    });
    doc.text(`Delivery Fee: $${order.deliveryFee}`, {
      align: 'left'
    });
    doc.text(`Total: $${order.total}`, {
      align: 'left'
    });

    doc.end();

    doc.on('finish', () => {
      resolve(filePath);
    });

    doc.on('error', (error) => {
      reject(error);
    });
  });
};

module.exports = {
  generateReceipt
};
