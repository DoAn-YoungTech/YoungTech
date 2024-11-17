// src/redux/employeeSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EmployeeState,Employee } from '@/types/EmployeeType';
const initialState: EmployeeState = {
    employee: [],
    loading: false,
    error: null,
  };
const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    setEmployees: (state, action: PayloadAction<Employee[]>) => {
      state.employee = action.payload;
    },
    addEmployee: (state, action: PayloadAction<Employee>) => {
      state.employee.push(action.payload);
    },
    removeEmployee: (state, action: PayloadAction<number>) => {
      state.employee = state.employee.filter((emp) => emp.id !== action.payload);
    },
    updateEmployee: (state, action: PayloadAction<Employee>) => {
      const index = state.employee.findIndex(emp => emp.id === action.payload.id);
      if (index !== -1) {
        state.employee[index] = action.payload;
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setEmployees, addEmployee, removeEmployee, updateEmployee, setLoading, setError } = employeeSlice.actions;

export default employeeSlice.reducer;
