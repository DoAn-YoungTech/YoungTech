const cartItemRepository = require('../repositories/cartItemRepository');

const cartItemService = {
  getAllCartItem: async () => {
    return await cartItemRepository.getAllCartItem();
  },

  getCartItemById: async (id) => {
    return await cartItemRepository.getCartItemById(id);
  },

  createCartItem: async (data) => {
    return await cartItemRepository.createCartItem(data);
  },
  
  deleteCartItem: async (id) => {
    return await cartItemRepository.deleteCartItem(id); // Xóa cứng
  },


  updateCartItem: async (id, data) => {
    return await cartItemRepository.updateCartItem(id, data);
  },

  clearCartItemsAfterOrder: async (cartId) => {
    // Cập nhật trạng thái hoặc xóa các mục trong giỏ hàng khi đã chuyển thành đơn hàng
    return await cartItemRepository.clearCartItemsAfterOrder(cartId);
  }
};

module.exports = cartItemService;