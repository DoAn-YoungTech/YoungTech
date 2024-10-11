import Image from 'next/image';


const AppItemImgPromotion = () => {
  return (
   
    <div className="flex flex-col py-2 px-5">
    <Image 
  src="/images/flashSale.png"  
  alt="Logo" 
  width={100}  
  height={44} 
/>
    </div>
   
  )
}

export default AppItemImgPromotion
