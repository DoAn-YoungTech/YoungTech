import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars,faMagnifyingGlass,faUser,faCartShopping,faLocationDot,faChevronRight } from '@fortawesome/free-solid-svg-icons';
import AppBanner from './app.banner';

const Header = () => {

  return (
   
 <>
    <header className="flex fixed z-10  justify-center items-center gap-5 bg-blue-500 h-[64px] w-full">
    
    <div className='img'>
      <Image 
        src="/images/logo.png"  
        alt="Logo" 
        width={250}  
        height={50} 
      />
    </div>
    <div className='flex justify-between whitespace-nowrap gap-2 items-center'>
    <FontAwesomeIcon icon={faBars} style={{color: "#ffffff",}} />
     <a className='text-white ' href="">Danh Mục</a>
    </div> 
    <div className=' lg:flex items-center gap-2 md:block hidden lg:block '>
    <div className='flex flex-col  border w-[300px]  rounded-3xl  border-gray-300 bg-white items-center'>
    <div className="flex items-center rounded-3xl w-full ">
    <input
      type="text"
      placeholder="Tìm kiếm..."
      className="py-3 w-[80%] rounded-s-3xl  px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <button className="text-white w-[20%] py-2 px-4 transition">
    <FontAwesomeIcon icon={faMagnifyingGlass} style={{color: "#949494",}} />
    </button>
  </div>
    </div>
    <div className='flex items-center p-3 whitespace-nowrap rounded-3xl hover:bg-blue-600 gap-2'>
    <FontAwesomeIcon icon={faUser} style={{color: "#ffffff",}} />
     <a className='text-white' href="">Đăng nhập</a>
     
    </div>
    <div className='flex items-center p-3 whitespace-nowrap rounded-3xl hover:bg-blue-600 gap-2'>
    <FontAwesomeIcon icon={faCartShopping} style={{color: "#ffffff",}} />
     <a className='text-white' href="">Giỏ hàng</a>
     
    </div>
    <div className='flex items-center whitespace-nowrap w-[250px] p-3 rounded-3xl bg-blue-600 gap-2'>
    <FontAwesomeIcon icon={faLocationDot} style={{color: "#ffffff",}} />
     <a className='text-white' href="">Đà Nẵng</a>
     <div className='flex w-[130px] justify-end'>
     <FontAwesomeIcon  icon={faChevronRight} style={{color: "#ffffff",}} />
     </div>
    </div>
    </div>
  </header>
  <div className='w-[90%] m-auto pt-[80px]'>
  <AppBanner    />
  </div>
  
 </>
  );
};

export default Header;
