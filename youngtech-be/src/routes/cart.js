const express = require('express');
const cart = express.Router();
const cartController = require('../controllers/cartController');
const middlewareController = require('../controllers/middlewareController');
const authController = require('../controllers/authControllers');
cart.post(
  '/addProductToCart',
  middlewareController.verifyToken,
  cartController.addProductToCart
);
cart.get(
  '/viewCart',
  middlewareController.verifyToken,
  cartController.viewCart
);

cart.put(
  '/editCart',
  middlewareController.verifyToken,
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
  cartController.removeProductId
);
module.exports = cart;
