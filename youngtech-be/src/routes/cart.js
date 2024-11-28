const express = require('express');
const cart = express.Router();
const cartController = require('../controllers/cartController');
const middlewareController = require('../controllers/middlewareController');
const authController = require('../controllers/authControllers');

cart.post(
  '/addProductToCart',
  middlewareController.verifyToken,
  middlewareController.verifyTokenAndRole(['user', 'customer']),
  middlewareController.checkPermission('Cart_Management', 'create'),
  cartController.addProductToCart
);
cart.get(
  '/viewCart',
  middlewareController.verifyToken,
  middlewareController.verifyTokenAndRole(['customer']),
  middlewareController.checkPermission('Cart_Management', 'read'),
  cartController.viewCart
);

cart.put(
  '/editCart',
  middlewareController.verifyToken,
  middlewareController.verifyTokenAndRole(['customer']),
  middlewareController.checkPermission('Cart_Management', 'update'),
  cartController.editCart
);

cart.put(
  '/addProductToOrder',
  middlewareController.verifyToken,
  cartController.addProductToOrder
);

cart.delete(
  '/removeProductId/:productId',
  middlewareController.verifyToken,
  middlewareController.verifyTokenAndRole(['customer']),
  middlewareController.checkPermission('Cart_Management', 'delete'),
  cartController.removeProductId
);

cart.delete(
  '/removeManyProduct',
  middlewareController.verifyToken,
  middlewareController.verifyTokenAndRole(['customer']),
  middlewareController.checkPermission('Cart_Management', 'delete'),
  cartController.removeManyProduct
);

module.exports = cart;
