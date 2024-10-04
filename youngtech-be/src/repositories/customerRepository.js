const sequelize = require("../configs/db");

const customerRepository = {
    getAllCustomers: async () => {
        const query = `
      SELECT 
        c.fullName, 
        a.email, 
        c.phoneNumber, 
        c.address 
      FROM 
        Customer c 
      JOIN 
        Account a ON c.account_id = a.id
    `;

        const [results] = await sequelize.query(query);
        return results; // trả về danh sách khách hàng
    },
};

module.exports = customerRepository;
