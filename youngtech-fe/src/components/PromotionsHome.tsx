import AppItemProduct from "./product/itemProduct"
import PromotionsImg from "./promotions/PromotionsImg"
import PromotionsName from "./promotions/PromotionsName"
import SeeMore from "./see-more/SeeMore"
import Title from "./title-home/title"


const PromotionsHome = () => {
  return (
   <div className="w-full py-5">
    <div className="w-full ps-4 ">
    <Title  title={"Khuyến mãi Online"}/>
    </div>
   
   <div className="w-full pb-5  rounded-lg bg-white">
  
    <div className="flex gap-2 items-center justify-center w-full ">
      <PromotionsImg/>
      <div className="w-[50%] flex justify-center items-center gap-2">
      <PromotionsName name={"Máy giặc"}/>
      <PromotionsName name={"Tủ lạnh"}/>
      <PromotionsName name={"Điện Thoại"}/>
      <PromotionsName name={"Tivi"}/>
      </div>
  
    </div>
  <div className=" px-5 grid justify-center items-center  grid-cols-2 lg:grid-cols-5 gap-2">
    <AppItemProduct  />
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
  <SeeMore/>
   </div>
   </div>
  )
}

export default PromotionsHome
