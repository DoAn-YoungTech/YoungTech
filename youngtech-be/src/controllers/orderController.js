const orderService = require("../services/orderService");
const orderDetailService = require("../services/orderDetailService"); // Thêm service orderDetail

const OrderController = {
  getAllOrder: async (req, res) => {
    try {
      const result = await orderService.getAllOrder();
      res.json({ message: "All orders", data: result });
    } catch (err) {
      res.status(500).json({ message: "Invalid order", error: err.message });
    }
  },

  getOrderById: async (req, res) => {
    try {
      const id = req.params.id;
      const order = await orderService.getOrderById(id);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      // Lấy chi tiết sản phẩm trong đơn hàng
      const orderDetails = await orderDetailService.getOrderDetailById(id);

      res.status(200).json({
        message: "Success",
        data: {order,orderDetails,}  // Trả về cả order và chi tiết order
      });
    } catch (err) {
      res.status(500).json({ message: "Invalid order", error: err.message });
    }
  },

  updateOrder: async (req, res) => {
    try {
      const id = req.params.id;
      const data = req.body;
      const result = await orderService.updateOrderById(id, data);
      if (!result) {
        res.status(404).json({ message: "Order not found for update" });
      } else {
        res.status(200).json({ message: "Order updated successfully", data: result });
      }
    } catch (err) {
      res.status(500).json({ message: "Invalid order", error: err.message });
    }
  },

  createOrder: async (req, res) => {
    try {
      const data = req.body;
      const orderData = data.order; // Dữ liệu đơn hàng
      const orderDetailsData = data.orderDetails; // Dữ liệu chi tiết đơn hàng

      const newOrder = await orderService.createOrder(orderData);
      if (!newOrder) {
        return res.status(400).json({ message: "Failed to create order" });
      }

      // Tạo các chi tiết sản phẩm trong đơn hàng
      for (let detail of orderDetailsData) {
        detail.order_id = newOrder.id; // Gán order_id cho từng chi tiết
        await orderDetailService.createOrderDetail(detail);
      }

      res.status(200).json({ message: "Order created successfully", data: newOrder });
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  },

  deleteOrder: async (req, res) => {
    try {
      const id = req.params.id;
      const result = await orderService.updateOrder(id, { is_deleted: true }); 
      if (!result) {
        res.status(404).json({ message: "Order not found" });
      } else {
        res.status(200).json({ message: "Order soft deleted successfully" });
      }
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  },

  completeOrder: async (req, res) => {
    try {
      const id = req.params.id;
      const result = await orderService.completeOrder(id);
      if (!result) {
        res.status(404).json({ message: "Order not found" });
      } else {
        res.status(200).json({ message: "Order marked as completed successfully" });
      }
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  },
};

module.exports = OrderController;
