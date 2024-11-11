
const CartHeader: React.FC = () => (
  <div className="flex w-full px-5 py-5 bg-white justify-between  items-center border-b border-gray-300 pb-4 mb-4">
    <div className="flex w-[30%] gap-2">
    <input type="checkbox" className="mr-2" />
    <span className="font-semibold">Sản Phẩm</span>
    </div>
    <div className=" w-[10%] text-center">Đơn Giá</div>
    <div className="w-[10%] text-center">Số Lượng</div>
    <div className="w-[10%] text-center">Số Tiền</div>
    <div className="w-[10%] text-center">Thao Tác</div>
  </div>
);

export default CartHeader;
