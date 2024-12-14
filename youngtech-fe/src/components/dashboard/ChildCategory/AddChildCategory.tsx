"use client";
import { addChildCategory } from "@/services/category/CategoryChildService";
import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios for API call
import { ShinyRotatingBorderButton } from "../ButtonSave/BtnSave";

const AddChildCategory = () => {
  const [parentCategories, setParentCategories] = useState([]); // State to store parent categories
  const [parentCategoryName, setParentCategoryName] = useState(""); // State for selected parent category
  const [childCategoryName, setChildCategoryName] = useState(""); // State for child category name
  const [navigate, setNavigate] = useState(false); // State to handle navigation

  useEffect(() => {
    const fetchParentCategories = async () => {
      try {
        const response = await axios.get(`http://localhost:3400/api/parencategories`);
        setParentCategories(response.data.data); // Ensure response.data is an array
      } catch (error) {
        console.error("Error fetching parent categories:", error.message);
        console.error("Error details:", error.response ? error.response.data : 'No response data available');
      }
    };

    fetchParentCategories();
  }, []);

  useEffect(() => {
    if (navigate) {
      window.location.href = "/dashboard/quanly-danhmuc-sanpham/danhsach-danhmuc-con";
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Find the ID of the selected parent category
      const selectedCategory = parentCategories.find(cat => cat.name === parentCategoryName);
      if (selectedCategory) {
        await addChildCategory({
          childCateName: childCategoryName,
          parentCategory_id: selectedCategory.id,
          flag: false // Default flag to false
        });
        console.log("Child category added successfully");
        setChildCategoryName("");
        setParentCategoryName("");
        setNavigate(true); // Set navigate to true to trigger useEffect
      } else {
        console.error("Selected parent category not found");
      }
    } catch (error) {
      console.error("Error adding child category:", error.message);
      console.error("Error details:", error.response ? error.response.data : 'No response data available');
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
        <div className="flex justify-center gap-4">
          <button
            type="submit"
            className="px-4 py-2 text-white rounded-md"
          >
            <ShinyRotatingBorderButton>Thêm danh mục con</ShinyRotatingBorderButton>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddChildCategory;
