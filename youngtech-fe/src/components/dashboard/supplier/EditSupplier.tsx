// "use client";

// import React, { useEffect } from "react";
// import { Button } from "@/components/ui/button"; // Giữ nguyên Button
// import { Input } from "@/components/ui/input"; // Giữ nguyên Input
// import { useForm } from "react-hook-form"; // Import react-hook-form

// interface Supplier {
//   id: number;
//   flag: boolean;
//   supplierName: string;
//   contactName: string;
//   phoneNumber: string;
//   email: string;
//   address: string;
// }

// interface EditSupplierProps {
//   isOpen: boolean; // Xác định xem modal có mở hay không
//   onClose: () => void; // Hàm đóng modal
//   supplier: Supplier | null; // Dữ liệu nhà cung cấp hiện tại
//   onEdit: (supplier: Supplier) => void; // Hàm xử lý sửa nhà cung cấp
// }

// const EditSupplier: React.FC<EditSupplierProps> = ({
//   isOpen,
//   onClose,
//   supplier,
//   onEdit,
// }) => {
//   const { register, handleSubmit, setValue, reset } = useForm<Supplier>({
//     defaultValues: {
//       supplierName: "", // Tên nhà cung cấp
//       contactName: "", // Tên liên hệ
//       phoneNumber: "", // Số điện thoại
//       email: "", // Email
//       address: "", // Địa chỉ
//       flag: true, // Trạng thái cờ mặc định là true (Kích hoạt)
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

//   // Xử lý submit form
//   const onSubmit = (data: Supplier) => {
//     const updatedSupplier = {
//       ...supplier,
//       ...data, // Gộp dữ liệu mới và cũ
//     };
//     onEdit(updatedSupplier); // Gửi dữ liệu cập nhật về component cha
//     reset(); // Reset form
//     onClose(); // Đóng modal
//   };

//   if (!isOpen) return null; // Không hiển thị modal nếu isOpen = false

//   return (
//     <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-96">
//         <h2 className="text-lg font-bold mb-4">Chỉnh Sửa Nhà Cung Cấp</h2>
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//           {/* Mã Nhà Cung Cấp */}
//           <Input
//             value={supplier?.id || ""}
//             readOnly
//             placeholder="Mã nhà cung cấp"
//           />

//           {/* Tên Nhà Cung Cấp */}
//           <Input
//             placeholder="Tên nhà cung cấp"
//             {...register("supplierName", { required: "Tên nhà cung cấp là bắt buộc" })}
//           />

//           {/* Địa Chỉ */}
//           <Input
//             placeholder="Địa chỉ"
//             {...register("address", { required: "Địa chỉ là bắt buộc" })}
//           />

//           {/* Số Điện Thoại */}
//           <Input
//             placeholder="Số điện thoại"
//             {...register("phoneNumber", { required: "Số điện thoại là bắt buộc" })}
//           />

//           {/* Email */}
//           <Input
//             type="email"
//             placeholder="Email"
//             {...register("email", { required: "Email là bắt buộc" })}
//           />

//           {/* Trạng thái */}
//           <div>
//             <label className="text-sm">Trạng thái</label>
//             <select
//               {...register("flag", { required: "Trạng thái là bắt buộc" })}
//               className="w-full p-2 border border-gray-300 rounded"
//             >
//               <option value="true">Kích hoạt</option>
//               <option value="false">Tạm dừng</option>
//             </select>
//           </div>

//           {/* Nút hành động */}
//           <div className="flex justify-end mt-4">
//             <Button type="submit" className="mr-2">
//               Cập Nhật
//             </Button>
//             <Button
//               type="button"
//               onClick={() => {
//                 reset();
//                 onClose();
//               }}
//             >
//               Hủy
//             </Button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default EditSupplier;
