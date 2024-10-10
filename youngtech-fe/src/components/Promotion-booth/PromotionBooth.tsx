import Title from "../title-home/title"
import Image from "next/image"

const PromotionBooth = () => {
  return (
    <div className="w-full mb-10">
       <Title title={"Tháng thương hiệu Panasonic"} />
       <div className="w-full flex gap-2 justify-between items-center">
          <Image 
            src="/images/Promotionbooth1.jpg" 
            alt="Panasonic Brand" 
           width={290}
           height={450} 
          />
           <Image 
            src="/images/Promotionbooth2.png" 
            alt="Panasonic Brand" 
           width={290}
           height={450} 
          />
           <Image 
            src="/images/Promotionbooth3.png" 
            alt="Panasonic Brand" 
           width={290}
           height={450} 
          />
           <Image 
            src="/images/Promotionbooth4.png" 
            alt="Panasonic Brand" 
           width={290}
           height={450} 
          />
       </div>
    </div>
  )
}

export default PromotionBooth
