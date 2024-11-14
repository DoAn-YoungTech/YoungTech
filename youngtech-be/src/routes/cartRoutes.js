const express = require("express");
const cartRoutes = express.Router();
const CartController = require("../controllers/cartController");

// Lấy tất cả giỏ hàng
cartRoutes.get("/", CartController.getAllCart);

// Lấy giỏ hàng theo ID
cartRoutes.get("/:id", CartController.getCartById);

// Tạo giỏ hàng mới
cartRoutes.post("/", CartController.createCart);

// Cập nhật giỏ hàng
cartRoutes.put("/:id", CartController.updateCart);

// Xóa giỏ hàng (xóa mềm)
cartRoutes.delete("/:id", CartController.deleteCart);

// Chuyển đổi giỏ hàng thành đơn hàng (chỉ xử lý ở đây)
cartRoutes.post("/:id/checkout", CartController.checkoutCart); // Route mới để checkout

module.exports = cartRoutes;
