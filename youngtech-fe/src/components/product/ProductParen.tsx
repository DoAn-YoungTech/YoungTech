"use client";
import { ItemProducts } from './ItemProducts';
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { RootState, AppDispatch } from '@/redux/Store';
import { fetchProductsParen } from '@/redux/Product/productThunks';

const ProductParen = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Sử dụng useSelector để lấy idCateParen từ state
  const idCateParen = useSelector((state: RootState) => state.categories_parent.idCateParen);
  
  
  const {parenProduct,loading} = useSelector((state: RootState) => state.products);
 
   useEffect(() => {
    if (idCateParen) {
      // Chỉ gọi fetchProductsParen nếu có idCateParen
      dispatch(fetchProductsParen(idCateParen));
    }
  }, [dispatch, idCateParen]);

 

  return (
 
       <ItemProducts DataProducts={parenProduct} loading={loading} />
  );
};

export default ProductParen;
