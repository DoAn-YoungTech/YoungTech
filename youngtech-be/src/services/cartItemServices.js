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
    const data = { is_deleted: true }
    return await cartItemRepository.deleteCartItem(id, data); // Xóa mềm
  },

  updateCartItem: async (id, data) => {
    return await cartItemRepository.updateCartItem(id, data);
  }
};

module.exports = cartItemService;
