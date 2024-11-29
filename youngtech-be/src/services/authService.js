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
  // get getRoleId
  
  getRoleId: async (userId) => {
    return await authRepository.getRoleId(userId);
  },

  // getRoleName
  getRoleName: async (getRoleId) => {
    return await authRepository.getRoleName(getRoleId);
  },

  // checkEmailExist(email)
  checkEmailExist : async (email)=> {
    return await authRepository.checkEmailExist(email)
  },

  generateResetToken : async (account , hashToken , resetPasswordToken)=> {
    return await authRepository.generateResetToken(account , hashToken , resetPasswordToken)
  },

  validateResetToken : async (token) => {
    return await authRepository.validateResetToken(token)
  },

  // resetPassword(validateResetToken.id , hashPassword);
  resetPassword : async (id , hashPassword) => {
    return await authRepository.resetPassword(id , hashPassword);
  },

  clearResetToken : async (userId)=> {
    return await authRepository.clearResetToken(userId)
  }

 
 
};

module.exports = authService;
