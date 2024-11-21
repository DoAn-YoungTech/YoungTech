"use client";
import { ItemProducts } from './ItemProducts';
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { RootState, AppDispatch } from '@/redux/Store';
import { fetchProductsParen } from '@/redux/Product/productThunks';
import Pagination from '../pagination/Pagination';

const ProductParen = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Sử dụng useSelector để lấy idCateParen từ state
  const idCateParen = useSelector((state: RootState) => state.categories_parent.idCateParen);
  
  
  const {parenProduct,loading} = useSelector((state: RootState) => state.products);
 
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5; 
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  }; 
   useEffect(() => {
    if (idCateParen) {
      // Chỉ gọi fetchProductsParen nếu có idCateParen
      dispatch(fetchProductsParen(idCateParen));
    }
  }, [dispatch, idCateParen]);

 

  return (
 
<>
<ItemProducts DataProducts={parenProduct} loading={loading} />
      <div className='w-full py-5'>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      </div>
</>
  );
};

export default ProductParen;
