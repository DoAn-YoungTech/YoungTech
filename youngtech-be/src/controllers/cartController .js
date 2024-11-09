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
      const result = await cartService.deleteCart(id); // Gọi service để thực hiện xóa cứng
      
      if (!result) {
        res.status(404).json({ message: "Cart not found" });
      } else {
        res.status(200).json({ message: "Cart deleted successfully!" });
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
  },

  placeOrder: async (req, res) => {  // Thêm hàm mới này
    try {
      const id = req.params.id;
      const result = await cartService.placeOrder(id); // Gọi service để chuyển giỏ hàng thành đơn hàng
      
      if (!result) {
        res.status(404).json({ message: "Cart not found or empty" });
      } else {
        res.status(200).json({ message: "Order placed successfully", data: result });
      }
    } catch (err) {
      res.status(500).json({ message: "Error placing order", error: err.message });
    }
  },
 // Chuyển đổi giỏ hàng thành đơn hàng
 checkoutCart: async (req, res) => {
  try {
    const id = req.params.id;

    // Giả định rằng các mục trong giỏ hàng sẽ được lấy từ một nơi khác (như một request body hoặc từ một dịch vụ)
    const items = req.body.items; // Dữ liệu items có thể được gửi từ client

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No items provided for the order" });
    }

    const orderData = {
      customer_id: req.body.customer_id,
      items: items, // Sử dụng dữ liệu đã được gửi từ client
    };

    const order = await orderService.createOrder(orderData); // Gọi dịch vụ để tạo đơn hàng
    res.status(201).json({ message: "Order created successfully", data: order });
  } catch (err) {
    res.status(500).json({ message: "Error creating order", error: err.message });
  }
}
};

module.exports = CartController;
