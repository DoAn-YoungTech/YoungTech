import React from "react";

const ColEmployee = () => {
  return (
    <div className="content-products  border-t border-t-slate-300/50 bg-[#293038]">
      <div className="content-product-header p-4">
        <div className="flex items-center justify-between">
          <div className="font-bold text-[0.9rem] text-white/80 w-[calc(100%-95%)]">
            STT
          </div>
          <div className="font-bold text-[0.9rem] text-white/80 w-[calc(100%-90%)]">
            Mã nhân viên
          </div>
          <div className="font-bold text-[0.9rem] text-white/80 w-[calc(100%-80%)]">
           Họ và tên
          </div>
          <div className="font-bold text-[0.9rem] text-white/80 w-[calc(100%-80%)]">
            Email
          </div>
          <div className="font-bold text-[0.9rem] text-white/80 w-[calc(100%-90%)]">
           Số điện thoại
          </div>
          <div className="font-bold text-[0.9rem] text-white/80 w-[calc(100%-85%)]">
            Chức vụ
          </div> 
          <div className="font-bold text-[0.9rem] text-white/80 w-[calc(100%-80%)]">
            Hành động
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColEmployee;
