
import React from 'react'


import ImageProductDetails from './image-product-details/ImageProductDetails'
import Breadcrumb from './Breadcrumb/Breadcrumb'
import InfoDetailProduct from './InfoDetailProduct/InfoDetailProduct'
import Review from './review/Review'

const MainProductDetails = () => {
  return (
    <>
    <div className='w-full flex flex-col  justify-center items-center'>
        <main className='w-[90%]' >
          <Breadcrumb name="Chi tiết sản phẩm"/>
     
     <div className=' lg:flex gap-5 w-full'>
        <div className='lg:w-[60%] w-full'>
            <ImageProductDetails/>
            
        </div>
        <div className='lg:w-[40%] mb-5 w-full '>
        <InfoDetailProduct/>

        </div>
        
     </div>
     <div className='w-full  lg:w-[59%]'>
     {/* <Review/> */}
     </div>
        </main>
    </div>
    </>
  )
}

export default MainProductDetails
