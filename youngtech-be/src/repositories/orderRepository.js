const sequelize = require("../configs/db");

const orderRepository = {
  getAllOrder: async ({ offset, limit }) => {
    const query = `SELECT * FROM \`order\` LIMIT :limit OFFSET :offset`;
    const [result] = await sequelize.query(query, { replacements: { limit, offset } });
  
    // Để hỗ trợ tính toán tổng số đơn hàng, bạn có thể làm như sau:
    const countQuery = `SELECT COUNT(*) AS totalItems FROM \`order\``;
    const [countResult] = await sequelize.query(countQuery);
    const totalItems = countResult[0].totalItems;
  
    return { data: result, totalItems };
  },
  
  getOrderById: async (id) => {
    const query = `SELECT * FROM \`order\` WHERE id = :id`;
    const [result] = await sequelize.query(query, { replacements: { id } });
    return result[0];
  },
  createOrder: async (data) => {
    console.log(`Repository ${JSON.stringify(data)}`);
    
    // Kiểm tra nếu flag không có trong data thì mặc định flag là false
    const { orderDate, succesDate, totalAmount, status, customer_id } = data;
    const flag = data.flag !== undefined ? data.flag : false;  // Mặc định flag là false

    const query = `INSERT INTO \`order\` (flag, orderDate, succesDate, totalAmount, status, customer_id)
                   VALUES (:flag, :orderDate, :succesDate, :totalAmount, :status, :customer_id)`;
    const [result] = await sequelize.query(query, { 
        replacements: { flag, orderDate, succesDate, totalAmount, status, customer_id }
    });
    return result;
},
updateOrder: async (id, data) => {
  const query = `UPDATE \`order\`
                 SET orderDate = :orderDate, succesDate = :succesDate, totalAmount = :totalAmount, status = :status, customer_id = :customer_id
                 WHERE id = :id`;
  const [result] = await sequelize.query(query, { replacements: { ...data, id } });
  return result;
},

  deleteOrder: async (id) => {
    const query = `UPDATE \`order\` SET flag = true WHERE id = :id`;
    const [result] = await sequelize.query(query, { replacements: {id} });
    return result;
  },
  restoreOrder: async (id)=>{
    const query = `UPDATE \`order\` SET flag = false WHERE id = :id`; // Khôi phục xóa mềm
    const [result] = await sequelize.query(query, { replacements: { id } });
    return result;
  },


};

module.exports = orderRepository;
