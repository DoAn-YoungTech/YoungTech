"use client";
import React, { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { updateCategory } from "@/services/category/CategoryParentService";
import { Category_Paren } from '@/types/CategoryTypes';
import { ShinyRotatingBorderButton } from "../ButtonSave/BtnSave";

interface UpdateParentCategoryProps {
  category: Category_Paren;
  onCancel: () => void;
  onUpdateSuccess: (updatedCategory: Category_Paren) => void;
}

const UpdateParentCategory: React.FC<UpdateParentCategoryProps> = ({
  category,
  onCancel,
  onUpdateSuccess,
}) => {
  const [categoryName, setCategoryName] = useState(category.name);
  const router = useRouter();

  const handleEditSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await updateCategory(category.id, { name: categoryName });
      console.log("Updated category successfully");
      onUpdateSuccess({ ...category, name: categoryName });
      setTimeout(() => {
        router.push("/dashboard/quanly-danhmuc-sanpham/danhsach-danhmuc-cha");
      }, 6000);
    } catch (error) {
      console.error("Error updating category:", error.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-[#282F36] rounded-lg p-6">
      <form onSubmit={handleEditSubmit} className="space-y-6">
        <div className="flex items-center justify-between mb-6">
            <ShinyRotatingBorderButton type="button" onClick={onCancel}>
              Quay lại
            </ShinyRotatingBorderButton>
          <h2 className="text-2xl font-bold text-white text-center flex-1">
            Sửa danh mục cha
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
        <div className="flex justify-center gap-4">
          <ShinyRotatingBorderButton type="submit">Lưu thay đổi</ShinyRotatingBorderButton>
        </div>
      </form>
    </div>
  );
};

export default UpdateParentCategory;
