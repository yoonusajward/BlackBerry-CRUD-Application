const express = require('express');
const Product = require('../productModel');  // Product model
const Sales = require('../salesModel');  // Sales model
const Customer = require('../customerModel');  // Customer model
const router = express.Router();

// Route to get total number of products
router.get('/total-products', async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments({});
    res.json({ totalProducts });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching total products' });
  }
});

// Route to get total available stock
router.get('/available-stock', async (req, res) => {
  try {
    const availableStock = await Product.aggregate([
      { $group: { _id: null, totalStock: { $sum: "$stockAvailable" } } }
    ]);
    res.json({ availableStock: availableStock[0]?.totalStock || 0 });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching available stock' });
  }
});

// Route to get latest sales
router.get('/latest-sales', async (req, res) => {
  try {
    const latestSales = await Sales.countDocuments({
      salesDate: { $gte: new Date().setHours(0, 0, 0, 0) }
    });
    res.json({ latestSales });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching latest sales' });
  }
});

// Route to get top-selling products
router.get('/top-selling', async (req, res) => {
  try {
    // Aggregate sales to get the total quantity sold for each product
    const topSellingProducts = await Sales.aggregate([
      {
        $group: {
          _id: "$productID",
          productName: { $first: "$productName" },
          quantitySold: { $sum: "$quantity" }
        }
      },
      { $sort: { quantitySold: -1 } },  // Sort by the most sold
      { $limit: 5 }  // Return top 5 selling products
    ]);
    res.json({ topSellingProducts });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching top-selling products' });
  }
});

// Route to get customer summary
router.get('/customer-summary', async (req, res) => {
  try {
    // Get total number of customers
    const totalCustomers = await Customer.countDocuments({});

    // Get number of government and retail customers
    const governmentCustomers = await Customer.countDocuments({ customerType: 'Government' });
    const retailCustomers = totalCustomers - governmentCustomers;  // Assuming the rest are retail customers

    res.json({ totalCustomers, governmentCustomers, retailCustomers });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching customer summary' });
  }
});

module.exports = router;
