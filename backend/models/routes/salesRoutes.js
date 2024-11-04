const express = require('express');
const router = express.Router();
const Sales = require('../salesModel');

// Get all sales
router.get('/', async (req, res) => {
    try {
        const sales = await Sales.find();
        res.json(sales);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get one sale by ID
router.get('/:id', getSales, (req, res) => {
    res.json(res.sales);
});

// Create a sale
router.post('/', async (req, res) => {
    const sales = new Sales({
        transactionID: req.body.transactionID,
        customerID: req.body.customerID,
        productID: req.body.productID,
        salesDate: req.body.salesDate,
        quantity: req.body.quantity,
        totalAmount: req.body.totalAmount,
        paymentMethod: req.body.paymentMethod
    });
    try {
        const newSale = await sales.save();
        res.status(201).json(newSale);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a sale
router.patch('/:id', getSales, async (req, res) => {
    if (req.body.quantity != null) {
        res.sales.quantity = req.body.quantity;
    }
    if (req.body.totalAmount != null) {
        res.sales.totalAmount = req.body.totalAmount;
    }
    try {
        const updatedSale = await res.sales.save();
        res.json(updatedSale);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a sale
router.delete('/:id', async (req, res) => {
    try {
        const sale = await Sales.findByIdAndDelete(req.params.id);
        if (!sale) {
            return res.status(404).json({ message: 'Cannot find sale' });
        }
        res.json({ message: 'Deleted Sale' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// Middleware to get a sale by ID
async function getSales(req, res, next) {
    let sales;
    try {
        sales = await Sales.findById(req.params.id);
        if (sales == null) {
            return res.status(404).json({ message: 'Cannot find sale' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.sales = sales;
    next();
}

module.exports = router;
