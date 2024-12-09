"use client";

import { Button } from "@/components/ui/button"; // Giữ nguyên Button
import { Input } from "@/components/ui/input"; // Giữ nguyên Input
import { useForm } from "react-hook-form"; // Import react-hook-form

interface CategoryParent {
  id: number;
  flag: boolean;
  name: string;
}

interface AddCategoryParentProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (categoryParent: CategoryParent) => void;
}

const AddCategoryParent: React.FC<AddCategoryParentProps> = ({ isOpen, onClose, onAdd }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryParent>({
    defaultValues: {
      flag: false,
      name: "",
    },
  });

  const onSubmit = (data: CategoryParent) => {
    const newCategoryParent = {
      ...data,
      id: Date.now(), // Tạo ID duy nhất dựa trên timestamp
    };
    onAdd(newCategoryParent); // Gọi hàm onAdd để gửi dữ liệu lên cha
    reset(); // Reset form
    onClose(); // Đóng modal
  };

  if (!isOpen) return null; // Không hiển thị nếu không mở modal

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4">Thêm Danh Mục Cha</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div>
            <Input
              placeholder="Tên danh mục"
              {...register("name", { required: "Tên danh mục là bắt buộc" })}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          {/* Flag */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Cờ trạng thái</label>
            <select
              {...register("flag", { required: "Cờ trạng thái là bắt buộc" })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="true">Kích hoạt</option>
              <option value="false">Vô hiệu hóa</option>
            </select>
            {errors.flag && <p className="text-red-500 text-sm">{errors.flag.message}</p>}
          </div>

          <div className="flex justify-end mt-4">
            <Button type="submit" className="mr-2">Lưu</Button>
            <Button type="button" onClick={() => { reset(); onClose(); }}>Hủy</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategoryParent;
