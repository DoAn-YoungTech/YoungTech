const express = require("express");
const productRoutes = express.Router();
const productController = require("../controllers/productController");

productRoutes.get("/", productController.getAllProduct);

productRoutes.get("/:id", productController.getProductById);

productRoutes.post("/", productController.createProduct);

productRoutes.put("/:id", productController.updateProduct);

productRoutes.delete("/:id", productController.deleteProduct);
 
productRoutes.put("/:id/restore", productController.restoreProduct)
// productRoutes.put('/:id/restore', productController.restoreProduct);

module.exports = productRoutes;