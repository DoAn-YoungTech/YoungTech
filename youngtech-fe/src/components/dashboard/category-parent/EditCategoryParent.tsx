"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button"; // Giữ nguyên Button
import { Input } from "@/components/ui/input"; // Giữ nguyên Input
import { useForm } from "react-hook-form"; // Import react-hook-form

interface CategoryParent {
  id: number;
  flag: boolean;
  name: string;
}

interface EditCategoryParentProps {
  isOpen: boolean; // Xác định xem modal có mở hay không
  onClose: () => void; // Hàm đóng modal
  categoryParent: CategoryParent | null; // Dữ liệu danh mục cha hiện tại
  onEdit: (categoryParent: CategoryParent) => void; // Hàm xử lý sửa danh mục cha
}

const EditCategoryParent: React.FC<EditCategoryParentProps> = ({
  isOpen,
  onClose,
  categoryParent,
  onEdit,
}) => {
  const { register, handleSubmit, setValue, reset } = useForm<CategoryParent>({
    defaultValues: {
      name: "", // Tên danh mục
      flag: true, // Trạng thái cờ mặc định là true (Kích hoạt)
    },
  });

  // Cập nhật giá trị form khi categoryParent thay đổi
  useEffect(() => {
    if (categoryParent) {
      setValue("name", categoryParent.name);
      setValue("flag", categoryParent.flag);
    }
  }, [categoryParent, setValue]);

  // Xử lý submit form
  const onSubmit = (data: CategoryParent) => {
    const updatedCategoryParent = {
      ...categoryParent,
      ...data, // Gộp dữ liệu mới và cũ
    };
    onEdit(updatedCategoryParent); // Gửi dữ liệu cập nhật về component cha
    reset(); // Reset form
    onClose(); // Đóng modal
  };

  if (!isOpen) return null; // Không hiển thị modal nếu isOpen = false

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4">Chỉnh Sửa Danh Mục Cha</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <Input
            placeholder="Tên danh mục"
            {...register("name", { required: "Tên danh mục là bắt buộc" })}
          />

          {/* Flag */}
          <div>
            <label className="text-sm">Trạng thái</label>
            <select
              {...register("flag", { required: "Trạng thái là bắt buộc" })}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="true">Kích hoạt</option>
              <option value="false">Tạm dừng</option>
            </select>
          </div>

          {/* Nút hành động */}
          <div className="flex justify-end mt-4">
            <Button type="submit" className="mr-2">
              Cập Nhật
            </Button>
            <Button
              type="button"
              onClick={() => {
                reset();
                onClose();
              }}
            >
              Hủy
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCategoryParent;
