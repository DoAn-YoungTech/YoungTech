'use client'
import React from "react";
import Image from "next/image";
import FileDropzone from "@/components/dashboard/editProduct/DropFile/DropFile";
import { Input } from "@/components/ui/input";
import { ModernSimpleInput } from "@/components/dashboard/editProduct/InputType";
import InputName from "@/components/dashboard/editProduct/InputName";
import InputPrice from "@/components/dashboard/editProduct/InputPrice";
import InputDate from "@/components/dashboard/editProduct/InputDate";
import InputPriceOrigin from "@/components/dashboard/editProduct/InputPriceOrigin";
import InputPriceSale from "@/components/dashboard/editProduct/InputPriceSale";
import {InputCategory} from "@/components/dashboard/editProduct/InputCategory";
import { ShinyRotatingBorderButton } from "@/components/dashboard/ButtonSave/BtnSave";
import { useParams } from "next/navigation";
import GoBack from "@/components/dashboard/GoBack";
const EditProductPage = () => {
  const { id } = useParams();
  return (
    <div className="edit-product">
      <header className="mb-5">
        <h2 className="text-white/90 font-bold text-[1.2rem]">
          Chỉnh sửa sản phẩm 
        </h2>
      </header>
      <div className="content-editProduct mt-10">
        <div className="flex gap-2 justify-between">
          <div className="w-[30%] show-product">
            <div className="bg-[#282F36] p-4 flex flex-col gap-y-3 rounded-xl">
              <div className="img">
                <img
                  src="/designImage/imageProducts/dell-inspiron-15-3520-i5-img3.jpg"
                  alt="dell-inspiron-15-3520-i5-img.jpg"
                  className="rounded-xl"
                />
              </div>
              <div className="name">
                <h3 className="text-white/50 text-[1.2rem]">
                  Máy tính sách tay siêu gọn nhẹ
                </h3>
              </div>
              <div className="price">
                <p className="text-[1.2rem] text-white/50 mb-2">Giá:</p>
                <div className="items-center gap-4 flex">
                  <del className="price-origin text-[0.9rem] text-white/40">
                    120.000
                  </del>
                  <span className="price text-[1.1rem] text-white/80">
                    100.000
                  </span>
                  <span className="discount text-[0.9rem] text-white/60">
                    (20%)
                  </span>
                </div>
              </div>
            </div>
          </div>
        <div className="w-[70%] h-full">
          <div className="bg-[#282F36]  rounded-xl mb-3">
              <div className="p-4">
              <ShinyRotatingBorderButton>Cập nhập</ShinyRotatingBorderButton>
              </div>
            </div>
          <div className="bg-[#282F36]  rounded-xl  ">
              <h3 className="text-[1rem] text-white/50 p-4">
                Thông tin sản phẩm
              </h3>
              <div className="border-t border-t-white/30">
                <div className="p-4">
                  <form className="flex flex-col gap-4">
                    <div className="grid grid-cols-2">
                      <InputName />
                      <InputPrice />
                    </div>
                    <div className="grid grid-cols-2">
                      <InputDate />
                      <InputPriceOrigin />
                    </div>
                    <div className="grid grid-cols-2">
                      <InputPriceSale />
                      <InputCategory />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProductPage;
