"use client";
import axios from 'axios';
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineUser, AiOutlineMail, AiOutlineLock, AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Link from "next/link";
import { Video } from "../../components/video/Video";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  username: yup.string().required('Họ & tên là bắt buộc'),
  email: yup.string().email('Email không hợp lệ').required('Email là bắt buộc'),
  password: yup.string().min(6, 'Mật khẩu phải ít nhất 6 ký tự').required('Mật khẩu là bắt buộc'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password')], 'Mật khẩu nhập lại không khớp')
    .required('Nhập lại mật khẩu là bắt buộc'),
});

const Page = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const [checked, setChecked] = useState<boolean>(false);
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const onSubmit = async (data: any) => {
    const { username, email, password, role = "admin" } = data;

    try {
      const res = await axios.post('http://localhost:8000/auth/register', {
        username,
        email,
        password,
        role
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (res.status === 201) {
        setMessage('Đăng ký thành công');
      }
    } catch (error: any) {
      setMessage(error.response?.data.message || 'Đăng ký thất bại');
    }
  };

  return (
    <div className="w-full font-sans flex justify-center bg-gray-50 py-10">
      <div className="w-[90%] mt-5 bg-white shadow-lg rounded-lg overflow-hidden lg:flex">
        <Video className="hidden p-8 lg:block lg:w-[50%]" />
        <div className="w-full lg:w-[45%] p-8">
          <h3 className="text-center text-2xl font-bold mb-6">Đăng Ký Tài Khoản</h3>

          {/* Đăng ký với Google */}
          <div className="mb-6">
            <Link href="#" className="flex items-center justify-center bg-gray-100 border border-gray-300 rounded-md py-2 hover:bg-gray-200 transition">
              <FcGoogle className="mr-2 text-xl" />
              <span className="font-semibold text-gray-700">Đăng ký với Google</span>
            </Link>
          </div>

          <h5 className="text-center text-gray-500 font-medium mb-4">Hoặc</h5>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Input Username */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700">Họ & tên</label>
              <div className="flex items-center gap-2 border overflow-hidden rounded-md">
                <AiOutlineUser className="ml-3  text-gray-500" size={22} />
                <input
                  type="text"
                  placeholder="Nhập tên Anh/Chị..."
                  {...register('username')}
                  className="w-full px-4 py-2  focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
            </div>

            {/* Input Email */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <div className="flex items-center  gap-2 border overflow-hidden rounded-md">
                <AiOutlineMail className="ml-3  text-gray-500" size={22} />
                <input
                  type="email"
                  placeholder="Nhập email Anh/Chị..."
                  {...register('email')}
                  className="w-full px-4 py-2  focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            {/* Input Password */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700">Mật khẩu</label>
              <div className="flex items-center  gap-2 border overflow-hidden rounded-md">
                <AiOutlineLock className="ml-3 text-gray-500" size={22} />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Nhập mật khẩu..."
                  {...register('password')}
                  className="w-full px-4 py-2  focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="pr-3 text-gray-500"
                >
                  {showPassword ? <AiOutlineEyeInvisible size={22} /> : <AiOutlineEye size={22} />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>

            {/* Input Confirm Password */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700">Nhập lại mật khẩu</label>
              <div className="flex items-center  gap-2 border overflow-hidden rounded-md">
                <AiOutlineLock className="ml-3 text-gray-500" size={22} />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Nhập lại mật khẩu..."
                  {...register('confirmPassword')}
                  className="w-full px-4 py-2  focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="pr-3 text-gray-500"
                >
                  {showConfirmPassword ? <AiOutlineEyeInvisible size={22} /> : <AiOutlineEye size={22} />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
            </div>

            {/* Điều khoản sử dụng */}
            <div className="flex items-center my-4">
              <input type="checkbox" checked={checked} onChange={() => setChecked(!checked)} className="mr-2" />
              <p className="text-sm text-gray-600">Đồng ý với các <span className="text-blue-600">điều khoản sử dụng</span></p>
            </div>

            {/* Nút đăng ký */}
            <button
              type="submit"
              disabled={!checked}
              className={`w-full py-3 rounded-md font-semibold text-white ${checked ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-300 cursor-not-allowed"}`}
            >
              Đăng Ký
            </button>

            {message && <p className="text-center text-green-600 mt-4">{message}</p>}
          </form>

          <div className="flex justify-between items-center mt-6">
            <span className="text-sm text-gray-500">Đã có tài khoản? <Link href="/login" className="text-blue-600">Đăng nhập ngay</Link></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
