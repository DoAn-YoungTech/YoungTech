import React from 'react'
import MemoryGb from '../memoryGb/MemoryGb'
import ColorProduct from './ColorProduct/ColorProduct'
import NameProduct from './name-product/NameProduct'

export default function InfoDetailProduct() {
  return (
    <div className='w-full rounded-xl bg-white'>
    <div className='w-full p-5  '>
        <NameProduct fontsize={fontsize}/>
       <MemoryGb/>
       <ColorProduct/>
       <div className='w-full gap-4 flex '>
        <p>Giá bán:</p>  <strong className='price  text-[18px] text-red-600 '>40.990.000₫</strong>
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