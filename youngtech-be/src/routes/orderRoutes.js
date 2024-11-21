const express = require('express');
const orderRoutes = express.Router();
const orderController = require('../controllers/orderController');
const middlewareController = require('../controllers/middlewareController');


 
// Lấy tất cả đơn hàng
orderRoutes.get('/', orderController.getAllOrder);

// Lấy đơn hàng theo ID
orderRoutes.get('/:id', orderController.getOrderById);

// Tạo đơn hàng mới từ giỏ hàng
orderRoutes.post('/', orderController.createOrder); // Đảm bảo rằng createOrder xử lý việc tạo đơn hàng từ giỏ

// Cập nhật đơn hàng theo ID
orderRoutes.put('/:id', orderController.updateOrder);

// Xóa mềm đơn hàng theo ID
orderRoutes.delete('/:id', orderController.deleteOrder);

orderRoutes.put('/:id/restore',orderController.restoreOrder);

module.exports = orderRoutes;
