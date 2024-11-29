const sequelize = require('../configs/db');
const crypto = require('crypto');
const authRepository = {
  register: async (userName, email, hashPassword) => {
    try {
      const query = `INSERT INTO account (userName , email , password) VALUES (:userName , :email , :password)`;
      await sequelize.query(query, {
        replacements: { userName, email, password: hashPassword },
      });
      const [result] = await sequelize.query(`SELECT LAST_INSERT_ID() as id`);
      const accountId = result[0].id;
      return accountId;
    } catch (err) {
      console.log(err);
      throw new Error(err.message);
    }
  },

  findUserByEmail: async (email) => {
    const query = `SELECT * FROM account WHERE email = :email`;
    const [result] = await sequelize.query(query, {
      replacements: { email },
    });
    return result[0];
  },
  assignRolesToAccount: async (roleIds, account) => {
    const values = roleIds
      .map((roleId) => `(${roleId}, ${account})`)
      .join(', ');
    const query = `INSERT INTO roleaccount (role_id , account_id) VALUES ${values}`;
    const [result] = await sequelize.query(query);
    return result;
  },

  saveRefreshToken: async (userId, refreshToken) => {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const query = `INSERT INTO refreshtoken (account_id, refresh_token, expires_at) VALUES (:account_id, :refresh_token, :expires_at)`;
    const data = {
      account_id: userId,
      refresh_token: refreshToken,
      expires_at: expiresAt,
    };
    const [result] = await sequelize.query(query, { replacements: data });
    return result;
  },

  checkRefreshTokenExist: async (refreshToken) => {
    const query = `SELECT * FROM refreshtoken WHERE refresh_token = :refresh_token`;
    const [result] = await sequelize.query(query, {
      replacements: { refresh_token: refreshToken },
    });
    return result[0];
  },

  deleteRefreshTokenOld: async (refreshToken) => {
    const query = `DELETE FROM refreshtoken WHERE refresh_token = :refresh_token`;
    const [result] = await sequelize.query(query, {
      replacements: { refresh_token: refreshToken },
    });
    return result;
  },

  saveNewRefreshToken: async (userId, newRefreshToken) => {
    const newExpires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const query = `INSERT INTO refreshtoken (user_id, refresh_token, expires_at) VALUES (:user_id, :refresh_token, :expires_at)`;
    const data = {
      user_id: userId,
      refresh_token: newRefreshToken,
      expires_at: newExpires,
    };
    const [result] = await sequelize.query(query, { replacements: data });
    return result;
  },

  checkRefreshToken: async (refreshToken) => {
    const query = `SELECT * FROM refreshtoken WHERE refresh_token = :refresh_token`;

    const [result] = await sequelize.query(query, {
      replacements: { refresh_token: refreshToken },
    });
    return result[0];
  },

  deleteRefreshTokenLogout: async (refreshToken) => {
    const query = `DELETE FROM refreshtoken WHERE refresh_token = :refresh_token`;
    const [result] = await sequelize.query(query, {
      replacements: { refresh_token: refreshToken },
    });
    return result;
  },

  userIdCustomer: async (account) => {
    const query = `INSERT INTO customer (account_id) VALUES (:account_id)`;

    const [result] = await sequelize.query(query, {
      replacements: { account_id: account },
    });
    return result;
  },

  getRoleId: async (userId) => {
    const query = `SELECT role_id FROM roleaccount WHERE account_id=:account_id`;
    const [result] = await sequelize.query(query, {
      replacements: { account_id: userId },
    });
    return result[0].role_id;
  },

  getRoleName: async (getRoleId) => {
    const query = `SELECT roleName FROM role WHERE id=:id`;
    const [result] = await sequelize.query(query, {
      replacements: { id: getRoleId },
    });
    return result[0].roleName;
  },
  checkEmailExist: async (email) => {
    const query = `SELECT * FROM account WHERE email = :email`;
    const [result] = await sequelize.query(query, { replacements: { email } });
    return result[0];
  },

  // generateResetToken(account)
  generateResetToken: async (account, hashToken, resetPasswordToken) => {
    const query = `UPDATE account SET resetPasswordExpires = :resetPasswordExpires , resetPasswordToken = :resetPasswordToken WHERE id = :id`;
    const [result] = await sequelize.query(query, {
      replacements: {
        resetPasswordToken: hashToken,
        resetPasswordExpires: resetPasswordToken,
        id: account.id,
      },
    });
    return result;
  },

  // validateResetToken(token)
  validateResetToken: async (token) => {
    try {
      console.log(token);
      const hashToken = crypto.createHash('sha256').update(token).digest('hex');

      const query = `SELECT * FROM account WHERE resetPasswordToken = :resetPasswordToken `;
      const [result] = await sequelize.query(query, {
        replacements: {
          resetPasswordToken: hashToken,
        },
      });

      return result[0];
    } catch (err) {
      console.error(err);
      throw Error(err.message);
    }
  },

  resetPassword: async (id, hashPassword) => {
    const query = `UPDATE account SET password = :password WHERE id = :id `;
    const [result] = await sequelize.query(query, {
      replacements: { password: hashPassword, id: id },
    });
    return result;
  },
  clearResetToken: async (userId) => {
    try {
      const query = `UPDATE account SET resetPasswordToken = :resetPasswordToken , resetPasswordExpires = :resetPasswordExpires WHERE id = :id`;
      const [result] = await sequelize.query(query, {
        replacements: {
          resetPasswordToken: null,
          resetPasswordExpires: null,
          id: userId,
        },
      });
      return result;
    } catch (error) {
      console.error(error);
      throw Error(error.message);
    }
  },
};

module.exports = authRepository;
