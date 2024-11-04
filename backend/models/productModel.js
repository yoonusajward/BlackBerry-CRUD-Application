const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productID: String,
  productName: String,
  category: String,
  releaseDate: String,
  price: Number,
  stockAvailable: Number,
  features: Array,
}, { collection: 'ProductData' });

module.exports = mongoose.model('Product', productSchema);
