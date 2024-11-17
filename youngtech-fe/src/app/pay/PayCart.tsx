import Link from 'next/link'
import React from 'react'
import { BsChatDots } from 'react-icons/bs'
import { LuShoppingCart } from 'react-icons/lu'
import Image from "next/image";
const PayCart = () => {
  return (
    <div className="cart-price p-5 flex justify-center items-center  bg-white w-[45%]">
    <div className="total-price w-[90%]">
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
  )
}

export default PayCart
