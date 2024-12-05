import React from "react";
import Action from "../Action/Action";
import View from "../Action/view";
import Update from "../Action/update";
import Delete from "../Action/delete";

type TableRowProps = {
  supplier: {
    id: number;
    MNCC: string;
    name: string;
    address: string;
    phoneNumber: string;
    email: string;
  };
};
const ListSupplier = ({ supplier }: TableRowProps) => {
 
  return (
    <div className="product-item border-t border-t-slate-300/50 transition-all duration-300 ease-in-out cursor-pointer hover:bg-[#22282E]">
      <div className="content-product-header p-4">
        <div className="flex items-center justify-between">
          <div className="font-bold text-[0.9rem] text-white/80 w-[calc(100%-95%)]">
            {supplier.id}
          </div>
          <div className="font-bold  text-white/80 w-[calc(100%-90%)]">
            <span className=" text-[0.8rem]">{supplier.MNCC}</span>
          </div>
          <div className="font-bold  text-white/80 w-[calc(100%-85%)]">
            <span className=" text-[0.8rem]">{supplier.name}</span>
          </div>
          <div className="font-bold text-[0.9rem] text-white/80 w-[calc(100%-80%)]">
            <span className=" text-[0.8rem]">{supplier.address}</span>
          </div>
          <div className="font-bold text-[0.9rem] text-white/80 w-[calc(100%-90%)]">
            <span className=" text-[0.8rem]">{supplier.phoneNumber}</span>
          </div>
          <div className="font-bold  text-white/80 w-[calc(100%-80%)]">
            <span className=" text-[0.8rem]">{supplier.email}</span>
          </div>  
          <div className="font-bold  flex items-center gap-2  w-[calc(100%-80%)]">
            <View
              url={``}
            />
            <Delete url={''} />
            <Update url={`/dashboard/quanly-nha-cungcap/sua-cungcap/${supplier.id}`} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListSupplier;
