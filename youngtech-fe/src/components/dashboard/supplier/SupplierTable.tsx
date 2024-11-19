"use client";

import React from "react";
import { Table } from "@/components/ui/table"; // Kiểm tra lại đường dẫn components
import { Button } from "@/components/ui/button"; // Kiểm tra lại đường dẫn components
import { FaEdit, FaEye } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

interface Supplier {
  id: number;
  supplierName: string;
  contactName: string;
  phoneNumber: string;
  email: string;
  address: string;
  flag: boolean;
}

interface SupplierTableProps {
  suppliers: Supplier[];
  onEdit: (supplier: Supplier) => void;
  onDelete: (id: number) => void;
  onView: (id: number) => void;  // Thêm phần hiển thị chi tiết nhà cung cấp
}

const SupplierTable: React.FC<SupplierTableProps> = ({
  suppliers,
  onEdit,
  onDelete,
  onView,
}) => {
  return (
    <Table>
      <thead className="text-left">
        <tr>
          <th className="py-5">ID</th>
          <th className="py-5">Liên hệ</th>
          <th className="py-5">Tên Nhà Cung Cấp</th>
          <th className="py-5">Địa Chỉ</th>
          <th className="py-5">Số Điện Thoại</th>
          <th className="py-5">Email</th>
          <th className="py-5">Trạng Thái</th>
          <th className="py-5">Thao Tác</th>
        </tr>
      </thead>
      <tbody>
        {suppliers.map((supplier) => (
          <tr key={supplier.id} className="h-12">
            <td>{supplier.id}</td>
            <td>{supplier.contactName}</td>
            <td>{supplier.supplierName}</td> {/* Tên nhà cung cấp */}
            <td>{supplier.address}</td>
            <td>{supplier.phoneNumber}</td>
            <td>{supplier.email}</td>
            <td>{supplier.flag ? "Hoạt động" : "Ngừng hoạt động"}</td>
            <td className="gap-2 flex">
              <Button
                className="bg-green-500 hover:bg-green-600"
                onClick={() => onView(supplier.id)}
              >
                <FaEye />
              </Button>
              <Button
                className="bg-blue-500 hover:bg-blue-600"
                onClick={() => onEdit(supplier)}
              >
                <FaEdit />
              </Button>
              <Button
                className="bg-red-500 hover:bg-red-600"
                onClick={() => onDelete(supplier.id)}
              >
                <MdDeleteOutline />
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default SupplierTable;
