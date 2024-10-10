import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';


const SeeMore = () => {
  return (
    <div className='w-full flex gap-2 justify-center items-center py-5'>
      <h3 className='font-semibold text-[15px] text-blue-600'>Xem thêm sản phẩm </h3>
      <FontAwesomeIcon  icon={faChevronRight} style={{color: "#0144b7",}} />
    </div>
  )
}

export default SeeMore
