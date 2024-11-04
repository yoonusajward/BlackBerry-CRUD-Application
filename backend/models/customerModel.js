const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: String,
  email: String,
  location: String,
  productsPurchased: Array,
  totalSpent: Number,
  customerType: String,
}, { collection: 'CustomerData' });

module.exports = mongoose.model('Customer', customerSchema);
