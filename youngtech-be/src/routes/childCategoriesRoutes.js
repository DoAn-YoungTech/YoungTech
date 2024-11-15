const express = require('express'); // Đúng cú pháp
const childCategoriesController = require('../controllers/childCategoriesController'); // Import controller

const childCategoriesRoutes = express.Router(); // Đúng cú pháp

// Define routes with valid callbacks
childCategoriesRoutes.get('/', childCategoriesController.getAllChildCategories);
childCategoriesRoutes.post('/', childCategoriesController.createChildCategories);
childCategoriesRoutes.get('/:id', childCategoriesController.getChildCategoriesById);
childCategoriesRoutes.put('/:id', childCategoriesController.updateChildCategories);
childCategoriesRoutes.delete('/:id', childCategoriesController.deleteChildCategories);
childCategoriesRoutes.put('/:id/restore', childCategoriesController.restoreChildCategories);
module.exports = childCategoriesRoutes; // Export đúng cách