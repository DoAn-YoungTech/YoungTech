import React from "react";
import Link from "next/link";
type TableRowProps = {
  invoice: {
    id: number;
    code: string;
    date: string;
    product: string;
    price: number; 
  };
};
const ListInvoice = ({ invoice }: TableRowProps) => {
  return (
    <>
    <div className="order-item border-t border-t-slate-300/50 transition-all duration-300 ease-in-out cursor-pointer hover:bg-[#22282E]">
      <div className="content-product-header p-4">
        <div className="flex items-center justify-between">
          <div className="font-bold text-[0.9rem] text-white/80 w-[calc(100%-95%)]">
            {invoice.id}
          </div>
          <div className="font-bold text-[0.9rem] text-white/80 w-[calc(100%-80%)]">
          <span className=" text-[0.8rem]">{invoice.code}</span>
            {/* <img src={invoice.code} alt="img" className="rounded-xl w-12 h-12 object-fill" /> */}
          </div>
          <div className="font-bold  text-white/80 w-[calc(100%-80%)]">
            <span className=" text-[0.8rem]">{invoice.date}</span>
          </div>
          <div className="font-bold text-[0.9rem] text-white/80 w-[calc(100%-75%)]">
            <span className=" text-[0.8rem]">{invoice.product}</span>
          </div>
          <div className="font-bold text-[0.9rem] text-white/80 w-[calc(100%-80%)]">
            <span className=" text-[0.8rem]">{invoice.price}</span>
          </div>
          <div className="font-bold text-[0.9rem] text-white/80 w-[calc(100%-90%)]">
            <span className=" text-[0.8rem]"></span>
            <Link href="#" className="py-2 px-2 rounded-xl bg-red-300 text-red-500 font-bold">PDF</Link>
          </div> 
        </div> 
      </div>
    </div> 
    </>
  );
};

export default ListInvoice;
