const cartItemService = require('../services/cartItemServices');

const CartItemController = {
  getAllCartItem: async (req, res) => {
    try {
      const result = await cartItemService.getAllCartItem();
      res.status(200).json({ message: "All cart items", data: result });
    } catch (err) {
      res.status(500).json({ message: "Error retrieving cart items", error: err.message });
    }
  },

  getCartItemById: async (req, res) => {
    try {
      const id = req.params.id;
      const result = await cartItemService.getCartItemById(id);
      if (!result) {
        res.status(404).json({ message: "Cart item not found" });
      } else {
        res.status(200).json({ message: "Cart item retrieved", data: result });
      }
    } catch (err) {
      res.status(500).json({ message: "Error retrieving cart item", error: err.message });
    }
  },

  createCartItem: async (req, res) => {
    try {
      const data = req.body;
      const result = await cartItemService.createCartItem(data);
      res.status(201).json({ message: "Cart item created successfully", data: result });
    } catch (err) {
      res.status(500).json({ message: "Error creating cart item", error: err.message });
    }
  },

  deleteCartItem: async (req, res) => {
    try {
      const id = req.params.id;
      const result = await cartItemService.deleteCartItem(id); // Gọi service để thực hiện xóa mềm
      
      if (!result) {
        res.status(404).json({ message: "CartItem not found" });
      } else {
        res.status(200).json({ message: "CartItem marked as deleted successfully!" });
      }
    } catch (err) {
      res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
  },
  updateCartItem: async (req, res) => {
    try {
      const id = req.params.id;
      const data = req.body;
      const result = await cartItemService.updateCartItem(id, data);
      res.status(200).json({ message: "Cart item updated successfully", data: result });
    } catch (err) {
      res.status(500).json({ message: "Error updating cart item", error: err.message });
    }
  }
};
module.exports = CartItemController