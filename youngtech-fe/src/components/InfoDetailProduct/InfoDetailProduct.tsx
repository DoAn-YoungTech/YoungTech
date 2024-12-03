"use client";
import { useState } from "react";
import NameProduct from "./NameProduct";
import { useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { addToCartThunk } from "@/redux/Cart/cartThunks";
import Promotions from "./descriptionSmall";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
export default function InfoDetailProduct({ dataProduct }) {
  const searchParams = useSearchParams(); // Lấy tất cả các query params
  const id = searchParams.get("id");
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const handleAddToCart = async (quantity, id) => {
    const cartItem = {
      quantity: quantity,
      product_id: id,
    };
  
    try {
      // Dispatch và chờ kết quả từ thunk
      const result = await dispatch(addToCartThunk(cartItem)) // Sử dụng unwrap() để lấy kết quả
  
      if (result) {
        toast.success("Thêm vào giỏ hàng thành công");
      }
    } catch (error) {
      // Hiển thị lỗi nếu thất bại
      toast.error("Thêm vào giỏ hàng thất bại");
    }
  };
  

  const increment = () => setQuantity((prev) => prev + 1);
  const decrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : prev)); // Không cho phép giá trị nhỏ hơn 1

  const formattedPrice = new Intl.NumberFormat("de-DE").format(dataProduct.productPrice || 0);

  return (
   <>
  
    <div className="w-full mb-5 rounded-sm bg-white shadow-md">
    <ToastContainer />
      <div className="w-full p-5">
        {/* Tên sản phẩm */}
        <NameProduct data={dataProduct} fontsize={fontsize} />

     

        {/* Giá bán */}
        <div className="w-full mt-4 flex items-center gap-4">
          <p className="font-medium">Giá bán:</p>
          <strong className="price text-[18px] text-red-600">{formattedPrice}₫</strong>
        </div>

        {/* Số lượng */}
        <div className="w-full mt-4 flex items-center gap-4">
          <label className="font-medium">Số lượng:</label>
          <div className="flex items-center gap-2">
            <button
              onClick={decrement}
              className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-md text-lg font-semibold"
            >
              −
            </button>
            <span className="px-4 py-1 border border-gray-300 rounded-md bg-white text-center">
              {quantity}
            </span>
            <button
              onClick={increment}
              className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-md text-lg font-semibold"
            >
              +
            </button>
          </div>
        </div>

        {/* Nút hành động */}
        <div className="w-full gap-5 py-5 flex">
          <button
            type="button"
            onClick={() => handleAddToCart(quantity, id)}
            className="bg-red-500 hover:bg-red-600 transition w-[200px] py-3 text-white rounded-lg text-[16px]"
          >
            Thêm vào giỏ hàng
          </button>
          <button
            type="button"
            className="bg-slate-800 hover:bg-slate-900 transition w-[200px] py-3 text-white rounded-lg text-[16px]"
          >
            Mua ngay
          </button>
        
        </div>
       
      </div>
    </div>
     <div className="w-full  bg-white shadow-md  ">
     <Promotions/>
     </div>
   </>
  );
}

const fontsize = {
  fontSize: "22px",
};
