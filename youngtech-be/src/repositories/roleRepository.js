const sequelize = require("../configs/db");

const roleRepository = {
  createRole: async (role) => {
    const query = `INSERT INTO role (id , roleName) 
         VALUES (:id , :roleName) `;
    const [result] = await sequelize.query(query, { replacements: role });
    return result;
  },
  getAllRole: async () => {
    const query = `SELECT * FROM role`;
    const [result] = await sequelize.query(query);
    return result;
  }
};

module.exports = roleRepository;
