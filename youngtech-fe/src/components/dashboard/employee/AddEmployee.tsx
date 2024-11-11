"use client";
import React, { useState } from "react";
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

// Định nghĩa interface cho props của AddEmployee
interface AddEmployeeProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (employee: Employee) => void;
}

// Chỉ định kiểu cho AddEmployee
const AddEmployee: React.FC<AddEmployeeProps> = ({ isOpen, onClose, onAdd }) => {
  const [fullName, setFullName] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [position, setPosition] = useState("");
  const [account_id, setAccountId] = useState<number | null>(null);

  const handleSubmit = () => {
    // Kiểm tra tất cả các trường thông tin
    if (!fullName || !profilePicture || !dateOfBirth || !phoneNumber || !position) {
      alert("Vui lòng điền tất cả các trường thông tin.");
      return;
    }

    const newEmployee: Employee = {
      id: Date.now(),
      flag: true,
      fullName,
      profilePicture,
      dateOfBirth: new Date(dateOfBirth),
      phoneNumber,
      position,
      account_id,
    };

    // Gọi hàm onAdd để thêm nhân viên
    onAdd(newEmployee);
    resetFields();
  };

  const resetFields = () => {
    // Đặt lại các trường thông tin
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
        <h2 className="text-lg font-bold mb-4">Thêm Nhân Viên</h2>
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
          onChange={(e) => setAccountId(e.target.value ? Number(e.target.value) : null)}
        />
        <div className="flex justify-end mt-4">
          <Button onClick={handleSubmit} className="mr-2">Lưu</Button>
          <Button onClick={resetFields}>Hủy</Button>
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;
