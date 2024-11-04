const sequelize = require("../configs/db");
const userRepository = {
  // GET ALL USER

  getAllUser: async () => {
    const query = `SELECT * FROM account`;
    const [result] = await sequelize.query(query);
    return result;
  },

  // DELETE USER BY ID
  deleteUserById: async (id) => {
    const query = `DELETE FROM account WHERE id=:id`;
    const [result] = await sequelize.query(query, {
      replacements: { id },
    });
    return result;
  },
};
module.exports = userRepository;
