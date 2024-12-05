import React from "react";
import Action from "../Action/Action";
import View from "../Action/view";
import Update from "../Action/update";
import Delete from "../Action/delete";

type TableRowProps = {
  employee: {
    id: number;
    code: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    position: string;
  };
};
const ListEmployee = ({ employee }: TableRowProps) => {
  return (
    <div className="product-item border-t border-t-slate-300/50 transition-all duration-300 ease-in-out cursor-pointer hover:bg-[#22282E]">
      <div className="content-product-header p-4">
        <div className="flex items-center justify-between">
          <div className="font-bold text-[0.9rem] text-white/80 w-[calc(100%-95%)]">
            {employee.id}
          </div>
          <div className="font-bold  text-white/80 w-[calc(100%-90%)]">
            <span className=" text-[0.8rem]">{employee.code}</span>
          </div>
          <div className="font-bold  text-white/80 w-[calc(100%-80%)]">
            <span className=" text-[0.8rem]">{employee.fullName}</span>
          </div>
          <div className="font-bold text-[0.9rem] text-white/80 w-[calc(100%-80%)]">
            <span className=" text-[0.8rem]">{employee.email}</span>
            {/* <img src={employee.email} alt="img" className="rounded-xl w-12 h-12" /> */}
          </div>
          <div className="font-bold text-[0.9rem] text-white/80 w-[calc(100%-90%)]">
            <span className=" text-[0.8rem]">{employee.phoneNumber}</span>
          </div>
          <div className="font-bold  text-white/80 w-[calc(100%-85%)]">
            <span className=" text-[0.8rem]">{employee.position}</span>
          </div>
          <div className="font-bold  flex items-center gap-2  w-[calc(100%-80%)]">
            <View url={`/dashboard/quanly-nhanvien/chitiet-nhanvien/${employee.id}`} /> 
            <Delete url={""} />
            <Update url={`/dashboard/quanly-nhanvien/chinhsua-nhanvien/${employee.id}`} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListEmployee;
