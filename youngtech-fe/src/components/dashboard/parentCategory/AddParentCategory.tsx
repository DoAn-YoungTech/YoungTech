"use client";
import { addCategory } from "@/services/category/CategoryParentService"; 
import React, { useState, useEffect } from "react";
import { ShinyRotatingBorderButton } from "../ButtonSave/BtnSave";

const AddParentCategory = () => {
  const [categoryName, setCategoryName] = useState("");
  const [navigate, setNavigate] = useState(false); // State để kiểm tra điều hướng

  useEffect(() => {
    if (navigate) {
      window.location.href = "/dashboard/quanly-danhmuc-sanpham/danhsach-danhmuc-cha";
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addCategory({ name: categoryName });
      console.log("Category added successfully");
      setCategoryName("");
      setNavigate(true); // Set navigate to true to trigger useEffect
    } catch (error) {
      console.error("Error adding category:", error.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-[#282F36] rounded-lg p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex items-center justify-between mb-6">
          <button
            type="button"
            onClick={() => setNavigate(true)}
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
          <button
            type="submit"
            className="px-4 py-2 text-white rounded-md "
          >
            <ShinyRotatingBorderButton>Thêm danh mục cha</ShinyRotatingBorderButton>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddParentCategory;
