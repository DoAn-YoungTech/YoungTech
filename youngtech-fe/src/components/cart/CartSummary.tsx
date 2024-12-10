import { useState } from "react";
import { formatCurrency } from "../formatCurrency/formatCurrency";
import { AlertClearCart } from "./AlertClearCart";
import { useRouter } from "next/navigation"; // Để chuyển trang
import { toast,ToastContainer } from "react-toastify"; // Import thư viện Toastify
import "react-toastify/dist/ReactToastify.css";
type CartSummaryProps = {
  totalAmount: number;
  itemCount: number;
};

const CartSummary: React.FC<CartSummaryProps> = ({ onSelectedAllChange,dataCart}) => {
  const [isAlertClear, setIsAlertClear] = useState(false);
  const router = useRouter();
  const totalCartItem =  dataCart.reduce(
    (total, item) => total + (item.selected ?  item.selected : 0),
    0
  );
  const totalAmount = dataCart.reduce(
    (total, item) => total + (item.selected ?  Number(item.price) * item.quantity : 0),
    0
  );

  const handlePurchase = () => {
    const selectedItems = dataCart.filter((item) => item.selected); 
    if (selectedItems.length === 0) {
      toast.warning("Bạn chưa chọn sản phẩm nào!");
     
    }else{
     
      router.push("/pay");
    }
    
  };

  const handleClearItemCart = () => {
    setIsAlertClear(true);
  };
  
  const allSelected = dataCart.every(item => item.selected);
   
  
  return (

  <div className="flex my-5 flex-wrap  bg-white py-5 px-5 justify-between items-center mt-4">
    <div className="flex gap-2">
      <input type="checkbox" checked={allSelected} onChange={()=>onSelectedAllChange(!allSelected)} className="mr-2" /> <h3>Chọn Tất Cả</h3>
      <button type="button" onClick={handleClearItemCart} className="text-red-500">(Xóa)</button>
      {isAlertClear && <AlertClearCart setIsAlertClear={setIsAlertClear}  idItemCart={item.product_id} />}
    </div>
    <div className="text-right">
      <span className=" text-[18px] font-semibold">Tổng thanh toán ({totalCartItem} sản phẩm):</span>
      <span className="text-red-500 text-[18px] font-bold ml-2">{formatCurrency(totalAmount)}</span>
    </div>
    <ToastContainer/>
    <button onClick={handlePurchase} className="bg-red-500 ml-[30%] lg:ml-0 mt-5 active:scale-95  transform duration-200  text-white px-6 py-2 rounded">Mua Hàng</button>
  </div> 
  
  )
}

export default CartSummary;
