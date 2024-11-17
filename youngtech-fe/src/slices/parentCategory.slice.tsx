import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "@/connect";

const API_URL_EMP = `${API_URL}/parentCategories`;

export interface ParentCategory {
    id?: number;          // Tùy chọn vì id có thể chưa được gán khi tạo mới
    flag: boolean;
    name: string;
}

interface ParentCategoryState {
    data: ParentCategory[];   // Danh sách ParentCategories
    loading: boolean;         // Trạng thái loading cho quá trình lấy dữ liệu
    error: string | null;     // Lưu trữ thông báo lỗi nếu có
}

const initialState: ParentCategoryState = {
    data: [],
    loading: false,
    error: null,
};

export const fetchParentCategories = createAsyncThunk(
    'parentCategories/fetch',
    async () => {
        const response = await axios.get(`${API_URL}/parent-categories`);
        return response.data;
    }
);

export const createParentCategory = createAsyncThunk(
    'parentCategories/create',
    async (parentCategory: ParentCategory) => {
        const response = await axios.post(`${API_URL}/parent-categories`, parentCategory);
        return response.data;
    }
);

export const updateParentCategory = createAsyncThunk(
    'parentCategories/update',
    async (parentCategory: ParentCategory) => {
        const response = await axios.put(`${API_URL}/parent-categories/${parentCategory.id}`, parentCategory);
        return response.data;
    }
);

export const deleteParentCategory = createAsyncThunk(
    'parentCategories/delete',
    async (id: number) => {
        await axios.delete(`${API_URL_EMP}/${id}`);
        return id;
    }
);
const parentCategorySlice = createSlice({
    name: "parentCategories",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchParentCategories.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchParentCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchParentCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? 'Không tìm thấy danh sách danh mục';
                console.error('Lỗi khi tải danh sách danh mục:', state.error);
            })
            .addCase(createParentCategory.fulfilled, (state, action) => {
                state.data.push(action.payload);
            })
            .addCase(createParentCategory.rejected, (state, action) => {
                console.error('Lỗi khi tạo mới danh mục:', action.error);
            })
            .addCase(updateParentCategory.fulfilled, (state, action) => {
                const index = state.data.findIndex((item: ParentCategory) => item.id === action.payload.id);
                if (index !== -1) {
                    state.data[index] = action.payload;
                }
            })
            .addCase(updateParentCategory.rejected, (state, action) => {
                console.error('Lỗi khi cập nhật danh mục:', action.error);
            })
            .addCase(deleteParentCategory.fulfilled, (state, action) => {
                state.data = state.data.filter((item: ParentCategory) => item.id !== action.payload);
            })
            .addCase(deleteParentCategory.rejected, (state, action) => {
                console.error('Lỗi khi xóa danh mục:', action.error);
            });
    },
});

export const parentCategoryReduce = parentCategorySlice.reducer;
