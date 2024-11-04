<<<<<<< HEAD
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
=======
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="pl-10 pr-10 pt-10 pb-10">
        <Link
          href="/admin"
          className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Vào trang quản trị
        </Link>
>>>>>>> 8a040609cf6f5fbba3a26e9f5fa415f1183bdb6d
      </div>
    </>
  );
}
