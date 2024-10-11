"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
// import Header from "@/components/admin/header";
const suppliersData = [
    {
      id: 1,
      supplierCode: "SUP001",
      supplierName: "Nhà cung cấp A",
      address: "123 Đường ABC, Quận 1, TP.HCM",
      phone: "0901234567",
      email: "nhacungcapa@example.com",
      action: "Edit/Delete",
    },
    {
      id: 2,
      supplierCode: "SUP002",
      supplierName: "Nhà cung cấp B",
      address: "456 Đường DEF, Quận 2, TP.HCM",
      phone: "0902345678",
      email: "nhacungcapb@example.com",
      action: "Edit/Delete",
    },
    {
      id: 3,
      supplierCode: "SUP003",
      supplierName: "Nhà cung cấp C",
      address: "789 Đường GHI, Quận 3, TP.HCM",
      phone: "0903456789",
      email: "nhacungcapc@example.com",
      action: "Edit/Delete",
    },
    {
      id: 4,
      supplierCode: "SUP004",
      supplierName: "Nhà cung cấp D",
      address: "101 Đường JKL, Quận 4, TP.HCM",
      phone: "0904567890",
      email: "nhacungcapd@example.com",
      action: "Edit/Delete",
    },
  ];
  

const Suppliers: React.FC = () => {
  const [showEntries, setShowEntries] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  return (
    
    <div>
{/* <Header /> */}
    <div className="p-6 bg-white shadow-md min-h-screen">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold">Nhà cung cấp</h1>
        
      </div>
      <div className="mb-4">
        <label htmlFor="entries" className="mr-2">
          Hiển thị
        </label>
        <select
          id="entries"
          value={showEntries}
          onChange={(e) => setShowEntries(Number(e.target.value))}
          className="border border-gray-300 rounded p-2"
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>
      <div className="flex justify-between items-center mb-6">
      <input
        type="text"
        placeholder="Tìm kiếm..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border border-gray-300 rounded p-2 mb-4"
      />
      <Link href="/admin/suppliers/add-supplier">
      <button type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
          + Thêm nhà cung cấp
        </button>
      </Link>
      </div>
      
     

      

      <table className="min-w-full border border-gray-300 text-center">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 p-2">Số thứ tự</th>
            <th className="border border-gray-300 p-2">Mã nhà cung cấp</th>
            <th className="border border-gray-300 p-2">Tên nhà cung cấp</th>
            <th className="border border-gray-300 p-2">Địa chỉ</th>
            <th className="border border-gray-300 p-2">Số điện thoại</th>
            <th className="border border-gray-300 p-2">Email</th>
            <th className="border border-gray-300 p-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
       
          {suppliersData
            .filter(supplier =>
                supplier.supplierName.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .slice(0, showEntries) // Hiện thị theo số lượng mục đã chọn
            .map((supplier) => (
              <tr key={supplier.id}>
                <td className="border border-gray-300 p-2">{supplier.id}</td>
                <td className="border border-gray-300 p-2">{supplier.supplierCode}</td>
                <td className="border border-gray-300 p-2">{supplier.supplierName}</td>
                <td className="border border-gray-300 p-2">{supplier.address}</td>
                <td className="border border-gray-300 p-2">{supplier.phone}</td>
                <td className="border border-gray-300 p-2">{supplier.email}</td>
                <td className="border border-gray-300 p-2 space-x-3 justify-center">
                <Link href={`/admin/categories/${supplier.id}`}>
                  <FontAwesomeIcon icon={faEye} className="text-blue-500 cursor-pointer" />
                </Link>
                <FontAwesomeIcon icon={faEdit} className="text-yellow-500 cursor-pointer" />
                <FontAwesomeIcon icon={faTrash} className="text-red-500 cursor-pointer" />
              </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default Suppliers;
