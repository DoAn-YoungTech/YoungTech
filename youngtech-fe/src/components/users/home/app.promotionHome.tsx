import AppItemImgPromotion from './app.itemImgPromotion copy';
import AppItemProduct from '../app.itemProduct';
import AppItemPromotion from './app.itemPromotion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
const AppPromotionHome = () => {
  return (
    <div className="flex flex-col justify-center mt-5  items-center w-full">
    <div className="w-[90%] py-2  ">
 <h3 className="text-[24px] font-bold">Khuyến mãi Online</h3>
 </div>
 <div className="w-[90%] mt-2 rounded-lg bg-white ">
    <div className="flex  hidden justify-between items-center w-full ">
    
     <AppItemImgPromotion/>
     <AppItemImgPromotion/>
     <AppItemImgPromotion/>
     <AppItemImgPromotion/> 
       <AppItemPromotion/>
      <AppItemPromotion/>
      <AppItemPromotion/>
      <AppItemPromotion/>
    </div>
    <div className='grid px-5 py-5 gap-3 justify-between items-center grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5'>
       <AppItemProduct/>
       <AppItemProduct/>
       <AppItemProduct/>
       <AppItemProduct/>
       <AppItemProduct/>
       <AppItemProduct/>
       <AppItemProduct/>
       <AppItemProduct/>
       <AppItemProduct/>
       <AppItemProduct/>
     
     </div> 
     <div className='flex justify-center gap-2 mb-5 w-full items-center'>
              <h3 className='text-blue-600  font-semibold'>Xem thêm sản phẩm</h3>
              <FontAwesomeIcon className='text-sm' icon={faChevronRight} style={{color: "#0659ea",}} />
       </div>
      
    </div>
 </div>
  )
}

export default AppPromotionHome
