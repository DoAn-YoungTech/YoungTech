import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';


const FilterProduct = () => {
  return (
    
      <button className="border py-2 px-4 shadow-sm gap-2 flex justify-center items-center rounded-md"> <FontAwesomeIcon icon={faFilter} />Lọc</button>
   
  )
}

export default FilterProduct
