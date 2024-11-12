const sequelize = require("../configs/db");

const cartItemRepository = {
  getAllCartItem: async () => {
    const query = `SELECT * FROM cart_items`;
    const [result] = await sequelize.query(query);
    return result;
  },

  getCartItemById: async (id) => {
    const query = `SELECT * FROM cart_items WHERE id = :id`;
    const [result] = await sequelize.query(query, { replacements: { id } });
    return result[0];// Trả về bản ghi nếu tìm thấy
  },

  createCartItem: async (data) => {
    const query = `INSERT INTO cart_items (cart_id, product_id, quantity)
                   VALUES (:cart_id, :product_id, :quantity)`;
    const [result] = await sequelize.query(query, { replacements: data });
    return result;
  },

  deleteCartItem: async (id) => {
    const query = `DELETE FROM cartitem WHERE id = :id`; // Xóa cứng mục
    const [result] = await sequelize.query(query, { replacements: { id } });
    return result;
  },

  updateCartItem: async (id, data) => {
    const query = `UPDATE cart_items 
                   SET quantity = :quantity 
                   WHERE id = :id`;
    const [result] = await sequelize.query(query, { replacements: { ...data, id } });
    return result;
  },

  clearCartItemsAfterOrder: async (cartId) => {
    const query = `UPDATE cart_items SET flag = true WHERE cart_id = :cartId`;
    return await sequelize.query(query, { replacements: { cartId } });
  }
};

module.exports = cartItemRepository;
