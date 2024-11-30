const sequelize = require('../configs/db');

const orderRepository = {
 

  getOrderById: async (id) => {
    const query = `SELECT * FROM \`order\` WHERE id = :id`;
    const [result] = await sequelize.query(query, { replacements: { id } });
    return result[0];
  },

  createOrder: async (orderData) => {
    const query = `
      INSERT INTO \`Order\` (flag, orderDate, succesDate, totalAmount, status, paymentMethod, customer_id)
      VALUES (:flag, :orderDate, :succesDate, :totalAmount, :status, :paymentMethod, :customer_id)
    `;

    const [result] = await sequelize.query(query, {
      replacements: {
        flag: orderData.flag,
        orderDate: orderData.orderDate,
        succesDate: orderData.succesDate,
        totalAmount: orderData.totalAmount,
        status: orderData.status,
        paymentMethod: orderData.paymentMethod,
        customer_id: orderData.customer_id,
      },
    });

    // Dùng query để lấy ID vừa thêm
    const [orderIdResult] = await sequelize.query('SELECT LAST_INSERT_ID() AS id');
    return orderIdResult[0]?.id; // Trả về ID vừa tạo
  },


  updateOrder: async (id, data) => {
    const query = `UPDATE \`order\`
                 SET orderDate = :orderDate, succesDate = :succesDate, totalAmount = :totalAmount, status = :status, customer_id = :customer_id
                 WHERE id = :id`;
    const [result] = await sequelize.query(query, {
      replacements: { ...data, id },
    });
    return result;
  },

  deleteOrder: async (id) => {
    const query = `UPDATE \`order\` SET flag = true WHERE id = :id`;
    const [result] = await sequelize.query(query, { replacements: { id } });
    return result;
  },
  restoreOrder: async (id) => {
    const query = `UPDATE \`order\` SET flag = false WHERE id = :id`; // Khôi phục xóa mềm
    const [result] = await sequelize.query(query, { replacements: { id } });
    return result;
  },

  // view order 

  viewOrder : async (req, res) => {
    
  }
  
 
};


module.exports = orderRepository;
