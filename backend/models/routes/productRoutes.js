const express = require('express');
const router = express.Router();
const Product = require('../productModel');

// Get all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get one product by ID
router.get('/:id', getProduct, (req, res) => {
    res.json(res.product);
});

// Create a product
router.post('/', async (req, res) => {
    const product = new Product({
        productID: req.body.productID,
        productName: req.body.productName,
        category: req.body.category,
        releaseDate: req.body.releaseDate,
        price: req.body.price,
        stockAvailable: req.body.stockAvailable,
        features: req.body.features
    });
    try {
        const newProduct = await product.save();
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a product
router.patch('/:id', getProduct, async (req, res) => {
    if (req.body.productName != null) {
        res.product.productName = req.body.productName;
    }
    if (req.body.category != null) {
        res.product.category = req.body.category;
    }
    if (req.body.price != null) {
        res.product.price = req.body.price;
    }
    try {
        const updatedProduct = await res.product.save();
        res.json(updatedProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a product
router.delete('/:id', async (req, res) => {
    try {
      const product = await Product.findByIdAndDelete(req.params.id);
      if (!product) {
        return res.status(404).json({ message: 'Cannot find product' });
      }
      res.json({ message: 'Deleted Product' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

// Middleware to get a product by ID
async function getProduct(req, res, next) {
    let product;
    try {
        product = await Product.findById(req.params.id);
        if (product == null) {
            return res.status(404).json({ message: 'Cannot find product' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.product = product;
    next();
}

module.exports = router;
