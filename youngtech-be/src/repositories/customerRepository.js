const sequelize = require('../configs/db');
const customerController = require('../controllers/customerController');
const customerRepository = {
  // all customer , only admin can viewing them

  getAllCustomers : async () => {
    try {
      // Viết native SQL query để JOIN Customer và Account
      const query = `
        SELECT
          c.id,
          c.fullName,
          c.phoneNumber,
          c.address,
          c.account_id,
          c.flag,
          a.email
        FROM
          Customer c
        LEFT JOIN
          Account a ON c.account_id = a.id
        WHERE
          c.flag = true
      `;
  
      // Thực thi truy vấn SQL
      const [results] = await sequelize.query(query);
  
      return results;
    } catch (error) {
      console.error('Error fetching customers:', error);
      throw error;
    }
  },
  
  // addInformationByAccount
  addInformationByAccount: async (data, accountId) => {
    try {
      const query = `UPDATE customer SET fullName = :fullName ,  phoneNumber = :phoneNumber , address =:address WHERE id = :id`;

      const [result] = await sequelize.query(query, {
        replacements: { ...data, id: accountId },
      });

      return result;
    } catch (err) {
      result.status(500).json({ message: err });
    }
  },

  updateInfoMe: async (data, checkAccountExist  ) => {
    console.log("data",data)
    try {
      const query = `UPDATE customer SET fullName = :fullName ,  phoneNumber = :phoneNumber  WHERE id = :id`;

      const [result] = await sequelize.query(query, {
        replacements: { ...data, id: checkAccountExist },
      });

      return result;
    } catch (err) {
      result.status(500).json({ message: err });
    }
  },

  


  //checkAccountExist(userId)
  checkAccountExist: async (userId) => {
    try {
      const query = `SELECT * FROM customer  WHERE id = :id AND flag = ${true}`;

      const [result] = await sequelize.query(query, {
        replacements: { id: userId },
      });

      return result[0].id;
    } catch (err) {
      result.status(500).json({ message: err });
    }
  },

    //checkAccountExist(userId)
    getCustomersById: async (id) => {
      try {
        const query = `SELECT * FROM customer  WHERE id = :id AND flag = ${true}`;
  
        const [result] = await sequelize.query(query, {
          replacements: { id: id },
        });
  
        return result.length > 0 ? result[0] : null;
      } catch (err) {
        result.status(500).json({ message: err });
      }
    },

  // editCustomer(checkUserIdExist)
  editCustomer: async (customerId, updateData) => {
    let query = `UPDATE customer SET `;
    const fields = [];
    const replacements = { customerId };

    // Add only the fields that are present in updateData
    if (updateData.fullName) {
      fields.push('fullName = :fullName');
      replacements.fullName = updateData.fullName;
    }
    if (updateData.phoneNumber) {
      fields.push('phoneNumber = :phoneNumber');
      replacements.phoneNumber = updateData.phoneNumber;
    }
    if (updateData.address) {
      fields.push('address = :address');
      replacements.address = updateData.address;
    }

    // Join fields with commas and add a space before WHERE
    query += fields.join(', ');
    query += ` WHERE id = :customerId`;

    const [result] = await sequelize.query(query, {
      replacements,
    });

    return result.affectedRows > 0;
  },

  // sort delete customer
  deleteCustomer: async (checkUserIdExist) => {
    const query = `UPDATE customer SET flag = ${false} WHERE id = :id`;
    const [result] = await sequelize.query(query, {
      replacements: { id: checkUserIdExist },
    });
    return result.affectedRows > 0;
  },

  getOrderHistoryByCustomerId: async (customerId) => {
    const query = `
      SELECT 
        o.id AS orderId,
        o.orderDate,
        o.succesDate,
        o.totalAmount,
        o.status,
        o.paymentMethod,
        c.id AS customerId,
        c.fullName AS customerName,
        c.phoneNumber AS customerPhone,
        c.address AS customerAddress
      FROM 
        \`Order\` o
      INNER JOIN 
        Customer c 
      ON 
        o.customer_id = c.id
      WHERE 
        c.id = :customerId
        AND c.flag = true
        AND o.flag = true
    `;

    const [results] = await sequelize.query(query, {
      replacements: { customerId },
    });

    return results; // Trả về danh sách kết quả
  },
  createCustomerOffline: async (data) => {
    try {
      const query = `INSERT INTO customer(fullName , phoneNumber , address , account_id) 
   VALUES (:fullName , :phoneNumber , :address , :account_id)`;
      const [result] = await sequelize.query(query, {
        replacements: { ...data },
      });

      const [lastInserted] = await sequelize.query("SELECT LAST_INSERT_ID() AS id");
      return lastInserted[0].id; // Trả về customer_id chp front end nhận được
 
    } catch (err) {
      console.log(err);
      throw Error(err.message);
    }
  },
};

module.exports = customerRepository;
