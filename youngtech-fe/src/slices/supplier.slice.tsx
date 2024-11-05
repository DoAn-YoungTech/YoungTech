import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "@/connect";

const API_URL_EMP = `${API_URL}/suppliers`;

export interface Supplier {
    id?: number;
    flag: boolean;
    supplierName: string;
    contactName: string;
    phoneNumber: string;
    email: string;
    address: string;
}

interface SupplierState {
    data: Supplier[];
    loading: boolean;
    error: string | null;
}

const initialState: SupplierState = {
    data: [],
    loading: false,
    error: null,
};

export const fetchSuppliers = createAsyncThunk(
    'suppliers/fetch',
    async () => {
        const response = await axios.get(`${API_URL}/suppliers`);
        return response.data;
    }
);

export const createSupplier = createAsyncThunk(
    'suppliers/create',
    async (supplier: Supplier) => {
        const response = await axios.post(`${API_URL}/suppliers`, supplier);
        return response.data;
    }
);

export const updateSupplier = createAsyncThunk(
    'suppliers/update',
    async (supplier: Supplier) => {
        const response = await axios.put(`${API_URL}/suppliers/${supplier.id}`, supplier);
        return response.data;
    }
);

export const deleteSupplier = createAsyncThunk(
    'suppliers/delete',
    async (id: number) => {
        await axios.delete(`${API_URL_EMP}/${id}`);
        return id;
    }
);

const supplierSlice = createSlice({
    name: "suppliers",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSuppliers.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchSuppliers.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchSuppliers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? 'Không tìm thấy danh sách nhà cung cấp';
                console.error('Lỗi khi tải danh sách nhà cung cấp:', state.error);
            })
            .addCase(createSupplier.fulfilled, (state, action) => {
                state.data.push(action.payload);
            })
            .addCase(createSupplier.rejected, (state, action) => {
                console.error('Lỗi khi tạo mới nhà cung cấp:', action.error);
            })
            .addCase(updateSupplier.fulfilled, (state, action) => {
                const index = state.data.findIndex((item: Supplier) => item.id === action.payload.id);
                if (index !== -1) {
                    state.data[index] = action.payload;
                }
            })
            .addCase(updateSupplier.rejected, (state, action) => {
                console.error('Lỗi khi cập nhật nhà cung cấp:', action.error);
            })
            .addCase(deleteSupplier.fulfilled, (state, action) => {
                state.data = state.data.filter((item: Supplier) => item.id !== action.payload);
            })
            .addCase(deleteSupplier.rejected, (state, action) => {
                console.error('Lỗi khi xóa nhà cung cấp:', action.error);
            });
    },
});

export const supplierReduce = supplierSlice.reducer;