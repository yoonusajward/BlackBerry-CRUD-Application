const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const customerRoutes = require('./models/routes/customerRoutes');
const productRoutes = require('./models/routes/productRoutes');
const salesRoutes = require('./models/routes/salesRoutes');
const employeeRoutes = require('./models/routes/employeeRoutes');
const dashboardRoutes = require('./models/routes/dashboardRoutes');  // Dashboard routes

// Initialize express app
const app = express();

// Middleware
app.use(cors());  // Allow cross-origin requests
app.use(express.json());  // Parse JSON bodies

// Routes
app.use('/api/customers', customerRoutes);
app.use('/api/products', productRoutes);
app.use('/api/sales', salesRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/dashboard', dashboardRoutes);  // Register the dashboard routes

// Connect to MongoDB (removed deprecated options)
mongoose.connect('mongodb://localhost:27017/BlackBerryDB')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('Error connecting to MongoDB:', err));

// Listen to port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
