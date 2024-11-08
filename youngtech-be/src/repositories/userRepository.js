const sequelize = require("../configs/db");
const userRepository = {
  // GET ALL USER

  getAllUser: async () => {
    const query = `SELECT * FROM account`;
    const [result] = await sequelize.query(query);
    return result;
  },

  // GET USER BY ID
  getUserById: async (id) => {
    const query = `SELECT * FROM account WHERE id=:id`;
    const [result] = await sequelize.query(query, { replacements: { id } });
    return result[0];
  },

  // DELETE USER BY ID
  deleteUserById: async (id) => {
    const query = `DELETE FROM account WHERE id=:id`;
    const [result] = await sequelize.query(query, {
      replacements: { id }
    });

    return result;
  }
  // viewInformationPersonal

  // viewInformationPersonal: async () => {
  //   const query = `SELECT * FROM account user `
  // }
};

module.exports = userRepository;
