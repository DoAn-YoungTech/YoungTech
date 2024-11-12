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
    const query = `INSERT INTO cart (customer_id)
                   VALUES (:customer_id)`; // Chỉ chèn customer_id
    const [result] = await sequelize.query(query, { replacements: data });
    return { id: result.insertId }; // Trả về ID của giỏ hàng vừa tạo
  },

deleteCart: async (id) => {
  const query = `DELETE FROM cart WHERE id = :id`; // Câu lệnh xóa cứng
  const [result] = await sequelize.query(query, { replacements: { id } });
  return result;
},

  updateCart: async (id, data) => {
    const query = `UPDATE cart 
                   SET customer_id = :customer_id
                   WHERE id = :id`; // Cập nhật customer_id
    const [result] = await sequelize.query(query, { replacements: { ...data, id } });
    return result;
  },

  getCartItemsById: async (id) => { // Thêm phương thức mới này
    const query = `SELECT * FROM cart_items WHERE cart_id = :id`; // Giả sử bảng cart_items chứa cart_id
    const [result] = await sequelize.query(query, { replacements: { id } });
    return result;
  }
};

module.exports = cartRepository;
