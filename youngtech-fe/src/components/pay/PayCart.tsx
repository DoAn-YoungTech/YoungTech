"use client"
import React, { useEffect } from 'react'
import { BsChatDots } from 'react-icons/bs'
import Image from "next/image";
import { formatCurrency } from '../formatCurrency/formatCurrency';
import Payment from './Payment';
import { useDispatch,useSelector } from 'react-redux';
import { createOrder } from '@/redux/Order/orderThunks';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchCustomersById } from '@/redux/Customers/customerThunks';
import ItemPay from './ItemPay';
import ItemCartPay from './ItemCartPay';


const PayCart = ({userInfo, handleOpen,totalOrder, CartProduct,CartProductOrder,totalOrderCart }) => {
  const dispatch = useDispatch();
  const { customers } = useSelector((state) => state.customers.customers);
  const handlePayMent = async()=>{

     if(userInfo.fullName === "" || userInfo.phoneNumber === ""){
      handleOpen();
      return
     }
     
     if(CartProduct && totalOrder > 0 ){
      const orderDetails= CartProduct.map((item) => ({
        unitPrice: item.unitPrice,
        quantity: item.quantity,
        product_id: item.product_id, 
      }));
  
      const order = {
        totalAmount:Number(totalOrder) + Number(50000),
        status:"Pending",
        customer_id	:Number(customers.id)
      }
  
       const req = await dispatch(createOrder({order, orderDetails}))
       if (req?.meta) {
        if (req.meta.requestStatus === 'fulfilled') {
          toast.success("Thanh toán thành công");
        } else {
          toast.error("Lỗi vui lòng kiểm tra lại");
        }
      } else {
        toast.error("Lỗi không xác định");
      }    
     }else{
      const cartId = CartProductOrder[0]?.cartId;
      const cartItems = CartProductOrder.map((cart)=> cart.item);
      const orderDetails= CartProductOrder.map((item) => ({
        unitPrice: item.unitPrice,
        quantity: item.quantity,
        product_id: item.product_id, 
      }));
  
      const order = {
        totalAmount:Number(totalOrderCart) + Number(50000),
        status:"pending",
        customer_id	:Number(customers.id)
      }
  
       const req = await dispatch(createOrder({order, orderDetails,cartId,cartItems}))
       if (req?.meta) {
        if (req.meta.requestStatus === 'fulfilled') {
          toast.success("Thanh toán thành công");
        } else {
          toast.error("Lỗi vui lòng kiểm tra lại");
        }
      } else {
        toast.error("Lỗi không xác định");
      }     
     }
     

  }

     useEffect(() => {
        dispatch(fetchCustomersById());
      }, [dispatch]);
  return (
    <div className="cart-price p-5 flex justify-center  bg-white w-[45%]">
      <ToastContainer/>
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
          {CartProduct && <ItemPay CartProduct={CartProduct}/> }    
          {CartProductOrder && <ItemCartPay DataCartOrder={CartProductOrder} /> }    
          
           
          <div className="pay">
            <div className="total flex justify-between items-center">
              <span className="text-[14px] text-gray-500">
                Tổng tiền hàng
              </span>
              <span className="text-[14px] text-gray-500">
              {totalOrder ? formatCurrency(Number(totalOrder)) : formatCurrency(Number(totalOrderCart)) }
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
               {totalOrder ? formatCurrency(Number(totalOrder) + Number(50000) ) : formatCurrency(Number(totalOrderCart) + Number(50000) ) }
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
