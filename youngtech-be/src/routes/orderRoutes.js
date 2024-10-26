const express = require('express');
const orderRoutes = express.Router();
const orderController = require('../controllers/orderController');

orderRoutes.get('/', orderController.getAllOrder);
orderRoutes.get('/:id', orderController.getOrderById);
orderRoutes.post('/', orderController.createOrder);
orderRoutes.put('/:id', orderController.updateOrder);
orderRoutes.delete('/:id', orderController.deleteOrder);
// Endpoint mới để hoàn tất đơn hàng và chuyển thành hóa đơn
orderRoutes.post('/:id/complete', orderController.completeOrder);

module.exports = orderRoutes;