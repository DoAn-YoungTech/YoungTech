const express = require('express');
const cartItemRoutes = express.Router();
const CartItemController = require('../controllers/cartItemController');

cartItemRoutes.get('/',CartItemController.getAllCartItem);
cartItemRoutes.get('/:id', CartItemController.getCartItemById);
cartItemRoutes.post("/", CartItemController.createCartItem);
cartItemRoutes.put('/:id', CartItemController.updateCartItem);
cartItemRoutes.delete('/:id', CartItemController.deleteCartItem);

module.exports = cartItemRoutes;