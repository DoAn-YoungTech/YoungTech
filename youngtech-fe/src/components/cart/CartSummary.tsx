

type CartSummaryProps = {
  totalAmount: number;
  itemCount: number;
};

const CartSummary: React.FC<CartSummaryProps> = ({ totalAmount, itemCount }) => (
  <div className="flex my-5  bg-white py-5 px-5 justify-between items-center mt-4">
    <div>
      <input type="checkbox" className="mr-2" /> Chọn Tất Cả
    </div>
    <div className="text-right">
      <span className="font-semibold">Tổng thanh toán ({itemCount} sản phẩm):</span>
      <span className="text-red-500 text-lg font-bold ml-2">{totalAmount.toLocaleString()}₫</span>
    </div>
    <button className="bg-red-500 text-white px-6 py-2 rounded">Mua Hàng</button>
  </div>
);

export default CartSummary;