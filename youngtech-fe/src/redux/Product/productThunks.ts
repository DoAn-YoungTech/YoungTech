// productThunks.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Product } from '@/types/productTypes';

const Api_url = process.env.NEXT_PUBLIC_API_URL;
const API_URL = `${Api_url}/products`;

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (limit?: number) => {
    const response = await axios.get(`${API_URL}${limit ? `?_limit=${limit}` : ''}`);
    return response.data;
  }
);

export const createProduct = createAsyncThunk(
  'products/createProduct',
  async (newProduct: Product) => {
    const response = await axios.post(API_URL, newProduct);
    return response.data;
  }
);

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async (product: Product) => {
    const response = await axios.put(`${API_URL}/${product.id}`, product);
    return response.data;
  }
);

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (id: number) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  }
);
