
const customerRepository = require('../repositories/customerRepository');
const customerRoutes = require('../routes/customerRoutes');

const customerService = {
  getAllCustomers: async () => {
    return await customerRepository.getAllCustomers();
  },

    getCustomersById: async (id) => {
      return await customerRepository.getCustomersById(id);
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

  updateInfoMe: async (data, checkAccountExist) => {
    return await customerRepository.updateInfoMe(data, checkAccountExist);
  },

  // deleteCustomer(checkUserIdExist)
  deleteCustomer: async (checkUserIdExist) => {
    return await customerRepository.deleteCustomer(checkUserIdExist);
  },

  getOrderHistoryByCustomerId: async (customerId) => {
    return await customerRepository.getOrderHistoryByCustomerId(customerId);
  },

  // customerService.createCustomerOffline
  createCustomerOffline : async (data) => {
    return await customerRepository.createCustomerOffline(data)
  }


};

module.exports = customerService;
