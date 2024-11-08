const userRepository = require('../repositories/userRepository');
const userService = {
  // viewInformationPersonal
  viewInformationPersonal: async (userId) => {
    return await userRepository.viewInformationPersonal(userId);
  },

  // check user exist

  checkUserExist: async (userId) => {
    return await userRepository.checkUserExist(userId);
  },

  // enter information personal

  enterInformation: async (fullName, phoneNumber, address, userId) => {
    return await userRepository.enterInformation(
      fullName,
      phoneNumber,
      address,
      userId
    );
  },

  //checkUserIdChangePassWord

  checkUserIdChangePassWord: async (userId) => {
    return await userRepository.checkUserIdChangePassWord(userId);
  },

  // update password by id user

  updateNewPassword: async (hashNewPassword, userId) => {
    return await userRepository.updateNewPassword(hashNewPassword, userId);
  },
};

module.exports = userService;
