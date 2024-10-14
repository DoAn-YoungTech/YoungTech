"use client";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { FaArrowAltCircleRight } from "react-icons/fa";

const Page = () => {
  return (
    <section className="login lg:container mx-auto mt-[50px] font-sans">
      <div className="flex justify-between">
        <div className="w-[30%]">
          <div className="h-[700px]">
            <video className="w-full h-full" autoPlay loop muted>
              <source src="/video/video.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
        <div className="w-[68%]">
          <div className="block  pb-[110px] border-gray-500">
            <h3 className="text-center font-semibold  text-[1.5rem] pb-[30px] font-sans">
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
              <form action="#">
                <div className="group">
                  <label className="capitalize text-[14px] font-semibold mt-3 text-black">
                    Họ & tên
                  </label>
                  <input
                    className="py-2 rounded-md font-sans text-[14px] capitalize outline-none my-2  w-full px-1 border-gray-500 border"
                    placeholder="Nhập tên Anh/Chị..."
                    type="text"
                  />
                </div>
                <div className="group">
                  <label className="capitalize text-[14px] font-semibold mt-3 text-black">
                    Email
                  </label>
                  <input
                    className="py-2 rounded-md font-sans text-[14px] capitalize outline-none my-2  w-full px-1 border-gray-500 border"
                    placeholder="Nhập email Anh/Chị..."
                    type="email"
                  />
                </div>
                <div className="group">
                  <label className="capitalize text-[14px] font-semibold mt-3 text-black">
                    mật khẩu
                  </label>
                  <input
                    className="py-2 rounded-md font-sans text-[14px] capitalize outline-none my-2  w-full px-1 border-gray-500 border"
                    placeholder="Nhập mật khẩu Anh/Chị..."
                    type="password"
                  />
                </div>
                <div className="checkAgree my-2 flex items-center">
                  <input type="checkbox" />
                  <p className="ml-2 text-[14px]">
                    Anh/Chị đồng ý tất cả những điều khoản sử dụng
                  </p>
                </div>
                <Link href="/register">
                  <button
                    className="bg-black w-full text-white py-2 mt-3 px-2 rounded-md"
                    type="button"
                  >
                    Đăng nhập
                  </button>
                </Link>
              </form>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="w-[80%] text-red-700 border-l flex items-center justify-between mx-[10px] px-5 text-[14px] border-gray-500">
              <span>
                @2024 | Nếu như Anh/Chị có tài khoản thì đăng nhập phía trước{" "}
              </span>
              <FaArrowAltCircleRight className="text-[1.3rem]" />
            </div>
            <div className="w-[20%] mt-2  px-5 border-l border-gray-500">
              <Link href="/login">
                <button
                  className=" text-white text-[14px] py-2  font-semibold w-full rounded-md bg-black
              "
                >
                  Đăng nhập
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Page;
