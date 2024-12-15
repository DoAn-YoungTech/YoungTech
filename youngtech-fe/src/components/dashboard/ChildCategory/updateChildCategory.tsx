"use client";
import { updateChildCategory } from "@/services/category/CategoryChildService";
import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios for API call
import { ShinyRotatingBorderButton } from "../ButtonSave/BtnSave";
import { toast } from "react-toastify";
import { Category_Child } from "@/types/CategoryTypes";

interface UpdateChildCategoryProps {
  category: Category_Child;
  onCancel: () => void;
  onUpdateSuccess: (updatedCategory: Category_Child) => void;
}

const UpdateChildCategory: React.FC<UpdateChildCategoryProps> = ({
  category,
  onCancel,
  onUpdateSuccess,
}) => {
  const [parentCategories, setParentCategories] = useState<Category_Child[]>([]);
  const [parentCategoryName, setParentCategoryName] = useState<string>("");
  const [childCategoryName, setChildCategoryName] = useState<string>("");

  useEffect(() => {
    const fetchParentCategories = async () => {
      try {
        const response = await axios.get(`http://localhost:3400/api/parencategories`);
        if (response.data && Array.isArray(response.data.data)) {
          setParentCategories(response.data.data);
          const currentParentCategory = response.data.data.find(
            (cat) => cat.id === category.parentCategory_id
          );
          if (currentParentCategory) {
            setParentCategoryName(currentParentCategory.name);
          }
        } else {
          console.error("Invalid data received from API");
        }
      } catch (error) {
        console.error("Error fetching parent categories:", error.message);
        console.error("Error details:", error.response ? error.response.data : 'No response data available');
      }
    };

    fetchParentCategories();
    // Set child category name from the initial category
    setChildCategoryName(category.childCateName);
  }, [category.parentCategory_id, category.childCateName]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!parentCategoryName) {
      toast.error("Vui lòng chọn danh mục cha!"); // Hiển thị toast lỗi
      return;
    }
    try {
      const selectedCategory = parentCategories.find(cat => cat.name === parentCategoryName);
      if (selectedCategory) {
        const updatedCategory = {
          ...category,
          childCateName: childCategoryName,
          parentCategory_id: selectedCategory.id // Giữ nguyên kiểu dữ liệu là number
        };
  
        if (updatedCategory.id && updatedCategory.childCateName) {
          await updateChildCategory(updatedCategory.id, updatedCategory); // Gọi API để cập nhật danh mục con
          console.log("Danh mục con đã được cập nhật:", updatedCategory);
          toast.success("Danh mục con đã được cập nhật thành công!"); // Hiển thị toast thành công
          onUpdateSuccess(updatedCategory); // Thông báo cho cha cập nhật thành công
        } else {
          console.error("Invalid category or category ID for update");
          toast.error("Vui lòng chọn một danh mục hợp lệ!");
        }
      } else {
        console.error("Selected parent category not found");
        toast.error("Danh mục cha không hợp lệ!");
      }
    } catch (error) {
      console.error("Error updating child category:", error.message);
      console.error("Error details:", error.response ? error.response.data : 'No response data available');
      toast.error("Lỗi khi cập nhật danh mục con!"); // Hiển thị toast lỗi
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
            htmlFor="parentCategoryName"
            className="block text-sm font-medium text-white/50 mb-2"
          >
            Chọn danh mục cha
          </label>
          <select
            id="parentCategoryName"
            value={parentCategoryName}
            onChange={(e) => setParentCategoryName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-[#282F36] text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">--Chọn danh mục cha--</option>
            {parentCategories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="childCategoryName"
            className="block text-sm font-medium text-white/50 mb-2"
          >
            Tên danh mục con
          </label>
          <input
            id="childCategoryName"
            type="text"
            value={childCategoryName}
            onChange={(e) => setChildCategoryName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-[#282F36] text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Nhập tên danh mục con"
          />
        </div>
        <div className="flex justify-center gap-4">
            <ShinyRotatingBorderButton type="submit">Lưu thay đổi</ShinyRotatingBorderButton>
          
        </div>
      </form>
    </div>
  );
};

export default UpdateChildCategory;
