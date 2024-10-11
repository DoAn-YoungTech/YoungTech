import React from "react";

interface Category {
  id: number;        // Đảm bảo id được khai báo ở đây
  categoryName: string;
  quantity: number;
}

interface EditCategoryProps {
  category: Category; // Sử dụng Category thay vì any
  onSave: (updatedCategory: Category) => void; // Cập nhật kiểu
  onCancel: () => void;
}

const EditCategory: React.FC<EditCategoryProps> = ({ category, onSave, onCancel }) => {
  const [updatedCategory, setUpdatedCategory] = React.useState<Category>(category);

  const handleSave = () => {
    onSave(updatedCategory);
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-1/3">
        <h2 className="text-2xl font-bold mb-4 text-center">Chỉnh sửa danh mục</h2>
        <div className="mb-4">
          <label className="block mb-2 font-bold">Tên danh mục</label>
          <input
            type="text"
            value={updatedCategory.categoryName}
            onChange={(e) =>
              setUpdatedCategory({ ...updatedCategory, categoryName: e.target.value })
            }
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-bold">Số lượng</label>
          <input
            type="number"
            value={updatedCategory.quantity}
            onChange={(e) =>
              setUpdatedCategory({ ...updatedCategory, quantity: Number(e.target.value) })
            }
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>
        <div className="flex justify-end space-x-4">
          <button onClick={onCancel} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors">
            Hủy
          </button>
          <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCategory;
