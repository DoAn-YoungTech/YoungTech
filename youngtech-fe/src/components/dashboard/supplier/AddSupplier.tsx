"use client";

import { Button } from "@/components/ui/button"; // Giữ nguyên Button
import { Input } from "@/components/ui/input"; // Giữ nguyên Input
import { useForm } from "react-hook-form"; // Import react-hook-form

interface Supplier {
  id: number;
  flag: boolean;
  supplierName: string;
  contactName: string;
  phoneNumber: string;
  email: string;
  address: string;
}

interface AddSupplierProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (supplier: Supplier) => void;
}

const AddSupplier: React.FC<AddSupplierProps> = ({ isOpen, onClose, onAdd }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Supplier>({
    defaultValues: {
      flag: false,
      supplierName: "",
      contactName: "",
      phoneNumber: "",
      email: "",
      address: "",
    },
  });

  const onSubmit = (data: Supplier) => {
    const newSupplier = {
      ...data,
      id: Date.now(), // Tạo ID duy nhất dựa trên timestamp
    };
    onAdd(newSupplier); // Gọi hàm onAdd để gửi dữ liệu lên cha
    reset(); // Reset form
    onClose(); // Đóng modal
  };

  if (!isOpen) return null; // Không hiển thị nếu không mở modal

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4">Thêm Nhà Cung Cấp</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Supplier Name */}
          <div>
            <Input
              placeholder="Tên nhà cung cấp"
              {...register("supplierName", { required: "Tên nhà cung cấp là bắt buộc" })}
            />
            {errors.supplierName && <p className="text-red-500 text-sm">{errors.supplierName.message}</p>}
          </div>

          {/* Contact Name */}
          <div>
            <Input
              placeholder="Tên liên hệ"
              {...register("contactName", { required: "Tên liên hệ là bắt buộc" })}
            />
            {errors.contactName && <p className="text-red-500 text-sm">{errors.contactName.message}</p>}
          </div>

          {/* Phone Number */}
          <div>
            <Input
              placeholder="Số điện thoại"
              {...register("phoneNumber", { required: "Số điện thoại là bắt buộc" })}
            />
            {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>}
          </div>

          {/* Email */}
          <div>
            <Input
              type="email"
              placeholder="Email"
              {...register("email", { required: "Email là bắt buộc" })}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          {/* Address */}
          <div>
            <Input
              placeholder="Địa chỉ"
              {...register("address", { required: "Địa chỉ là bắt buộc" })}
            />
            {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
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

export default AddSupplier;
