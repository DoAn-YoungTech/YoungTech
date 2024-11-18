"use client"
import React, { useEffect } from 'react'
import MemoryGb from '../memoryGb/MemoryGb'
import ColorProduct from './ColorProduct/ColorProduct'
import NameProduct from './name-product/NameProduct'
import { useDispatch,useSelector } from 'react-redux'
import { AppDispatch,RootState } from '@/redux/Store'
import { fetchProductsId } from '@/redux/Product/productThunks'
import { useSearchParams } from 'next/navigation';

export default function InfoDetailProduct() {
   const searchParams = useSearchParams();
   const id = searchParams.get('id');
   const dispatch = useDispatch<AppDispatch>();
   const {data,loading} = useSelector((state: RootState) => state.products);
   console.log(data)
   useEffect(()=>{
     if(id){
       dispatch(fetchProductsId(id))
     }
    
   },[dispatch])
  return (
    <div className='w-full rounded-xl bg-white'>
    <div className='w-full p-5  '>
        <NameProduct data={data} fontsize={fontsize}/>
       <MemoryGb/>
       <ColorProduct/>
       <div className='w-full gap-4 flex '>
        <p>Giá bán:</p>  <strong className='price  text-[18px] text-red-600 '>{data.productPrice}₫</strong>
       </div>
       <div className='w-full gap-5 py-5 flex '>
          <button type='button' className='bg-red-500 w-[200px] py-3 text-white  rounded-lg text-[16px]  '>Thêm vào giỏ hàng</button>
          <button type='button' className='bg-slate-800 w-[200px] py-3 text-white  rounded-lg text-[16px]  '>Mua ngay</button>
        
         
       </div>
    </div>
   </div>
  )
}

const fontsize = {
   fontSize:"22px"
}