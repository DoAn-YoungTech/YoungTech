"use client";

import {
  getAllSupplier,
  deleteSupplier,
} from "@/services/supplier/SupplierService";
import React, { useEffect, useState } from "react";
import { Supplier } from "@/types/SupplierTypes";
import SuppliersTable from "./TableSupplier"; // Bảng hiển thị danh sách nhà cung cấp
import { useRouter } from "next/navigation";
import { ShinyRotatingBorderButton } from "../ButtonSave/BtnSave";
import UpdateSupplier from "./UpdateSupplier"; // Component chỉnh sửa nhà cung cấp

const ListSuppliers: React.FC = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const router = useRouter();

  // Lấy danh sách nhà cung cấp từ API khi component được mount
  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await getAllSupplier();
        if (response && response.data) {
          setSuppliers(response.data);
        } else {
          console.log("No data from API");
        }
      } catch (error) {
        console.error("Error fetching suppliers:", error.message);
      }
    };

    fetchSuppliers();
  }, []);

  // Tìm kiếm nhà cung cấp
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredSuppliers = suppliers.filter((supplier) =>
    supplier.supplierName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Bắt đầu chỉnh sửa nhà cung cấp
  const handleEdit = (supplier: Supplier) => {
    setEditingSupplier(supplier);
  };

  // Xử lý khi chỉnh sửa thành công
  const handleEditSubmit = (updatedSupplier: Supplier) => {
    setSuppliers((prevSuppliers) =>
      prevSuppliers.map((supplier) =>
        supplier.id === updatedSupplier.id ? updatedSupplier : supplier
      )
    );
    setEditingSupplier(null); // Thoát chế độ chỉnh sửa
  };

  // Hủy chỉnh sửa
  const handleCancelEdit = () => {
    setEditingSupplier(null);
  };

  // Xóa nhà cung cấp
  const handleDelete = async (id: number) => {
    setDeleteId(id);
    setIsModalOpen(true); // Mở modal xác nhận
  };

  const confirmDelete = async () => {
    if (deleteId !== null) {
      try {
        await deleteSupplier(deleteId);
        setSuppliers((prevSuppliers) =>
          prevSuppliers.filter((supplier) => supplier.id !== deleteId)
        );
        console.log("Deleted supplier successfully");
        setIsModalOpen(false); // Đóng modal sau khi xóa
      } catch (error) {
        console.error("Error deleting supplier:", error.message);
      }
    }
  };
  
  return (
    <div className="w-full p-4 mx-auto bg-[#282F36] rounded-lg p-6">
      {editingSupplier ? (
        <UpdateSupplier
          supplier={editingSupplier}
          onCancel={handleCancelEdit}
          onUpdateSuccess={handleEditSubmit}
        />
      ) : (
        <>
          <h2 className="text-2xl text-white text-center font-bold mb-4">Danh sách nhà cung cấp</h2>
          <div className="flex justify-between items-center mb-4">
            <input
              type="text"
              placeholder="Tìm kiếm nhà cung cấp..."
              value={searchTerm}
              onChange={handleSearch}
              className="mt-1 block px-3 py-2 bg-[#282F36] text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <ShinyRotatingBorderButton
              onClick={() =>
                router.push("/dashboard/quanly-nha-cungcap/them-cungcap")
              }
            >
              Thêm nhà cung cấp
            </ShinyRotatingBorderButton>
          </div>
          {filteredSuppliers.length > 0 ? (
            <SuppliersTable
              suppliers={filteredSuppliers}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ) : (
            <p className="text-gray-600">Không tìm thấy nhà cung cấp nào.</p>
          )}
        </>
      )}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-semibold mb-4 text-white">Xác nhận xóa</h2>
            <p className="mb-6 text-white">Bạn có chắc chắn muốn xóa nhà cung cấp này?</p>
            <div className="flex justify-end gap-4">
              <ShinyRotatingBorderButton onClick={() => setIsModalOpen(false)}>
                Hủy
              </ShinyRotatingBorderButton>
              <ShinyRotatingBorderButton onClick={confirmDelete}>
                Xóa
              </ShinyRotatingBorderButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListSuppliers;
