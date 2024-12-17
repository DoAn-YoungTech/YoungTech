'use client';
import React, { useEffect, useState } from "react";
import axios from "axios";
import Action from "../Action/Action";
import View from "../Action/view";
import Update from "../Action/update";
import Delete from "../Action/delete";

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

  return (
    <div>
      <header className="mb-5">
        <h2 className="text-white/90 font-bold text-[1.2rem]">
          DANH SÁCH SẢN PHẨM
        </h2>
      </header>
      <main>
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
                <div className="font-bold  text-white/80 w-[calc(100%-85%)]">
                  <span className="text-[0.8rem]">{product.productName}</span>
                </div>
                <div className="font-bold  text-white/80 w-[calc(100%-90%)]">
                  <span className="text-[0.8rem]">{product.brand}</span>
                </div>
                <div className="font-bold text-[0.9rem] text-white/80 w-[calc(100%-90%)]">
                  <img
                    src={product.images[0]?.imageUrl || "https://via.placeholder.com/150"}
                    alt="img"
                    className="rounded-xl w-12 h-12"
                  />
                </div>
                <div className="font-bold text-[0.9rem] text-white/80 w-[calc(100%-90%)]">
                  <span className="text-[0.8rem]">{product.productRetailPrice || "N/A"}</span>
                </div>
                <div className="font-bold  text-white/80 w-[calc(100%-90%)]">
                  <span className="text-[0.8rem]">{product.productSalePrice || "N/A"}</span>
                </div>
                <div className="font-bold  text-white/80 w-[calc(100%-90%)]">
                  <span className="text-[0.8rem]">{product.productPrice}</span>
                </div>
                <div className="font-bold  text-white/80 w-[calc(100%-90%)]">
                  <span className="text-[0.8rem]">{new Date(product.createAt).toLocaleDateString()}</span>
                </div>
                <div className="font-bold  flex items-center gap-2  w-[calc(100%-80%)]">
                  <Update url={`/dashboard/quanly-kinhdoanh/giaban-le/${product.id}`} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination-controls flex justify-center gap-4 mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="bg-gray-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Trang trước
        </button>
        <span className="text-white">Trang {currentPage} / {totalPages}</span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="bg-gray-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Trang sau
        </button>
      </div>
    </div>
    </main>
    </div>
    
  );
};

export default ListProducts;
