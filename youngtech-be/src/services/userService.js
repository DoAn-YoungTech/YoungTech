const userRepository = require("../repositories/userRepository");
const userService = {
  // GET ALL USER 
    
  getAllUser: async () => {
    return await userRepository.getAllUser();
  },

  // DELETE USER BY ID 
  deleteUserById: async (id) => {
    return await userRepository.deleteUserById(id);
  },
};

module.exports = userService;
