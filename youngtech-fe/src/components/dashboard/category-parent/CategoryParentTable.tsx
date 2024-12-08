"use client";

import React from "react";
import { Table } from "@/components/ui/table"; // Kiểm tra lại đường dẫn components
import { Button } from "@/components/ui/button"; // Kiểm tra lại đường dẫn components
import { FaEdit, FaEye } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

interface CategoryParent {
  id: number;
  flag: boolean;
  name: string;
}

interface CategoryParentTableProps {
  categoryParents: CategoryParent[];
  onEdit: (categoryParent: CategoryParent) => void;
  onDelete: (id: number) => void;
  onView: (id: number) => void;  // Thêm phần hiển thị chi tiết danh mục
}


const CategoryParentTable: React.FC<CategoryParentTableProps> = ({
  categoryParents,
  onEdit,
  onDelete,
  onView,
}) => {
  return (
    <Table>
      <thead className="text-left">
        <tr>
          <th className="py-5">ID</th>
          <th className="py-5">Tên Danh Mục</th>
          <th className="py-5">Trạng Thái</th>
          <th className="py-5">Thao Tác</th>
        </tr>
      </thead>
      <tbody>
        {categoryParents.map((categoryParent) => (
          <tr key={categoryParent.id}  className="h-12">
            <td>{categoryParent.id}</td>
            <td>{categoryParent.name}</td>
            <td>{categoryParent.flag ? "Hoạt động" : "Ngừng hoạt động"}</td>
            <td className="gap-2 flex">
            <Button
                className="bg-green-500 hover:bg-green-600"
                onClick={() => onView(categoryParent.id)}
                >
                <FaEye />
              </Button>
              <Button
                className="bg-blue-500 hover:bg-blue-600"
                onClick={() => onEdit(categoryParent)}
              >
                <FaEdit />
              </Button>
              <Button
                className="bg-red-500 hover:bg-red-600"
                onClick={() => onDelete(categoryParent.id)}
              >
                <MdDeleteOutline />
              </Button>
              
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default CategoryParentTable;
