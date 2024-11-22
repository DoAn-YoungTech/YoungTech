"use client";
import { ItemProducts } from './ItemProducts';
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { RootState, AppDispatch } from '@/redux/Store';
import { fetchProductsParen } from '@/redux/Product/productThunks';
import Pagination from '../pagination/Pagination';
import {  useSearchParams } from "next/navigation";

const ProductParen = () => {
  const dispatch = useDispatch<AppDispatch>();
  // Sử dụng useSelector để lấy idCateParen từ state
  const idCateParen = useSelector((state: RootState) => state.categories_parent.idCateParen);
  const searchParams = useSearchParams();

  // Lấy trang hiện tại từ URL query, nếu không có thì mặc định là 1
  const page = parseInt(searchParams.get("page") || "1");
  const limit = 2;
  const {parenProduct,loading} = useSelector((state: RootState) => state.products);
  console.log(parenProduct)
   useEffect(() => {
    if (idCateParen) {
      // Chỉ gọi fetchProductsParen nếu có idCateParen
      dispatch(fetchProductsParen(idCateParen,limit,page));
    }
  }, [dispatch, idCateParen]);


  return (
 
<>
<ItemProducts DataProducts={parenProduct.data} loading={loading} />
      <div className='w-full py-5'>
      <Pagination
        totalPages={parenProduct.total}
      />
      </div>
</>
  );
};

export default ProductParen;
