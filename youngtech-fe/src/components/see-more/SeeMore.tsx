import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

const SeeMore = () => {
  return (
    <div className='w-full flex justify-center items-center py-5'>
      <div className='w-[30%] rounded-lg shadow-md border-blue-500 cursor-pointer border py-3 flex gap-2 justify-center items-center transition-transform transform group hover:bg-blue-500 group-hover:translate-y-[-4px] group-hover:opacity-100 opacity-80'>
        <h3 className='font-semibold text-[15px] group-hover:text-white text-blue-600'>Xem thêm sản phẩm</h3>
        <FontAwesomeIcon className='text-[#0144b7] group-hover:text-white transition-colors' icon={faChevronRight} />
      </div>
    </div>
  );
}

export default SeeMore;
