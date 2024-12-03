// "use client";
// import React, { useState } from "react";
// import { Button } from "@/components/ui/button";

// interface Supplier {
//   id: number;
//   supplierName: string;
//   contactName: string;
//   phoneNumber: string;
//   email: string;
//   address: string;
//   flag: boolean;
// }

// const SupplierMain = () => {
//   const [suppliers, setSuppliers] = useState<Supplier[]>(mockSuppliers);
//   const [isAddDialogOpen, setAddDialogOpen] = useState(false);
//   const [isEditDialogOpen, setEditDialogOpen] = useState(false);
//   const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);
//   const [isViewDialogOpen, setViewDialogOpen] = useState(false);
//   const [selectedSupplierForView, setSelectedSupplierForView] = useState<Supplier | null>(null);

//   const handleAddSupplier = (newSupplier: Supplier) => {
//     setSuppliers([...suppliers, newSupplier]);
//     setAddDialogOpen(false);
//   };

//   const handleViewSupplier = (id: number) => {
//     const supplier = suppliers.find((sup) => sup.id === id);
//     if (supplier) {
//       setSelectedSupplierForView(supplier);
//       setViewDialogOpen(true);
//     } else {
//       console.error(`Không tìm thấy nhà cung cấp với ID: ${id}`);
//     }
//   };

//   const handleEditSupplier = (updatedSupplier: Supplier) => {
//     setSuppliers((prevSuppliers) =>
//       prevSuppliers.map((sup) =>
//         sup.id === updatedSupplier.id ? updatedSupplier : sup
//       )
//     );
//     setEditDialogOpen(false);
//   };

//   const handleDeleteSupplier = (id: number) => {
//     setSuppliers((prevSuppliers) =>
//       prevSuppliers.filter((sup) => sup.id !== id)
//     );
//   };

//   const handleEditButtonClick = (supplier: Supplier) => {
//     setSelectedSupplier(supplier);
//     setEditDialogOpen(true);
//   };

//   return (
//     <div>
//       <Button className="bg-orange-600" onClick={() => setAddDialogOpen(true)}>
//         Thêm Nhà Cung Cấp
//       </Button>
      
//     </div>
//   );
// };

// export default SupplierMain;
