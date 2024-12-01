const sequelize = require('../configs/db');
const orderRepository = require('../repositories/orderRepository');
const orderDetailRepository = require('../repositories/orderDetailRepository');

const orderService = {
  addOrderWithDetails: async (orderData, orderDetails) => {
    const transaction = await sequelize.transaction();

    try {
      const newOrderId = await orderRepository.createOrder(orderData);

      if (!newOrderId) {
        throw new Error('Failed to create Order');
      }

      console.log('New Order ID:', newOrderId);

      for (const detail of orderDetails) {
        const orderDetailData = {
          ...detail,
          order_id: newOrderId, 
        };

        console.log('OrderDetail Data:', orderDetailData);

        await orderDetailRepository.createOrderDetail(orderDetailData);
      }

      await transaction.commit();
      return { message: 'Order and details added successfully', orderId: newOrderId };
    } catch (error) {
      await transaction.rollback();
      console.error('Error adding order and details:', error);
      throw error;
    }
  },
};

module.exports = orderService;
