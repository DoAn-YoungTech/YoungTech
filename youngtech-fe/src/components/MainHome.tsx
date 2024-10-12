
import Banner from "@/components/banner-course/banner"
import BannerTwo from "@/components/banner-two/BannerTwo"
import Categories from "@/components/categories/categories"
import PromotionsHome from "./PromotionsHome"
import Suggestion from "./SuggestionHome"
import PanasonicBrandHome from "./Panasonic-brand/PanasonicBrandHome"
import PromotionBooth from "./Promotion-booth/PromotionBooth"
import Menu from "./menu/Menu"


const MainHome: React.FC = () => {
  return (
   <>
  
    <Banner/>
    <Menu/>
    <Categories  />
    <PromotionsHome />
    <BannerTwo/>
    <Suggestion/>
    <PanasonicBrandHome/>
    <PromotionBooth/>

   </>
  )
}

export default MainHome
