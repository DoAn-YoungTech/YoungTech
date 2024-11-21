import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Định nghĩa kiểu dữ liệu cho CartItem
interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

// Định nghĩa kiểu dữ liệu cho CartState
interface CartState {
  cartItems: CartItem[];
}

const initialState: CartState = {
  cartItems: [],
};

// Slice để quản lý giỏ hàng
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Thêm sản phẩm vào giỏ hàng
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const itemIndex = state.cartItems.findIndex(item => item.id === action.payload.id);
      if (itemIndex >= 0) {
        // Nếu sản phẩm đã có trong giỏ hàng, tăng số lượng
        state.cartItems[itemIndex].quantity += action.payload.quantity;
      } else {
        // Nếu sản phẩm chưa có trong giỏ hàng, thêm vào giỏ hàng
        state.cartItems.push(action.payload);
      }
    },

    // Xóa sản phẩm khỏi giỏ hàng theo ID
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
    },

    // Cập nhật số lượng sản phẩm trong giỏ hàng
    updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const item = state.cartItems.find(item => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },

    // Xóa tất cả sản phẩm trong giỏ hàng
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

// Các action và reducer
export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
