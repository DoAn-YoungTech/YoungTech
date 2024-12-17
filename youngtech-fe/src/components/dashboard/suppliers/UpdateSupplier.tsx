"use client";

import React, { useState } from "react";
import { ShinyRotatingBorderButton } from "../ButtonSave/BtnSave";
import { toast } from "react-toastify";
import { Supplier } from "@/types/SupplierTypes";
import { updateSupplier } from "@/services/supplier/SupplierService";

interface UpdateSupplierProps {
  supplier: Supplier; // Nhà cung cấp được chỉnh sửa
  onCancel: () => void; // Hủy chỉnh sửa
  onUpdateSuccess: (updatedSupplier: Supplier) => void; // Callback gửi kết quả về
}

const UpdateSupplier: React.FC<UpdateSupplierProps> = ({
  supplier,
  onCancel,
  onUpdateSuccess,
}) => {
  const [supplierName, setSupplierName] = useState<string>(supplier.supplierName);
  const [contactName, setContactName] = useState<string>(supplier.contactName);
  const [phoneNumber, setPhoneNumber] = useState<string>(supplier.phoneNumber);
  const [email, setEmail] = useState<string>(supplier.email);
  const [address, setAddress] = useState<string>(supplier.address);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!supplierName || !contactName || !phoneNumber || !email || !address) {
      toast.error("Vui lòng điền đầy đủ thông tin nhà cung cấp!");
      return;
    }

    const updatedSupplier: Supplier = {
      ...supplier,
      supplierName,
      contactName,
      phoneNumber,
      email,
      address,
    };

    try {
      await updateSupplier(updatedSupplier.id, updatedSupplier);
      toast.success("Nhà cung cấp đã được cập nhật thành công!");
      onUpdateSuccess(updatedSupplier); // Gửi nhà cung cấp đã chỉnh sửa về cha
    } catch (error: any) {
      console.error("Error updating supplier:", error.message);
      toast.error("Lỗi khi cập nhật nhà cung cấp!");
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-[#282F36] rounded-lg p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex items-center justify-between mb-6">
          <ShinyRotatingBorderButton type="button" onClick={onCancel}>
            Quay lại
          </ShinyRotatingBorderButton>
          <h2 className="text-2xl font-bold text-white text-center flex-1">
            Sửa Nhà Cung Cấp
          </h2>
        </div>

        <div>
          <label
            htmlFor="supplierName"
            className="block text-sm font-medium text-white/50 mb-2"
          >
            Tên Nhà Cung Cấp
          </label>
          <input
            id="supplierName"
            type="text"
            value={supplierName}
            onChange={(e) => setSupplierName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-[#282F36] text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Nhập tên nhà cung cấp"
          />
        </div>

        <div>
          <label
            htmlFor="contactName"
className="block text-sm font-medium text-white/50 mb-2"
          >
            Tên Người Liên Hệ
          </label>
          <input
            id="contactName"
            type="text"
            value={contactName}
            onChange={(e) => setContactName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-[#282F36] text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Nhập tên người liên hệ"
          />
        </div>

        <div>
          <label
            htmlFor="phoneNumber"
            className="block text-sm font-medium text-white/50 mb-2"
          >
            Số Điện Thoại
          </label>
          <input
            id="phoneNumber"
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-[#282F36] text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Nhập số điện thoại"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-white/50 mb-2"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-[#282F36] text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Nhập email"
          />
        </div>

        <div>
          <label
            htmlFor="address"
            className="block text-sm font-medium text-white/50 mb-2"
          >
            Địa Chỉ
          </label>
          <input
            id="address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-[#282F36] text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Nhập địa chỉ"
          />
        </div>

        <div className="flex justify-center gap-4">
          <ShinyRotatingBorderButton type="submit">
            Lưu thay đổi
          </ShinyRotatingBorderButton>
        </div>
      </form>
    </div>
  );
};

export default UpdateSupplier;