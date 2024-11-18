"use client";

import "../HotPromotion.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchProducts } from "@/redux/Product/productThunks";
import { RootState, AppDispatch } from '@/redux/Store';

// Nhập interface Product
import { ItemProducts } from "./ItemProducts";

export const ProductHome: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {data,loading} = useSelector((state: RootState) => state.products); 
  
  useEffect(() => {
    dispatch(fetchProducts(10));
  }, [dispatch]);

  return (
    <>
{/* <ItemProducts DataProducts={data} loading={loading}/> */}
     
    </>
  );
};
