"use client";
import { useState } from "react";
import React from "react";
import Link from "next/link";
import { TbTruckDelivery } from "react-icons/tb";


import Image from "next/image";

import { LuShoppingCart } from "react-icons/lu";
import { BsChatDots } from "react-icons/bs";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
const CheckBox = ({ label, defaultChecked }) => {
  const [isChecked, setIsChecked] = useState(defaultChecked);

  const handleChecked = () => {
    setIsChecked(!isChecked);
  };
  return (
    <>
      <div className="flex items-center">
        <input
          className="w-6 h-6 cursor-pointer"
          type="checkbox"
          value="receive"
          checked={isChecked}
          onChange={handleChecked}
        />
        <p className="text-[14px]  font-semibold ml-4">{label}</p>
      </div>

      {isChecked === true ? (
        <div className="mt-[20px]">
          <div className="flex items-center">
            <div className="flex items-center mr-5">
              <input
                name="done"
                type="radio"
                className="w-6 mr-6 h-6"
                value="nam"
                id="nam"
              />
              <span className="text-[14px]  font-semibold">Nam</span>
            </div>
            <div className="flex  items-center ">
              <input
                id="nu"
                type="radio"
                name="done"
                value="Nu"
                className="w-6 mr-6 h-6"
              />
              <span className="text-[14px]  font-semibold">Nữ</span>
            </div>
          </div>
          <div className="info-name-phone2 mt-[20px] flex items-center justify-between">
            <div className="group/name grid w-[68%]">
              <label
                id="name"
                className="font-semibold text-gray-600 text-[16px] ml-3"
              >
                Họ và tên nguoi nhan
              </label>
              <input
                type="text"
                className="border outline-none p-2 rounded-2xl cursor-pointer capitalize text-[14px] text-gray-500 border-gray-300 hover:border-pink-500"
                placeholder="Nhap ho va ten cua ban"
              />
            </div>
            <div className="group/phone grid w-[28%]">
              <label
                id="name"
                className="font-semibold text-gray-600 text-[16px] ml-3"
              >
                Số điện thoại nguoi nhan
              </label>
              <input
                type="text"
                className="border outline-none p-2 rounded-2xl cursor-pointer capitalize text-[14px] text-gray-500 border-gray-300 hover:border-pink-500"
                placeholder="Nhap số điện thoại cua ban"
              />
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

const Page = () => {
  return (
   <div className="w-full flex flex-col justify-center items-center">
    <Breadcrumb name={"Thanh toán"}/>
    <section  className="pay w-[95%] bg-white p-5">
      <div className="flex justify-between">
        <div className="orderInformation w-[60%]">
          <h3 className="title text-[20px] font-semibold">
            Thông tin đặt hàng
          </h3>
          <div className="formInfo mt-[20px]">
            <form>
              <div className="info-name-phone flex items-center justify-between">
                <div className="group/name grid w-[68%]">
                  <label
                    id="name"
                    className="font-semibold text-gray-600 text-[16px] ml-3"
                  >
                    Họ và tên
                  </label>
                  <input
                    type="text"
                    className="border outline-none p-2 rounded-2xl cursor-pointer capitalize text-[14px] text-gray-500 border-gray-300 hover:border-pink-500"
                    placeholder="Nhap ho va ten cua ban"
                  />
                </div>
                <div className="group/phone grid w-[28%]">
                  <label
                    id="name"
                    className="font-semibold text-gray-600 text-[16px] ml-3"
                  >
                    Số điện thoại
                  </label>
                  <input
                    type="text"
                    className="border outline-none p-2 rounded-2xl cursor-pointer capitalize text-[14px] text-gray-500 border-gray-300 hover:border-pink-500"
                    placeholder="Nhap số điện thoại cua ban"
                  />
                </div>
              </div>
              <div className="info-email mt-[20px]">
                <div className="group/email grid  ">
                  <label
                    id="name"
                    className="font-semibold text-gray-600 text-[16px] ml-3"
                  >
                    Email
                  </label>
                  <input
                    type="text"
                    className="border outline-none p-2 rounded-2xl cursor-pointer capitalize text-[14px] text-gray-500 border-gray-300 hover:border-pink-500"
                    placeholder="Nhap email cua ban"
                  />
                </div>
              </div>
              <div className="info-address mt-[20px]">
                <div className="group/address grid  ">
                  <label
                    id="name"
                    className="font-semibold text-gray-600 text-[16px] ml-3"
                  >
                    Địa chỉ
                  </label>
                  <input
                    type="text"
                    className="border outline-none p-2 rounded-2xl cursor-pointer capitalize text-[14px] text-gray-500 border-gray-300 hover:border-pink-500"
                    placeholder="Địa chỉ cua ban (Ex : Da Nang , Hoa xuan)"
                  />
                </div>
              </div>

              <div className="info-name-phone flex items-center mt-[20px] justify-between">
                <div className="group/city grid w-[28%]">
                  <select className="border outline-none p-2 rounded-2xl cursor-pointer capitalize text-[14px] text-gray-500 border-gray-300 hover:border-pink-500">
                    <option>Đà Nẵng</option>
                    <option>Quảng Nam</option>
                    <option>Hà Nội</option>
                    <option>Bình Dương</option>
                    <option>Khánh Hòa</option>
                    <option>Quy Nhơn</option>
                    <option>Quảng Ninh</option>
                    <option>Quảng Ngãi</option>
                    <option>Quảng Bình</option>
                    <option>Phú Yên</option>
                  </select>
                </div>
                <div className="group/district grid w-[28%]">
                  <select className="border outline-none p-2 rounded-2xl cursor-pointer capitalize text-[14px] text-gray-500 border-gray-300 hover:border-pink-500">
                    <option>Đà Nẵng</option>
                    <option>Quảng Nam</option>
                    <option>Hà Nội</option>
                    <option>Bình Dương</option>
                    <option>Khánh Hòa</option>
                    <option>Quy Nhơn</option>
                    <option>Quảng Ninh</option>
                    <option>Quảng Ngãi</option>
                    <option>Quảng Bình</option>
                    <option>Phú Yên</option>
                  </select>
                </div>
                <div className="group/village grid w-[28%]">
                  <select className="border outline-none p-2 rounded-2xl cursor-pointer capitalize text-[14px] text-gray-500 border-gray-300 hover:border-pink-500">
                    <option>Đà Nẵng</option>
                    <option>Quảng Nam</option>
                    <option>Hà Nội</option>
                    <option>Bình Dương</option>
                    <option>Khánh Hòa</option>
                    <option>Quy Nhơn</option>
                    <option>Quảng Ninh</option>
                    <option>Quảng Ngãi</option>
                    <option>Quảng Bình</option>
                    <option>Phú Yên</option>
                  </select>
                </div>
              </div>
              <div className="info-address mt-[20px]">
                <div className="group/address grid  ">
                  <label
                    id="name"
                    className="font-semibold text-gray-600 text-[16px] ml-3"
                  >
                    Ghi thêm chú thích
                  </label>
                  <input
                    type="text"
                    className="border outline-none p-2 rounded-2xl cursor-pointer capitalize text-[14px] text-gray-500 border-gray-300 hover:border-pink-500"
                    placeholder="(ví dụ: Tôi muốn giao hàng ngoài giờ hành chính)"
                  />
                </div>
              </div>
              <div className="optional mt-[20px]  ">
                <CheckBox
                  label="Gọi cho người khác nhận hàng(nếu có)"
                  defaultChecked={false}
                />
              </div>
            </form>
          </div>
          <h3 className="title text-[20px] mt-[40px] font-semibold">
            Hình thức thanh toán
          </h3>
          <div className="payment-method mt-[20px]">
            <div className="wrap border mt-[10px] hover:border-pink-500 p-6 border-gray-300 rounded-xl">
              <Link href="#">
                <div className="method flex items-center">
                  <input
                    type="radio"
                    name="COD"
                    value="Thanh toán khi nhận hàng"
                    className="w-6 h-6"
                  />
                  <TbTruckDelivery className="mx-6 text-[2.5rem] text-gray-400" />
                  <div className="grid">
                    <span className="text-[16px] text-black">COD</span>
                    <span className="text-[16px] text-black">
                      Thanh toán khi nhận hàng
                    </span>
                  </div>
                </div>
              </Link>
            </div>
            <div className="wrap border mt-[10px] hover:border-pink-500 p-6 border-gray-300 rounded-xl">
              <Link href="#">
                <div className="method flex items-center">
                  <input
                    type="radio"
                    name="COD"
                    value="Thanh toán khi nhận hàng"
                    className="w-6 h-6"
                  />
                  <Image width={50} height={50} src="/designImage/imageLogo/logoPay/momo-icon.png" className="mx-5 w-[40px] h-[40px]" />
                  <div className="grid">
                    <span className="text-[16px] text-black">
                      Ví điện tử MoMo
                    </span>
                    <span className="text-[16px] text-black">
                      Thanh toán momo
                    </span>
                  </div>
                </div>
              </Link>
            </div>
            <div className="wrap border mt-[10px] hover:border-pink-500 p-6 border-gray-300 rounded-xl">
              <Link href="#">
                <div className="method flex items-center">
                  <input
                    type="radio"
                    name="COD"
                    value="Thanh toán khi nhận hàng"
                    className="w-6 h-6"
                  />
                  <Image width={50} height={50} src="/designImage/imageLogo/logoPay/logo-zalopay.svg" className="mx-5 w-[40px] h-[40px]" />
                  <div className="grid">
                    <span className="text-[16px] text-black">
                      Ví điện tử ZaloPay
                    </span>
                    <span className="text-[16px] text-black">
                      Zalopay Wallet / ATM Card / Internet Banking / Visa Card /
                      VietQR / Apple Pay
                    </span>
                  </div>
                </div>
              </Link>
            </div>
            <div className="wrap border mt-[10px] hover:border-pink-500 p-6 border-gray-300 rounded-xl">
              <Link href="#">
                <div className="method flex items-center">
                  <input
                    type="radio"
                    name="COD"
                    value="Thanh toán khi nhận hàng"
                    className="w-6 h-6"
                  />
                  <Image width={50} height={50} src="/designImage/imageLogo/logoPay/vnpay.png" className="mx-5 w-[50px]" />
                  <div className="grid">
                    <span className="text-[16px] text-black">
                      Ví điện tử VNPAY
                    </span>
                    <span className="text-[16px] text-black">
                      QR Code thanh toán qua ngân hàng
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div className="cart-price w-[38%]">
          <div className="total-price">
            <h3 className="title text-[20px] font-semibold">Sản phẩm</h3>
            <div className="cart_empty mt-[20px]">
              <h3 className="text-red-500 text-[14px] text-center">
                Giỏ hàng của bạn hiện đang trống. Hãy mua sắm ngay nhé!
              </h3>
              <LuShoppingCart className="mx-auto text-red-500 mt-3 text-[2rem]" />
              <div className="mt-[20px] text-center">
                <Link href="/product" className=" ">
                  <button className="  py-2 px-4 rounded-xl border border-gray-300 text-[14px] bg-gray-300 hover:bg-black hover:text-white text-red-500  font-semibold">
                    Mua Hàng nào
                  </button>
                </Link>
              </div>
            </div>
            <div className="productsList mt-[20px]">
              <div className="header flex justify-between items-center">
                <div className="chooseAll_product flex items-center ">
                  <span className="mr-5 text-[15px] font-semibold text-gray-600">
                    Brand Sản phẩm
                  </span>
                  <button className="cursor-pointer flex items-center text-[15px] font-semibold text-green-600 p-2 rounded-xl border border-gray-300">
                    <BsChatDots className="mx-2" /> <span>Chat ngay</span>
                  </button>
                </div>
                <div className="mx-5 text-[15px] font-semibold text-gray-600 quantity">
                  Số lượng
                </div>
                <div className="mx-5 text-[15px] font-semibold text-gray-600 price">
                  Giá
                </div>
              </div>
              <div className="mt-[20px]">
                <div className="mb-[20px] border-b pb-3 border-gray-300 flex justify-between  items-start">
                  <div className="chooseAll_product flex items-start">
                    <Image width={50} height={50}
                      src="/designImage/imageProducts/dienthoai/ip1.png"
                      className="mx-4 w-[40px]"
                      alt="image1"
                    />
                    <span className="text-[14px] font-semibold text-gray-500">
                      Apple ipad air 11 2024
                    </span>
                  </div>
                  <div className="mx-5 text-[14px] text-gray-500 quantity">
                    1
                  </div>
                  <div className="mx-5 text-[14px] text-gray-500 price">
                    100.00<sup>vnd</sup>
                  </div>
                </div>
                <div className="mb-[20px] pb-3 flex justify-between border-b border-gray-300 items-start">
                  <div className="chooseAll_product flex items-start">
                    <Image width={50} height={50}
                      src="/designImage/imageProducts/dienthoai/ip2.png"
                      className="mx-4 w-[40px]"
                      alt="image1"
                    />
                    <span className="text-[14px] font-semibold text-gray-500">
                      Apple ipad air 11 2024
                    </span>
                  </div>
                  <div className="mx-5 text-[14px] text-gray-500 quantity">
                    1
                  </div>
                  <div className="mx-5 text-[14px] text-gray-500 price">
                    100.00<sup>vnd</sup>
                  </div>
                </div>
              </div>
              <div className="pay">
                <div className="total flex justify-between items-center">
                  <span className="text-[14px] text-gray-500">
                    Tổng tiền hàng
                  </span>
                  <span className="text-[14px] text-gray-500">
                    100.000<sup>vnd</sup>
                  </span>
                </div>
                <div className="delivery my-[20px] flex justify-between items-center">
                  <span className="text-[14px] text-gray-500">
                    Phí vận chuyển
                  </span>
                  <span className="text-[14px] text-gray-500">
                    30.000<sup>vnd</sup>
                  </span>
                </div>
                <div className="total flex justify-between items-center">
                  <span className="text-[14px] text-gray-500">
                    Tổng thanh toán
                  </span>
                  <span className="text-[18px] py-2 px-5 border border-red-500 hover:bg-red-700   hover:text-white duration-200 transition-all rounded-xl cursor-pointer text-red-500">
                    234.000<sup>vnd</sup>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
   </div>
  );
};

export default Page;
