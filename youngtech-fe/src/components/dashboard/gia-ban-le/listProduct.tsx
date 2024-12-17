'use client';
import React, { useEffect, useState } from "react";
import axios from "axios";
import Update from "../Action/update";
import Delete from "../Action/delete";
import { Button } from "@/components/ui/button";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { FaEdit } from "react-icons/fa";

const ListProducts = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchProducts = async (page: number) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/product/viewListProduct?page=${page}`
      );
      const { data, totalPages: total } = response.data;
      setProducts(data);
      setTotalPages(total);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  return (
    <div>
      <div className="products-container">
        {products.map((product : any, index: number) => (
          <div
            key={product.id}
            className="product-item border-t border-t-slate-300/50 transition-all duration-300 ease-in-out cursor-pointer hover:bg-[#22282E]"
          >
            <div className="content-product-header p-4">
              <div className="flex items-center justify-between">
                <div className="font-bold text-[0.9rem] text-white/80 w-[calc(100%-95%)]">
                  {index + 1}
                </div>
                <div className="text-white/80 w-[calc(100%-85%)]">
                  <span className="text-[0.8rem]">{product.productName}</span>
                </div>
                <div className="text-white/80 w-[calc(100%-90%)]">
                  <span className="text-[0.8rem]">{product.brand}</span>
                </div>
                <div className=" text-[0.9rem] text-white/80 w-[calc(100%-90%)]">
                  <img
                    src={product.images[0]?.imageUrl || "https://via.placeholder.com/150"}
                    alt="img"
                    className="rounded-xl w-12 h-12"
                  />
                </div>
                <div className="text-[0.9rem] text-white/80 w-[calc(100%-90%)]">
                  <span className="text-[0.8rem]">{product.productRetailPrice || "N/A"}</span>
                </div>
                <div className=" text-white/80 w-[calc(100%-90%)]">
                  <span className="text-[0.8rem]">{product.productSalePrice || "N/A"}</span>
                </div>
                <div className=" text-white/80 w-[calc(100%-90%)]">
                  <span className="text-[0.8rem]">{product.productPrice}</span>
                </div>
                <div className="text-white/80 w-[calc(100%-90%)]">
                  <span className="text-[0.8rem]">{new Date(product.createAt).toLocaleDateString()}</span>
                </div>
                <div className=" flex items-center gap-2  w-[calc(100%-80%)]">
                  <Update  url={`/dashboard/quanly-kinhdoanh/giaban-le/${product.id}`} />
                  <Delete url={""} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Nút phân trang */}
      <div className="flex justify-center items-center mt-4 space-x-2">
  <Button 
    onClick={handlePreviousPage} 
    disabled={currentPage === 1} 
    className="px-4 py-2 bg-gray-800 text-white rounded disabled:opacity-50 flex items-center justify-center"
  >
    <HiChevronLeft className="text-xl" /> {/* Dấu << */}
  </Button>

  {Array.from({ length: totalPages }, (_, index) => (
    <Button 
      key={index} 
      onClick={() => handlePageClick(index + 1)} 
      className={`px-4 py-2 rounded ${currentPage === index + 1 ? 'bg-slate-600 text-white' : 'bg-gray-800 text-white'}`}
    >
      {index + 1}
    </Button>
  ))}

  <Button 
    onClick={handleNextPage} 
    disabled={currentPage === totalPages} 
    className="px-4 py-2 bg-gray-800 text-white rounded disabled:opacity-50 flex items-center justify-center"
  >
    <HiChevronRight className="text-xl" /> {/* Dấu >> */}
  </Button>
</div>
    </div>
  );
};

export default ListProducts;
