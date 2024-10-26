const sequelize = require("../configs/db");

const cartItemRepository = {
  getAllCartItem: async () => {
    const query = `SELECT * FROM cartItem`; // Lấy tất cả các bản ghi
    const [result] = await sequelize.query(query);
    return result;
  },

  getCartItemById: async (id) => {
    const query = `SELECT * FROM cartItem WHERE id = :id`; 
    const [result] = await sequelize.query(query,{replacements: {id}});
    return result[0];
  },

  createCartItem: async (data) => {
    console.log(data);
    const query = `INSERT INTO cartItem (quantity, price, cart_id, product_id)
                   VALUES (:quantity, :price, :cart_id, :product_id)`;
    const [result] = await sequelize.query(query, { replacements: data });
    return result;
  },

  deleteCartItem: async (id, data) => {
    const query = `UPDATE cartItem SET is_deleted = true WHERE id = :id`; // Áp dụng xóa mềm
    const [result] = await sequelize.query(query, {replacements:{...data,id}});
    return result;
  },

  updateCartItem: async (id, data) => {
    const query = `UPDATE cartItem 
                   SET quantity = :quantity, price = :price, cart_id = :cart_id, product_id = :product_id
                   WHERE id = :id`; 
    const [result] = await sequelize.query(query, { replacements: { ...data, id } });
    return result;
  }
};

module.exports = cartItemRepository;
