import { configureStore } from "@reduxjs/toolkit";
import employeeReduce from "@/slices/employee.slice"

export const store = configureStore({
    reducer: {
        employee: employeeReduce
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;