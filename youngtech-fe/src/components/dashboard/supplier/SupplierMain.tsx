"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import SupplierTable from "../supplier/SupplierTable"; // Giữ nguyên SupplierTable
import AddSupplier from "../supplier/AddSupplier"; // Giữ nguyên AddSupplier
import EditSupplier from "../supplier/EditSupplier"; // Giữ nguyên EditSupplier
import ViewSupplier from "../supplier/ViewSupplier"; // Giữ nguyên ViewSupplier

interface Supplier {
  id: number;
  supplierName: string;
  contactName: string;
  phoneNumber: string;
  email: string;
  address: string;
  flag: boolean;
}

const mockSuppliers: Supplier[] = [
  {
    id: 1,
    supplierName: "Oppo",
    contactName: "Liên hệ 1",
    phoneNumber: "0123456789",
    email: "contact1@gmail.com",
    address: "TP. Hồ Chí Minh",
    flag: true, // Kích hoạt
  },
  {
    id: 2,
    supplierName: "Samsung",
    contactName: "Liên hệ 2",
    phoneNumber: "0987654321",
    email: "contact2@gmail.com",
    address: "Hà Nội",
    flag: false, // Tạm dừng
  },
  {
    id: 3,
    supplierName: "IPhone",
    contactName: "Liên hệ 3",
    phoneNumber: "0169876543",
    email: "contact3@gmail.com",
    address: "Hà Nội",
    flag: true, // Kích hoạt
  },
  {
    id: 4,
    supplierName: "Sony",
    contactName: "Liên hệ 4",
    phoneNumber: "0212345678",
    email: "contact4@gmail.com",
    address: "TP.Hồ Chí Minh",
    flag: false, // Tạm dừng
  },
];

const SupplierActions = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>(mockSuppliers);
  const [isAddDialogOpen, setAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);
  const [isViewDialogOpen, setViewDialogOpen] = useState(false);
  const [selectedSupplierForView, setSelectedSupplierForView] = useState<Supplier | null>(null);

  const handleAddSupplier = (newSupplier: Supplier) => {
    setSuppliers([...suppliers, newSupplier]);
    setAddDialogOpen(false);
  };

  const handleViewSupplier = (id: number) => {
    const supplier = suppliers.find((sup) => sup.id === id);
    if (supplier) {
      setSelectedSupplierForView(supplier);
      setViewDialogOpen(true);
    } else {
      console.error(`Không tìm thấy nhà cung cấp với ID: ${id}`);
    }
  };

  const handleEditSupplier = (updatedSupplier: Supplier) => {
    setSuppliers((prevSuppliers) =>
      prevSuppliers.map((sup) =>
        sup.id === updatedSupplier.id ? updatedSupplier : sup
      )
    );
    setEditDialogOpen(false);
  };

  const handleDeleteSupplier = (id: number) => {
    setSuppliers((prevSuppliers) =>
      prevSuppliers.filter((sup) => sup.id !== id)
    );
  };

  const handleEditButtonClick = (supplier: Supplier) => {
    setSelectedSupplier(supplier);
    setEditDialogOpen(true);
  };

  return (
    <div>
      <Button className="bg-orange-600" onClick={() => setAddDialogOpen(true)}>
        Thêm Nhà Cung Cấp
      </Button>
      <SupplierTable
        suppliers={suppliers}
        onView={handleViewSupplier}
        onEdit={handleEditButtonClick}
        onDelete={handleDeleteSupplier}
      />
      <ViewSupplier
        isOpen={isViewDialogOpen}
        onClose={() => setViewDialogOpen(false)}
        supplier={selectedSupplierForView}
      />

      {/* Dialog for Adding Supplier */}
      <AddSupplier
        isOpen={isAddDialogOpen}
        onClose={() => setAddDialogOpen(false)}
        onAdd={handleAddSupplier}
      />

      {/* Dialog for Editing Supplier */}
      <EditSupplier
        isOpen={isEditDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        supplier={selectedSupplier}
        onEdit={handleEditSupplier}
      />
    </div>
  );
};

export default SupplierActions;
