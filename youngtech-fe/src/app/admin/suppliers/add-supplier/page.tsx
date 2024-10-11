"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import Link from "next/link"; // Import Link từ Next.js

const AddSupplier: React.FC = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const router = useRouter(); // Khởi tạo useRouter

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Xử lý gửi dữ liệu (API hoặc state management)
    console.log("Thêm nhà cung cấp:", {
      name,
      address,
      email,
      phone,
    });

    // Điều hướng sau khi thêm nhà cung cấp thành công
    router.push("/admin/suppliers");
  };

  return (
    <div className="p-6 bg-white shadow-md">
      <h1 className="text-3xl font-bold mb-4">Thêm nhà cung cấp</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1">Tên nhà cung cấp</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 rounded p-2 w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Địa chỉ</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="border border-gray-300 rounded p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Số điện thoại</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border border-gray-300 rounded p-2 w-full"
            required
          />
        </div>

        <Link href="/admin/suppliers" passHref>
          <button
            type="button"
            className="bg-gray-500 text-white px-4 py-2 rounded mr-4 hover:bg-gray-600 transition-colors"
          >
            Huỷ
          </button>
        </Link>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Thêm nhà cung cấp
        </button>
      </form>
    </div>
  );
};

export default AddSupplier;
