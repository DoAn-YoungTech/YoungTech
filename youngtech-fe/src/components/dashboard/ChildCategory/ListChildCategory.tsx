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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
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
    setDeleteId(id);
    setIsModalOpen(true); // Show modal
  };

  const confirmDelete = async () => {
    if (deleteId !== null) {
      try {
        await deleteChildCategory(deleteId);
        // Update the category list after deletion
        setCategoriesChild((prevCategories) => prevCategories.filter((category) => category.id !== deleteId));
        console.log("Deleted child category successfully");
        setIsModalOpen(false); // Close modal after deletion
      } catch (error) {
        console.error("Error deleting child category:", error.message);
      }
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
            <ShinyRotatingBorderButton onClick={() => router.push("/dashboard/quanly-danhmuc-sanpham/tao-danhmuc-con")}>
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
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm w-full">
          <h2 className="text-xl font-semibold mb-4 text-white">Xác nhận xóa</h2>
          <p className="mb-6 text-white">Bạn có chắc chắn muốn xóa danh mục này?</p>
          <div className="flex justify-end gap-4">
            <ShinyRotatingBorderButton onClick={() => setIsModalOpen(false)}>Hủy</ShinyRotatingBorderButton>
            <ShinyRotatingBorderButton onClick={confirmDelete}>Xóa</ShinyRotatingBorderButton>
          </div>
        </div>
      </div>
      
      )}
    </div>
  );
};

export default ListChildCategories;
