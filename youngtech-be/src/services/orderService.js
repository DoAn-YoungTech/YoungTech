const orderRepository = require('../repositories/orderRepository');
const orderService = {
  addCustomerForOrder: async (data) => {
    // Tìm khách hàng dựa trên số điện thoại
    const existingCustomer = await orderRepository.findCustomerByPhoneNumber(data.phoneNumber);

    if (existingCustomer) {
      // Nếu khách hàng đã tồn tại, trả về thông tin của họ
      return existingCustomer;
    }

    // Nếu không tồn tại, thêm mới
    return await orderRepository.addCustomerForOrder(data);
  },

  // Hàm tìm khách hàng (có thể không cần nếu repository đã hỗ trợ)
  findCustomer: async (phoneNumber) => {
    return await orderRepository.findCustomerByPhoneNumber(phoneNumber);
  },
 
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
