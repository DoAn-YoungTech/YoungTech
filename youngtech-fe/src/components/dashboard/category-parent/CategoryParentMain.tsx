"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import CategoryParentTable from "../category-parent/CategoryParentTable";
import AddCategoryParent from "../category-parent/AddCategoryParent";
import EditCategoryParent from "../category-parent/EditCategoryParent";
import ViewCategoryParent from "../category-parent/ViewCategoryParent";

interface CategoryParent {
  id: number;
  name: string;
  flag: boolean;
}

const mockCategoryParents: CategoryParent[] = [
  {
    id: 1,
    name: "Danh mục cha 1",
    flag: true, // Kích hoạt
  },
  {
    id: 2,
    name: "Danh mục cha 2",
    flag: false, // Tạm dừng
  },
  {
    id: 3,
    name: "Danh mục cha 3",
    flag: true, // Kích hoạt
  },
  {
    id: 4,
    name: "Danh mục cha 4",
    flag: false, // Tạm dừng
  },
];

const CategoryParentActions = () => {
  const [categoryParents, setCategoryParents] = useState<CategoryParent[]>(mockCategoryParents);
  const [isAddDialogOpen, setAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedCategoryParent, setSelectedCategoryParent] = useState<CategoryParent | null>(null);
  const [isViewDialogOpen, setViewDialogOpen] = useState(false);
  const [selectedCategoryParentForView, setSelectedCategoryParentForView] = useState<CategoryParent | null>(null);
  
  const handleAddCategoryParent = (newCategoryParent: CategoryParent) => {
    setCategoryParents([...categoryParents, newCategoryParent]);
    setAddDialogOpen(false);
  };

  const handleViewCategoryParent = (id: number) => {
    const categoryParent = categoryParents.find((cat) => cat.id === id);
    if (categoryParent) {
      setSelectedCategoryParentForView(categoryParent);
      setViewDialogOpen(true);
    } else {
      console.error(`Không tìm thấy danh mục cha với ID: ${id}`);
    }
  };
  
  

  const handleEditCategoryParent = (updatedCategoryParent: CategoryParent) => {
    setCategoryParents((prevCategoryParents) =>
      prevCategoryParents.map((cat) =>
        cat.id === updatedCategoryParent.id ? updatedCategoryParent : cat
      )
    );
    setEditDialogOpen(false);
  };

  const handleDeleteCategoryParent = (id: number) => {
    setCategoryParents((prevCategoryParents) =>
      prevCategoryParents.filter((cat) => cat.id !== id)
    );
  };

  const handleEditButtonClick = (categoryParent: CategoryParent) => {
    setSelectedCategoryParent(categoryParent);
    setEditDialogOpen(true);
  };

  return (
    <div>
      <Button className="bg-orange-600" onClick={() => setAddDialogOpen(true)}>
        Thêm Danh Mục 
      </Button>
      <CategoryParentTable
        categoryParents={categoryParents}
        onView={handleViewCategoryParent}
        onEdit={handleEditButtonClick}
        onDelete={handleDeleteCategoryParent}
      />
      <ViewCategoryParent
        isOpen={isViewDialogOpen}
        onClose={() => setViewDialogOpen(false)}
        categoryParent={selectedCategoryParentForView}
      />

      {/* Dialog for Adding Category Parent */}
      <AddCategoryParent
        isOpen={isAddDialogOpen}
        onClose={() => setAddDialogOpen(false)}
        onAdd={handleAddCategoryParent}
      />

      {/* Dialog for Editing Category Parent */}
      <EditCategoryParent
        isOpen={isEditDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        categoryParent={selectedCategoryParent}
        onEdit={handleEditCategoryParent}
      />
    </div>
  );
};

export default CategoryParentActions;
