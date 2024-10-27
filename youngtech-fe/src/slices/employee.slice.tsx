import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "@/connect";

const API_URL_EMP = `${API_URL}/employees`;

export interface Employee {
    id?: number;
    flag: boolean;
    fullName: string;
    profilePicture: string;
    dateOfBirth: string;
    phoneNumber: string;
    position: string;
    account_id: number | null;
}

interface EmployeeState {
    data: Employee[];
    loading: boolean;
    error: string | null;
}

const initialState: EmployeeState = {
    data: [],
    loading: false,
    error: null,
};

export const fetchEmployees = createAsyncThunk(
    'employees/fetch',
    async () => {
        const response = await axios.get(`${API_URL_EMP}`);
        return response.data;
    }
);

export const createEmployee = createAsyncThunk(
    'employees/create',
    async (employee: Employee) => {
        const response = await axios.post(`${API_URL_EMP}`, employee);
        return response.data;
    }
);

export const updateEmployee = createAsyncThunk(
    'employees/update',
    async (employee: Employee) => {
        const response = await axios.put(`${API_URL_EMP}/${employee.id}`, employee);
        return response.data;
    }
);

export const deleteEmployee = createAsyncThunk(
    'employees/delete',
    async (id: number) => {
        await axios.delete(`${API_URL_EMP}/${id}`);
        return id;
    }
);

const employeeSlice = createSlice({
    name: "employees",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchEmployees.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchEmployees.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchEmployees.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? 'Không tìm thấy Employees';
                console.error('Lỗi khi tải danh sách Employees:', state.error);
            })
            .addCase(createEmployee.fulfilled, (state, action) => {
                state.data.push(action.payload);
            })
            .addCase(createEmployee.rejected, (state, action) => {
                console.error('Lỗi khi tạo mới Employee:', action.error);
            })
            .addCase(updateEmployee.fulfilled, (state, action) => {
                const index = state.data.findIndex((item: Employee) => item.id === action.payload.id);
                if (index !== -1) {
                    state.data[index] = action.payload;
                }
            })
            .addCase(updateEmployee.rejected, (state, action) => {
                console.error('Lỗi khi cập nhật Employee:', action.error);
            })
            .addCase(deleteEmployee.fulfilled, (state, action) => {
                state.data = state.data.filter((item: Employee) => item.id !== action.payload);
            })
            .addCase(deleteEmployee.rejected, (state, action) => {
                console.error('Lỗi khi xóa Employee:', action.error);
            });
    },
});

export default employeeSlice.reducer;