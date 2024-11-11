"use client"
import "../HotPromotion.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchProducts } from "@/redux/Product/productThunks";
import { RootState, AppDispatch } from '@/redux/Store';
import { ItemProducts } from "./ItemProducts";

export const ProductChild: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const idCateChild = useSelector((state: RootState) => state.categories_child.idCateChild);
    const {data,loading} = useSelector((state: RootState) => state.products); 
  const Products = data.filter(item=>item.id_category === parseInt(idCateChild))
  useEffect(() => {  
  dispatch(fetchProducts())
  }, [dispatch]); 

  return (

  <>
   <ItemProducts DataProducts={Products} loading={loading}/>
   
  </>
  );
};
