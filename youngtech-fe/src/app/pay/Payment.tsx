import React from 'react'
import Image from "next/image";
import Link from 'next/link';
import { TbTruckDelivery } from 'react-icons/tb';

const Payment = () => {
  return (
    <>
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
    </>
  )
}

export default Payment
