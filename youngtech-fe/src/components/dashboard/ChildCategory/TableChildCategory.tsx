"use client";

import { Table } from '@/components/ui/table'; // Kiểm tra đường dẫn chính xác
import { Button } from '@/components/ui/button'; // Kiểm tra đường dẫn chính xác
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { Category_Child } from '@/types/CategoryTypes';

interface ChildCategoriesTableProps {
  categorieschild: Category_Child[]; // Sử dụng loại dữ liệu cho danh mục con
  onEdit: (category: Category_Child) => void;
  onDelete: (id: number) => void;
}

const ChildCategoriesTable: React.FC<ChildCategoriesTableProps> = ({ categorieschild = [], onEdit, onDelete }) => {
  console.log("Categories passed to ChildCategoriesTable:", categorieschild);
  return (
    <>
      <Table className="min-w-full divide-y">
        <thead className="text-left bg-[#282F36] text-white/80">
          <tr>
            <th className="py-3 px-4 text-center">STT</th>
            <th className="py-3 px-4 text-center">Tên Danh Mục Cha</th>
            <th className="py-3 px-4 text-center">Tên Danh Mục</th>
            <th className="py-3 px-4 text-center">Thao Tác</th>
          </tr>
        </thead>
        <tbody className="text-gray-800">
          {categorieschild.length > 0 ? (
            categorieschild.map((category, index) => (
              <tr
                key={category.id}
                className="product-item text-white/80 border-t border-t-slate-300/50 transition-all duration-300 ease-in-out cursor-pointer hover:bg-[#22282E]"
              >
                <td className="py-3 px-4 text-sm text-gray-400 text-center">
                  {index + 1}
                </td>
                <td className="py-3 px-4 text-sm text-center text-gray-200">
                  {category.parentCategory_id}
                </td>
                <td className="py-3 px-4 text-sm text-center text-gray-200">
                  {category.childCateName}
                </td>
                <td className="py-3 px-4 flex justify-center gap-4">
                  <Button
                    className="hover:bg-blue-300 rounded-md bg-black/50 transition-all duration-300 ease-in-out w-[40px] h-[40px] flex justify-center items-center"
                    onClick={() => onEdit(category)}
                  >
                    <FaEdit className="text-[1.1rem] text-blue-600" />
                  </Button>
                  <Button
                    className="hover:bg-red-300 bg-black/50 rounded-md transition-all duration-300 ease-in-out w-[40px] h-[40px] flex justify-center items-center"
                    onClick={() => onDelete(category.id)}
                  >
                    <MdDeleteOutline className="text-[1.1rem] text-red-600" />
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={4}
                className="py-4 text-center text-gray-400 text-sm"
              >
                Không có danh mục nào để hiển thị.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  );
};

export default ChildCategoriesTable;
