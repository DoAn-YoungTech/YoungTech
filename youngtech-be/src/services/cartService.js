const cartRepository = require('../repositories/cartRepository');
const orderService = require('../services/orderService'); // Import orderService để tạo đơn hàng
const orderDetailService = require('../services/orderDetailService'); // Import để tạo chi tiết đơn hàng
const cartItemService = require('../services/cartItemServices'); // Import để lấy cart items

const cartService = {
  getAllCart: async () => {
    return await cartRepository.getAllCart();
  },

  getCartById: async (id) => {
    return await cartRepository.getCartById(id);
  },

  createCart: async (data) => {
    return await cartRepository.createCart(data);
  },

  deleteCart: async (id) => {
    return await cartRepository.deleteCart(id); // Xóa cứng
  },
  

  updateCart: async (id, data) => {
    return await cartRepository.updateCart(id, data);
  },

  placeOrder: async (id) => {  // Thêm hàm mới này
    const cart = await cartRepository.getCartById(id);
    if (!cart) return null;

    // Lấy tất cả các mục trong giỏ hàng
    const cartItems = await cartItemService.getCartItemId(id);
    if (!cartItems.length) return null;

    // Tạo đơn hàng từ giỏ hàng
    const orderData = {
      customer_id: cart.customer_id,
      status: "pending",
      totalAmount: cart.totalAmount
    };
    const newOrder = await orderService.createOrder(orderData);

    // Thêm các mục giỏ hàng vào chi tiết đơn hàng
    for (const item of cartItems) {
      const orderDetailData = {
        order_id: newOrder.id,
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.price
      };
      await orderDetailService.createOrderDetail(orderDetailData);
    }

    // Xóa mềm giỏ hàng sau khi chuyển thành đơn hàng
    await cartRepository.deleteCart(id, { flag: true });
    return newOrder;
  }
};

module.exports = cartService;
