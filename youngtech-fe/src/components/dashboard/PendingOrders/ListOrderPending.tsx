import React from "react";
import Link from "next/link";
type TableRowProps = {
  orderPending: {
    id: number;
    fullName: string;
    code: string;
    date: string;
  };
};
const ListOrderPending = ({ orderPending }: TableRowProps) => {
  return (
    <div className="product-item border-t border-t-slate-300/50 transition-all duration-300 ease-in-out cursor-pointer hover:bg-[#22282E]">
      <div className="content-product-header p-4">
        <div className="flex items-center justify-between">
          <div className="font-bold text-[0.9rem] text-white/80 w-[calc(100%-90%)]">
            {orderPending.id}
          </div>
          <div className="font-bold  text-white/80 w-[calc(100%-90%)]">
            <span className=" text-[0.8rem]">{orderPending.code}</span>
          </div>
          <div className="font-bold  text-white/80 w-[calc(100%-80%)]">
            <span className=" text-[0.8rem]">{orderPending.fullName}</span>
          </div>
          <div className="font-bold  text-white/80 w-[calc(100%-80%)]">
            <Link
              href={`/dashboard/quanly-banhang/danhsach-hoadon`}
              className="rounded-xl text-white/50 text-sm py-2 px-2 border border-white/50"
            >
              Xem đơn hàng
            </Link>
          </div>
          <div className="font-bold text-[0.9rem] text-white/80 w-[calc(100%-80%)]">
            <span className=" text-[0.8rem]">{orderPending.date}</span>
          </div>
          <div className="font-bold  flex items-center gap-2  w-[calc(100%-80%)]">
            <Link
              href={`/dashboard/quanly-banhang/xuly-donhang/${orderPending.id}`}
              className="rounded-xl text-white/50 text-sm py-2 px-2 border border-white/50"
            >
              Xử lý
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListOrderPending;
