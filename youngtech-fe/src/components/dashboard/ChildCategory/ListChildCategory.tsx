"use client";
import { getAllChildCategories, deleteChildCategory, updateChildCategory } from "@/services/category/CategoryChildService";
import React, { useEffect, useState } from "react";
import { Category_Child } from "@/types/CategoryTypes";
import ChildCategoriesTable from "./TableChildCategory"; // Import your component for displaying child categories
import UpdateChilCategoryProps from "./updateChildCategory";  // Import your update component for child categories
import { useRouter } from "next/navigation";
import { ShinyRotatingBorderButton } from "../ButtonSave/BtnSave";

const ListChildCategories: React.FC = () => {
  const [categorieschild, setCategoriesChild] = useState<Category_Child[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingCategory, setEditingCategory] = useState<Category_Child | null>(null);
  const router = useRouter();

  // Fetch child categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
  try {
    const response = await getAllChildCategories();
    console.log(response.data); // Kiểm tra dữ liệu API trả về
    if (response && response.data) {
      setCategoriesChild(response.data);
    } else {
      console.log("No data from API");
    }
  } catch (error) {
    console.error("Error fetching child categories:", error.message);
  }
};

  
    fetchCategories();
  }, []);
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredCategories = categorieschild.filter((category) =>
    category.childCateName ? category.childCateName.toLowerCase().includes(searchTerm.toLowerCase()) : false
  );

  const handleEdit = (category: Category_Child) => {
    console.log("Editing child category:", category);
    setEditingCategory(category);
  };

  const handleEditSubmit = async (updatedCategory: Category_Child) => {
    try {
      await updateChildCategory(updatedCategory.id, { childCateName: updatedCategory.childCateName });
      console.log("Updated child category successfully");
      // Update the category list with the new name
      setCategoriesChild((prevCategories) =>
        prevCategories.map((category) =>
          category.id === updatedCategory.id ? updatedCategory : category
        )
      );
      setEditingCategory(null); // Exit editing mode
    } catch (error) {
      console.error("Error updating child category:", error.message);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteChildCategory(id);
      // Update the category list after deletion
      setCategoriesChild((prevCategories) => prevCategories.filter((category) => category.id !== id));
      console.log("Deleted child category successfully");
    } catch (error) {
      console.error("Error deleting child category:", error.message);
    }
  };

  const handleAddClick = () => {
    if (router) {
      router.push("/dashboard/quanly-danhmuc-sanpham/tao-danhmuc-con");
    }
  };

  const handleCancelEdit = () => {
    setEditingCategory(null);
  };

  return (
    <div className="w-full p-4 mx-auto bg-[#282F36] rounded-lg p-6">
      {editingCategory ? (
        <UpdateChilCategoryProps
          category={editingCategory}
          onCancel={handleCancelEdit}
          onUpdateSuccess={handleEditSubmit}
        />
      ) : (
        <>
          <h2 className="text-2xl text-white text-center font-bold mb-4">Danh sách danh mục con</h2>
          <div className="flex justify-between items-center mb-4">
            <input
              type="text"
              placeholder="Tìm kiếm danh mục..."
              value={searchTerm}
              onChange={handleSearch}
              className="mt-1 block px-3 py-2 bg-[#282F36] text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <ShinyRotatingBorderButton onClick={handleAddClick}>
              Thêm danh mục con
            </ShinyRotatingBorderButton>
          </div>
          {filteredCategories.length > 0 ? (
            <ChildCategoriesTable
              categorieschild={filteredCategories}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ) : (
            <p className="text-gray-600"></p>
          )}
        </>
      )}
    </div>
  );
};

export default ListChildCategories;
