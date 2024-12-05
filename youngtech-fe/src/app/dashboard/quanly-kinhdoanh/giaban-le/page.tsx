import React from "react";
import { SearchBar } from "@/components/dashboard/SearchBar";
import { FaRegEye } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit3 } from "react-icons/fi";
import PaginationBtn from "@/components/dashboard/Pagination/Pagination";
import Link from "next/link";
import LayoutListProducts from "@/components/dashboard/manager_business/LayoutListProducts";
import HeaderTable from "@/components/dashboard/manager_business/Header_table";
import ColProducts from "@/components/dashboard/manager_business/ColProducts";
import ListProducts from "@/components/dashboard/manager_business/ListProducts";
const Page = () => {
  interface Product {
    id: number;
    name: string;
    category: string;
    image: string;
    priceOriginal: string;
    priceSale: string;
    price: string;
    date: string;
  }
  const products: Product[] = [
    {
      id: 1,
      name: "Iphone 15 pro max chính hãng",
      category: "Điên thoại",
      image: "/designImage/imageProducts/dell-inspiron-15-3520-i5-img3.jpg",
      priceOriginal: "100.000",
      priceSale: "20.000",
      price: "80.000",
      date: "12/11/2023"
    },
    {
      id: 2,
      name: "Iphone 15 pro max chính hãng",
      category: "Điên thoại",
      image: "/designImage/imageProducts/dell-inspiron-15-3520-i5-img3.jpg",
      priceOriginal: "100.000",
      priceSale: "20.000",
      price: "80.000",
      date: "12/11/2023"
    },
    {
      id: 3,
      name: "Iphone 15 pro max chính hãng",
      category: "Điên thoại",
      image: "/designImage/imageProducts/dell-inspiron-15-3520-i5-img3.jpg",
      priceOriginal: "100.000",
      priceSale: "20.000",
      price: "80.000",
      date: "12/11/2023"
    },
    {
      id: 4,
      name: "Iphone 15 pro max chính hãng",
      category: "Điên thoại",
      image: "/designImage/imageProducts/dell-inspiron-15-3520-i5-img3.jpg",
      priceOriginal: "100.000",
      priceSale: "20.000",
      price: "80.000",
      date: "12/11/2023"
    },
    {
      id: 5,
      name: "Iphone 15 pro max chính hãng",
      category: "Điên thoại",
      image: "/designImage/imageProducts/dell-inspiron-15-3520-i5-img3.jpg",
      priceOriginal: "100.000",
      priceSale: "20.000",
      price: "80.000",
      date: "12/11/2023"
    },
    {
      id: 6,
      name: "Iphone 15 pro max chính hãng",
      category: "Điên thoại",
      image: "/designImage/imageProducts/dell-inspiron-15-3520-i5-img3.jpg",
      priceOriginal: "100.000",
      priceSale: "20.000",
      price: "80.000",
      date: "12/11/2023"
    }
  ];
  return (
    <div>
      <header className="mb-5">
        <h2 className="text-white/90 font-bold text-[1.2rem]">
          DANH SÁCH SẢN PHẨM BÁN LẺ
        </h2>
      </header>
      <main>
        <LayoutListProducts>
          <HeaderTable />
          <ColProducts />
          <div className="list-products">
            {products.map((product, index) => (
              <ListProducts key={index} product={product} />
            ))}
          </div>
        </LayoutListProducts>
      </main>
      <PaginationBtn />
    </div>
  );
};

export default Page;
