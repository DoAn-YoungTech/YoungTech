import Link from 'next/link'
import React from 'react'
import { BsChatDots } from 'react-icons/bs'
import { LuShoppingCart } from 'react-icons/lu'
import Image from "next/image";
import { formatCurrency } from '../formatCurrency/formatCurrency';
import Payment from './Payment';
import { useDispatch,useSelector } from 'react-redux';
import { createOrder } from '@/redux/Order/orderThunks';

const PayCart = ({userInfo, handleOpen,totalOrder, CartProduct }) => {
  const dispatch = useDispatch();
  const handlePayMent = async()=>{

     if(userInfo.fullName === "" || userInfo.phoneNumber === ""){
      handleOpen();
      return
     }

     const orderDetails= CartProduct.map((item) => ({
      unitPrice: item.unitPrice,
      quantity: item.quantity,
      product_id: parseInt(1), 
    }));

    const order = {
      totalAmount:Number(totalOrder) + Number(50000),
      customer_id	:1
    }

     const req = await dispatch(createOrder({order, orderDetails}))

   
    
    
  }
  return (
    <div className="cart-price p-5 flex justify-center  bg-white w-[45%]">
      <div className="total-price w-[90%]">
        <h3 className="title text-[20px] font-semibold">Sản phẩm</h3>
        <div className="productsList mt-[20px]">
          <div className="header flex justify-between items-center">
            <div className="chooseAll_product flex items-center">
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
            {CartProduct &&
              CartProduct.map((cart) => {
                // Tách chuỗi imageUrls thành mảng và lấy ảnh đầu tiên
                const imageArray = cart.item?.imageUrls?.split(',') || [];
                const firstImage = imageArray[0];
                return (
                  <div key={cart.item.id} className="mb-[20px] border-b pb-3 border-gray-300 flex justify-between items-start">
                    <div className="chooseAll_product flex items-start">
                      <Image
                        width={100}
                        height={100}
                        src={`/designImage/imageProducts/${firstImage}`}  // Đảm bảo đường dẫn đúng
                        className="mx-4 w-[40px]"
                        alt="Product Image"
                      />
                      <span className="text-[14px] font-semibold text-gray-500">
                        {cart.item.productName}
                      </span>
                    </div>
                    <div className="mx-5 text-[14px] text-gray-500 quantity">
                      {cart.quantity}
                    </div>
                    <div className="mx-5 text-[14px] text-gray-500 price">
                      {formatCurrency(cart.unitPrice)}
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="pay">
            <div className="total flex justify-between items-center">
              <span className="text-[14px] text-gray-500">
                Tổng tiền hàng
              </span>
              <span className="text-[14px] text-gray-500">
                {formatCurrency(totalOrder)}
              </span>
            </div>
            <div className="delivery my-[20px] flex justify-between items-center">
              <span className="text-[14px] text-gray-500">
                Phí vận chuyển
              </span>
              <span className="text-[14px] text-gray-500">
                {formatCurrency(50000)}
              </span>
            </div>
            <div className="total flex justify-between items-center">
              <span className="text-[14px] text-gray-500">
                Tổng thanh toán
              </span>
              <span className="text-[18px] py-2 px-5 border border-red-500 hover:bg-red-700 hover:text-white duration-200 transition-all rounded-xl cursor-pointer text-red-500">
               {formatCurrency(Number(totalOrder) + Number(50000) )}
              </span>
            </div>
          </div>
        </div>
        <div className='w-full'>
          <Payment/>
        </div>
        <div className='w-full flex py-5 justify-center'>
        <button 
  type='button' 
  onClick={handlePayMent}
  className='w-[40%] py-2 shadow-md hover:bg-red-600 text-white rounded-md shadow-red-500 px-10 bg-red-500 active:scale-95 active:shadow-none transition duration-150'
>
  Thanh toán
</button>
        </div>
      </div>
    </div>
  );
};

export default PayCart;
