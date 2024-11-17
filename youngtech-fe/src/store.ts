import { configureStore } from "@reduxjs/toolkit";
import { parentCategoryReduce } from './slices/parentCategory.slice'; 
import { supplierReduce } from "./slices/supplier.slice"; 

// Tạo store với các reducer
export const store = configureStore({
    reducer: {
        parentCategory: parentCategoryReduce,
        supplier: supplierReduce
    },
});

// Định nghĩa các kiểu cho RootState và AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
