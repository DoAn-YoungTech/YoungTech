"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button"; // Giữ nguyên Button
import { Input } from "@/components/ui/input"; // Giữ nguyên Input
import axios from "axios";

interface AddParentCategoryProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (parentCategory: { id: number; name: string; flag: boolean }) => void;
}

const AddParentCategory: React.FC<AddParentCategoryProps> = ({
  isOpen,
  onClose,
  onAdd,
}) => {
  const [name, setName] = useState("");

  const handleSubmit = async () => {
    if (!name) {
      alert("Vui lòng nhập tên danh mục.");
      return;
    }

    try {
      // Gửi dữ liệu đến API backend
      const response = await axios.post("/api/parent-categories", {
        name,
        flag: true, // Mặc định là true
      });

      // Lấy dữ liệu từ phản hồi API
      const newCategory = response.data;
      onAdd(newCategory); // Cập nhật danh sách danh mục
      resetFields(); // Đặt lại các trường
    } catch (error) {
      console.error("Lỗi khi thêm danh mục cha:", error);
      alert("Không thể thêm danh mục. Vui lòng thử lại.");
    }
  };

  const resetFields = () => {
    setName("");
    onClose(); // Đóng modal
  };

  if (!isOpen) return null; // Không hiển thị nếu không mở modal

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4">Thêm Danh Mục Cha</h2>
        <Input
          placeholder="Tên danh mục"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div className="flex justify-end mt-4">
          <Button onClick={handleSubmit} className="mr-2">
            Lưu
          </Button>
          <Button onClick={resetFields}>Hủy</Button>
        </div>
      </div>
    </div>
  );
};

export default AddParentCategory;
