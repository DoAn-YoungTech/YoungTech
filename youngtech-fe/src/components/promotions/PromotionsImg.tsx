import Image from 'next/image'
import React from 'react'

const PromotionsImg = () => {
  return (
    <div className='w-[50%] flex py-5 justify-between  item '>
        <Image  src="/images/flashSale.png" className='px-2 w-[20%]'  alt='img' width={80} height={40}/>
        <Image  src="/images/flashSale.png" className='px-2 w-[20%]' alt='img' width={80} height={40}/>
        <Image  src="/images/flashSale.png" className='px-2 w-[20%]' alt='img' width={80} height={40}/>
        <Image  src="/images/flashSale.png" className='px-2 w-[20%]' alt='img' width={80} height={40}/>
    </div>
  )
}

export default PromotionsImg
