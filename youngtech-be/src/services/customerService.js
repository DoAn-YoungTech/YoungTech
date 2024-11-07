const customerRepository = require("../repositories/customerRepository");

const customerService = {
  getAllCustomers: async () => {
    return await customerRepository.getAllCustomers();
  }
};

module.exports = customerService;
