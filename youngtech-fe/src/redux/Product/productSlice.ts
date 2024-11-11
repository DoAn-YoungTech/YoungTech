// productSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import { ProductState } from '@/types/productTypes';
import { fetchProducts, createProduct, updateProduct, deleteProduct } from './productThunks';

const initialState: ProductState = {
  data: [],
  loading: false,
  error: null,
};

const SliceProduct = createSlice({
  name: 'Product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch products";
      })
      // Create Product
      .addCase(createProduct.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.error = action.error.message || "Failed to create product";
      })
      // Update Product
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.data.findIndex(product => product.id === action.payload.id);
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.error = action.error.message || "Failed to update product";
      })
      // Delete Product
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.data = state.data.filter(product => product.id !== action.payload);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.error = action.error.message || "Failed to delete product";
      });
  },
});

export default SliceProduct.reducer;
