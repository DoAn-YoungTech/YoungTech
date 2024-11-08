const customerService = require("../services/customerService");

const customerController = {
  getAllCustomers: async (req, res) => {
    try {
      const customers = await customerService.getAllCustomers();
      res.status(200).json(customers);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = customerController;
