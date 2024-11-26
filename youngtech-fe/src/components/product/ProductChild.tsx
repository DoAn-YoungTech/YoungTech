"use client"
import "../HotPromotion.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { RootState, AppDispatch } from '@/redux/Store';
import { ItemProducts } from "./ItemProducts";
import { fetchProductsChild } from "@/redux/Product/productThunks";

export const ProductChild: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const idCateChild = useSelector((state: RootState) => state.categories_child.idCateChild);
    const {childProduct,loading} = useSelector((state: RootState) => state.products); 
 
  useEffect(() => {  
    if(idCateChild){
      dispatch(fetchProductsChild(idCateChild))
    }
 
  }, [dispatch]); 

  return (

  <>
   <ItemProducts DataProducts={childProduct} loading={loading}/>
   
  </>
  );
};
