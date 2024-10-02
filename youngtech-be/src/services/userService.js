const userRepository = require("../repositories/userRepository");

const userService = {
  // Tạo user
  createUser: async (userData) => {
    return await userRepository.createUser(userData);
  },

  // Lấy tất cả users
  getAllUsers: async () => {
    return await userRepository.getAllUsers();
  },

  // Lấy user theo ID
  getUserById: async (id) => {
    const user = await userRepository.getUserById(id);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  },

  // Cập nhật user theo ID
  updateUser: async (id, userData) => {
    const user = await userRepository.updateUser(id, userData);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  },

  // Xóa user theo ID
  deleteUser: async (id) => {
    const user = await userRepository.deleteUser(id);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  },
};

module.exports = userService;
