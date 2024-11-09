const express = require("express");
const productRoutes = express.Router();
const productController = require("../controllers/productController");

productRoutes.get("/", productController.getAllProduct);

productRoutes.get("/:id", productController.getProductById);

productRoutes.post("/", productController.createProduct);

productRoutes.put("/:id", productController.updateProduct);

productRoutes.delete("/:id", productController.deleteProduct);

// Route mới để lấy sản phẩm theo danh mục cha
productRoutes.get("/parent-category/:parentCategoryId", productController.getProductsByParentCategory)

module.exports = productRoutes;