const express = require('express');
const orderRoutes = express.Router();
const orderController = require('../controllers/orderController');
const middlewareController = require('../controllers/middlewareController');


orderRoutes.post('/createOrder', orderController.addOrderWithDetails); 
orderRoutes.put('/updateOrderStatus', orderController.updateOrderStatus); 
orderRoutes.get('/getPendingOrders', orderController.getPendingOrders);
orderRoutes.get('/:orderId', orderController.getOrderById);
module.exports = orderRoutes;
