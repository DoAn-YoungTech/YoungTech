import React from "react";

// Định nghĩa interface cho Category
interface Category {
  categoryName: string;
  quantity: number;
}

interface ViewCategoryProps {
  category: Category;
  onClose: () => void;
}

const ViewCategory: React.FC<ViewCategoryProps> = ({ category, onClose }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-1/3">
        <h2 className="text-2xl font-bold mb-4 text-center">Chi tiết danh mục</h2>
        <div className="mb-4">
          <p><strong>Tên danh mục:</strong> {category.categoryName}</p>
        </div>
        <div className="mb-4">
          <p><strong>Số lượng:</strong> {category.quantity}</p>
        </div>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewCategory;
