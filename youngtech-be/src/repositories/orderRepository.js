const sequelize = require("../configs/db");

const orderRepository = {
  // Bán hàng
  // tạo thông tin khách hàng hoặc kiểm tra khách hàng cũ
  // Tìm khách hàng theo số điện thoại
  findCustomerByPhoneNumber: async (phoneNumber) => {
    const query = `SELECT * FROM customer WHERE phoneNumber = :phoneNumber AND flag = false`;
    const [result] = await sequelize.query(query, { replacements: { phoneNumber } });
    return result[0]; // Trả về khách hàng đầu tiên nếu tìm thấy, hoặc `undefined` nếu không có
  },

  // Thêm mới khách hàng nếu không tồn tại
  addCustomerForOrder: async (data) => {
    const query = `
      INSERT INTO customer (flag, fullName, phoneNumber, address, account_id)
      VALUES (false, :fullName, :phoneNumber, :address, NULL)
    `;
    const [result] = await sequelize.query(query, {
      replacements: { fullName: data.fullName, phoneNumber: data.phoneNumber, address: data.address },
    });

    // Trả về thông tin khách hàng vừa thêm
    const customerId = result.insertId;
    const newCustomerQuery = `SELECT * FROM customers WHERE id = :customerId`;
    const [newCustomer] = await sequelize.query(newCustomerQuery, { replacements: { customerId } });
    return newCustomer[0];
  },

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
    const [result] = await sequelize.query(query, { replacements: { id } });
    return result;
  },

  restoreOrder: async (id) => {
    const query = `UPDATE \`order\` SET flag = false WHERE id = :id`; // Khôi phục xóa mềm
    const [result] = await sequelize.query(query, { replacements: { id } });
    return result;
  },
};

module.exports = orderRepository;
