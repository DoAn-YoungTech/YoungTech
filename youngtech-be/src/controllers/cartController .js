const cartService = require("../services/cartService");
const cartItemService = require("../services/cartItemServices");

const CartController = {
  getAllCart: async (req, res) => {
    try {
      const result = await cartService.getAllCart();
      res.status(200).json({ message: "All carts", data: result });
    } catch (err) {
      res.status(500).json({ message: "Error retrieving carts", error: err.message });
    }
  },

  getCartById: async (req, res) => {
    try {
        const id = req.params.id;
        const cart = await cartService.getCartById(id);
        
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        // Lấy tất cả các CartItem liên quan đến Cart này
        const cartItems = await cartItemService.getCartItemId(id);
        res.status(200).json({ message: "Cart retrieved", data: { cart, cartItems } });
    } catch (err) {
        res.status(500).json({ message: "Error retrieving cart", error: err.message });
    }
},

  createCart: async (req, res) => {
    try {
      const data = req.body;
      const result = await cartService.createCart(data);
      res.status(201).json({ message: "Cart created successfully", data: result });
    } catch (err) {
      res.status(500).json({ message: "Error creating cart", error: err.message });
    }
  },

  deleteCart: async (req, res) => {
    try {
      const id = req.params.id;
      const result = await cartService.deleteCart(id); // Gọi service để thực hiện xóa mềm
      
      if (!result) {
        res.status(404).json({ message: "Cart not found" });
      } else {
        res.status(200).json({ message: "Cart marked as deleted successfully!" });
      }
    } catch (err) {
      res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
  },

  updateCart: async (req, res) => {
    try {
      const id = req.params.id;
      const data = req.body;
      const result = await cartService.updateCart(id, data);
      res.status(200).json({ message: "Cart updated successfully", data: result });
    } catch (err) {
      res.status(500).json({ message: "Error updating cart", error: err.message });
    }
  }
};

module.exports = CartController;
