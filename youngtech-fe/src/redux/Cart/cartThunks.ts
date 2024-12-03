// cartThunks.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getSession } from 'next-auth/react';

const Api_url = process.env.NEXT_PUBLIC_API_URL;
const API_URL_Cart = `${Api_url}/cart`;

// Thunk để lấy giỏ hàng từ API
export const fetchCartItems = createAsyncThunk(
  'cart/fetchCartItems',
  async () => {
    const session = await getSession();
    const response = await axios.get(`${API_URL_Cart}/viewCart`, {
      headers: {
        Authorization: ` ${session?.accessToken}`, // Gửi token trong header
      },
    });
    return response.data.data; // Dữ liệu giỏ hàng trả về từ API
  }
);


// Thunk để thêm sản phẩm vào giỏ hàng từ API
export const addToCartThunk = createAsyncThunk(
  'cart/addToCart',
  async (cartItem: CartItem) => {
    const session = await getSession();
    const response = await axios.post(`${API_URL_Cart}/addProductToCart`, cartItem, {
        headers: {
          Authorization: ` ${session?.accessToken}`, // Gửi token trong header
        },
      });
    return response.data; // Dữ liệu sản phẩm sau khi được thêm vào giỏ hàng
  }
);

// Thunk để cập nhật sản phẩm trong giỏ hàng
export const updateCartItemQuantity = createAsyncThunk(
  'cart/updateCartItemQuantity',
  async (updatedItem:any) => {
    const session = await getSession();
    const response = await axios.put(`${API_URL_Cart}/editCart`, updatedItem,{
      headers: {
        Authorization: ` ${session?.accessToken}`, // Gửi token trong header
      },
    });
    return {
      product_id: updatedItem.product_id,  // Lấy product_id từ updatedItem
      quantity: updatedItem.quantity,      // Lấy quantity từ updatedItem
    };
  }
);

// Thunk để xóa sản phẩm khỏi giỏ hàng
export const removeCartItem = createAsyncThunk(
  'cart/removeCartItem',
  async (id: number) => {
    const session = await getSession();
    await axios.delete(`${API_URL_Cart}/removeProductId/${id}`,{
       headers: {
      Authorization: ` ${session?.accessToken}`, // Gửi token trong header
    }
  }
  
  );
    return id; 
  }
);

// Thunk để xóa toàn bộ giỏ hàng
export const clearCartThunk = createAsyncThunk(
  'cart/clearCart',
  async () => {
    await axios.delete('/api/cart/clear');
    return []; // Trả về mảng rỗng khi giỏ hàng đã được xóa
  }
);
