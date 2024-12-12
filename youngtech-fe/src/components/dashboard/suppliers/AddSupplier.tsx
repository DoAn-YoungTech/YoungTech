"use client";
import { addSupplier } from "@/services/supplier/SupplierService"; 
import React, { useState, useEffect } from "react";
import { ShinyRotatingBorderButton } from "../ButtonSave/BtnSave";

const AddSupplier = () => {
  const [supplierName, setSupplierName] = useState("");
  const [contactName, setContactName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [navigate, setNavigate] = useState(false); // State to trigger navigation

  useEffect(() => {
    if (navigate) {
      window.location.href = "/dashboard/quanly-nha-cungcap";
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const supplierData = {
        supplierName,
        contactName,
        phoneNumber,
        email,  
        address,
      };
      await addSupplier(supplierData);
      console.log('Supplier added successfully');
      setSupplierName("");
      setContactName("");
      setPhoneNumber("");
      setEmail("");
      setAddress("");
      setNavigate(true); // Trigger navigation
    } catch (error) {
      console.error('Error adding supplier:', error.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-[#282F36] rounded-lg p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex items-center justify-between mb-6">
          <button
            type="button"
            onClick={() => setNavigate(true)}
            className="text-blue-600 hover:text-blue-800"
          >
            <ShinyRotatingBorderButton>Quay lại</ShinyRotatingBorderButton>
          </button>
          <h2 className="text-2xl font-bold text-white text-center flex-1">
            Thêm nhà cung cấp
          </h2>
        </div>

        {/* Supplier Name */}
        <div>
          <label htmlFor="supplierName" className="block text-sm font-medium text-white/50 mb-2">
            Tên nhà cung cấp
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

        {/* Contact Name */}
        <div>
          <label htmlFor="contactName" className="block text-sm font-medium text-white/50 mb-2">
            Tên người liên hệ
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

        {/* Phone Number */}
        <div>
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-white/50 mb-2">
            Số điện thoại
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

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-white/50 mb-2">
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

        {/* Address */}
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-white/50 mb-2">
            Địa chỉ
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
          <button type="submit" className="px-4 py-2 text-white rounded-md">
            <ShinyRotatingBorderButton>Thêm nhà cung cấp</ShinyRotatingBorderButton>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddSupplier;
