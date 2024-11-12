"use client";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux"; // Thêm useDispatch và useSelector từ react-redux
import { TitleHome } from "../title-home/TitleHome";
import SeeMore from "../see-more/SeeMore";
import { ItemProducts } from "../product/ItemProducts";
import { fetchProducts } from "@/redux/Product/productThunks";
import { RootState, AppDispatch } from '@/redux/Store';

const BestProducts: React.FC = () => { 
  const [currentIndex,setCurrentIndex] = useState(0)
  const dispatch = useDispatch<AppDispatch>();
  const {data,loading} = useSelector((state: RootState) => state.products); 
  
  useEffect(() => {
    dispatch(fetchProducts(10));
  }, [dispatch]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % (data.length / 5)); // Chuyển qua nhóm 5 sản phẩm tiếp theo
    }, 3000);

    return () => clearInterval(intervalId); // Dọn dẹp interval khi component bị hủy
  }, [data]);

 
  const visibleProducts = data.slice(currentIndex * 5, (currentIndex + 1) * 5);

  return (
    <>
      <TitleHome title="Sản phẩm bán chạy nhất" />
      <div className="w-full bg-white p-5">
      <ItemProducts DataProducts={visibleProducts} loading={loading}/>
      <SeeMore />
      </div>
       
    </>
  );
};

export default BestProducts;
