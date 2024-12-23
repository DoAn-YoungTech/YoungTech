const express = require('express');
const orderRoutes = express.Router();
const orderController = require('../controllers/orderController');
const middlewareController = require('../controllers/middlewareController');

orderRoutes.post(
  '/createOrder',
  middlewareController.verifyToken,
  middlewareController.verifyTokenAndRole(['admin', 'customer', 'salesperson']),
  orderController.addOrderWithDetails
);
orderRoutes.put(
  '/updateOrderStatus',
  middlewareController.verifyToken,
  middlewareController.verifyTokenAndRole(['salesperson', 'admin']),
  orderController.updateOrderStatus
);
orderRoutes.get(
  '/getPendingOrders',
  // middlewareController.verifyToken,
  // middlewareController.verifyTokenAndRole(['salesperson', 'admin']),
  orderController.getPendingOrders
);


orderRoutes.get(
  '/getOrderByIdMe/:id',
  // middlewareController.verifyToken,
  orderController.getOrderByAccountId
);
orderRoutes.get('/:orderId', orderController.getOrderById);
module.exports = orderRoutes;
