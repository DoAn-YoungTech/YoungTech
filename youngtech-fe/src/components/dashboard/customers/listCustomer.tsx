import React from "react";
import Action from "../Action/Action";
import View from "../Action/view";
import Update from "../Action/update";
import Delete from "../Action/delete";

type TableRowProps = {
  customer: {
    id: number;
    name: string;
    email: string;
    phoneNumber: string;
    shippingAddress: string;
    status: "Completed" | "Pending" | "Cancel";
    purchaseHistory: string;
  };
};
const ListCustomer = ({ customer }: TableRowProps) => {
  const getStatusClass = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-300 text-green-600";
      case "Pending":
        return "bg-yellow-300 text-yellow-600";
      case "Cancel":
        return "bg-red-300 text-red-600";
      default:
        return "";
    }
  };
  return (
    <div className="product-item border-t border-t-slate-300/50 transition-all duration-300 ease-in-out cursor-pointer hover:bg-[#22282E]">
      <div className="content-product-header p-4">
        <div className="flex items-center justify-between">
          <div className="font-bold text-[0.9rem] text-white/80 w-[calc(100%-95%)]">
            {customer.id}
          </div>
          <div className="font-bold  text-white/80 w-[calc(100%-90%)]">
            <span className=" text-[0.8rem]">{customer.name}</span>
          </div>
          <div className="font-bold text-[0.9rem] text-white/80 w-[calc(100%-85%)]">
            <span className=" text-[0.8rem]">{customer.email}</span>
          </div>
          <div className="font-bold text-[0.9rem] text-white/80 w-[calc(100%-90%)]">
            <span className=" text-[0.8rem]">{customer.phoneNumber}</span>
          </div>
          <div className="font-bold  text-white/80 w-[calc(100%-80%)]">
            <span className=" text-[0.8rem]">{customer.shippingAddress}</span>
          </div>
          <div className="font-bold text-white/80 w-[calc(100%-90%)]">
            <span
              className={`text-[0.8rem] px-2 py-1 rounded-2xl text-sm font-medium ${getStatusClass(
                customer.status
              )}`}
            >
              {customer.status}
            </span>
          </div>
          <div className="font-bold text-white/80 w-[calc(100%-90%)]">
            <span className=" text-[0.8rem]">{customer.purchaseHistory} </span>
          </div>
          <div className="font-bold  flex items-center gap-2  w-[calc(100%-80%)]">
            <View
              url={``}
            />
            <Delete url={''} />
            <Update url={`/dashboard/quanly-kinhdoanh/thongtin-khachhang/suathongtin-khachhang/${customer.id}`} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListCustomer;
