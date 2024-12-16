"use client";
import { addCategory } from "@/services/category/CategoryParentService";
import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter từ Next.js
import { ShinyRotatingBorderButton } from "../ButtonSave/BtnSave";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddParentCategory = () => {
  const [categoryName, setCategoryName] = useState(""); // Trạng thái tên danh mục
  const router = useRouter(); // Sử dụng router để điều hướng

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!categoryName) {
      toast.error("Vui lòng nhập tên danh mục!"); // Hiển thị toast nếu không nhập tên danh mục
      return;
    }
    try {
      await addCategory({ name: categoryName }); // Gửi API thêm danh mục
      console.log("Category added successfully");
      setCategoryName(""); // Reset trạng thái form
      toast.success("Danh mục đã được thêm thành công!"); // Hiển thị toast thành công
      setTimeout(() => {
        router.push("/dashboard/quanly-danhmuc-sanpham/danhsach-danhmuc-cha");
      }, 6000);
      // Điều hướng về danh sách danh mục cha
    } catch (error) {
      console.error("Error adding category:", error.message);
      toast.error("Lỗi khi thêm danh mục!"); // Hiển thị toast lỗi
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-[#282F36] rounded-lg p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex items-center justify-between mb-6">
          <button
            type="button"
            onClick={() => router.push("/dashboard/quanly-danhmuc-sanpham/danhsach-danhmuc-cha")}
            className="text-blue-600 hover:text-blue-800"
          >
            <ShinyRotatingBorderButton>Quay lại</ShinyRotatingBorderButton>
          </button>
          <h2 className="text-2xl font-bold text-white text-center flex-1">
            Thêm danh mục cha
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
        
            <ShinyRotatingBorderButton type="submit" >Thêm danh mục cha</ShinyRotatingBorderButton>
          
        </div>
      </form>
    </div>
  );
};

export default AddParentCategory;
