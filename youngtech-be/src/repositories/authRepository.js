const sequelize = require("../configs/db");

const authRepository = {
  register: async (userName, email, hashPassword) => {
    const query = `INSERT INTO account (userName , email , password) VALUES (:userName , :email , :password)`;
    await sequelize.query(query, {
      replacements: { userName, email, password: hashPassword }
    });
    const [result] = await sequelize.query(`SELECT LAST_INSERT_ID() as id`);
    const accountId = result[0].id;
    return accountId;
  },

  findUserByEmail: async (email) => {
    const query = `SELECT * FROM account WHERE email = :email`;
    const [result] = await sequelize.query(query, {
      replacements: { email }
    });
    return result[0];
  },

  assignRolesToAccount: async (roleIds, account) => {
    const values = roleIds
      .map((roleId) => `(${roleId}, ${account})`)
      .join(", ");
    const query = `INSERT INTO roleaccount (role_id , account_id) VALUES ${values}`;
    const [result] = await sequelize.query(query);
    return result;
  },

  saveRefreshToken: async (userId, refreshToken) => {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const query = `INSERT INTO refreshtoken (user_id, refresh_token, expires_at) VALUES (:user_id, :refresh_token, :expires_at)`;
    const data = {
      user_id: userId,
      refresh_token: refreshToken,
      expires_at: expiresAt
    };
    const [result] = await sequelize.query(query, { replacements: data });
    return result;
  },

  checkRefreshTokenExist: async (refreshToken) => {
    const query = `SELECT * FROM refreshtoken WHERE refresh_token = :refresh_token`;
    const [result] = await sequelize.query(query, {
      replacements: { refresh_token: refreshToken }
    });
    return result[0];
  },

  deleteRefreshTokenOld: async (refreshToken) => {
    const query = `DELETE FROM refreshtoken WHERE refresh_token = :refresh_token`;
    const [result] = await sequelize.query(query, {
      replacements: { refresh_token: refreshToken }
    });
    return result;
  },

  saveNewRefreshToken: async (userId, newRefreshToken) => {
    const newExpires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const query = `INSERT INTO refreshtoken (user_id, refresh_token, expires_at) VALUES (:user_id, :refresh_token, :expires_at)`;
    const data = {
      user_id: userId,
      refresh_token: newRefreshToken,
      expires_at: newExpires
    };
    const [result] = await sequelize.query(query, { replacements: data });
    return result;
  },

  checkRefreshToken: async (refreshToken) => {
    const query = `SELECT * FROM refreshtoken WHERE refresh_token = :refresh_token`;

    const [result] = await sequelize.query(query, {
      replacements: { refresh_token: refreshToken }
    });
    return result[0];
  },

  deleteRefreshTokenLogout: async (refreshToken) => {
    const query = `DELETE FROM refreshtoken WHERE refresh_token = :refresh_token`;
    const [result] = await sequelize.query(query, {
      replacements: { refresh_token: refreshToken }
    });
    return result;
  }
};

module.exports = authRepository;
