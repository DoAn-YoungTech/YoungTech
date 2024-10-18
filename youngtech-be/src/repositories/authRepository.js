const sequelize = require("../configs/db");

const authRepository = {
  register: async (userName, email, hashPassword) => {
    const query = `INSERT INTO account (userName , email , password )
         VALUES (:userName , :email , :password) `;
    const [result] = await sequelize.query(query, {
      replacements: { userName, email, password: hashPassword },
    });
    return result;
  },
  findUserByEmail: async (email) => {
    const query = `SELECT * FROM account WHERE email = :email`;
    const [result] = await sequelize.query(query, {
      replacements: { email },
    });
    return result[0]; // return first array
  },
};
module.exports = authRepository;
