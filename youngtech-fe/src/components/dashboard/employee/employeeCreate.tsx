"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import UploadImage from "@/components/UploadImage/UploadImgEmployee";
import { createEmployee } from "@/services/employee/EmployeeService";

const schema = yup.object({
  userName: yup.string().required("Tên tài khoản là bắt buộc"),
  email: yup.string().email("Email không hợp lệ").required("Email là bắt buộc"),
  password: yup.string().required("Mật khẩu là bắt buộc"),
  fullName: yup.string().required("Tên đầy đủ là bắt buộc"),
  phoneNumber: yup
    .string()
    .matches(/^[0-9]{10,11}$/, "Số điện thoại không hợp lệ")
    .required("Số điện thoại là bắt buộc"),
  position: yup.string().required("Chức vụ là bắt buộc"),
  profilePicture: yup.string().required("Ảnh đại diện là bắt buộc"),
});

const AddEmployeeForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleGetArrayImage = (newUrls: { url: string; public_id: string }[]) => {
    if (newUrls.length > 0) {
      setValue("profilePicture", newUrls[0].url);
    }
  };

  const handleFormSubmit = async (data: any) => {
    setLoading(true);
    try {
      await createEmployee(data);
      toast.success("Thêm nhân viên thành công!");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-gray-900 text-white rounded-md">
      <h2 className="text-2xl font-semibold mb-4 text-center">Thêm nhân viên</h2>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: "Tên tài khoản", name: "userName", type: "text", placeholder: "Tên tài khoản" },
            { label: "Email", name: "email", type: "email", placeholder: "Email" },
            { label: "Mật khẩu", name: "password", type: "password", placeholder: "Mật khẩu" },
            { label: "Tên đầy đủ", name: "fullName", type: "text", placeholder: "Tên đầy đủ" },
            { label: "Số điện thoại", name: "phoneNumber", type: "text", placeholder: "Số điện thoại" },
            { label: "Chức vụ", name: "position", type: "select", placeholder: "" },
          ].map(({ label, name, type, placeholder }) => (
            <div key={name}>
              <label className="block text-sm font-medium mb-1">{label}</label>
              {type === "select" ? (
                <select
                  {...register(name)}
                  className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-700"
                >
                  <option value="">Chọn chức vụ</option>
                  <option value="storekeeper">Storekeeper</option>
                  <option value="salesperson">Sales</option>
                  <option value="businessEmployee">Business Employee</option>
                </select>
              ) : (
                <input
                  {...register(name)}
                  type={type}
                  placeholder={placeholder}
                  className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-700"
                />
              )}
              {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]?.message}</p>}
            </div>
          ))}
        </div>

        <div>
          <label className="block text-sm ont-medium mb-1">Ảnh đại diện</label>
          <UploadImage handleGetArrayImage={handleGetArrayImage} />
          {errors.profilePicture && <p className="text-red-500 text-xs mt-1">{errors.profilePicture?.message}</p>}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className={`px-4 py-2 rounded bg-blue-600 hover:bg-blue-500 disabled:bg-gray-600 ${loading && "cursor-wait"}`}
            disabled={loading}
          >
            {loading ? "Đang xử lý..." : "Thêm nhân viên"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEmployeeForm;
