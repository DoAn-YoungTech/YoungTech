import React, { useState, FormEvent } from "react";
import { ShinyRotatingBorderButton } from "../ButtonSave/BtnSave";
import { Category_Child } from "@/types/CategoryTypes";

interface UpdateChildCategoryProps {
  category: Category_Child; // Dữ liệu danh mục con cần cập nhật
  onCancel: () => void; // Hàm hủy bỏ
  onUpdateSuccess: (updatedCategory: Category_Child) => void; // Hàm khi cập nhật thành công
}

const UpdateChildCategory: React.FC<UpdateChildCategoryProps> = ({
  category,
  onCancel,
  onUpdateSuccess,
}) => {
  const [categoryName, setCategoryName] = useState(category.childCateName); // Lưu tên danh mục con
  const [parentCategoryId, setParentCategoryId] = useState(category.parentCategory_id); // Lưu ID danh mục cha

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      // Giả sử bạn gọi API để cập nhật danh mục con
      const updatedCategory: Category_Child = {
        ...category,
        childCateName: categoryName, // Cập nhật tên danh mục con
        parentCategory_id: parentCategoryId, // Cập nhật ID danh mục cha
      };

      // Gọi hàm onUpdateSuccess với thông tin danh mục đã được cập nhật
      onUpdateSuccess(updatedCategory);

      // Sau khi cập nhật thành công, có thể di chuyển trang hoặc xử lý thêm nếu cần
      console.log("Danh mục con đã được cập nhật:", updatedCategory);
    } catch (error) {
      console.error("Lỗi khi cập nhật danh mục con:", error.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-[#282F36] rounded-lg p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex items-center justify-between mb-6">
          <button
            type="button"
            onClick={onCancel}
            className="text-blue-600 hover:text-blue-800"
          >
            <ShinyRotatingBorderButton>Quay lại</ShinyRotatingBorderButton>
          </button>
          <h2 className="text-2xl font-bold text-white text-center flex-1">
            Sửa danh mục con
          </h2>
        </div>
        <div>
          <label
            htmlFor="categoryName"
            className="block text-sm font-medium text-white/50 mb-2"
          >
            Tên danh mục
          </label>
          <input
            id="categoryName"
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-[#282F36] text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Nhập tên danh mục"
          />
        </div>
        <div>
          <label
            htmlFor="parentCategoryId"
            className="block text-sm font-medium text-white/50 mb-2"
          >
            ID danh mục cha
          </label>
          <input
            id="parentCategoryId"
            type="number"
            value={parentCategoryId}
            onChange={(e) => setParentCategoryId(Number(e.target.value))}
            className="mt-1 block w-full px-3 py-2 bg-[#282F36] text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Nhập ID danh mục cha"
          />
        </div>
        <div className="flex justify-center gap-4">
          <button type="submit" className="px-4 py-2 text-white rounded-md">
            <ShinyRotatingBorderButton>Lưu thay đổi</ShinyRotatingBorderButton>
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateChildCategory;
