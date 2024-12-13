"use client";
import { getAllCategory, deleteCategory, updateCategory } from "@/services/category/CategoryParentService";
import React, { useEffect, useState } from "react";
import { Category_Paren } from "@/types/CategoryTypes";
import ParentCategoryTable from "./TableParentCategory";
import UpdateParentCategory from "./updateParentCategory";  // Import your new component
import { useRouter } from "next/navigation";
import { ShinyRotatingBorderButton } from "../ButtonSave/BtnSave";

const ListParentCategories: React.FC = () => {
  const [categories, setCategories] = useState<Category_Paren[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingCategory, setEditingCategory] = useState<Category_Paren | null>(null);
  const router = useRouter();

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategory();
        if (response && response.data) {
          setCategories(response.data);
          console.log("Fetched categories successfully");
        } else {
          console.log("No data from API");
        }
      } catch (error) {
        console.error("Error fetching categories:", error.message);
      }
    };

    fetchCategories();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (category: Category_Paren) => {
    console.log("Editing category:", category);
    setEditingCategory(category);
  };

  const handleEditSubmit = async (updatedCategory: Category_Paren) => {
    try {
      await updateCategory(updatedCategory.id, { name: updatedCategory.name });
      console.log("Updated category successfully");
      // Update the category list with the new name
      setCategories((prevCategories) =>
        prevCategories.map((category) =>
          category.id === updatedCategory.id ? updatedCategory : category
        )
      );
      setEditingCategory(null); // Exit editing mode
    } catch (error) {
      console.error("Error updating category:", error.message);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteCategory(id);
      // Update the category list after deletion
      setCategories((prevCategories) => prevCategories.filter((category) => category.id !== id));
      console.log("Deleted category successfully");
    } catch (error) {
      console.error("Error deleting category:", error.message);
    }
  };

  const handleAddClick = () => {
    if (router) {
      router.push("/dashboard/quanly-danhmuc-sanpham/tao-danhmuc-cha");
    }
  };

  const handleCancelEdit = () => {
    setEditingCategory(null);
  };

  return (
    <div className="w-full  p-4 mx-auto bg-[#282F36] rounded-lg p-6">
      {editingCategory ? (
        <UpdateParentCategory
          category={editingCategory}
          onCancel={handleCancelEdit}
          onUpdateSuccess={handleEditSubmit}
        />
      ) : (
        <>
          <h2 className="text-2xl text-white text-center font-bold mb-4">Danh sách danh mục cha</h2>
          <div className="flex justify-between items-center mb-4">
            
            <input
              type="text"
              placeholder="Tìm kiếm danh mục..."
              value={searchTerm}
              onChange={handleSearch}
              className="mt-1 block px-3 py-2 bg-[#282F36] text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
              <ShinyRotatingBorderButton onClick={handleAddClick}>Thêm danh mục</ShinyRotatingBorderButton>
          </div>
          {filteredCategories.length > 0 ? (
            <ParentCategoryTable
              categories={filteredCategories}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ) : (
            <p className="text-gray-600">Loading...</p>
          )}
        </>
      )}
    </div>
  );
};

export default ListParentCategories;
