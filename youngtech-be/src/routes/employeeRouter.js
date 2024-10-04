const express = require('express');

const employeeRouter = express.Router();
const employeeController = require('../controllers/employeeController')

employeeRouter.get('/' , employeeController.getAllEmployee ) 

employeeRouter.post('/' , employeeController.createEmployee ) 

employeeRouter.delete('/:id' ,employeeController.deleteEmployee  ) 

employeeRouter.put('/:id' ,  employeeController.updateEmployee) 

employeeRouter.get('/:id' , employeeController.getEmployeeById )

module.exports = employeeRouter