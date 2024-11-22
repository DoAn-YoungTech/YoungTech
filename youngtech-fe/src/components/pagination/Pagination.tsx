"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface PaginationProps {
  totalPages: number;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Lấy trang hiện tại từ URL query, nếu không có thì mặc định là 1
  const currentPage = parseInt(searchParams.get("page") || "1");

  // Hàm xử lý khi click vào nút phân trang
  const handleClick = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      // Cập nhật URL query
      const params = new URLSearchParams(searchParams as any);
      params.set("page", page.toString());
      router.push(`?${params.toString()}`);
    }
  };

  return (
    <div className="flex justify-center items-center mt-4 space-x-2">
      {/* Nút quay về trang trước */}
      <button
        onClick={() => handleClick(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded-md ${
          currentPage === 1
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-blue-500 text-white hover:bg-blue-600"
        }`}
      >
        Previous
      </button>

      {/* Các nút số trang */}
      {[...Array(totalPages)].map((_, index) => {
        const page = index + 1;
        return (
          <button
            key={page}
            onClick={() => handleClick(page)}
            className={`px-4 py-2 rounded-md ${
              currentPage === page
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {page}
          </button>
        );
      })}

      {/* Nút chuyển tới trang tiếp theo */}
      <button
        onClick={() => handleClick(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded-md ${
          currentPage === totalPages
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-blue-500 text-white hover:bg-blue-600"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
