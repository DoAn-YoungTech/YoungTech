import Image from "next/image";
import Carousel from "./components/Carousel";
import MenuCategory from "./components/MenuCategory";
import HotPromotion from "./components/HotPromotion";
import BestProduct from "./components/BestProducts";
export default function Home() {
  return (
    <>
      <Carousel />
      <div id="main-content" className="lg:container mx-auto">
        <MenuCategory />
        <BestProduct />
        <HotPromotion />
      </div>
    </>
  );
}
