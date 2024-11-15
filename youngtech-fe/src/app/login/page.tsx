"use client";

import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { AiOutlineMail, AiOutlineEye, AiOutlineEyeInvisible, AiOutlineLock } from "react-icons/ai";
import { Video } from "../../components/video/Video";
import { useForm } from "react-hook-form";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const Page = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [checked, setChecked] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const onSubmit = async (data: any) => {
    try {
      const res = await axios.post("http://localhost:8000/auth/login", {
        email: data.email,
        password: data.password,
      });

      if (res.status === 200) {
        toast.success("Đăng nhập thành công!");
        localStorage.setItem("access_token", res.data.access_token);
      }
    } catch (error: any) {
      if (error.response) {
        toast.error("Thông tin đăng nhập không đúng!");
      } else {
        toast.error("Có lỗi xảy ra, vui lòng thử lại sau!");
      }
    }
  };

  return (
    <div className="min-h-screen flex my-5 justify-center items-center bg-gray-100">
      <ToastContainer />
      <div className="bg-white shadow-lg rounded-lg w-full lg:w-[90%] mx-5 overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          <Video className="hidden p-8 lg:block lg:w-[50%]" />
          <div className="w-full lg:w-[45%] p-8">
            <h2 className="text-2xl font-bold text-center mb-8 text-gray-700">
              Đăng nhập
            </h2>

            <div className="text-center mb-6">
              <Link href="#">
                <button className="flex items-center justify-center w-full py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition duration-300">
                  <FcGoogle className="mr-2" size={22} />
                  <span className="text-sm font-medium">Đăng nhập với Google</span>
                </button>
              </Link>
            </div>

            <h5 className="text-center text-gray-500 mb-6">hoặc</h5>

            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Email Field */}
              <div className="mb-4 relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <div className="flex items-center border rounded-lg overflow-hidden">
                  <span className="flex items-center px-3">
                    <AiOutlineMail className="text-gray-500" size={22} />
                  </span>
                  <input
                    type="email"
                    placeholder="Nhập email của bạn..."
                    className="w-full px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    {...register("email", {
                      required: "Email không được để trống",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Email không hợp lệ",
                      },
                    })}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div className="mb-4 relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mật khẩu
                </label>
                <div className="flex items-center gap-4 border rounded-lg overflow-hidden">
                <AiOutlineLock className="ml-3 text-gray-500" size={22} />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Nhập mật khẩu của bạn..."
                    className="w-full px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    {...register("password", {
                      required: "Mật khẩu không được để trống",
                    })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="px-3 flex items-center justify-center"
                  >
                    {showPassword ? (
                      <AiOutlineEyeInvisible className="text-gray-500" size={22} />
                    ) : (
                      <AiOutlineEye className="text-gray-500" size={22} />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Terms and Conditions Checkbox */}
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={checked}
                  onChange={() => setChecked(!checked)}
                />
                <label className="text-sm">
                  Tôi đồng ý với{" "}
                  <span className="text-blue-600 cursor-pointer">
                    điều khoản sử dụng
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!checked}
                className={`w-full py-3 text-white rounded-lg transition duration-300 ${
                  checked
                    ? "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
              >
                Đăng nhập
              </button>
            </form>

            <div className="text-center mt-6">
              <p className="text-gray-600">
                Chưa có tài khoản?{" "}
                <Link href="/register" className="text-blue-600 font-semibold">
                  Đăng kí ngay
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
