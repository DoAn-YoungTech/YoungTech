import { configureStore } from "@reduxjs/toolkit";
import employeeReduce from "@/slices/employee.slice"
import orderReduce from "@/slices/order.slice"

export const store = configureStore({
    reducer: {
        employee: employeeReduce,
        order: orderReduce
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;