const userRepository = require("../repositories/userRepository");
const userService = {
  // GET ALL USER
  getAllUser: async () => {
    return await userRepository.getAllUser();
  },

  // GET USER BY ID
  getUserById: async (id) => {
    return await userRepository.getUserById(id);
  },

  // DELETE USER BY ID
  deleteUserById: async (id) => {
    return await userRepository.deleteUserById(id);
  },
  // viewInformationPersonal
  viewInformationPersonal: async (userId) => {
    return await userRepository.viewInformationPersonal(userId);
  }
};

module.exports = userService;
