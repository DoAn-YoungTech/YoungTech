"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { createEmployee } from "@/services/employee/EmployeeService";

// Định nghĩa schema xác thực với Yup
const schema = yup.object({
  userName: yup.string().required("Tên tài khoản là bắt buộc"),
  email: yup.string().email("Email không hợp lệ").required("Email là bắt buộc"),
  password: yup.string().required("Mật khẩu là bắt buộc"),
  fullName: yup.string().required("Tên đầy đủ là bắt buộc"),
  phoneNumber: yup.string().matches(/^[0-9]{10,11}$/, "Số điện thoại không hợp lệ").required("Số điện thoại là bắt buộc"),
  position: yup.string().required("Chức vụ là bắt buộc"),
  profilePicture: yup.mixed().required("Ảnh đại diện là bắt buộc"),
});

const AddEmployeeForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  // Sử dụng react-hook-form và yupResolver để kết nối với schema
  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    resolver: yupResolver(schema),
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const validTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!validTypes.includes(file.type)) {
        toast.error("Chỉ hỗ trợ các định dạng ảnh JPEG, PNG!");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Dung lượng ảnh không được vượt quá 5MB!");
        return;
      }
      setImageFile(file);
      setValue("profilePicture", file.name); // Cập nhật giá trị cho trường profilePicture
    }
  };

  const handleFormSubmit = async (data: any) => {
    if (imageFile) {
      setLoading(true);
      try {
        // Simulate upload image to server
        const uploadImage = async () => {
          return new Promise<string>((resolve) => {
            setTimeout(() => resolve(data.profilePicture), 1000);
          });
        };
        const uploadedImageName = await uploadImage();
        const updatedFormData = { ...data, profilePicture: uploadedImageName };

        await createEmployee(updatedFormData);
        toast.success("Thêm nhân viên thành công!");
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="p-6 bg-gray-800 text-white rounded-md">
      <h2 className="text-xl font-bold mb-4">Thêm nhân viên mới</h2>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        {[{ label: "Tên tài khoản", name: "userName", type: "text", placeholder: "Nhập tên tài khoản..." },
          { label: "Email", name: "email", type: "email", placeholder: "Nhập email..." },
          { label: "Mật khẩu", name: "password", type: "password", placeholder: "Nhập mật khẩu..." },
          { label: "Tên đầy đủ", name: "fullName", type: "text", placeholder: "Nhập tên đầy đủ..." },
          { label: "Ngày sinh", name: "dateOfBirth", type: "date" },
          { label: "Số điện thoại", name: "phoneNumber", type: "text", placeholder: "Nhập số điện thoại..." }]
          .map(({ label, name, type, placeholder }) => (
            <div key={name}>
              <label className="block text-sm font-medium mb-1">{label}</label>
              <input
                {...register(name)} // Liên kết input với react-hook-form
                type={type}
                placeholder={placeholder}
                className="w-full px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600"
              />
              {errors[name] && <p className="text-red-500 text-sm">{errors[name]?.message}</p>}
            </div>
          ))}
        <div>
          <label className="block text-sm font-medium mb-1">Ảnh đại diện</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600"
          />
          {errors.profilePicture && <p className="text-red-500 text-sm">{errors.profilePicture?.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Chức vụ</label>
          <select
            {...register("position")}
            className="w-full px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600"
          >
            <option value="">Chọn chức vụ</option>
            <option value="storekeeper">Storekeeper</option>
            <option value="salesperson">Sale</option>
            <option value="businessEmployee">Business Employee</option>
          </select>
          {errors.position && <p className="text-red-500 text-sm">{errors.position?.message}</p>}
        </div>
        <div className="flex justify-end gap-4">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-500"
            disabled={loading}
          >
            {loading ? "Đang thêm..." : "Thêm"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEmployeeForm;
