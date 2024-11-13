const express = require("express");
const productRoutes = express.Router();
const productController = require("../controllers/productController");

productRoutes.get("/", productController.getAllProduct);

productRoutes.get("/:id", productController.getProductById);

productRoutes.post("/", productController.createProduct);

productRoutes.put("/:id", productController.updateProduct);

productRoutes.delete("/:id", productController.deleteProduct);
 
productRoutes.put("/:id/restore", productController.restoreProduct)

productRoutes.get("/childCategory/:childCategoryId", productController.getProductByChildCategory);
productRoutes.get("/parentCategory/:parentCategoryId", productController.getProductByParentCategory);
module.exports = productRoutes;