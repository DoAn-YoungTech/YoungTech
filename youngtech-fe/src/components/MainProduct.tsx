
import BannerTwo from './banner-two/BannerTwo';
import Breadcrumb from './Breadcrumb/Breadcrumb';
import ButtonSubcategories from './ButtonSubcategories/ButtonSubcategories';
import AppItemProduct from './product/itemProduct';
import SeeMore from './see-more/SeeMore';
import FormOpinion from './FormOpinion/FormOpinion';

const MainProduct: React.FC = () => {
 

  return (
    <>
      <Breadcrumb />
      <BannerTwo />
       <div className='w-full rounded-xl mb-5 bg-white'>

      
          <ButtonSubcategories />
        
        <div className="px-5 grid justify-center  items-center grid-cols-2 lg:grid-cols-5 gap-2">
          <AppItemProduct />
          <AppItemProduct />
          <AppItemProduct />
          <AppItemProduct />
          <AppItemProduct />
          <AppItemProduct />
          <AppItemProduct />
          <AppItemProduct />
          <AppItemProduct />
          <AppItemProduct />
        </div>
        
        <SeeMore />
        <FormOpinion />
        </div>
      
    </>
  );
};

export default MainProduct;
