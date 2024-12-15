"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  getEmployeeById,
  updateEmployee,
} from "@/services/employee/EmployeeService";
import { useFormik } from "formik";
import * as yup from "yup";
import UploadImage from "@/components/UploadImage/UploadImgEmployee";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Schema xác thực
const schema = yup.object({
  userName: yup.string().required("Tên tài khoản là bắt buộc"),
  email: yup.string().email("Email không hợp lệ").required("Email là bắt buộc"),
  fullName: yup.string().required("Tên đầy đủ là bắt buộc"),
  phoneNumber: yup
    .string()
    .matches(/^[0-9]{10,11}$/, "Số điện thoại không hợp lệ")
    .required("Số điện thoại là bắt buộc"),
  position: yup.string().required("Chức vụ là bắt buộc"),
  profilePicture: yup.string().required("Ảnh đại diện là bắt buộc"),
});

// Các trường dữ liệu
const fields = [
  { label: "Tên tài khoản", name: "userName", type: "text" },
  { label: "Email", name: "email", type: "email" },
  { label: "Tên đầy đủ", name: "fullName", type: "text" },
  { label: "Số điện thoại", name: "phoneNumber", type: "text" },
  { label: "Chức vụ", name: "position", type: "text" },
];

const UpdateEmployee = () => {
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      fullName: "",
      phoneNumber: "",
      position: "",
      profilePicture: "",
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      setError("");
      try {
        await updateEmployee(id, values);
        toast.success("Cập nhật thông tin nhân viên thành công!");
        router.push("/dashboard/quanly-nhanvien");
      } catch (err) {
        const errorMsg = err.message || "Có lỗi xảy ra khi cập nhật";
        toast.error(errorMsg);
        setError(errorMsg);
      }
    },
  });

  useEffect(() => {
    if (id) {
      const fetchEmployee = async () => {
        try {
          const response = await getEmployeeById(id);
          const data = response.message;

          formik.setValues({
            userName: data?.userName || "",
            email: data?.email || "",
            fullName: data?.fullName || "",
            phoneNumber: data?.phoneNumber || "",
            position: data?.position || "",
            profilePicture: data?.profilePicture || "",
          });
        } catch (err) {
          toast.error("Không thể tải dữ liệu nhân viên");
          setError("Không thể tải dữ liệu nhân viên");
        } finally {
          setLoading(false);
        }
      };

      fetchEmployee();
    } else {
      toast.error("Không tìm thấy ID nhân viên");
      setError("Không tìm thấy ID nhân viên");
      setLoading(false);
    }
  }, [id]);

  // Hàm xử lý khi ảnh được tải lên
  const handleGetArrayImage = (imageArray) => {
    if (Array.isArray(imageArray) && imageArray.length > 0) {
      const imageUrl = imageArray[0]?.url || ""; // Lấy URL đầu tiên từ mảng
      formik.setFieldValue("profilePicture", imageUrl); // Cập nhật giá trị
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-6">Cập nhật thông tin nhân viên</h1>
      {error && <p className="mb-4 text-red-600">{error}</p>}
      {loading ? (
        <p className="text-center">Đang tải dữ liệu...</p>
      ) : (
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {fields.map(({ label, name, type }) => (
            <div key={name} className="mb-4">
              <label
                htmlFor={name}
                className="block text-sm font-medium text-gray-700"
              >
                {label}
              </label>
              <input
                id={name}
                name={name}
                type={type}
                value={formik.values[name]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              {formik.touched[name] && formik.errors[name] && (
                <p className="mt-1 text-sm text-red-600">
                  {formik.errors[name]}
                </p>
              )}
            </div>
          ))}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Ảnh đại diện
            </label>
            <UploadImage
              handleGetArrayImage={handleGetArrayImage}
              initialImage={formik.values.profilePicture}
            />
            {formik.errors.profilePicture && formik.touched.profilePicture && (
              <p className="mt-1 text-sm text-red-600">
                {formik.errors.profilePicture}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Cập nhật
          </button>
        </form>
      )}
    </div>
  );
};

export default UpdateEmployee;
