const orderService = require('../services/orderService');

const orderController = {
  getPendingOrders: async (req, res) => {
    try {
      const pendingOrders = await orderService.getPendingOrders();

      return res.status(200).json({
        message: 'Pending orders fetched successfully',
        data: pendingOrders,
      });
    } catch (error) {
      console.error('Error fetching pending orders:', error);
      return res.status(500).json({
        message: 'Internal Server Error',
        error: error.message,
      });
    }
  },
  addOrderWithDetails: async (req, res) => {
    const { order, orderDetails } = req.body;

    if (!order || !orderDetails || orderDetails.length === 0) {
      return res.status(400).json({ message: 'Order and order details are required' });
    }

    try {
      const result = await orderService.addOrderWithDetails(order, orderDetails);

      return res.status(201).json({
        message: 'Order and order details created successfully',
        data: result,
      });
    } catch (error) {
      console.error('Error adding order and details:', error);
      return res.status(500).json({
        message: 'Internal Server Error',
        error: error.message,
      });
    }
  },
  getOrderById: async (req, res) => {
    const { orderId } = req.params;

    try {
      const order = await orderService.getOrderById(orderId);
      return res.status(200).json({
        message: 'Order retrieved successfully',
        data: order,
      });
    } catch (error) {
      console.error('Error fetching order:', error);
      return res.status(404).json({
        message: 'Error fetching order',
        error: error.message,
      });
    }
  },
  updateOrderStatus: async (req, res) => {
    const { orderId, status } = req.body;
    console.log(orderId);
    console.log(status);
  
    if (!orderId || !status) {
      return res.status(400).json({ message: "orderId và status là bắt buộc." });
    }
  
    try {
      const result = await orderService.updateStatusOrder(orderId, status);
      res.status(200).json(result); 
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái đơn hàng:", error);
      res.status(500).json({ message: "Lỗi khi cập nhật trạng thái đơn hàng" });
    }
  }
};

module.exports = orderController;
