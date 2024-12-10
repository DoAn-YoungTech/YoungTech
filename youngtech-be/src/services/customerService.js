const customerRepository = require('../repositories/customerRepository');

const customerService = {
  getAllCustomers: async () => {
    return await customerRepository.getAllCustomers();
  },

  // addInformationByAccount

  addInformationByAccount: async (data, accountId) => {
    return await customerRepository.addInformationByAccount(data, accountId);
  },

  //checkAccountExist(userId)

  checkAccountExist: async (userId) => {
    return await customerRepository.checkAccountExist(userId);
  },

  // editCustomer(checkUserIdExist)

  editCustomer: async (checkUserIdExist, updateData) => {
    return await customerRepository.editCustomer(checkUserIdExist, updateData);
  },

  // deleteCustomer(checkUserIdExist)
  deleteCustomer: async (checkUserIdExist) => {
    return await customerRepository.deleteCustomer(checkUserIdExist);
  },

  getOrderHistoryByCustomerId: async (customerId) => {
    return await customerRepository.getOrderHistoryByCustomerId(customerId);
  },
};

module.exports = customerService;
