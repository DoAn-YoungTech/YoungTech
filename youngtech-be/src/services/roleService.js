const roleRepository = require("../repositories/roleRepository");

const roleService = {
  createRole: async (role) => {
    return await roleRepository.createRole(role);
  },

  // get all role
  getAllRole: async () => {
    return await roleRepository.getAllRole();
  }
};

module.exports = roleService;
