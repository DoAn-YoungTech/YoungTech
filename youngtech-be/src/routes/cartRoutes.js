const express = require('express');
const cartRoutes = express.Router();
const CartController = require('../controllers/cartController ');

cartRoutes.get('/', CartController.getAllCart);
cartRoutes.get('/:id', CartController.getCartById);
cartRoutes.post('/', CartController.createCart);
cartRoutes.put('/:id', CartController.updateCart);
cartRoutes.delete('/:id', CartController.deleteCart);

module.exports = cartRoutes;