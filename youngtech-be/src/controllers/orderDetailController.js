const orderDetailService = require("../services/orderDetailService");

const orderDetailController = {
  getAllOrderDetail: async (req, res) => {
    try {
      const result = await orderDetailService.getAllOrderDetail();
      res.json({ message: "All Order Details", data: result });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Invalid Order Details", error: err.message });
    }
  },

  getOrderDetailById: async (req, res) => {
    try {
      const id = req.params.id;
      const result = await orderDetailService.getOrderDetailById(id);
      if (!result) {
        res.status(404).json({ message: "Order detail not found" });
      } else {
        res.status(200).json({ message: "Success", data: result });
      }
    } catch (err) {
      res
        .status(500)
        .json({ message: "Invalid Order Detail", error: err.message });
    }
  },

  updateOrderDetail: async (req, res) => {
    try {
      const id = req.params.id;
      const data = req.body;
      const result = await orderDetailService.updateOrderDetail(id, data);
      if (!result) {
        res.status(404).json({ message: "Order detail not found for update" });
      } else {
        res.status(200).json({ message: "Order detail updated successfully", data: result });
      }
    } catch (err) {
      res.status(500).json({ message: "Invalid Order Detail", error: err.message });
    }
  },

  createOrderDetail: async (req, res) => {
    try {
      const data = req.body;
      const result = await orderDetailService.createOrderDetail(data);
      if (!result) {
        res.status(404).json({ message: "Order detail failed" });
      } else {
        res.status(200).json({ message: "Order detail created successfully", data: result });
      }
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  },

  deleteOrderDetail: async (req, res) => {
    try {
      const id = req.params.id;
      const result = await orderDetailService.updateOrderDetail(id, { is_deleted: true });
      if (!result) {
        res.status(404).json({ message: "Order detail not found for delete" });
      } else {
        res.status(200).json({ message: "Order detail deleted successfully" });
      }
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  },
};

module.exports = orderDetailController;
