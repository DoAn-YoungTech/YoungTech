// "use client";

// import React, { useEffect } from "react";
// import { Button } from "@/components/ui/button"; // Giữ nguyên Button
// import { Input } from "@/components/ui/input"; // Giữ nguyên Input
// import { useForm } from "react-hook-form"; // Import react-hook-form

// interface Supplier {
//   id: number;
//   supplierName: string;
//   contactName: string;
//   phoneNumber: string;
//   email: string;
//   address: string;
//   flag: boolean;
// }

// interface ViewSupplierProps {
//   isOpen: boolean; // Xác định xem modal có mở hay không
//   onClose: () => void; // Hàm đóng modal
//   supplier: Supplier | null; // Dữ liệu nhà cung cấp hiện tại
// }

// const ViewSupplier: React.FC<ViewSupplierProps> = ({
//   isOpen,
//   onClose,
//   supplier,
// }) => {
//   const { setValue, reset } = useForm<Supplier>({
//     defaultValues: {
//       supplierName: "", // Tên nhà cung cấp
//       contactName: "", // Liên hệ
//       phoneNumber: "", // Số điện thoại
//       email: "", // Email
//       address: "", // Địa chỉ
//       flag: true, // Trạng thái cờ mặc định là true (Hoạt động)
//     },
//   });

//   // Cập nhật giá trị form khi supplier thay đổi
//   useEffect(() => {
//     if (supplier) {
//       setValue("supplierName", supplier.supplierName);
//       setValue("contactName", supplier.contactName);
//       setValue("phoneNumber", supplier.phoneNumber);
//       setValue("email", supplier.email);
//       setValue("address", supplier.address);
//       setValue("flag", supplier.flag);
//     }
//   }, [supplier, setValue]);

//   if (!isOpen) return null; // Không hiển thị modal nếu isOpen = false

//   return (
//     <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-96">
//         <h2 className="text-lg font-bold mb-4">Chi Tiết Nhà Cung Cấp</h2>
//         <form className="space-y-4">
//           {/* Supplier Name */}
//           <div>
//             <label className="text-sm">Tên nhà cung cấp</label>
//             <Input
//               value={supplier?.supplierName || ""}
//               readOnly
//             />
//           </div>

//           {/* Contact Name */}
//           <div>
//             <label className="text-sm">Liên hệ</label>
//             <Input
//               value={supplier?.contactName || ""}
//               readOnly
//             />
//           </div>

//           {/* Phone Number */}
//           <div>
//             <label className="text-sm">Số điện thoại</label>
//             <Input
//               value={supplier?.phoneNumber || ""}
//               readOnly
//             />
//           </div>

//           {/* Email */}
//           <div>
//             <label className="text-sm">Email</label>
//             <Input
//               value={supplier?.email || ""}
//               readOnly
//             />
//           </div>

//           {/* Address */}
//           <div>
//             <label className="text-sm">Địa chỉ</label>
//             <Input
//               value={supplier?.address || ""}
//               readOnly
//             />
//           </div>

//           {/* Flag */}
//           <div>
//             <label className="text-sm">Trạng thái</label>
//             <Input
//               value={supplier?.flag ? "Hoạt động" : "Ngừng hoạt động"}
//               readOnly
//             />
//           </div>

//           {/* Nút hành động */}
//           <div className="flex justify-end mt-4">
//             <Button
//               type="button"
//               onClick={() => {
//                 reset();
//                 onClose();
//               }}
//             >
//               Đóng
//             </Button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ViewSupplier;
