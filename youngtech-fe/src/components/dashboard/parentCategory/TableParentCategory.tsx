'use client';
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
    <Table>
      <thead className="text-left">
        <tr>
          <th className="py-5">ID</th>
          <th className="py-5">Tên Danh Mục</th>
          <th className="py-5">Thao Tác</th>
        </tr>
      </thead>
      <tbody>
        {categories.map((category) => (
          <tr key={category.id}>
            <td>{category.id}</td>
            <td>{category.name}</td>
                        <td className="gap-2 flex">
              <Button className="bg-blue-500 hover:bg-blue-600" onClick={() => onEdit(category)}>
                <FaEdit />
              </Button>
              <Button className="bg-red-500 hover:bg-red-600" onClick={() => onDelete(category.id)}>
                <MdDeleteOutline />
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ParentCategoryTable;
