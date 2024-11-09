const express = require('express');
const cartItemRoutes = express.Router();
const CartItemController = require('../controllers/cartItemController');

// Lấy tất cả các mục trong giỏ hàng
cartItemRoutes.get('/', CartItemController.getAllCartItem);

// Lấy mục giỏ hàng theo ID
cartItemRoutes.get('/:id', CartItemController.getCartItemById);

// Tạo mục giỏ hàng mới
cartItemRoutes.post("/", CartItemController.createCartItem);

// Cập nhật mục giỏ hàng theo ID
cartItemRoutes.put('/:id', CartItemController.updateCartItem);

cartItemRoutes.delete('/:id', CartItemController.deleteCartItem);

module.exports = cartItemRoutes;
