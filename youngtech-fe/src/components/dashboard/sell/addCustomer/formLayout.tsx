import React from "react";
 
import Address from "./address";
import NameCustomer from "./nameCustomer";
 
import Email from "./email";
import PhoneNumber from "./phoneNumber";
import { ShinyRotatingBorderButton } from "../../ButtonSave/BtnSave";
const FormLayout = () => {
  return (
    <>
      <form className="flex flex-col gap-4"> 
          <h2 className='text-white/70 text-[1.1rem] mb-3'>Nhập thông tin khách hàng </h2>
          <NameCustomer />
          <PhoneNumber />
          <Email />
          <Address />
          <div className="flex items-center justify-between gap-3">
          <ShinyRotatingBorderButton>Thêm khách hàng</ShinyRotatingBorderButton>
          <ShinyRotatingBorderButton>Tạo tài khoản khách hàng</ShinyRotatingBorderButton>
          </div>
      </form>
    </>
  );
};

export default FormLayout;
