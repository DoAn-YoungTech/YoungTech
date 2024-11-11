"use client"
import { ItemProducts } from './ItemProducts';
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchProducts } from "@/redux/Product/productThunks";
import { RootState, AppDispatch } from '@/redux/Store';

const ProductParen = () => {
  const dispatch = useDispatch<AppDispatch>();
      const {data,loading} = useSelector((state: RootState) => state.products); 
      const idCateParen = useSelector((state: RootState) => state.categories_parent.idCateParen);
    const Products = data.filter(item=>item.id_category_paren ===parseInt(idCateParen))
   
    
    useEffect(() => {  
    dispatch(fetchProducts())
    }, [dispatch]); 
  return (
   <ItemProducts DataProducts={Products} loading={loading} />
  )
}

export default ProductParen
