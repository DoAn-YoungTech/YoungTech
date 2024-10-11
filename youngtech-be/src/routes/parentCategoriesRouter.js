const express = require('express');
const parentCategoriesRouter = express.Router(); // Tên biến nhất quán là 'parentCategoriesRouter'
const parentCategoriesController = require('../controllers/parentCategoriesvController'); // Import controller

// Define routes with valid callbacks
parentCategoriesRouter.get('/', parentCategoriesController.getAllParentCategories);
parentCategoriesRouter.post('/', parentCategoriesController.createParentCategories);
parentCategoriesRouter.get('/:id', parentCategoriesController.getParentCategoriesById);
parentCategoriesRouter.put('/:id', parentCategoriesController.updateParentCategories);
parentCategoriesRouter.delete('/:id', parentCategoriesController.deleteParentCategories);

module.exports = parentCategoriesRouter;
