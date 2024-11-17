"use client";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button"; // Giữ nguyên Button
import { Input } from "@/components/ui/input"; // Giữ nguyên Input
import { useForm } from "react-hook-form"; // Import react-hook-form

// Định nghĩa interface cho Employee
interface Employee {
  id: number;
  flag: boolean;
  fullName: string;
  profilePicture: string;
  dateOfBirth: Date;
  phoneNumber: string;
  position: string;
  account_id: number | null;
}

// Định nghĩa interface cho props của AddEmployee
interface AddEmployeeProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (employee: Employee) => void;
}

const AddEmployee: React.FC<AddEmployeeProps> = ({ isOpen, onClose, onAdd }) => {
  // Initialize the useForm hook
  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm<Employee>({
    defaultValues: {
      fullName: "",
      profilePicture: "",
      dateOfBirth: "",
      phoneNumber: "",
      position: "",
      account_id: null,
    },
  });

  // Handle form submission
  const onSubmit = (data: Employee) => {
    const newEmployee = {
      ...data,
      id: Date.now(), // Generate a unique id based on the current timestamp
      flag: true,
      dateOfBirth: new Date(data.dateOfBirth), // Ensure date is a Date object
    };

    onAdd(newEmployee); // Pass the new employee to the parent
    reset(); // Reset the form fields
    onClose(); // Close the modal
  };

  // If the modal is not open, don't render the component
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4">Thêm Nhân Viên</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Full Name */}
          <div>
            <Input
              placeholder="Họ tên"
              {...register("fullName", { required: "Họ tên là bắt buộc" })}
            />
            {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}
          </div>

          {/* Profile Picture */}
          <div>
            <Input
              placeholder="Ảnh đại diện"
              {...register("profilePicture", { required: "Ảnh đại diện là bắt buộc" })}
            />
            {errors.profilePicture && <p className="text-red-500 text-sm">{errors.profilePicture.message}</p>}
          </div>

          {/* Date of Birth */}
          <div>
            <Input
              type="date"
              placeholder="Ngày sinh"
              {...register("dateOfBirth", { required: "Ngày sinh là bắt buộc" })}
            />
            {errors.dateOfBirth && <p className="text-red-500 text-sm">{errors.dateOfBirth.message}</p>}
          </div>

          {/* Phone Number */}
          <div>
            <Input
              placeholder="Số điện thoại"
              {...register("phoneNumber", { required: "Số điện thoại là bắt buộc" })}
            />
            {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>}
          </div>

          {/* Position */}
          <div>
            <Input
              placeholder="Chức vụ"
              {...register("position", { required: "Chức vụ là bắt buộc" })}
            />
            {errors.position && <p className="text-red-500 text-sm">{errors.position.message}</p>}
          </div>

          {/* Account ID */}
          <div>
            <Input
              type="number"
              placeholder="Account ID"
              {...register("account_id", { valueAsNumber: true })}
            />
            {errors.account_id && <p className="text-red-500 text-sm">{errors.account_id.message}</p>}
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

export default AddEmployee;
