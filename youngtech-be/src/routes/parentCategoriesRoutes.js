const express = require('express');
const parentCategoriesRoutes = express.Router(); // Tên biến nhất quán là 'parentCategoriesRoutes'
const parentCategoriesController = require('../controllers/parentCategoriesvController'); // Import controller
// const middlewareController = require('../controllers/middlewareController');

// Define routes with valid callbacks
parentCategoriesRoutes.get('/', 
    // middlewareController.verifyToken,
    // middlewareController.verifyTokenAndRole(['storekeeper']),
    parentCategoriesController.getAllParentCategories);
parentCategoriesRoutes.post('/', 
    // middlewareController.verifyToken,
    // middlewareController.verifyTokenAndRole(['storekeeper']),
    parentCategoriesController.createParentCategories);
parentCategoriesRoutes.get('/:id', 
    // middlewareController.verifyToken,
    // middlewareController.verifyTokenAndRole(['storekeeper']),
    parentCategoriesController.getParentCategoriesById);
parentCategoriesRoutes.put('/:id', 
    // middlewareController.verifyToken,
    // middlewareController.verifyTokenAndRole(['storekeeper']),
    parentCategoriesController.updateParentCategories);
parentCategoriesRoutes.delete('/:id', 
    // middlewareController.verifyToken,
    // middlewareController.verifyTokenAndRole(['storekeeper']),
    parentCategoriesController.deleteParentCategories);
parentCategoriesRoutes.put('/:id/restore', 
    // middlewareController.verifyToken,
    // middlewareController.verifyTokenAndRole(['storekeeper']),
    parentCategoriesController.restoreParentCategories);
module.exports = parentCategoriesRoutes;
