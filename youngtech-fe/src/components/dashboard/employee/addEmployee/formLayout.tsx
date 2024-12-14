'use client'
import React from "react";
import { useState } from "react";

import { ModernSimpleInput } from "../../editProduct/InputType";

// import { ShinyRotatingBorderButton } from "../../ButtonSave/BtnSave";
const FormLayoutEmployee = () => {

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      email,
      name,
      phoneNumber,
      password,
    };
    console.log("Form Data:", formData);
    // Add logic here to send formData to the server or perform any other action
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid grid-cols-2">
        
          <div className="input-name flex flex-col gap-2">
      <label className="block text-sm font-medium text-white/50 mb-2">
        Tên khách hàng
      </label>
      <ModernSimpleInput
        className="w-72"
        onChange={(e) => setName(e.target.value)}
        placeholder="Nhập tên khách hàng..."
        type="text"
        value={name}
      />
    </div>
    <div className="input-name flex flex-col gap-2">
      <label className="block text-sm font-medium text-white/50 mb-2">
        Số điện thoại  
      </label>
      <ModernSimpleInput
        className="w-72"
        onChange={(e) => setPhoneNumber(e.target.value)}
        placeholder="Nhập sdt nhân viên..."
        type="text"
        value={phoneNumber}
      />
    </div>
        
        </div>
        <div className="grid grid-cols-2">
        <div className="input-name flex flex-col gap-2">
      <label className="block text-sm font-medium text-white/50 mb-2">
        Email nhân viên
      </label>
      <ModernSimpleInput
        className="w-72"
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Nhập email khách hàng..."
        type="text"
        value={email}
      />
    </div>
    <div className="input-name flex flex-col gap-2">
      <label className="block text-sm font-medium text-white/50 mb-2">
        Mật khuẩu nhân viên
      </label>
      <ModernSimpleInput
        className="w-72"
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Nhập mật khẩu..."
        type="text"
        value={password}
      />
    </div>
        </div>
        <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Submit
      </button>
        {/* <ShinyRotatingBorderButton>Thêm</ShinyRotatingBorderButton> */}

      </form>
    </>
  );
};

export default FormLayoutEmployee;
