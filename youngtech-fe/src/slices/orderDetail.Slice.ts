import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "@/connect";

const API_URL_ORDER = `${API_URL}/orders`;

export interface Order {
    id?: number;
    flag: boolean;
    orderDate: Date;
    succesDate: Date;
    totalAmount: number;
    status: string;
}

interface OrderState {
    data: Order[];
    loading: boolean;
    error: string | null;
}

const initialState: OrderState = {
    data: [],
    loading: false,
    error: null,
};

export const fetchOrders = createAsyncThunk(
    'orders/fetch',
    async () => {
        const response = await axios.get(`${API_URL_ORDER}`);
        return response.data;
    }
);

export const createOrder = createAsyncThunk(
    'orders/create',
    async (order: Order) => {
        const response = await axios.post(`${API_URL_ORDER}`, order);
        return response.data;
    }
);

export const updateOrder = createAsyncThunk(
    'orders/update',
    async (order: Order) => {
        const response = await axios.put(`${API_URL_ORDER}/${order.id}`, order);
        return response.data;
    }
);

const orderSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrders.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? 'Không tìm thấy Orders';
                console.error('Lỗi khi tải danh sách Orders:', state.error);
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.data.push(action.payload);
            })
            .addCase(createOrder.rejected, (state, action) => {
                console.error('Lỗi khi tạo mới Order:', action.error);
            })
            .addCase(updateOrder.fulfilled, (state, action) => {
                const index = state.data.findIndex((item: Order) => item.id === action.payload.id);
                if (index !== -1) {
                    state.data[index] = action.payload;
                }
            })
            .addCase(updateOrder.rejected, (state, action) => {
                console.error('Lỗi khi cập nhật Order:', action.error);
            })
    },
});

export default orderSlice.reducer;