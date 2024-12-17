"use client"
import { getOrderByIdCustomer } from '@/services/category/order/orderServices';
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { BsCartCheck } from "react-icons/bs";
import TableOrder from './TableOrder';
const OrderCustomer = () => {
  const {data:session} = useSession();
  const [dataOrder,setDataOrder] = useState([])
  console.log(dataOrder)
  const [selectedTab, setSelectedTab] = useState('Tất cả');
  const tabs = [
    'Tất cả',
    'Chờ xử lý',
    'Đã xác nhận',
    'Đang chuyển hàng',
    'Đang giao hàng',
    'Đã hủy',
    'Thành công',
  ];
 
  const data = async ()=>{
    const req = await getOrderByIdCustomer(7);
    setDataOrder(req.data)
  }
 
  useEffect(()=>{
    if(session){
     const id =session.user.id;
    if(id){
      data(id)
    }
    }
  },[session])

  return (
 
   <div className="w-full h-screen mt-5 p-6">
   <div className="flex justify-between w-[50%] items-center">
     <h2 className="text-xl font-bold">Đơn hàng đã mua</h2>
     <div className="text-sm text-gray-500">Từ 20/10/2023 - 20/10/2024</div>
     <button className="text-sm text-blue-500">Thay đổi</button>
   </div>
  
   
   {/* Tabs */}
   <div className="flex space-x-2 mt-4">
     {tabs.map(tab => (
       <button
         key={tab}
         className={`px-4 mb-5 py-2 rounded-lg ${
           selectedTab === tab
             ? 'bg-slate-800 text-white'
             : 'border bg-white '
         }`}
         onClick={() => setSelectedTab(tab)}
       >
         {tab}
       </button>
     ))}
   </div>
    {dataOrder && dataOrder.length > 0 ?
  <div className="flex flex-col  bg-white items-center py-10">
  <TableOrder orders={dataOrder}/>
  </div>
  :  
  <div className="flex flex-col  bg-white items-center py-10">
   
  <BsCartCheck  className='text-[50px] text-red-500'/>
    <h3 className="mt-4 text-lg font-bold">Rất tiếc, không tìm thấy đơn hàng nào phù hợp</h3>
    <p className="mt-2 text-gray-500">Vẫn còn rất nhiều sản phẩm đang chờ bạn</p>

    {/* Suggestion Buttons */}
    <div className="mt-6 space-x-2">
      <button className="px-4 py-2 border rounded-lg">Tivi</button>
      <button className="px-4 py-2 border rounded-lg">Tủ lạnh</button>
      <button className="px-4 py-2 border rounded-lg">Máy lạnh</button>
      <button className="px-4 py-2 border rounded-lg">Máy giặt</button>
      <button className="px-4 py-2 border rounded-lg">Gia dụng</button>
    </div>

    <button className="mt-8 text-blue-500 text-sm">Về trang chủ</button>
  </div>
  }
   
 
  
 </div>
  );
};

export default OrderCustomer;
