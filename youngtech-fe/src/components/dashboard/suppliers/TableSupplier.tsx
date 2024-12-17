"use client";

import { Table } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { Supplier } from '@/types/SupplierTypes';
import { useState } from "react";

const ITEMS_PER_PAGE = 5; // Số lượng mục hiển thị mỗi trang

interface SuppliersTableProps {
  suppliers: Supplier[];
  onEdit: (supplier: Supplier) => void;
  onDelete: (id: number) => void;
}

const SuppliersTable: React.FC<SuppliersTableProps> = ({
  suppliers = [],
  onEdit,
  onDelete,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(suppliers.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = suppliers.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <>
      <Table className="min-w-full divide-y">
        <thead className="text-left bg-[#282F36] text-white/80">
          <tr>
            <th className="py-3 px-4 text-center">STT</th>
            <th className="py-3 px-4 text-center">Tên Nhà Cung Cấp</th>
            <th className="py-3 px-4 text-center">Tên Người Liên Hệ</th>
            <th className="py-3 px-4 text-center">Số Điện Thoại</th>
            <th className="py-3 px-4 text-center">Email</th>
            <th className="py-3 px-4 text-center">Địa Chỉ</th>
            <th className="py-3 px-4 text-center">Thao Tác</th>
          </tr>
        </thead>
        <tbody className="text-gray-800">
          {currentItems.length > 0 ? (
            currentItems.map((supplier, index) => (
              <tr
                key={supplier.id}
                className="supplier-item text-white/80 border-t border-t-slate-300/50 transition-all duration-300 ease-in-out cursor-pointer hover:bg-[#22282E]"
              >
                <td className="py-3 px-4 text-sm text-gray-400 text-center">
                  {startIndex + index + 1}
                </td>
                <td className="py-3 px-4 text-sm text-gray-200">
                  {supplier.supplierName}
                </td>
                <td className="py-3 px-4 text-sm  text-gray-200">
                  {supplier.contactName}
                </td>
                <td className="py-3 px-4 text-sm  text-gray-200">
                  {supplier.phoneNumber}
                </td>
                <td className="py-3 px-4 text-sm  text-gray-200">
                  {supplier.email}
                </td>
                <td className="py-3 px-4 text-sm  text-gray-200">
                  {supplier.address}
                </td>
                <td className="py-3 px-4 flex justify-center gap-4">
                  <Button
className="hover:bg-blue-500 bg-[#1E293B] rounded-md transition-all duration-300 ease-in-out w-[40px] h-[40px] flex justify-center items-center"
                    onClick={() => onEdit(supplier)}
                  >
                    <FaEdit className="text-[1.1rem] text-blue-400" />
                  </Button>
                  <Button
                    className="hover:bg-red-500 bg-[#1E293B] rounded-md transition-all duration-300 ease-in-out w-[40px] h-[40px] flex justify-center items-center"
                    onClick={() => onDelete(supplier.id)}
                  >
                    <MdDeleteOutline className="text-[1.1rem] text-red-400" />
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={7}
                className="py-4 text-center text-gray-400 text-sm"
              >
                Không có nhà cung cấp nào để hiển thị.
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Phân trang */}
      <div className="flex justify-center mt-4 gap-2">
        <Button
          className={`px-3 py-2 text-sm rounded ${currentPage === 1 ? "bg-gray-600 cursor-not-allowed" : "bg-[#1E293B] hover:bg-gray-700 text-white"}`}
          disabled={currentPage === 1}
          onClick={() => goToPage(currentPage - 1)}
        >
          <HiChevronLeft className="text-xl" />
        </Button>
        {Array.from({ length: totalPages }, (_, index) => (
          <Button
            key={index + 1}
            className={`px-3 py-2 text-sm rounded ${currentPage === index + 1 ? "bg-blue-600 text-white" : "bg-[#1E293B] hover:bg-gray-700 text-gray-300"}`}
            onClick={() => goToPage(index + 1)}
          >
            {index + 1}
          </Button>
        ))}
        <Button
          className={`px-3 py-2 text-sm rounded ${currentPage === totalPages ? "bg-gray-600 cursor-not-allowed" : "bg-[#1E293B] hover:bg-gray-700 text-white"}`}
          disabled={currentPage === totalPages}
          onClick={() => goToPage(currentPage + 1)}
        >
          <HiChevronRight className="text-xl" />
        </Button>
      </div>
    </>
  );
};

export default SuppliersTable;