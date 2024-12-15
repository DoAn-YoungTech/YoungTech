"use client";
import { addChildCategory } from "@/services/category/CategoryChildService";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ShinyRotatingBorderButton } from "../ButtonSave/BtnSave";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddChildCategory = () => {
  const [parentCategories, setParentCategories] = useState([]);
  const [parentCategoryName, setParentCategoryName] = useState("");
  const [childCategoryName, setChildCategoryName] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchParentCategories = async () => {
      try {
        const response = await axios.get(`http://localhost:3400/api/parencategories`);
        setParentCategories(response.data.data);
      } catch (error) {
        console.error("Error fetching parent categories:", error.message);
      }
    };

    fetchParentCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous error

    if (!childCategoryName || !parentCategoryName) {
      toast.error("Vui lòng điền đầy đủ thông tin!"); // Show error toast
      return;
    }
    try {
      const selectedCategory = parentCategories.find((cat) => cat.name === parentCategoryName);
      if (selectedCategory) {
        await addChildCategory({
          childCateName: childCategoryName,
          parentCategory_id: selectedCategory.id,
          flag: false,
        });

        // Hiển thị toast thành công
        toast.success("Danh mục con đã được thêm thành công!");
        setChildCategoryName("");
        setParentCategoryName("");

        // Điều hướng sau 2 giây
        setTimeout(() => {
          router.push("/dashboard/quanly-danhmuc-sanpham/danhsach-danhmuc-con");
        }, 6000);
      } else {
        toast.error("Không tìm thấy danh mục cha đã chọn.");
      }
    } catch (error) {
      console.error("Error adding child category:", error.message);
      toast.error("Lỗi khi thêm danh mục con!");
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-[#282F36] rounded-lg p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex items-center justify-between mb-6">
          <button
            type="button"
            onClick={() =>
              router.push("/dashboard/quanly-danhmuc-sanpham/danhsach-danhmuc-con")
            }
            className="text-blue-600 hover:text-blue-800"
          >
            <ShinyRotatingBorderButton>Quay lại</ShinyRotatingBorderButton>
          </button>
          <h2 className="text-2xl font-bold text-white text-center flex-1">
            Thêm danh mục con
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
        {error && (
          <div className="text-red-500 text-sm mt-2">{error}</div>
        )}
        <div className="flex justify-center gap-4">
            <ShinyRotatingBorderButton type="submit" >Thêm danh mục con</ShinyRotatingBorderButton>
        </div>
      </form>
    </div>
  );
};

export default AddChildCategory;
