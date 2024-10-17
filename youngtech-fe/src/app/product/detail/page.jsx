"use client";
import BestProducts from "../../components/BestProducts";
import React from "react";
import Image from "next/image";
import { CiStar } from "react-icons/ci";
import image1 from "../../../../public/designImage/imageProducts/maygiac/samsung-ai-ww10t634dlx-sv-051222-105001-600x600.jpg";
import image2 from "../../../../public/designImage/imageProducts/maygiac/samsung-ai-ww10t634dlx-sv-051222-105001-600x600.jpg";
import image3 from "../../../../public/designImage/imageProducts/maygiac/may-giat-aqua-inverter-11-kg-aqw-dr110jt-bk-0-600x600.jpg";
import image4 from "../../../../public/designImage/imageProducts/maygiac/may-giat-panasonic-inverter-105-kg-na-v105fc1lv-130822-013143-600x600.jpg";
import image5 from "../../../../public/designImage/imageProducts/maygiac/may-giat-panasonic-inverter-105-kg-na-v105fc1lv-130822-013143-600x600.jpg";
import Link from "next/link";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { FcRuler } from "react-icons/fc";
import { useState } from "react";
import { GrSubtractCircle } from "react-icons/gr";
import { IoAddCircleOutline } from "react-icons/io5";
import Comment from "../../components/Comment";
const Page = () => {
  const [show, setShow] = useState(1 | null);
  const handleClick = (number) => {
    if (show === number) {
      setShow(null);
    } else {
      setShow(number);
    }
  };
  return (
    <div className=" lg:container m-auto">
      <section className="detail">
        <div className="flex">
          <div className="w-[60%]">
            <div className="flex gap-1 justify-between">
              <div className="w-[48%] p-4 bg-white rounded-xl">
                <Link href="#">
                  <Image
                    className="hover:scale-110 duration-200 transition-all w-[80%]  m-auto"
                    src={image1}
                  />
                </Link>
              </div>
              <div className="w-[48%]  p-4 bg-white rounded-xl">
                <Link href="#">
                  <Image
                    className="hover:scale-110 duration-200 transition-all w-[80%]  m-auto"
                    src={image2}
                  />
                </Link>
              </div>
            </div>

            <div className="flex mt-[50px]">
              <div className="w-[50%]">
                <Link href="#">
                  <Image
                    className="hover:scale-110 duration-200 transition-all w-[80%]  m-auto"
                    src={image4}
                  />
                </Link>
              </div>
              <div className="w-[50%]">
                <Link href="#">
                  <Image
                    className="hover:scale-110 duration-200 transition-all w-[80%]  m-auto"
                    src={image5}
                  />
                </Link>
              </div>
            </div>
          </div>
          <div className="w-[40%]">
            <div className="w-[80%] m-auto">
              <h3 className="font-semibold  text-[14px]">Parent Category</h3>
              <p className="text-[40px] mt-4 font-sans capitalize namePro">
                Name product here
              </p>
              <div className="evaluate flex items-center mt-[20px]">
                <p className="mr-5 flex items-center text-black text-[15px] capitalize rating">
                  <CiStar className="text-[23px] mr-2" />
                  <span>(4.9)</span>
                </p>
                <p className="mr-5 text-black text-[15px] capitalize review">
                  9,3k Reviews
                </p>
                <p className="mr-5 text-black text-[15px] capitalize purchase">
                  10k slot out
                </p>
              </div>
              <p className="mt-4 text-red-700 text-[30px]">Price: $90909</p>
              <div className="size mt-[20px]">
                <div className="flex justify-between font-semibold text-[14px] items-center">
                  <span>Kích thướt</span>

                  <div className="flex cursor-pointer items-center">
                    <FcRuler className="mr-4" />
                    <span className="hover:text-red-700">Size guide</span>
                  </div>
                </div>
              </div>
              <div className="chooseSize mt-[20px]">
                <ul className="flex flex-wrap items-center">
                  <li className="w-[20%] mt-[30px]">
                    <Link
                      href="/"
                      className="uppercase text-[14px] rounded-2xl hover:border-gray-600  py-3 px-5   border border-transparent"
                    >
                      xs
                    </Link>
                  </li>
                  <li className="w-[20%] mt-[30px]">
                    <Link
                      href="/"
                      className="uppercase text-[14px] rounded-2xl hover:border-gray-600  py-3 px-5   border border-transparent"
                    >
                      s
                    </Link>
                  </li>
                  <li className="w-[20%] mt-[30px]">
                    <Link
                      href="/"
                      className="uppercase text-[14px] rounded-2xl hover:border-gray-600  py-3 px-5   border border-transparent"
                    >
                      m
                    </Link>
                  </li>
                  <li className="w-[20%] mt-[30px]">
                    <Link
                      href="/"
                      className="uppercase text-[14px] rounded-2xl hover:border-gray-600  py-3 px-5   border border-transparent"
                    >
                      l
                    </Link>
                  </li>
                  <li className="w-[20%] mt-[30px]">
                    <Link
                      href="/"
                      className="uppercase text-[14px] rounded-2xl hover:border-gray-600  py-3 px-5   border border-transparent"
                    >
                      xl
                    </Link>
                  </li>
                  <li className="w-[20%] mt-[30px]">
                    <Link
                      href="/"
                      className="uppercase text-[14px] rounded-2xl hover:border-gray-600  py-3 px-5   border border-transparent"
                    >
                      2xl
                    </Link>
                  </li>
                  <li className="w-[20%] mt-[30px]">
                    <Link
                      href="/"
                      className="uppercase text-[14px] rounded-2xl hover:border-gray-600  py-3 px-5   border border-transparent"
                    >
                      3xl
                    </Link>
                  </li>
                  <li className="w-[20%] mt-[30px]">
                    <Link
                      href="/"
                      className="uppercase text-[14px] rounded-2xl hover:border-gray-600  py-3 px-5   border border-transparent"
                    >
                      4xl
                    </Link>
                  </li>
                </ul>
              </div>
              <p className="mt-[20px] font-semibold text-[14px]">
                Chọn thêm số lượng
              </p>
              <div className="addPro flex items-center mt-[20px]">
                <span className="text-[1.5rem] mr-[10px] border cursor-pointer hover:bg-gray-700 hover:text-white border-gray-500  rounded-3xl text-center  w-[35px] h-[35px] flex items-center justify-center ">
                  -
                </span>
                <span className="text-[1.5rem] mr-[10px] px-4">1</span>
                <span className="text-[1.5rem] mr-[10px] border cursor-pointer hover:bg-gray-700 hover:text-white border-gray-500   rounded-3xl text-center  w-[35px] h-[35px] flex items-center justify-center ">
                  +
                </span>
              </div>
              <div className="text-center  my-[40px]">
                <button
                  className="py-3 w-[90%] duration-300 transition-all hover:text-black   hover:bg-white  m-auto px-4 rounded-3xl capitalize bg-black border border-black text-white
                 text-[15px] font-semibold"
                >
                  Mua ngay
                </button>
                <button
                  className="py-3 w-[90%] duration-300 transition-all mt-[20px] hover:text-white  hover:bg-red-700  m-auto px-4 rounded-3xl capitalize bg-transparent border border-red-700 text-black
                 text-[15px] font-semibold"
                >
                  thêm vào giỏ hàng
                </button>
              </div>
              <h2 className="text-center">---------------------------</h2>
              <div className="description mt-[20px]">
                <div
                  onClick={() => handleClick(1)}
                  className="cursor-pointer flex justify-between items-center"
                >
                  <span className="text-[14px] font-semibold">Mô tả</span>
                  {show === 1 ? (
                    <IoIosArrowUp className="text-5" />
                  ) : (
                    <IoIosArrowDown className="text-5" />
                  )}
                </div>
                {show === 1 && (
                  <p className="text-[16px] mt-[20px]">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Modi molestiae, repellat ipsam culpa inventore est quas quae
                    delectus. Optio mollitia sed error quas aspernatur nesciunt
                    quos aliquid ducimus autem eius.
                  </p>
                )}
              </div>
              <div className="description mt-[20px]">
                <div
                  onClick={() => handleClick(2)}
                  className="cursor-pointer flex justify-between items-center"
                >
                  <span className="text-[14px] font-semibold">
                    Thông tin sản phẩm
                  </span>
                  {show === 2 ? (
                    <IoIosArrowUp className="text-5" />
                  ) : (
                    <IoIosArrowDown className="text-5" />
                  )}
                </div>
                {show === 2 && (
                  <p className="text-[16px] mt-[20px]">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Modi molestiae, repellat ipsam culpa inventore est quas quae
                    delectus. Optio mollitia sed error quas aspernatur nesciunt
                    quos aliquid ducimus autem eius.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Comment />
      <BestProducts />
    </div>
  );
};
export default Page;
