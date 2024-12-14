"use client";
import { Table } from '@/components/ui/table'; // Kiểm tra đường dẫn chính xác
import { Button } from '@/components/ui/button'; // Kiểm tra đường dẫn chính xác
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { Category_Paren } from '@/types/CategoryTypes';

interface ParentCategoryTableProps {
  categories: Category_Paren[];  // Sử dụng kiểu dữ liệu cho danh mục cha
  onEdit: (category: Category_Paren) => void;
  onDelete: (id: number) => void;
}

const ParentCategoryTable: React.FC<ParentCategoryTableProps> = ({ categories, onEdit, onDelete }) => {
  return (
    <div className=" ">
      <table className="min-w-full divide-y ">
        <thead className="text-left bg-[#282F36] text-white/80 w-[calc(100%-95%)]">
          <tr>
            <th className="py-3 px-4 text-sm font-medium text-gray-300 text-center">STT</th>
            <th className="py-3 px-4 text-sm font-medium text-gray-300 text-center">Tên Danh Mục</th>
            <th className="py-3 px-5 text-sm font-medium text-gray-300 text-center">Thao Tác</th>
          </tr>
        </thead>
        <tbody className="text-gray-800">
          {categories.map((category, index) => (
            <tr key={category.id} className="product-item text-white/80 border-t border-t-slate-300/50 transition-all duration-300 ease-in-out cursor-pointer hover:bg-[#22282E]">
              <td className="py-3 px-4 text-sm text-gray-400 text-center">{index + 1}</td>
              <td className="py-3 px-4 text-sm text-center text-gray-200">{category.name}</td>
              <td className="py-3 px-4 flex justify-center gap-4">
                <button
                  className="hover:bg-blue-300 rounded-md bg-black/50  transition-all duration-300 ease-in-out w-[40px] h-[40px]  flex  justify-center items-center"
                  onClick={() => onEdit(category)}
                  title="Chỉnh sửa"
                >
                  <FaEdit className="text-[1.1rem] text-blue-600"/>
                </button>
                <button
                  className="hover:bg-red-300 bg-black/50 rounded-md  transition-all duration-300 ease-in-out w-[40px] h-[40px]  flex  justify-center items-center"
                  onClick={() => onDelete(category.id)}
                  title="Xóa"
                >
                  <MdDeleteOutline className="text-[1.1rem] text-red-600"/>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {categories.length === 0 && (
        <div className="py-4 text-center text-gray-400 text-sm">Không có danh mục nào để hiển thị.</div>
      )}
    </div>
  );
};

export default ParentCategoryTable;
