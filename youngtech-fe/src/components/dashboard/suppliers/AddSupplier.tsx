"use client";
import { addSupplier } from "@/services/supplier/SupplierService";
import React, { useState } from "react";
import { ShinyRotatingBorderButton } from "../ButtonSave/BtnSave";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as yup from 'yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// Validation schema using Yup
const schema = yup.object({
  supplierName: yup.string().required('Tên nhà cung cấp là bắt buộc'),
  contactName: yup.string().required('Tên người liên hệ là bắt buộc'),
  phoneNumber: yup
    .string()
    .required('Số điện thoại là bắt buộc')
    .matches(/^\d+$/, 'Số điện thoại phải là số'),
  email: yup.string().required('Email là bắt buộc').email('Email không hợp lệ'),
  address: yup.string().required('Địa chỉ là bắt buộc'),
});

interface FormInputs {
  supplierName: string;
  contactName: string;
  phoneNumber: string;
  email: string;
  address: string;
}

const AddSupplier = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    try {
      // Gọi API để thêm nhà cung cấp
      await addSupplier(data);
      toast.success("Nhà cung cấp đã được thêm thành công!");

      // Đặt lại các trường nhập liệu về rỗng
      reset();

      // Điều hướng đến trang quản lý nhà cung cấp sau 2 giây
      setTimeout(() => {
        router.push("/dashboard/quanly-nha-cungcap");
      }, 2000);
    } catch (error) {
      console.error("Lỗi khi thêm nhà cung cấp:", error);
      toast.error("Lỗi khi thêm nhà cung cấp!");
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-[#282F36] rounded-lg p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex items-center justify-between mb-6">
          <ShinyRotatingBorderButton type="button" onClick={() => router.push("/dashboard/quanly-nha-cungcap")}>
            Quay lại
          </ShinyRotatingBorderButton>
          <h2 className="text-2xl font-bold text-white text-center flex-1">
            Thêm nhà cung cấp
          </h2>
        </div>

        {/* Tên nhà cung cấp */}
        <div>
          <label htmlFor="supplierName" className="block text-sm font-medium text-white/50 mb-2">
            Tên nhà cung cấp
          </label>
          <input
            id="supplierName"
            {...register('supplierName')}
            className="mt-1 block w-full px-3 py-2 bg-[#282F36] text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Nhập tên nhà cung cấp"
          />
{errors.supplierName && <p className="text-red-500 text-sm mt-1">{errors.supplierName.message}</p>}
        </div>

        {/* Tên người liên hệ */}
        <div>
          <label htmlFor="contactName" className="block text-sm font-medium text-white/50 mb-2">
            Tên người liên hệ
          </label>
          <input
            id="contactName"
            {...register('contactName')}
            className="mt-1 block w-full px-3 py-2 bg-[#282F36] text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Nhập tên người liên hệ"
          />
          {errors.contactName && <p className="text-red-500 text-sm mt-1">{errors.contactName.message}</p>}
        </div>

        {/* Số điện thoại */}
        <div>
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-white/50 mb-2">
            Số điện thoại
          </label>
          <input
            id="phoneNumber"
            {...register('phoneNumber')}
            className="mt-1 block w-full px-3 py-2 bg-[#282F36] text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Nhập số điện thoại"
          />
          {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber.message}</p>}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-white/50 mb-2">
            Email
          </label>
          <input
            id="email"
            {...register('email')}
            className="mt-1 block w-full px-3 py-2 bg-[#282F36] text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Nhập email"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>

        {/* Địa chỉ */}
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-white/50 mb-2">
            Địa chỉ
          </label>
          <input
            id="address"
            {...register('address')}
            className="mt-1 block w-full px-3 py-2 bg-[#282F36] text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Nhập địa chỉ"
          />
          {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
        </div>

        <div className="flex justify-center gap-4">
          <ShinyRotatingBorderButton type="submit">
            Thêm nhà cung cấp
          </ShinyRotatingBorderButton>
        </div>
      </form>
    </div>
  );
};

export default AddSupplier;