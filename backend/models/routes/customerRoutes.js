const express = require('express');
const router = express.Router();
const Customer = require('../customerModel');

// Get all customers
router.get('/', async (req, res) => {
    try {
        const customers = await Customer.find();
        res.json(customers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get one customer by ID
router.get('/:id', getCustomer, (req, res) => {
    res.json(res.customer);
});

// Create a customer
router.post('/', async (req, res) => {
    const customer = new Customer({
        name: req.body.name,
        email: req.body.email,
        location: req.body.location,
        productsPurchased: req.body.productsPurchased,
        totalSpent: req.body.totalSpent,
        customerType: req.body.customerType
    });
    try {
        const newCustomer = await customer.save();
        res.status(201).json(newCustomer);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a customer
router.patch('/:id', getCustomer, async (req, res) => {
    if (req.body.name != null) {
        res.customer.name = req.body.name;
    }
    if (req.body.email != null) {
        res.customer.email = req.body.email;
    }
    if (req.body.location != null) {
        res.customer.location = req.body.location;
    }
    if (req.body.totalSpent != null) {
        res.customer.totalSpent = req.body.totalSpent;
    }
    try {
        const updatedCustomer = await res.customer.save();
        res.json(updatedCustomer);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a customer
router.delete('/:id', async (req, res) => {
    try {
        const customer = await Customer.findByIdAndDelete(req.params.id);
        if (!customer) {
            return res.status(404).json({ message: 'Cannot find customer' });
        }
        res.json({ message: 'Deleted Customer' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Middleware to get a customer by ID
async function getCustomer(req, res, next) {
    let customer;
    try {
        customer = await Customer.findById(req.params.id);
        if (customer == null) {
            return res.status(404).json({ message: 'Cannot find customer' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.customer = customer;
    next();
}

module.exports = router;
