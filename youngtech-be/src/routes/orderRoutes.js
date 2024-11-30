const express = require('express');
const orderRoutes = express.Router();
const orderController = require('../controllers/orderController');
const middlewareController = require('../controllers/middlewareController');

// Tạo đơn hàng mới từ giỏ hàng
orderRoutes.post('/createOrder', orderController.addOrderWithDetails); // Đảm bảo rằng createOrder xử lý việc tạo đơn hàng từ giỏ

module.exports = orderRoutes;
