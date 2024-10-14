import React from "react";
import Image from "next/image";

import image1 from "../../../../public/designImage/imageProducts/maygiac/samsung-ai-ww10t634dlx-sv-051222-105001-600x600.jpg";
import image2 from "../../../../public/designImage/imageProducts/maygiac/samsung-ai-ww10t634dlx-sv-051222-105001-600x600.jpg";
import image3 from "../../../../public/designImage/imageProducts/maygiac/may-giat-aqua-inverter-11-kg-aqw-dr110jt-bk-0-600x600.jpg";
import image4 from "../../../../public/designImage/imageProducts/maygiac/may-giat-panasonic-inverter-105-kg-na-v105fc1lv-130822-013143-600x600.jpg";
import image5 from "../../../../public/designImage/imageProducts/maygiac/may-giat-panasonic-inverter-105-kg-na-v105fc1lv-130822-013143-600x600.jpg";
import Link from "next/link";
import { FcRuler } from "react-icons/fc";
const Page = () => {
  return (
    <div className="">
      <section className="detail  lg:container m-auto">
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
              <h3 className="font-semibold text-[14px]">Parent Category</h3>
              <p className="text-[17px] mt-4 font-sans capitalize namePro">
                Name product here !...
              </p>
              <p className="mt-4 text-red-700 font-bold text-[20px]">
                Price: $90909
              </p>
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
                  <li className="mr-4">
                    <Link
                      href="/"
                      className="uppercase text-[14px] p-3  border border-gray-500"
                    >
                      s
                    </Link>
                  </li>
                  <li className="mr-4">
                    <Link
                      href="/"
                      className="uppercase text-[14px] p-3  border border-gray-500"
                    >
                      m
                    </Link>
                  </li>
                  <li className="mr-4">
                    <Link
                      href="/"
                      className="uppercase text-[14px] p-3  border border-gray-500"
                    >
                      l
                    </Link>
                  </li>
                  <li className="mr-4">
                    <Link
                      href="/"
                      className="uppercase text-[14px] p-3  border border-gray-500"
                    >
                      xl
                    </Link>
                  </li>
                  <li className="mr-4">
                    <Link
                      href="/"
                      className="uppercase text-[14px] p-3  border border-gray-500"
                    >
                      2xl
                    </Link>
                  </li>
                  <li className="mr-4">
                    <Link
                      href="/"
                      className="uppercase text-[14px] p-3  border border-gray-500"
                    >
                      3xl
                    </Link>
                  </li>
                  <li className="mr-4">
                    <Link
                      href="/"
                      className="uppercase text-[14px] p-3  border border-gray-500"
                    >
                      4xl
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="block  mt-[50px]">
                <button
                  className="w-[80%] m-auto py-3 px-4 rounded-3xl capitalize bg-red-700 text-white
                 text-[15px] font-semibold"
                >
                  thêm vào giỏ hàng
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page;
