"use client";
import React from "react";
import Image from "next/image";
import logo from "../../../public/designImage/imageLogo/logoNoBackground/2.png";
import Link from "next/link";
import { FaRegUserCircle } from "react-icons/fa";
import { GoSearch } from "react-icons/go";
import { LuHeart } from "react-icons/lu";
import { BsCart } from "react-icons/bs";
import { FiUser } from "react-icons/fi";
import { useState, useEffect } from "react";
const Header = () => {
  const [isSticky, setIsSticky] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const topHeader = document.getElementById("topHeader")?.offsetHeight || 0;

      setIsSticky(window.scrollY > topHeader);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  console.log(isSticky);
  return (
    <>
      <section>
        <div id="topHeader" className="bg-pink-200">
          <div id="header-top" className="lg:container px-1 m-auto">
            <div className="flex justify-between items-center">
              <h1 className=" text-[.75rem] font-semibold">Contact</h1>
              <h1
                style={textColor}
                className="font-sans capitalize text-center text-[.75rem] leading-[15px]"
              >
                team young-tech
              </h1>
            </div>
          </div>
        </div>
        <header
          id="header"
          className={`transition-all duration-500 backdrop-blur-md border-b-[1px] ${
            isSticky ? "fixed top-0 w-full z-30 shadow-sm" : ""
          }`}
        >
          <div className="lg:container px-1 m-auto">
            <div className="flex items-center">
              <div className="" id="logo-shop">
                <Link href="/">
                  <Image
                    className="w-[100px] h-[100px]"
                    src={logo}
                    alt="logo"
                  />
                </Link>
              </div>
              <div className="ml-4" id="menu">
                <div className="">
                  <ul style={textColor} className="p-0 flex items-center">
                    <li className="mx-4 my-0 ">
                      <Link
                        className="capitalize font-sans whitespace-nowrap text-gray-900 border-b-2 border-transparent duration-300 text-[16px] transition-all hover:border-b-red-700 cursor-pointer font-semibold hover:text-black pb-[43px]"
                        href="/"
                      >
                        điển tử, điện máy
                      </Link>
                    </li>
                    <li className="mx-4 my-0 ">
                      <Link
                        className="capitalize font-sans whitespace-nowrap text-gray-900 border-b-2 border-transparent duration-300 text-[16px] transition-all hover:border-b-red-700 cursor-pointer font-semibold hover:text-black pb-[43px]"
                        href="/"
                      >
                        điện thoại
                      </Link>
                    </li>
                    <li className="mx-4 my-0 ">
                      <Link
                        className="capitalize font-sans whitespace-nowrap text-gray-900 border-b-2 border-transparent duration-300 text-[16px] transition-all hover:border-b-red-700 cursor-pointer font-semibold hover:text-black pb-[43px]"
                        href="/"
                      >
                        Tivi
                      </Link>
                    </li>
                    <li className="mx-4 my-0 ">
                      <Link
                        className="capitalize font-sans whitespace-nowrap text-gray-900 border-b-2 border-transparent duration-300 text-[16px] transition-all hover:border-b-red-700 cursor-pointer font-semibold hover:text-black pb-[43px]"
                        href="/"
                      >
                        Tủ lạnh
                      </Link>
                    </li>
                    <li className="mx-4 my-0 ">
                      <Link
                        className="capitalize font-sans whitespace-nowrap text-gray-900 border-b-2 border-transparent duration-300 text-[16px] transition-all hover:border-b-red-700 cursor-pointer font-semibold hover:text-black pb-[43px]"
                        href="/"
                      >
                        máy tính
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="ml-auto">
                <div className="">
                  <ul className="p-0 flex items-center">
                    <li className="ml-[20px]">
                      <Link
                        href="/"
                        className="block px-3 py-[41px] transition-all duration-300 border-b-2 hover:border-b-red-700 border-transparent"
                      >
                        <GoSearch className="text-[25px]" />
                      </Link>
                    </li>
                    <li className="ml-[20px]">
                      <Link
                        href="/login"
                        className="block px-3 py-[41px] transition-all duration-300 border-b-2 hover:border-b-red-700 border-transparent"
                      >
                        <FiUser className="text-[25px]" />
                      </Link>
                    </li>
                    <li className="ml-[20px]">
                      <Link
                        href="/"
                        className="block px-3 py-[41px] transition-all duration-300 border-b-2 hover:border-b-red-700 border-transparent"
                      >
                        <LuHeart className="text-[25px]" />
                      </Link>
                    </li>
                    <li className="ml-[20px]">
                      <Link
                        href="/cart"
                        className="block px-3 py-[41px] transition-all duration-300 border-b-2 hover:border-b-red-700 border-transparent"
                      >
                        <BsCart className="text-[25px]" />
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </header>
      </section>
    </>
  );
};

const HeaderTop = {
  background: "rgb(195,180,217)",
  background:
    "radial-gradient(circle, rgba(195,180,217,1) 11%, rgba(195,180,217,1) 31%, rgba(238,174,202,1) 60%, rgba(195,180,217,1) 77%, rgba(148,187,233,1) 88%)",
};
const bgHeader = {
  backgroundColor: "rgb(193 166 166 / 44%)",
};
const textColor = {
  color: "#767676",
  padding: "15px",
};

export default Header;
