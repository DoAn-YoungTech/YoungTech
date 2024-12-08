import { configureStore, combineReducers } from "@reduxjs/toolkit";
import commentReducer from "./Comment/commentSlice";
import productReducer from "./Product/productSlice";
import categoryParentReducer from "./Category/categoryParentSlice";
import categoryChildReducer from "./Category/categoryChildSlice";
import addRessReducer from "./Address/addressSlice";
import authReducer from "./User/authSlice";
import cartReducer from "./Cart/cartSlice";
import supplierReducer from "./Supplier/supplierSlice";
const rootReducer = combineReducers({
  comments: commentReducer,
  products: productReducer,
  categories_parent: categoryParentReducer,
  categories_child: categoryChildReducer,
  address: addRessReducer,
  auth: authReducer,
  cart: cartReducer,
  supplier: supplierReducer,
});

// Tạo store với rootReducer
export const store = configureStore({
  reducer: rootReducer,
});

// Xuất RootState để sử dụng trong các component
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
