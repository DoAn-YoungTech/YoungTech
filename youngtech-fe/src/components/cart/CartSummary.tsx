import { formatCurrency } from "../formatCurrency/formatCurrency";


type CartSummaryProps = {
  totalAmount: number;
  itemCount: number;
};

const CartSummary: React.FC<CartSummaryProps> = ({ dataCart}) => {
  const totalAmount = dataCart.reduce(
    (total, item) => total + Number(item.price) * item.quantity,
    0
  );
  return (

  <div className="flex my-5 flex-wrap  bg-white py-5 px-5 justify-between items-center mt-4">
    <div>
      <input type="checkbox" className="mr-2" /> Chọn Tất Cả
    </div>
    <div className="text-right">
      <span className=" text-[18px] font-semibold">Tổng thanh toán ({dataCart.length} sản phẩm):</span>
      <span className="text-red-500 text-[18px] font-bold ml-2">{formatCurrency(totalAmount)}</span>
    </div>
    <button className="bg-red-500 ml-[30%] lg:ml-0 mt-5  text-white px-6 py-2 rounded">Mua Hàng</button>
  </div> 
  )
}

export default CartSummary;
