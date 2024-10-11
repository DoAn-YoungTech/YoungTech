const express = require('express'); // Đúng cú pháp
const childCategoriesController = require('../controllers/childCategoriesController'); // Import controller

const childCategoriesRouter = express.Router(); // Đúng cú pháp

// Define routes with valid callbacks
childCategoriesRouter.get('/', childCategoriesController.getAllChildCategories);
childCategoriesRouter.post('/', childCategoriesController.createChildCategories);
childCategoriesRouter.get('/:id', childCategoriesController.getChildCategoriesById);
childCategoriesRouter.put('/:id', childCategoriesController.updateChildCategories);
childCategoriesRouter.delete('/:id', childCategoriesController.deleteChildCategories);

module.exports = childCategoriesRouter; // Export đúng cách
