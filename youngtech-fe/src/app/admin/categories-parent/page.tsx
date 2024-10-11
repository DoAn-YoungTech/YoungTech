"use client"; // Đảm bảo thêm dòng này

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit, faEye } from "@fortawesome/free-solid-svg-icons";
import EditCategory from "./edit-category/page"; // Import EditCategory component
import ViewCategory from "./view-category/page"; // Import ViewCategory component
import AddCategory from "./add-category-parent/page";


interface Category {
  id: number;
  categoryName: string;
  quantity: number;
}

const productsData: Category[] = [
  { id: 1, categoryName: "Điện thoại", quantity: 235 },
  { id: 2, categoryName: "Tai nghe", quantity: 56 },
  { id: 3, categoryName: "Máy tính", quantity: 67 },
  { id: 4, categoryName: "Bàn phím", quantity: 24 },
];

const CategoriesParent: React.FC = () => {
  const [showEntries, setShowEntries] = useState<number>(10);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [viewingCategory, setViewingCategory] = useState<Category | null>(null);
  const [addingCategory, setAddingCategory] = useState<boolean>(false); // Thêm trạng thái để hiển thị form thêm


  const handleEdit = (category: Category) => {
    setEditingCategory(category);
  };

  const handleView = (category: Category) => {
    setViewingCategory(category);
  };

  const handleSave = (updatedCategory: Category) => {
    console.log("Đã lưu chỉnh sửa:", updatedCategory);
    setEditingCategory(null);
  };

  const handleAdd = (newCategory: Category) => {
    console.log("Đã thêm danh mục:", newCategory);
    // Thêm logic để cập nhật danh sách sản phẩm ở đây
    setAddingCategory(false); // Đóng form thêm sau khi thêm thành công
  };

  return (
    <div className="p-6 bg-white shadow-md min-h-screen">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold">Danh mục sản phẩm</h1>
      </div>
      <div className="mb-4">
        <label htmlFor="entries" className="mr-2">Hiển thị</label>
        <select
          id="entries"
          value={showEntries}
          onChange={(e) => setShowEntries(Number(e.target.value))}
          className="border border-gray-300 rounded p-2"
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Tìm kiếm..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded p-2 mb-4"
        />
      <button onClick={() => setAddingCategory(true)} 
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
          + Thêm danh mục
        </button>
      </div>
      <table className="min-w-full border border-gray-300 text-center">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 p-2">Số thứ tự</th>
            <th className="border border-gray-300 p-2">Tên danh mục</th>
            <th className="border border-gray-300 p-2">Số lượng</th>
            <th className="border border-gray-300 p-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {productsData
            .filter((product) => product.categoryName.toLowerCase().includes(searchTerm.toLowerCase()))
            .slice(0, showEntries)
            .map((product) => (
              <tr key={product.id}>
                <td className="border border-gray-300 p-2">{product.id}</td>
                <td className="border border-gray-300 p-2">{product.categoryName}</td>
                <td className="border border-gray-300 p-2">{product.quantity}</td>
                <td className="border border-gray-300 p-2 space-x-3">
                  <FontAwesomeIcon
                    icon={faEye}
                    className="text-blue-500 cursor-pointer"
                    onClick={() => handleView(product)}
                  />
                  <FontAwesomeIcon
                    icon={faEdit}
                    className="text-yellow-500 cursor-pointer"
                    onClick={() => handleEdit(product)}
                  />
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="text-red-500 cursor-pointer"
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {editingCategory && (
        <EditCategory
          category={editingCategory}
          onSave={handleSave}
          onCancel={() => setEditingCategory(null)}
        />
      )}

      {viewingCategory && (
        <ViewCategory
          category={viewingCategory}
          onClose={() => setViewingCategory(null)}
        />
      )}

      {addingCategory && (
        <AddCategory
          onAdd={handleAdd}
          onCancel={() => setAddingCategory(false)} // Đóng form thêm khi hủy
        />
      )}
    </div>
  );
};

export default CategoriesParent;
