"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"; // Giữ nguyên Button
import { Input } from "@/components/ui/input"; // Giữ nguyên Input

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
  const [fullName, setFullName] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [position, setPosition] = useState("");
  const [account_id, setAccountId] = useState<number | null>(null);

  useEffect(() => {
    if (employee) {
      setFullName(employee.fullName);
      setProfilePicture(employee.profilePicture);
      setDateOfBirth(employee.dateOfBirth.toISOString().split("T")[0]);
      setPhoneNumber(employee.phoneNumber);
      setPosition(employee.position);
      setAccountId(employee.account_id);
    }
  }, [employee]);

  const handleSubmit = () => {
    if (employee) {
      const updatedEmployee = {
        ...employee,
        fullName,
        profilePicture,
        dateOfBirth: new Date(dateOfBirth),
        phoneNumber,
        position,
        account_id,
      };
      onEdit(updatedEmployee);
      resetFields();
    }
  };

  const resetFields = () => {
    setFullName("");
    setProfilePicture("");
    setDateOfBirth("");
    setPhoneNumber("");
    setPosition("");
    setAccountId(null);
    onClose(); // Đóng modal
  };

  if (!isOpen) return null; // Không hiển thị nếu không mở

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4">Chỉnh Sửa Nhân Viên</h2>
        <Input
          placeholder="Họ tên"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <Input
          placeholder="Ảnh đại diện"
          value={profilePicture}
          onChange={(e) => setProfilePicture(e.target.value)}
        />
        <Input
          type="date"
          placeholder="Ngày sinh"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
        />
        <Input
          placeholder="Số điện thoại"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <Input
          placeholder="Chức vụ"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        />
        <Input
          type="number"
          placeholder="Account ID"
          value={account_id || ""}
          onChange={(e) => setAccountId(Number(e.target.value) || null)}
        />
        <div className="flex justify-end mt-4">
          <Button onClick={handleSubmit} className="mr-2">Cập Nhật</Button>
          <Button onClick={resetFields}>Hủy</Button>
        </div>
      </div>
    </div>
  );
};

export default EditEmployee;
