"use client"
import { useState } from 'react'
import MemoryGb from '../memoryGb/MemoryGb'
import ColorProduct from './ColorProduct/ColorProduct'
import NameProduct from './name-product/NameProduct'
import { useSearchParams } from "next/navigation";
import { useDispatch } from 'react-redux'
import { addToCartThunk } from '@/redux/Cart/cartThunks'


export default function InfoDetailProduct({dataProduct}) {
   const searchParams = useSearchParams(); // Lấy tất cả các query params
   const id = searchParams.get("id");
   const [quantily,setQuantily] = useState(1)
   const dispatch = useDispatch()
   const handleAddToCart = (quantily,id) => {
      const cartItem = {
        quantity: quantily,
        product_id:id
      };
      
      dispatch(addToCartThunk(cartItem)); // Thêm sản phẩm vào giỏ hàng thông qua Thunk
    };
  
   
  const formattedPrice = new Intl.NumberFormat('de-DE').format(dataProduct.productPrice);
  return (
    <div className='w-full rounded-xl bg-white'>
    <div className='w-full p-5  '>
        <NameProduct data={dataProduct} fontsize={fontsize}/>
       <MemoryGb/>
       <ColorProduct/>
       <div className='w-full gap-4 flex '>
        <p>Giá bán:</p>  <strong className='price  text-[18px] text-red-600 '>{formattedPrice}₫</strong>
       </div>
       <div className='w-full gap-4 flex '>
        <p>Số lượng:</p> <input type="number" onChange={(e)=>setQuantily(e.target.value)}  />
       </div>
       <div className='w-full gap-5 py-5 flex '>
          <button type='button' onClick={()=>handleAddToCart(quantily,id)} className='bg-red-500 w-[200px] py-3 text-white  rounded-lg text-[16px]  '>Thêm vào giỏ hàng</button>
          <button type='button'  className='bg-slate-800 w-[200px] py-3 text-white  rounded-lg text-[16px]  '>Mua ngay</button>
        
         
       </div>
    </div>
   </div>
  )
}

const fontsize = {
   fontSize:"22px"
}