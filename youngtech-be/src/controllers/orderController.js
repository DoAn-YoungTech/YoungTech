const orderService = require('../services/orderService');

const OrderController = {
  // bán hàng
  addCustomerForOrder: async (req, res) => {
    try {
      const { fullName, phoneNumber, address } = req.body;

      // Kiểm tra dữ liệu đầu vào
      if (!phoneNumber) {
        return res.status(400).json({ message: 'Số điện thoại là bắt buộc.' });
      }

      // Gọi Service để xử lý logic
      const customer = await orderService.addCustomerForOrder({ fullName, phoneNumber, address });

      // Phản hồi kết quả
      return res.status(200).json({
        message: customer.created ? 'Thêm khách hàng thành công.' : 'Khách hàng đã tồn tại.',
        data: customer,
      });
    } catch (error) {
      console.error('Lỗi khi xử lý khách hàng:', error);
      return res.status(500).json({ message: 'Đã xảy ra lỗi.', error: error.message });
    }
  },


  getAllOrder: async (req, res) => {
    try {
      // Lấy tham số phân trang từ query (mặc định là page 1 và limit 10)
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 2;

      // Tính toán offset dựa trên page và limit
      const offset = (page - 1) * limit;

      // Gọi service để lấy danh sách đơn hàng với phân trang
      const result = await orderService.getAllOrder({ offset, limit });

      if (!result || result.data.length === 0) {
        return res.status(404).json({ message: 'No orders found' });
      }

      // Trả về kết quả phân trang
      res.json({
        message: 'All orders',
        data: result.data,
        pagination: {
          page,
          limit,
          totalItems: result.totalItems,
          totalPages: Math.ceil(result.totalItems / limit),
        },
      });
    } catch (err) {
      res.status(500).json({ message: 'Invalid order', error: err.message });
    }
  },

  getOrderById: async (req, res) => {
    try {
      const id = req.params.id;
      const result = await orderService.getOrderById(id);
      if (!result) {
        return res.status(404).json({ message: 'Order not found' });
      } else {
        res.status(200).json({ message: 'Success', data: result });
      }
    } catch (err) {
      res
        .status(500)
        .json({ message: 'Error retrieving order', error: err.message });
    }
  },

  createOrder: async (req, res) => {
    try {
      const data = req.body;
      const result = await orderService.createOrder(data);
      if (!result) {
        res.status(400).json({ message: 'Create order failed!' });
      } else {
        res
          .status(201)
          .json({ message: 'Order created successfully!', data: result });
      }
    } catch (err) {
      res
        .status(500)
        .json({ message: 'Internal Server Error', error: err.message });
    }
  },

  updateOrder: async (req, res) => {
    try {
      const id = req.params.id;
      const data = req.body;
      const result = await orderService.updateOrder(id, data);
      if (!result) {
        res.status(404).json({ message: ' Order not found for update' });
      } else {
        res.status(200).json({ message: 'Update successful', data: result });
      }
    } catch (err) {
      res
        .status(500)
        .json({ message: 'Internal Server Error', error: err.message });
    }
  },

  deleteOrder: async (req, res) => {
    try {
      const id = req.params.id;
      const result = await orderService.deleteOrder(id, { flag: true });
      if (!result) {
        res.status(404).json({ message: 'Order not found' });
      } else {
        res.status(200).json({ message: 'Order soft deleted successfully' });
      }
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  },
  restoreOrder: async (req, res) => {
    try {
      const id = req.params.id;

      // Gọi service để khôi phục lại đơn hàng
      const result = await orderService.restoreOrder(id);

      if (!result) {
        res
          .status(404)
          .json({ message: 'Order not found or already restored' });
      } else {
        res.status(200).json({ message: 'Order restored successfully!' });
      }
    } catch (err) {
      res
        .status(500)
        .json({ message: 'Internal Server Error', error: err.message });
    }
  },
  
  viewOrder : async (req, res) => {
    try {
       // 
    } catch (error) {
      res.status(500).json({message : error})
    }
  }
};

module.exports = OrderController;
