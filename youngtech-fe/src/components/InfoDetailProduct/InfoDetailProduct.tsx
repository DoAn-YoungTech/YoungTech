"use client";
import Link from 'next/link'
import { useState,useCallback } from "react";
import NameProduct from "./NameProduct";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { addToCartThunk } from "@/redux/Cart/cartThunks";
import Promotions from "./descriptionSmall";
import { useSession } from 'next-auth/react';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { debounce } from 'lodash';
import { Router } from 'lucide-react';
export default function InfoDetailProduct({ dataProduct }) {
  const { data: session } = useSession();
  const searchParams = useSearchParams(); // Lấy tất cả các query params
  const id = searchParams.get("id");
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleAddToCart = async (quantity, id) => {
    if (!session) {
      toast.warning("Vui lòng đăng nhập ");
       setTimeout(()=>{
        router.push("/login");
       },2000)
      return
    }

    const cartItem = {
      quantity: quantity,
      product_id: id,
    };
  
    try {
      // Dispatch và chờ kết quả từ thunk
      const result = await dispatch(addToCartThunk(cartItem)) 
  
      if (result && result.success) {
        // Nếu API trả về trạng thái thành công
        toast.success("Thêm vào giỏ hàng thành công");
      } else {
        // Nếu API trả về thất bại hoặc không đúng định dạng
        toast.error("Không thể thêm vào giỏ hàng");
      }
    } catch (error) {
      // Hiển thị lỗi nếu thất bại
      toast.error("Thêm vào giỏ hàng thất bại");
    }
  };
  

  const handleQuantityChange = (value) => {
    // Kiểm tra nếu giá trị nhập vào là số hợp lệ và >= 1
    const parsedValue = parseInt(value, 10);
    if (!isNaN(parsedValue) && parsedValue >= 1) {
      setQuantity(parsedValue);  // Chỉ cập nhật quantity nếu giá trị hợp lệ
    } else if (value === "") {
      setQuantity("");  // Nếu người dùng xóa hết nội dung, cho phép giá trị là chuỗi rỗng
    }
  };

  const debouncedAddToCart = useCallback(
    debounce((quantity, id) => {
      handleAddToCart(quantity, id);
    }, 500),
    []
  );
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
            <input
      type="text"
      value={quantity}
      onChange={(e) => handleQuantityChange(e.target.value)}
      className="w-[50px]  focus:outline-none focus:border-none px-2 py-1  border border-gray-300 rounded-md text-center"
      min={1}
    />
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
            onMouseDown={() => debouncedAddToCart(quantity, id)}
            className="bg-red-500 active:scale-95  transform duration-200 hover:bg-red-600 transition w-[200px] py-3 text-white rounded-lg text-[16px]"
          >
            Thêm vào giỏ hàng
          </button>
         <Link href="/cart" >
         <button
            type="button"
            className="bg-slate-800 active:scale-95  transform duration-200 hover:bg-slate-900 transition w-[200px] py-3 text-white rounded-lg text-[16px]"
          >
            Mua ngay
          </button>
         </Link>
        
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
