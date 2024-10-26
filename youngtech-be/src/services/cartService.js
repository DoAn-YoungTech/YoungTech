const cartRepository = require('../repositories/cartRepository');

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
    const data = { is_deleted: true }
    return await cartRepository.deleteCart(id, data); // Xóa mềm
  },

  updateCart: async (id, data) => {
    return await cartRepository.updateCart(id, data);
  }
};

module.exports = cartService;
