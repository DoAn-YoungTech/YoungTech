const orderRepository = require('../repositories/orderRepository');
const orderService = {
  getAllOrder: async ({ offset, limit }) => {
    return await orderRepository.getAllOrder({ offset, limit });
  },


  getOrderById: async (id) => {
    return await orderRepository.getOrderById(id);
  },

  createOrder: async (data) => {
    // Tạo đơn hàng cùng với chi tiết đơn hàng
    return await orderRepository.createOrder(data);
  },

  updateOrder: async (id, data) => {
    // Cập nhật đơn hàng cùng với chi tiết đơn hàng mới
    return await orderRepository.updateOrder(id, data);
  },

  deleteOrder: async (id) => {
    const data = { flag: true };
    return await orderRepository.deleteOrder(id, data);
  },
  restoreOrder: async (id) => {
    return await orderRepository.restoreOrder(id);
  },

  
};

module.exports = orderService;
