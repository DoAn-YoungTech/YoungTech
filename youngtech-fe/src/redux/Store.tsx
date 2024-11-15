import { configureStore, combineReducers } from '@reduxjs/toolkit';
import commentReducer from './Comment/commentSlice';
import productReducer from './Product/productSlice';
import categoryParentReducer from './Category/categoryParentSlice';
import categoryChildReducer from './Category/categoryChildSlice';
import addRessReducer from './Address/addressSlice'

const rootReducer = combineReducers({
  comments: commentReducer,
  products: productReducer,
  categories_parent: categoryParentReducer,
  categories_child: categoryChildReducer,
  address : addRessReducer

 
});

// Tạo store với rootReducer
export const store = configureStore({
  reducer: rootReducer,
});

// Xuất RootState để sử dụng trong các component
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
