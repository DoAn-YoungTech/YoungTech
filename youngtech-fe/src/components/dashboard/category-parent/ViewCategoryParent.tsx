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

interface ViewCategoryParentProps {
  isOpen: boolean; // Xác định xem modal có mở hay không
  onClose: () => void; // Hàm đóng modal
  categoryParent: CategoryParent | null; // Dữ liệu danh mục cha hiện tại
}

const ViewCategoryParent: React.FC<ViewCategoryParentProps> = ({
  isOpen,
  onClose,
  categoryParent,
}) => {
  const { setValue, reset } = useForm<CategoryParent>({
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

  if (!isOpen) return null; // Không hiển thị modal nếu isOpen = false

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4">Chi Tiết Danh Mục Cha</h2>
        <form className="space-y-4">
          {/* Name */}
          <div>
            <label className="text-sm">Tên danh mục</label>
            <Input
              value={categoryParent?.name || ""}
              readOnly
            />
          </div>

          {/* Flag */}
          <div>
            <label className="text-sm">Trạng thái</label>
            <Input
              value={categoryParent?.flag ? "Kích hoạt" : "Tạm dừng"}
              readOnly
            />
          </div>

          {/* Nút hành động */}
          <div className="flex justify-end mt-4">
            <Button
              type="button"
              onClick={() => {
                reset();
                onClose();
              }}
            >
              Đóng
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ViewCategoryParent;
