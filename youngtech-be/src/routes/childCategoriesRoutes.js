const express = require('express'); // Đúng cú pháp
const childCategoriesController = require('../controllers/childCategoriesController'); // Import controller
const middlewareController = require('../controllers/middlewareController');
const childCategoriesRoutes = express.Router(); // Đúng cú pháp

// Define routes with valid callbacks
childCategoriesRoutes.get('/',
    middlewareController.verifyToken,
    middlewareController.verifyTokenAndRole(['storekeeper']),
    childCategoriesController.getAllChildCategories);
childCategoriesRoutes.get('/childCategoryByParent/:id', 
    middlewareController.verifyToken,
    middlewareController.verifyTokenAndRole(['storekeeper']),
    childCategoriesController.getChildCategoriesByParentId);
childCategoriesRoutes.post('/', 
    middlewareController.verifyToken,
    middlewareController.verifyTokenAndRole(['storekeeper']),
    childCategoriesController.createChildCategories);
childCategoriesRoutes.get('/:id', 
    middlewareController.verifyToken,
    middlewareController.verifyTokenAndRole(['storekeeper']),
    childCategoriesController.getChildCategoriesById);
childCategoriesRoutes.put('/:id', 
    middlewareController.verifyToken,
    middlewareController.verifyTokenAndRole(['storekeeper']),
    childCategoriesController.updateChildCategories);
childCategoriesRoutes.get('/getNameParentCategoryByChildId/:id', 
    middlewareController.verifyToken,
    middlewareController.verifyTokenAndRole(['storekeeper']),
    childCategoriesController.getNameParentCategoriesByChildId);
childCategoriesRoutes.delete('/:id', 
    middlewareController.verifyToken,
    middlewareController.verifyTokenAndRole(['storekeeper']),
    childCategoriesController.deleteChildCategories);
childCategoriesRoutes.put('/:id/restore', 
    middlewareController.verifyToken,
    middlewareController.verifyTokenAndRole(['storekeeper']),
    childCategoriesController.restoreChildCategories);
module.exports = childCategoriesRoutes; // Export đúng cách
