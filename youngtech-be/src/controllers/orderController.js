const orderService = require('../services/orderService');

const orderController = {
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
};

module.exports = orderController;
