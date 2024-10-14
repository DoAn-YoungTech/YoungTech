"use client";
import Link from "next/link";
import React from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { HiMiniAdjustmentsHorizontal } from "react-icons/hi2";
import { MdShowChart } from "react-icons/md";
import image1 from "../../../public/designImage/imageProducts/maygiac/giat-say-samsung-inverter-giat-25-kg-say-15-kg-wd25db8995bzsv.jpg";
import image2 from "../../../public/designImage/imageProducts/maygiac/lg-inverter-9-kg-fb1209s6m-(1).jpg";
import image3 from "../../../public/designImage/imageProducts/maygiac/may-giat-aqua-inverter-11-kg-aqw-dr110jt-bk-0-600x600.jpg";
import image4 from "../../../public/designImage/imageProducts/maygiac/may-giat-aqua-inverter-11-kg-aw11-bp4959u1k-b-thum-600x600.jpg";
import image5 from "../../../public/designImage/imageProducts/maygiac/may-giat-panasonic-inverter-105-kg-na-v105fc1lv-130822-013143-600x600.jpg";
import image6 from "../../../public/designImage/imageProducts/maygiac/may-giat-samsung-inverter-9-kg-ww90t634dln-sv-051222-105313-600x600.jpg";
import image7 from "../../../public/designImage/imageProducts/maygiac/panasonic-na-fd125v1bv-300x300.jpg";
import image8 from "../../../public/designImage/imageProducts/maygiac/samsung-ai-ww10t634dlx-sv-051222-105001-600x600.jpg";
import { CiHeart } from "react-icons/ci";
import Image from "next/image";
const showListPro = [
  {
    id: 1,
    image: image1,
    name: "Amazon Echo Buds (2023 Release)",
    price: 99.99,
  },
  { id: 2, image: image2, name: "Amazon Echo Buds ", price: 99.99 },
  {
    id: 3,
    image: image3,
    name: "Apple AirPods Max Wireless Over-Ear Headphones,",
    price: 99.99,
  },
  {
    id: 4,
    image: image4,
    name: "Bose QuietComfort Wireless Noise Cancelling Headphones",
    price: 99.99,
  },
  {
    id: 5,
    image: image5,
    name: "Amazon Echo Buds (2023 Release)",
    price: 99.99,
  },
  { id: 6, image: image6, name: "Amazon Echo Buds ", price: 99.99 },
  {
    id: 7,
    image: image7,
    name: "Apple AirPods Max Wireless Over-Ear Headphones,",
    price: 99.99,
  },
  {
    id: 8,
    image: image8,
    name: "Bose QuietComfort Wireless Noise Cancelling Headphones",
    price: 99.99,
  },
];
const Page = () => {
  return (
    <section className="lg:container px-4 mx-auto">
      <div className="breadcrumbs ">
        <ul>
          <li>
            <Link
              href="#"
              className="flex items-center text-[0.8rem] capitalize"
            >
              <span>back</span>
              <MdKeyboardArrowRight className="text-[1rem]" />
            </Link>
          </li>
        </ul>
      </div>
      <div className="parentCategory mt-[20px]">
        <h3 className="text-[25px] font-semibold capitalize">Điện thoai</h3>
      </div>
      <div className="childCategory">
        <div className="mt-[20px] flex items-center">
          <div className="listChildCates">
            <ul className="flex items-center">
              <li className="mr-4">
                <Link
                  className="py-2 px-4 bg-gray-700 hover:bg-black text-white rounded-3xl capitalize font-semibold  text-[14px]"
                  href=""
                >
                  apple
                </Link>
              </li>
              <li className="mr-4">
                <Link
                  className="py-2 px-4 bg-gray-700 hover:bg-black text-white rounded-3xl capitalize font-semibold  text-[14px]"
                  href=""
                >
                  samsum
                </Link>
              </li>
              <li className="mr-4">
                <Link
                  className="py-2 px-4 bg-gray-700 hover:bg-black text-white rounded-3xl capitalize font-semibold  text-[14px]"
                  href=""
                >
                  google
                </Link>
              </li>
              <li className="mr-4">
                <Link
                  className="py-2 px-4 bg-gray-700 hover:bg-black text-white rounded-3xl capitalize font-semibold  text-[14px]"
                  href=""
                >
                  nokia
                </Link>
              </li>
            </ul>
          </div>
          <div className="function ml-auto flex items-center">
            <div className="total-products  mr-[50px] text-[14px] font-sans font-semibold">
              22 products
            </div>
            <div className="filter mr-[50px] flex items-center ">
              <HiMiniAdjustmentsHorizontal className="mr-5" />
              <span className="text-[14px] font-sans font-semibold">
                Filter
              </span>
            </div>
            <div className="recommend flex items-center">
              <MdShowChart className="mr-5" />
              <span className="text-[14px] font-sans font-semibold capitalize">
                recommended
              </span>
            </div>
          </div>
          <div></div>
        </div>
      </div>
      <div className="listProducts flex flex-wrap justify-between  mt-[70px]">
        {showListPro.map((item, index) => {
          return (
            <>
              <div className="w-[24%] relative" key={index}>
                <div className="box w-[345px] block h-[445px] p-4">
                  <Link href="/product/detail">
                    <picture className="w-full ">
                      <Image
                        src={item.image}
                        alt="image "
                        className="w-[200px] cursor-pointer hover:scale-110 duration-200 transition-all h-[200px] m-auto"
                      />
                    </picture>
                    <div className=" mt-[20px]">
                      <p className="price font-semibold capitalize">
                        {item.price} <sup className="text-red-600">vnd</sup>
                      </p>
                      <p className="font-[15px] font-sans">{item.name}</p>
                    </div>
                  </Link>
                </div>
                <CiHeart className="bg-gray-600 p-2 rounded-[50%] text-white absolute top-1 right-1 hover:bg-gray-800 text-[2rem] cursor-pointer" />
              </div>
            </>
          );
        })}
      </div>
    </section>
  );
};
export default Page;
