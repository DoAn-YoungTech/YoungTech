"use client"
import  { useState } from 'react'
const ColorProduct = () => {
    const [show,setShow] = useState<number | null>(1)

    const handlClickGb = (id) =>{
        setShow(id)
    }
  return (
    <>
    
    <div className='gb w-full py-3'>
            <ul className='flex items-center cursor-pointer gap-2'>
                <li onClick={()=>handlClickGb(1)} className={`${show ===1 ?" bg-red-200 border-red-500 border transition-all duration-300 text-red-600  border px-2 py-1 text-[12px] lg:text-[16px] rounded-3xl" :" border px-2 py-1 text-[12px] lg:text-[16px]  rounded-3xl"}`}>Titan tự nhiên</li>
                <li onClick={()=>handlClickGb(2)} className={`${show ===2 ?" bg-red-200 border-red-500 border transition-all duration-300 text-red-600 border px-2 py-1 text-[12px] lg:text-[16px] rounded-3xl" :" border px-2 py-1 text-[12px] lg:text-[16px] rounded-3xl"}`}>Titan đen</li>
                <li onClick={()=>handlClickGb(3)} className={`${show ===3 ?" bg-red-200 border-red-500 border transition-all duration-300 text-red-600 border px-2 py-1 text-[12px] lg:text-[16px] rounded-3xl" :" border px-2 py-1 text-[12px] lg:text-[16px] rounded-3xl"}`}>Titan trắng</li>
                <li onClick={()=>handlClickGb(4)} className={`${show ===4 ?" bg-red-200 border-red-500 border transition-all duration-300 text-red-600 border px-2 py-1 text-[12px] lg:text-[16px] rounded-3xl" :" border px-2 py-1 text-[12px] lg:text-[16px] rounded-3xl"}`}>Titan sa mạc</li>
              
            </ul>
         </div>
    </>
  )
}

export default ColorProduct
