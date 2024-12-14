import { useState } from "react";
import { formatCurrency } from "../formatCurrency/formatCurrency";
import { AlertClearCart } from "./AlertClearCart";
import { useRouter } from "next/navigation"; // Để chuyển trang
import { toast,ToastContainer } from "react-toastify"; // Import thư viện Toastify
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { fetchCartItems, removeAllCartItem, removeCartItem, removeCartItemIn} from "@/redux/Cart/cartThunks";
import { GiConsoleController } from "react-icons/gi";
type CartSummaryProps = {
  totalAmount: number;
  itemCount: number;
};

const CartSummary: React.FC<CartSummaryProps> = ({ onSelectedAllChange,dataCart}) => {
  const [isAlertClear, setIsAlertClear] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const [idCartItem,setIdCartItem] = useState([])
  const totalCartItem =  dataCart.reduce(
    (total, item) => total + (item.selected ?  item.selected : 0),
    0
  );
  const totalAmount = dataCart.reduce(
    (total, item) => total + (item.selected ?  Number(item.price) * item.quantity : 0),
    0
  );


  const arrIdCartItem = dataCart
  .filter(item => item.selected === true)
  .map(item => item.product_id);

  

  const handlePurchase = () => {
    const selectedItems = dataCart.filter((item) => item.selected); 
    if (selectedItems.length === 0) {
      toast.warning("Bạn chưa chọn sản phẩm nào!");
     
    }else{
     
      router.push("/pay");
    }
    
  };


  const handleClearItemCart = (arr) => {
    if(totalCartItem.length > 0 ){
      setIsAlertClear(true);
      setIdCartItem(arr)
    }else{
      toast.warning(`Bạn chưa chọn sản phẩm để xoá`)
    }
   
  };
  
  const allSelected = dataCart.every(item => item.selected);
  
  const handleClickClearItemCart = async () => {
      try {
    
        if( dataCart.length !== totalCartItem){
          toast.success(`Xoá ${totalCartItem} sản phẩm thành công`)

          setIsAlertClear(false);
          const data = {
            productId :idCartItem
          }
          await dispatch(removeCartItemIn(data));
        }else{
          toast.success(`Xoá ${totalCartItem} sản phẩm thành công`)
         await dispatch(removeAllCartItem())
        }
       
      } catch (error) {
        console.error("Lỗi khi xóa sản phẩm:", error);
      }
    };
  
  return (

  <div className="flex my-5 flex-wrap  bg-white py-5 px-5 justify-between items-center mt-4">
    <div className="flex gap-2">
      <input type="checkbox" checked={allSelected} onChange={()=>onSelectedAllChange(!allSelected)} className="mr-2" /> <h3>Chọn Tất Cả</h3>
      <button type="button" onClick={()=>handleClearItemCart(arrIdCartItem)} className="text-red-500">(Xóa)</button>
      {isAlertClear && <AlertClearCart totalCartItem={totalCartItem} handleClickClearItemCart={handleClickClearItemCart} setIsAlertClear={setIsAlertClear}  />}
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
