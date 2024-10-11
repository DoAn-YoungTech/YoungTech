const express = require('express');
const employeeRouter = express.Router();
const employeeController = require('../controllers/employeeController'); // Import controller

// Define routes with valid callbacks
employeeRouter.get('/', employeeController.getAllEmployee);
employeeRouter.post('/', employeeController.createEmployee);
employeeRouter.get('/:id', employeeController.getEmployeeById);
employeeRouter.put('/:id', employeeController.updateEmployee);
employeeRouter.delete('/:id', employeeController.deleteEmployee);

module.exports = employeeRouter;