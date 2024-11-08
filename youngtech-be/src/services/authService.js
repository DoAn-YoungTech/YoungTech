const authController = require('../controllers/authControllers');
const authRepository = require('../repositories/authRepository');
const authService = {
  register: async (userName, email, hashPassword) => {
    return await authRepository.register(userName, email, hashPassword);
  },

  findUserByEmail: async (email) => {
    return await authRepository.findUserByEmail(email);
  },

  assignRolesToAccount: async (roleIds, account) => {
    return await authRepository.assignRolesToAccount(roleIds, account);
  },

  saveRefreshToken: async (userId, refreshToken) => {
    return await authRepository.saveRefreshToken(userId, refreshToken);
  },

  checkRefreshTokenExist: async (refreshToken) => {
    return await authRepository.checkRefreshTokenExist(refreshToken);
  },

  saveNewRefreshToken: async (userId, newRefreshToken) => {
    return await authRepository.saveNewRefreshToken(userId, newRefreshToken);
  },

  deleteRefreshTokenOld: async (refreshToken) => {
    return await authRepository.deleteRefreshTokenOld(refreshToken);
  },

  checkRefreshToken: async (refreshToken) => {
    return await authRepository.checkRefreshToken(refreshToken);
  },

  deleteRefreshTokenLogout: async (refreshToken) => {
    return await authRepository.deleteRefreshTokenLogout(refreshToken);
  },

  userIdCustomer: async (account) => {
    return await authRepository.userIdCustomer(account);
  },
};

module.exports = authService;
