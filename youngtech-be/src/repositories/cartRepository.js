const sequelize = require("../configs/db");

const cartRepository = {
  getAllCart: async () => {
    const query = `SELECT * FROM cart`; // Lấy tất cả các bản ghi, không phân biệt đã bị xóa mềm hay chưa
    const [result] = await sequelize.query(query);
    return result;
  },

  getCartById: async (id) => {
    const query = `SELECT * FROM cart WHERE id = :id`; 
    const [result] = await sequelize.query(query, { replacements: { id } });
    return result[0];
  },

  createCart: async (data) => {
    const query = `INSERT INTO cart (status, createAt, updateAt, customer_id)
                   VALUES (:status, :createAt, :updateAt, :customer_id)`;
    const [result] = await sequelize.query(query, { replacements: data });
    return result;
  },

  deleteCart: async (id) => {
    const query = `UPDATE cart SET is_deleted = true WHERE id = :id`; // Áp dụng xóa mềm
    const [result] = await sequelize.query(query, { replacements: { id } });
    return result;
  },

  updateCart: async (id, data) => {
    const query = `UPDATE cart 
                   SET status = :status, createAt = :createAt, updateAt = :updateAt, customer_id = :customer_id
                   WHERE id = :id`; // Cập nhật dữ liệu, không phân biệt đã bị xóa mềm hay chưa
    const [result] = await sequelize.query(query, { replacements: { ...data, id } });
    return result;
  }
};

module.exports = cartRepository;
