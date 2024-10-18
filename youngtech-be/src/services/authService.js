const authRepository = require("../repositories/authRepository");
const authService = {
  register: async (userName, email, hashPassword) => {
    return await authRepository.register(userName, email, hashPassword);
  },
  findUserByEmail: async (email) => {
    return await authRepository.findUserByEmail(email);
  },
};

module.exports = authService;
