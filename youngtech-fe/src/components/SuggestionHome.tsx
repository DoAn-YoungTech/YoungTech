import AppItemProduct from "./product/itemProduct"

import SeeMore from "./see-more/SeeMore"
import Title from "./title-home/title"


const Suggestion = () => {
  return (
   <div className="w-full py-5">
   
   <div className="w-full pb-5  rounded-lg bg-white">
   <div className="pl-4">
          <Title title={"Gợi ý cho bạn"} />
        </div>
  
  <div className=" px-5 grid justify-center items-center  grid-cols-2 lg:grid-cols-5 gap-2">
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
  <SeeMore/>
   </div>
   </div>
  )
}

export default Suggestion
