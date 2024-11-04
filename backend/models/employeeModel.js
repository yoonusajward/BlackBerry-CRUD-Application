const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  employeeID: Number,
  name: String,
  email: String,
  position: String,
  department: String,
  hireDate: String,
  projects: Array,
}, { collection: 'EmployeeData' });

module.exports = mongoose.model('Employee', employeeSchema);
