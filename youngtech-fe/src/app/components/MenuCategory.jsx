"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import cate1 from "../../../public/designImage/imageCategories/bepdientu.png";
import cate2 from "../../../public/designImage/imageCategories/giadung.png";
import cate3 from "../../../public/designImage/imageCategories/hutbui.png";
import cate4 from "../../../public/designImage/imageCategories/loa.png";
import cate5 from "../../../public/designImage/imageCategories/maycongnuoc.png";
import cate6 from "../../../public/designImage/imageCategories/maygiac.png";
import cate7 from "../../../public/designImage/imageCategories/maylanh.png";
import cate8 from "../../../public/designImage/imageCategories/maylockhi.png";
import cate9 from "../../../public/designImage/imageCategories/maylocnuoc.png";
import cate10 from "../../../public/designImage/imageCategories/maysay.png";
import cate11 from "../../../public/designImage/imageCategories/noichienkhongdau.png";
import cate12 from "../../../public/designImage/imageCategories/noicomdien.png";
import cate13 from "../../../public/designImage/imageCategories/tivi.png";
import cate14 from "../../../public/designImage/imageCategories/tudongmat.png";
import cate15 from "../../../public/designImage/imageCategories/tulanh.png";
import cate16 from "../../../public/designImage/imageCategories/cates.png";
const listCategory = [
  { id: 1, image: cate1, name: "bếp điện tử" },
  { id: 2, image: cate2, name: "gia dụng" },
  { id: 3, image: cate3, name: "hút bụi" },
  { id: 4, image: cate4, name: "loa" },
  { id: 5, image: cate5, name: "máy nước nóng" },
  { id: 6, image: cate6, name: "máy giặc" },
  { id: 7, image: cate7, name: "máy lạnh" },
  { id: 8, image: cate8, name: "máy lọc khí" },
  { id: 9, image: cate9, name: "máy lọc nước" },
  { id: 10, image: cate10, name: "máy sấy" },
  { id: 11, image: cate11, name: "nồi chiên không dầu" },
  { id: 12, image: cate12, name: "nồi cơm điện" },
  { id: 13, image: cate13, name: "tivi" },
  { id: 14, image: cate14, name: "tủ đông lạnh" },
  { id: 15, image: cate15, name: "tủ lạnh" },
  { id: 16, image: cate16, name: "tất cả danh sách" },
];
const textTitle = {
  color: "#1d2939",
};
const MenuCategory = () => {
  return (
    <>
      <h3
        style={textTitle}
        className="text-[24px]  font-sans font-bold mt-[30px]"
      >
        Phân loại
      </h3>
      <section className="main-menu-category  pt-[30px]">
        <div className="list-cates">
          <ul className="flex justify-between items-center flex-wrap">
            {listCategory.map((item, index) => {
              return (
                <>
                  <li
                    className="hover:translate-y-1 duration-300 transition-all w-[12.5%] text-center my-[30px]"
                    key={index}
                  >
                    <Link href="/">
                      <Image
                        className="w-[47px] h-[47px] mx-auto"
                        src={item.image}
                        alt={item.name}
                      />
                      <p className="mt-2 text-gray-600 hover:text-gray-900 duration-200 capitalize text-[14px] font-sans font-semibold">
                        {item.name}
                      </p>
                    </Link>
                  </li>
                </>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
};

export default MenuCategory;
