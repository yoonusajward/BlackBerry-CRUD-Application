const mongoose = require('mongoose');

const salesSchema = new mongoose.Schema({
  transactionID: Number,
  customerID: Number,
  productID: String,
  productName: String,
  salesDate: String,
  quantity: Number,
  totalAmount: Number,
  paymentMethod: String,
}, { collection: 'SalesData' });

module.exports = mongoose.model('Sales', salesSchema);
