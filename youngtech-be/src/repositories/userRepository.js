const sequelize = require('../configs/db');
const userRepository = {
  // viewInformationPersonal
  viewInformationPersonal: async (userId) => {
    const query = `SELECT * FROM customer WHERE account_id= :account_id`;
    const [result] = await sequelize.query(query, {
      replacements: { account_id: userId },
    });
    return result[0];
  },
  // check user exist
  checkUserExist: async (userId) => {
    const query = `SELECT * FROM customer WHERE account_id =:account_id`;
    const [result] = await sequelize.query(query, {
      replacements: { account_id: userId },
    });
    return result[0];
  },
  // enter information
  enterInformation: async (fullName, phoneNumber, address, userID) => {
    const data = {
      fullName: fullName,
      phoneNumber: phoneNumber,
      address: address,
    };

    const query = `UPDATE customer SET fullName = :fullName, phoneNumber = :phoneNumber, address = :address WHERE account_id = :account_id`;

    const [result] = await sequelize.query(query, {
      replacements: {
        ...data, // Spread the properties of data (fullName, phoneNumber, address)
        account_id: userID, // Make sure account_id is explicitly mapped to userID
      },
    });

    return result;
  },

  // checkUserIdChangePassWord
  checkUserIdChangePassWord: async (userId) => {
    const query = `SELECT password FROM account WHERE id=:id`;
    const [result] = await sequelize.query(query, {
      replacements: { id: userId },
    });
    return result[0].password;
  },

  // update password by id user
  updateNewPassword: async (hashNewPassword, userId) => {
    const query = `UPDATE account SET password=:password WHERE id=:id`;
    const [result] = await sequelize.query(query, {
      replacements: { password: hashNewPassword, id: userId },
    });
    return result;
  },
};

module.exports = userRepository;
