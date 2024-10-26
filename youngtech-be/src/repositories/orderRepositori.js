const sequelize = require("../configs/db");

const orderRepository = {
  getAllOrder: async () => {
    const query = `SELECT * FROM \`order\``;
    const [result] = await sequelize.query(query);
    return result;
  },

  getOrderById: async (id) => {
    const query = `SELECT * FROM \`order\` WHERE id = :id`;
    const [result] = await sequelize.query(query, { replacements: { id } });

    // Lấy các chi tiết đơn hàng từ bảng orderDetail dựa trên order_id
    const orderDetailQuery = `SELECT * FROM \`orderDetail\` WHERE order_id = :id`;
    const [orderDetails] = await sequelize.query(orderDetailQuery, { replacements: { id } });

    // Kết hợp kết quả đơn hàng và chi tiết đơn hàng
    return {
      ...result[0],
      orderDetails
    };
  },

  createOrder: async (data, orderDetails) => {
    // Tạo đơn hàng
    const query = `INSERT INTO \`order\` (orderDate, totalAmount, status, customer_id)
                   VALUES (:orderDate, :totalAmount, :status, :customer_id)`;
    const [result] = await sequelize.query(query, { replacements: data });
    const orderId = result.insertId; // Lấy id đơn hàng vừa tạo

    // Tạo các chi tiết đơn hàng
    const orderDetailQuery = `INSERT INTO \`orderDetail\` (order_id, product_id, quantity, price)
                              VALUES (:order_id, :product_id, :quantity, :price)`;
    for (const detail of orderDetails) {
      await sequelize.query(orderDetailQuery, { replacements: { ...detail, order_id: orderId } });
    }

    return { orderId, orderDetails };
  },

  deleteOrder: async (id, data) => {
    const query = `UPDATE \`order\` SET is_deleted = true WHERE id = :id`;
    const [result] = await sequelize.query(query, { replacements: { ...data, id } });

    // Xóa mềm chi tiết đơn hàng tương ứng
    const orderDetailQuery = `UPDATE \`orderDetail\` SET is_deleted = true WHERE order_id = :id`;
    await sequelize.query(orderDetailQuery, { replacements: { id } });

    return result;
  },

  updateOrder: async (id, data, orderDetails) => {
    // Cập nhật đơn hàng
    const query = `UPDATE \`order\` 
                   SET orderDate = :orderDate, totalAmount = :totalAmount, status = :status, customer_id = :customer_id 
                   WHERE id = :id`;
    const [result] = await sequelize.query(query, { replacements: { ...data, id } });

    // Xóa chi tiết đơn hàng cũ
    const deleteOrderDetailQuery = `DELETE FROM \`orderDetail\` WHERE order_id = :id`;
    await sequelize.query(deleteOrderDetailQuery, { replacements: { id } });

    // Thêm chi tiết đơn hàng mới
    const insertOrderDetailQuery = `INSERT INTO \`orderDetail\` (order_id, product_id, quantity, price)
                                    VALUES (:order_id, :product_id, :quantity, :price)`;
    for (const detail of orderDetails) {
      await sequelize.query(insertOrderDetailQuery, { replacements: { ...detail, order_id: id } });
    }

    return { result, orderDetails };
  },

  completeOrder: async (id, invoiceData) => {
    const query = `UPDATE \`order\` SET is_completed = true WHERE id = :id`; // Đánh dấu đơn hàng là đã hoàn thành
    await sequelize.query(query, { replacements: { id } });

    // Chèn hóa đơn vào bảng hóa đơn
    const invoiceQuery = `INSERT INTO outinvoice (invoiceDate, totalAmount, status, customer_id, order_id)
                          VALUES (:invoiceDate, :totalAmount, :status, :customer_id, :order_id)`;
    await sequelize.query(invoiceQuery, { replacements: invoiceData });
  }
};

module.exports = orderRepository;
