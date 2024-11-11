"use client";
import axios from 'axios';
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { FaArrowAltCircleRight } from "react-icons/fa";
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
  const onSubmit= async (data:any) => {
     const {username,email, password,role="admin"} = data
  
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
        setMessage('User registered successfully');
      }
    } catch (error) {
      if (error.response) {
        // Xử lý lỗi từ phía server (ví dụ như status code 401)
        setMessage(error.response.data.message || 'Registration failed');
      } else {
        // Xử lý các lỗi khác
        setMessage('An error occurred');
      }
    }
  };




  return (
    <div className="w-full font-sans flex justify-center">
      <div className="w-[90%] mt-5 bg-white ">
        <section className="login lg:container mt-5 font-sans">
          <div className="flex justify-center">
            <Video />
            <div className="lg:w-[68%] w-full">
              <div className="block pb-10 border-gray-500">
                <h3 className="text-center font-semibold text-[1.5rem] pb-[30px] font-sans">
                  Đăng Kí tài khoản
                </h3>
                <div className="loginWithGoogle">
                  <Link className="flex items-center justify-center" href="#">
                    <FcGoogle className="mr-2" />
                    <div className="ml-2 capitalize text-[14px] font-bold">
                      đăng kí với google
                    </div>
                  </Link>
                </div>
                <h5 className="text-center text-[1rem] mt-[30px] text-red-700 font-semibold">
                  or
                </h5>
                <div className="w-[400px] m-auto">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="group">
                      <label className="capitalize text-[14px] font-semibold mt-3 text-black">
                        Họ & tên
                      </label>
                      <input
                        className="py-2 rounded-md font-sans text-[14px] capitalize outline-none my-2 w-full px-2 border-gray-500 border"
                        placeholder="Nhập tên Anh/Chị..."
                        {...register('username')}
                      />
                      {errors.username && <p className="text-red-500">{errors.username.message}</p>}
                    </div>
                    <div className="group">
                      <label className="capitalize text-[14px] font-semibold mt-3 text-black">
                        Email
                      </label>
                      <input
                        className="py-2 rounded-md font-sans text-[14px] capitalize outline-none my-2 w-full px-2 border-gray-500 border"
                        placeholder="Nhập email Anh/Chị..."
                        {...register('email')}
                      />
                      {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                    </div>
                    <div className="group">
                      <label className="capitalize text-[14px] font-semibold mt-3 text-black">
                        Mật khẩu
                      </label>
                      <input
                        className="py-2 rounded-md font-sans text-[14px] capitalize outline-none my-2 w-full px-2 border-gray-500 border"
                        placeholder="Nhập mật khẩu Anh/Chị..."
                        type="password"
                        {...register('password')}
                      />
                      {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                    </div>
                    <div className="group">
                      <label className="capitalize text-[14px] font-semibold mt-3 text-black">
                        Nhập lại mật khẩu
                      </label>
                      <input
                        className="py-2 rounded-md font-sans text-[14px] capitalize outline-none my-2 w-full px-2 border-gray-500 border"
                        placeholder="Nhập lại mật khẩu Anh/Chị..."
                        type="password"
                        {...register('confirmPassword')}
                      />
                      {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
                    </div>
                    <div className="checkAgree my-2 flex items-center">
                      <input type="checkbox" checked={checked} onChange={() => setChecked(!checked)} />
                      <p className="ml-2 text-[14px]">
                        Anh/Chị đồng ý tất cả những điều khoản sử dụng
                      </p>
                    </div>
                    <button
                      disabled={!checked} // Nút bị vô hiệu hóa nếu chưa tích checkbox
                      className={`w-full  py-2 mt-3 px-2 rounded-md ${checked ? "bg-slate-800 cursor-pointer text-white hover:bg-slate-900" : "bg-slate-200 text-black "}`}
                      type="submit"
                    >
                      Đăng ký
                    </button>
                  </form>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="w-[80%] text-red-700  flex items-center justify-between mx-[10px] px-5 text-[14px]">
                  <span>
                    @2024 | Nếu như Anh/Chị có tài khoản thì đăng nhập phía trước{" "}
                  </span>
                  <FaArrowAltCircleRight className="text-[1.3rem]" />
                </div>
                <div className="w-[20%]  px-5">
                  <Link href="/login">
                    <button
                      className="text-white text-[14px] py-2 font-semibold w-full rounded-md bg-black"
                    >
                      Đăng nhập
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Page;
