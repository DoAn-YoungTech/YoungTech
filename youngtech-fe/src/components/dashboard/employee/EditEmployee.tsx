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

// Định nghĩa interface cho props của EditEmployee
interface EditEmployeeProps {
  isOpen: boolean;
  onClose: () => void;
  employee: Employee | null;
  onEdit: (employee: Employee) => void;
}

const EditEmployee: React.FC<EditEmployeeProps> = ({ isOpen, onClose, employee, onEdit }) => {
  // Initialize the useForm hook
  const { register, handleSubmit, setValue, reset } = useForm<Employee>({
    defaultValues: {
      fullName: "",
      profilePicture: "",
      dateOfBirth: "",
      phoneNumber: "",
      position: "",
      account_id: null,
    },
  });

  // Set form values when employee prop changes
  useEffect(() => {
    if (employee) {
      setValue("fullName", employee.fullName);
      setValue("profilePicture", employee.profilePicture);
      setValue("dateOfBirth", employee.dateOfBirth);
      setValue("phoneNumber", employee.phoneNumber);
      setValue("position", employee.position);
      setValue("account_id", employee.account_id);
    }
  }, [employee, setValue]);

  // Handle form submission
  const onSubmit = (data: Employee) => {
    const updatedEmployee = {
      ...employee,
      ...data, // Spread the updated data
      dateOfBirth: new Date(data.dateOfBirth), // Ensure date is a Date object
    };
    onEdit(updatedEmployee); // Pass the updated employee to the parent
    reset(); // Reset the form fields
    onClose(); // Close the modal
  };

  // If the modal is not open, don't render the component
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4">Chỉnh Sửa Nhân Viên</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Full Name */}
          <Input
            placeholder="Họ tên"
            {...register("fullName", { required: "Họ tên là bắt buộc" })}
          />
          {/* Profile Picture */}
          <Input
            placeholder="Ảnh đại diện"
            {...register("profilePicture", { required: "Ảnh đại diện là bắt buộc" })}
          />
          {/* Date of Birth */}
          <Input
            type="date"
            placeholder="Ngày sinh"
            {...register("dateOfBirth", { required: "Ngày sinh là bắt buộc" })}
          />
          {/* Phone Number */}
          <Input
            placeholder="Số điện thoại"
            {...register("phoneNumber", { required: "Số điện thoại là bắt buộc" })}
          />
          {/* Position */}
          <Input
            placeholder="Chức vụ"
            {...register("position", { required: "Chức vụ là bắt buộc" })}
          />
          {/* Account ID */}
          <Input
            type="number"
            placeholder="Account ID"
            {...register("account_id", { valueAsNumber: true })}
          />
          <div className="flex justify-end mt-4">
            <Button type="submit" className="mr-2">Cập Nhật</Button>
            <Button type="button" onClick={() => { reset(); onClose(); }}>Hủy</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEmployee;
