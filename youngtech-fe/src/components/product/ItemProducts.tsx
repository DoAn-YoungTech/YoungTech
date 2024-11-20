"use client"
import { Product } from "@/types/productTypes";
import { ItemProduct } from "./ItemProduct";
import Pagination from "../pagination/Pagination";
import { useState } from "react";

interface ItemProductProps {
  DataProducts: Product[]; 
  loading: boolean;  // Thêm loading vào props
}

export const ItemProducts: React.FC<ItemProductProps> = ({ DataProducts, loading }) => {
 

  // Kiểm tra DataProducts có phải là mảng không và đảm bảo không phải null hoặc undefined
  const isDataValid = Array.isArray(DataProducts) && DataProducts.length > 0;

  if (loading) {
    return <div>Đang tải...</div>; // Hiển thị thông báo hoặc spinner khi loading
  }

  return (
    <div className="px-5 z-0 grid justify-center items-center grid-cols-2 lg:grid-cols-5 gap-2">
      {!isDataValid ? (
        <p>Không có sản phẩm nào.</p>
      ) : (
        DataProducts.map((item) => (
          <ItemProduct key={item.id} item={item} />
        ))
      )}
      
    </div>
  );
};
