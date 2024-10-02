const sequelize = require("../configs/db");

const userRepository = {
  // Tạo user mới
  createUser: async (userData) => {
    const { name, email, password, address } = userData;
    const query = `INSERT INTO users (name, email, password, address) VALUES (?, ?, ?, ?)`;
    const values = [name, email, password, address];
    const [result] = await sequelize.query(query, { replacements: values });
    return result;
  },

  // Lấy tất cả users
  getAllUsers: async () => {
    const query = `SELECT * FROM users`;
    const [results] = await sequelize.query(query);
    return results;
  },

  // Lấy user theo ID
  getUserById: async (id) => {
    const query = `SELECT * FROM users WHERE id = ?`;
    const [results] = await sequelize.query(query, { replacements: [id] });
    return results[0]; // Chỉ trả về user đầu tiên
  },

  // Cập nhật user theo ID
  updateUser: async (id, userData) => {
    const { name, email, password, address } = userData;
    const query = `UPDATE users SET name = ?, email = ?, password = ?, address = ? WHERE id = ?`;
    const values = [name, email, password, address, id];
    const [result] = await sequelize.query(query, { replacements: values });
    return result;
  },

  // Xóa user theo ID
  deleteUser: async (id) => {
    const query = `DELETE FROM users WHERE id = ?`;
    const [result] = await sequelize.query(query, { replacements: [id] });
    return result;
  },
};

module.exports = userRepository;
