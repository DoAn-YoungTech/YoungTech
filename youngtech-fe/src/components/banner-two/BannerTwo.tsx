import Image from 'next/image';

const BannerTwo = () => {
  return (

      <div className=" w-full pb-5 flex justify-between space-x-4">

        <div className="w-1/2">
          <Image 
            src="/designImage/imageBanner/Banner/bannerTwo1.png" 
            alt="Banner 1" 
            layout="responsive"
            width={600}
            height={200}
            className='w-[40%]'
          />
        </div>

        <div className="w-1/2">
          <Image 
          className='w-[48%]'
            src="/designImage/imageBanner/Banner/bannerTwo2.png" 
            alt="Banner 2" 
            layout="responsive"
            width={500} 
            height={200} 
          />
        </div>
      </div>
   
  );
};

export default BannerTwo;
