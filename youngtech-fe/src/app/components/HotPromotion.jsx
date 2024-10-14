"use client";

import React from "react";
import sale1 from "../../../public/designImage/imageCategories/sale.png";
import sale2 from "../../../public/designImage/imageCategories/giadungsale.png";
import sale3 from "../../../public/designImage/imageCategories/nuocnongsale.png";
import sale4 from "../../../public/designImage/imageCategories/hangcaocap.png";
import Link from "next/link";
import Image from "next/image";

import product1 from "../../../public/designImage/imageProducts/Mobile Devices/Smartphones/apple-iphone-12-mini.jpg";
import product2 from "../../../public/designImage/imageProducts/Mobile Devices/Smartphones/apple-iphone-12-pro--.jpg";
import product3 from "../../../public/designImage/imageProducts/Mobile Devices/Smartphones/apple-iphone-12-pro-max-.jpg";
import product4 from "../../../public/designImage/imageProducts/Mobile Devices/Smartphones/apple-iphone-12.jpg";
import product5 from "../../../public/designImage/imageProducts/Mobile Devices/Smartphones/apple-iphone-13-mini.jpg";
import product6 from "../../../public/designImage/imageProducts/Mobile Devices/Smartphones/apple-iphone-13-pro-max.jpg";
import product7 from "../../../public/designImage/imageProducts/Mobile Devices/Tablets/apple-ipad-air-11-2024.jpg";
import product8 from "../../../public/designImage/imageProducts/Mobile Devices/Tablets/apple-ipad-air-13-2024.jpg";
import product9 from "../../../public/designImage/imageProducts/Mobile Devices/Tablets/apple-ipad-pro-11-2024.jpg";
import product10 from "../../../public/designImage/imageProducts/Mobile Devices/Tablets/apple-ipad-pro-13-2024.jpg";
import product11 from "../../../public/designImage/imageProducts/Entertainment Devices/Smart TVs/Amazon Fire TV 40 2-Series HD smart TV with Fire TV Alexa Voice Remote, stream live TV without cable.jpg";
import product12 from "../../../public/designImage/imageProducts/Entertainment Devices/Smart TVs/Hisense 40-Inch Class A4 Series FHD 1080p Smart Roku TV with Alexa Compatibility.jpg";
import product13 from "../../../public/designImage/imageProducts/Entertainment Devices/Smart TVs/Hisense 40-Inch.jpg";
import product14 from "../../../public/designImage/imageProducts/Entertainment Devices/Smart TVs/Hisense A4FH Series 32-Inch.jpg";
import product15 from "../../../public/designImage/imageProducts/Entertainment Devices/Smart TVs/INSIGNIA 42-inch Class F20 Series Smart Full HD 1080p Fire TV with Alexa Voice Remote (NS-42F201NA23).jpg";
import product16 from "../../../public/designImage/imageProducts/Entertainment Devices/Smart TVs/SAMSUNG 43-Inch .jpg";
import "./HotPromotion.css";
import { LuHeart } from "react-icons/lu";
const listSale = [
  { id: 1, image: sale1, alt: "sale" },
  { id: 2, image: sale2, alt: "sale" },
  { id: 3, image: sale3, alt: "sale" },
  { id: 4, image: sale4, alt: "sale" },
];

const listPromotion = [
  {
    id: 1,
    image: product1,
    name: "product name...",
    sale: 100.0,
    price: 12000000,
    discount: 10,
  },
  {
    id: 2,
    image: product2,
    name: "product name...",
    sale: 100.0,
    price: 12000000,
    discount: 10,
  },
  {
    id: 3,
    image: product3,
    name: "product name...",
    sale: 100.0,
    price: 12000000,
    discount: 10,
  },
  {
    id: 4,
    image: product4,
    name: "product name...",
    sale: 100.0,
    price: 12000000,
    discount: 10,
  },
  {
    id: 5,
    image: product5,
    name: "product name...",
    sale: 100.0,
    price: 12000000,
    discount: 10,
  },
  {
    id: 6,
    image: product6,
    name: "product name...",
    sale: 100.0,
    price: 12000000,
    discount: 10,
  },
  {
    id: 7,
    image: product7,
    name: "product name...",
    sale: 100.0,
    price: 12000000,
    discount: 10,
  },
  {
    id: 8,
    image: product8,
    name: "product name...",
    sale: 100.0,
    price: 12000000,
    discount: 10,
  },
  {
    id: 9,
    image: product9,
    name: "product name...",
    sale: 100.0,
    price: 12000000,
    discount: 10,
  },
  {
    id: 10,
    image: product10,
    name: "product name...",
    sale: 100.0,
    price: 12000000,
    discount: 10,
  },
  {
    id: 11,
    image: product11,
    name: "product name...",
    sale: 100.0,
    price: 12000000,
    discount: 10,
  },
  {
    id: 12,
    image: product12,
    name: "product name...",
    sale: 100.0,
    price: 12000000,
    discount: 10,
  },
  //   {
  //     id: 13,
  //     image: product13,
  //     name: "product name...",
  //     sale: 100.0,
  //     price: 12000000,
  //     discount: 10,
  //   },
  //   {
  //     id: 14,
  //     image: product14,
  //     name: "product name...",
  //     sale: 100.0,
  //     price: 12000000,
  //     discount: 10,
  //   },
  //   {
  //     id: 15,
  //     image: product15,
  //     name: "product name...",
  //     sale: 100.0,
  //     price: 12000000,
  //     discount: 10,
  //   },
  //   {
  //     id: 16,
  //     image: product16,
  //     name: "product name...",
  //     sale: 100.0,
  //     price: 12000000,
  //     discount: 10,
  //   },
];
const HotPromotion = () => {
  return (
    <>
      <section className="hot-promotion pt-[50px]">
        <h3 style={title} className="">
          Khuyến mãi Online
        </h3>
        <div className="promotion mt-[50px]">
          <ul className="flex items-center">
            {listSale.map((item) => {
              return (
                <>
                  <li key={item.id} className="pr-8">
                    <Link href="/" className="">
                      <Image
                        className=" py-6 border-b-2 duration-500 transition-all hover:border-b-red-600 w-[130px]"
                        src={item.image}
                        alt={item.alt}
                      />
                    </Link>
                  </li>
                </>
              );
            })}
          </ul>
        </div>
        <div className="listProductPromotion ">
          <div className="flex justify-between items-baseline flex-wrap">
            {listPromotion.map((item) => {
              return (
                <>
                  <div className="boxProduct  w-[16.6%] relative cursor-pointer mt-[50px] p-2 rounded-md">
                    <div className="p-2">
                      <Image
                        src={item.image}
                        className="mx-auto hover:scale-105 duration-300 transition-all p-2"
                        alt="product"
                      />
                      <p className="capitalize font-sans text-[16px] font-semibold my-2">
                        {item.name}
                      </p>
                      <p className="price text-[1rem] text-red-600 font-semibold">
                        {item.price} <sup>vnd</sup>
                      </p>
                      <div className="flex justify-between items-center">
                        <del className="text-gray-400 text-[.9rem]">
                          {item.sale}
                          <sup>vnd</sup>
                        </del>
                        <p className="ml-4 text-red-600 font-semibold">
                          {item.discount}%
                        </p>
                      </div>
                      <div data-tooltip={`-10%}`} className="mt-3 button">
                        <div className="button-wrapper">
                          <div className="text text-[.9rem]">Mua ngay</div>
                          <span className="icon">
                            <svg
                              viewBox="0 0 16 16"
                              className="bi bi-cart2"
                              fill="currentColor"
                              height="16"
                              width="16"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"></path>
                            </svg>
                          </span>
                        </div>
                      </div>
                    </div>
                    <LuHeart className="text-[1.6rem] text-gray-500 absolute top-1 hover:text-red-600 cursor-pointer right-1" />
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default HotPromotion;

const title = {
  fontWeight: " 700",
  fontSize: " 24px",
  color: "#1d2939",
  marginBottom: "20px",
  lineHeight: " 32px",
};

const buttonStyle = {
  backgroundColor: "pink",
  padding: "7px 12px",
  width: "100%",
  borderRadius: "3px",
  boxShadow: "0 4px gray",
};
