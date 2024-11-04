const express = require('express');
const router = express.Router();
const Employee = require('../employeeModel');

// Get all employees
router.get('/', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get one employee by ID
router.get('/:id', getEmployee, (req, res) => {
    res.json(res.employee);
});

// Create an employee
router.post('/', async (req, res) => {
    const employee = new Employee({
        employeeID: req.body.employeeID,
        name: req.body.name,
        email: req.body.email,
        position: req.body.position,
        department: req.body.department,
        hireDate: req.body.hireDate,
        projects: req.body.projects
    });
    try {
        const newEmployee = await employee.save();
        res.status(201).json(newEmployee);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update an employee
router.patch('/:id', getEmployee, async (req, res) => {
    if (req.body.name != null) {
        res.employee.name = req.body.name;
    }
    if (req.body.position != null) {
        res.employee.position = req.body.position;
    }
    if (req.body.department != null) {
        res.employee.department = req.body.department;
    }
    try {
        const updatedEmployee = await res.employee.save();
        res.json(updatedEmployee);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete an employee
router.delete('/:id', async (req, res) => {
    try {
        const employee = await Employee.findByIdAndDelete(req.params.id);
        if (!employee) {
            return res.status(404).json({ message: 'Cannot find employee' });
        }
        res.json({ message: 'Deleted Employee' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Middleware to get an employee by ID
async function getEmployee(req, res, next) {
    let employee;
    try {
        employee = await Employee.findById(req.params.id);
        if (employee == null) {
            return res.status(404).json({ message: 'Cannot find employee' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.employee = employee;
    next();
}

module.exports = router;
