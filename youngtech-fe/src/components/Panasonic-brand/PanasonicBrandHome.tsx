import Image from "next/image";
import Title from "../title-home/title";

const PanasonicBrandHome = () => {
  return (
    <>
      <div className="w-full mb-5">
        <Title title={"Tháng thương hiệu Panasonic"} />
        
        {/* Ensure the parent container has a set height */}
        <div className="w-full relative" style={{ height: '400px' }}> 
          <Image 
            src="/images/panaBrand.png" 
            alt="Panasonic Brand" 
            layout="fill" 
            objectFit="cover" 
          />
        </div>
      </div>
    </>
  );
};

export default PanasonicBrandHome;
