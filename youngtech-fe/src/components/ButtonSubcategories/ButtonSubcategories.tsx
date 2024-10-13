"use client";
import FilterProduct from "./FilterProduct"
import React, { useState, useEffect } from 'react';

const ButtonSubcategories = () => {
  const [isSticky, setIsSticky] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const buttonSubcategories = document.getElementById('buttonSubcategories');
      const stickyPoint = buttonSubcategories?.offsetTop || 0;

      if (window.pageYOffset > stickyPoint) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <>

<div className='w-full bg-white mb-5'>

<div 
  id="buttonSubcategories" 
  className={`transition-all duration-300 ${isSticky ? 'fixed top-[64px] left-0 w-full z-50 bg-white shadow-lg' : ''}`}
>
      <div className="flex py-5 px-5 gap-3 items-center sticky top-50 left-0 bg-white z-10">
        <FilterProduct />
        <button className="bg-slate-200 py-2 shadow-sm px-7 rounded-md">Iphone</button>
        <button className="bg-slate-200 py-2 shadow-sm px-7 rounded-md">Samsung</button>
        <button className="bg-slate-200 py-2 shadow-sm px-7 rounded-md">Oppo</button>
        <button className="bg-slate-200 py-2 shadow-sm px-7 rounded-md">Xiaomi</button>
      </div>
      </div>
      </div>
    </>
  );
};




export default ButtonSubcategories
