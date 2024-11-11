"use client";

import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { Video } from "../../components/video/Video";
import { useForm } from "react-hook-form";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
const Page = () => {
  
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [message, setMessage] = useState('');
  const [checked, setChecked] = useState<boolean>(false);
  const onSubmit = async (data) => {
    try {
      const res = await axios.post('http://localhost:8000/auth/login', {
        email: data.email,
        password: data.password,
      });

      if (res.status === 200) {
        toast.success('Đăng nhập thành công!');
        // Lưu token vào localStorage
        localStorage.setItem('access_token', res.data.access_token);
      }
    } catch (error) {
      if (error.response) {
        toast.error('Thông tin của bạn không đúng !')
        setMessage('Vui lòng kiễm tra lại email và mật khẩu của bạn !')
      } else {
        setMessage('Có lỗi xảy ra');
      }
    }
  };

  return (
    <div className="w-full font-sans flex justify-center">
    
       <ToastContainer />
      <div className="w-[90%] mt-5 bg-white"> 
        <div className="flex w-full pt-5 justify-center">
          <Video />
          <div className="lg:w-[68%] w-full ">
            <div className="block lg:pb-[100px] pb-10 border-gray-500">
              <h3 className="text-center font-semibold text-[1.5rem] pb-[30px] font-sans">
                Đăng nhập
              </h3>
              <div className="loginWithGoogle">
                <Link className="flex items-center justify-center" href="#">
                  <FcGoogle className="mr-2" />
                  <div className="ml-2 capitalize text-[14px] font-bold">
                    Đăng nhập với Google
                  </div>
                </Link>
              </div>
              <h5 className="text-center text-[1rem] mt-[30px] text-red-700 font-semibold">
                hoặc
              </h5>
              <div className="w-[400px] m-auto">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="group">
                    <label className="capitalize text-[14px] font-semibold mt-3 text-black">
                      Email
                    </label>
                    <input
                      className="py-2 font-sans text-[14px] rounded-md  outline-none my-2 w-full px-2 border-gray-500 border"
                      placeholder="Nhập email Anh/Chị..."
                      type="email"
                      {...register("email", { required: "Email không được để trống", pattern: { value: /^\S+@\S+$/i, message: "Email không hợp lệ" } })}
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                  </div>
                  <div className="group">
                    <label className=" text-[14px] font-semibold mt-3 text-black">
                      Mật khẩu
                    </label>
                    <input
                      className="py-2 font-sans text-[14px] rounded-md outline-none my-2 w-full px-2 border-gray-500 border"
                      placeholder="Nhập mật khẩu Anh/Chị..."
                      type="password"
                      {...register("password", { required: "Mật khẩu không được để trống" })}
                    />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                  </div>
                  <div className="checkAgree my-2 flex items-center">
                    <input type="checkbox" checked={checked} onChange={() => setChecked(!checked)} />
                    <p className="ml-2 text-[14px]">
                      Anh/Chị đồng ý tất cả những điều khoản sử dụng
                    </p>
                  </div>
                  <button
                   className={`w-full  py-2 mt-3 px-2 rounded-md ${checked ? "bg-slate-800 cursor-pointer text-white hover:bg-slate-900" : "bg-slate-200 text-black "}`}
                    type="submit"
                    disabled={!checked}
                  >
                    Đăng nhập
                  </button>
                </form>
                {message && <p className="text-red-500 text-sm mt-3">{message}</p>}
              </div>
            </div>
            <div className="flex justify-center items-center">
              <div className="w-[80%] hidden lg:block text-red-700 lg:flex items-center justify-between mx-[10px] px-5 text-[14px] ">
                <span>@2024 | Nếu như Anh/Chị chưa có tài khoản thì đăng kí phía trước </span>
                <FaArrowAltCircleRight className="text-[1.3rem]" />
              </div>
              <div className="lg:w-[20%] w-[40%] lg:mt-5 pb-5 px-5 ">
                <Link href="/register">
                  <button className="text-white text-[14px] py-2 font-semibold w-full rounded-md bg-black">
                    Đăng kí
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>     
      </div>
    </div>
  );
};

export default Page;
