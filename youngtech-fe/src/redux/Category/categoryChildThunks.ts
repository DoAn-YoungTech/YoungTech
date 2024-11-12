// categoryChildThunks.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Category_Child } from '@/types/CategoryTypes';

const Api_url = process.env.NEXT_PUBLIC_API_URL
const API_URL_CHILD = `${Api_url}/category_chil`;

// Lấy danh sách danh mục con
export const fetchCategoriesChild = createAsyncThunk(
  'categories/fetchCategoriesChild',
  async () => {
    const response = await axios.get(API_URL_CHILD);
    return response.data;
  }
);

// Thêm danh mục con mới
export const createCategoryChild = createAsyncThunk(
  'categories/createCategoryChild',
  async (newCategory: Category_Child) => {
    const response = await axios.post(API_URL_CHILD, newCategory);
    return response.data;
  }
);

// Cập nhật danh mục con
export const updateCategoryChild = createAsyncThunk(
  'categories/updateCategoryChild',
  async (category: Category_Child) => {
    const response = await axios.put(`${API_URL_CHILD}/${category.id}`, category);
    return response.data;
  }
);

// Xóa danh mục con
export const deleteCategoryChild = createAsyncThunk(
  'categories/deleteCategoryChild',
  async (id: number) => {
    await axios.delete(`${API_URL_CHILD}/${id}`);
    return id;
  }
);
