import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../Store';
import { addToCart, clearCart, removeFromCart, updateQuantity } from './cartSlice';
const Api_url = process.env.NEXT_PUBLIC_API_URL
const API_URL_Cart = `${Api_url}/cart`;

// Thunk để lấy giỏ hàng từ API (Giả sử bạn có API để lấy giỏ hàng)
export const fetchCartItems = createAsyncThunk(
  'cart/fetchCartItems',
  async (userId: string) => {
    const response = await axios.get(`${API_URL_Cart}/viewCart/${userId}`);
    return response.data; // Dữ liệu giỏ hàng trả về từ API
  }
);

// Thunk để thêm sản phẩm vào giỏ hàng từ API
export const addToCartThunk = createAsyncThunk(
  'cart/addToCart',
  async (cartItem, { dispatch }) => {
    const response = await axios.post(`${API_URL_Cart}/addProductToCart`,cartItem);  // Gọi API thêm sản phẩm vào giỏ hàng
    dispatch(addToCart(response.data)); // Sau khi thêm, cập nhật trạng thái giỏ hàng trong Redux
  }
);

// Thunk để cập nhật sản phẩm trong giỏ hàng
export const updateCartItemQuantity = createAsyncThunk(
  'cart/updateCartItemQuantity',
  async (updatedItem: { id: number; quantity: number }, { dispatch }) => {
    const response = await axios.put(`/api/cart/update/${updatedItem.id}`, updatedItem);
    dispatch(updateQuantity({ id: updatedItem.id, quantity: updatedItem.quantity }));
  }
);

// Thunk để xóa sản phẩm khỏi giỏ hàng
export const removeCartItem = createAsyncThunk(
  'cart/removeCartItem',
  async (id: number, { dispatch }) => {
    await axios.delete(`/api/cart/remove/${id}`);  // Gọi API xóa sản phẩm
    dispatch(removeFromCart(id));  // Cập nhật trạng thái giỏ hàng trong Redux
  }
);

// Thunk để xóa toàn bộ giỏ hàng
export const clearCartThunk = createAsyncThunk(
  'cart/clearCart',
  async (_, { dispatch }) => {
    await axios.delete('/api/cart/clear');  // Gọi API xóa toàn bộ giỏ hàng
    dispatch(clearCart());  // Cập nhật trạng thái giỏ hàng trong Redux
  }
);
