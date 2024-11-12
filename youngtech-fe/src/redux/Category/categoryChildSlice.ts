// categoryChildSlice.ts
import { createSlice,PayloadAction } from '@reduxjs/toolkit';
import { fetchCategoriesChild, createCategoryChild, updateCategoryChild, deleteCategoryChild } from './categoryChildThunks';
import { CategoryChildState } from '@/types/CategoryTypes';
import Cookies from 'js-cookie';
const initialState: CategoryChildState = {
  data: [],
  loading: false,
  error: null,
  idCateChild: Cookies.get('idCateChild') || null,
};

const SliceCategoryChild = createSlice({
  name: 'categoriesChild',
  initialState,
  reducers: {
    setIdCateChild: (state, action: PayloadAction<number | null>) => {
      state.idCateChild = action.payload; // Cập nhật state
      if (action.payload) {
        Cookies.set('idCateChild', action.payload); // Lưu vào localStorage
      } else {
        Cookies.remove('idCateChild'); // Xóa nếu payload là null
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch danh mục con
      .addCase(fetchCategoriesChild.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategoriesChild.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCategoriesChild.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch child categories';
      })

      // Thêm danh mục con
      .addCase(createCategoryChild.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(createCategoryChild.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to create category';
      })

      // Cập nhật danh mục con
      .addCase(updateCategoryChild.fulfilled, (state, action) => {
        const index = state.data.findIndex(category => category.id === action.payload.id);
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(updateCategoryChild.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to update category';
      })

      // Xóa danh mục con
      .addCase(deleteCategoryChild.fulfilled, (state, action) => {
        state.data = state.data.filter(category => category.id !== action.payload);
      })
      .addCase(deleteCategoryChild.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to delete category';
      });
  },
});

export const { setIdCateChild } = SliceCategoryChild.actions;

export default SliceCategoryChild.reducer;
