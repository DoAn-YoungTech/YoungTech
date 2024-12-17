const express = require("express");
const supplierController = require("../controllers/supplierController");
const supplierRoutes = express.Router();
const middlewareController = require('../controllers/middlewareController');
supplierRoutes.get("/", 
    // middlewareController.verifyToken,
    // middlewareController.verifyTokenAndRole(['storekeeper']),
    supplierController.getAllSuppliers);
supplierRoutes.post("/", 
    // middlewareController.verifyToken,
    // middlewareController.verifyTokenAndRole(['storekeeper']),
    supplierController.createSupplier);
supplierRoutes.put("/:id", 
    // middlewareController.verifyToken,
    // middlewareController.verifyTokenAndRole(['storekeeper']),
    supplierController.updateSupplier);
supplierRoutes.delete("/:id", 
    // middlewareController.verifyToken,
    // middlewareController.verifyTokenAndRole(['storekeeper']),
    supplierController.deleteSupplier);
supplierRoutes.get("/:id", 
    // middlewareController.verifyToken,
    // middlewareController.verifyTokenAndRole(['storekeeper']),
    supplierController.getSupplierById);

module.exports = supplierRoutes;
