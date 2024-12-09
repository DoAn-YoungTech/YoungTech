"use client";
import { ModernSimpleInput } from "../../editProduct/InputType";
import React, { useState } from "react";

const PassEmployee = () => {
  const [value, setValue] = useState("");
  return (
    <div className="input-name flex flex-col gap-2">
      <label className="block text-sm font-medium text-white/50 mb-2">
        Mật khẩu nhân viên
      </label>
      <ModernSimpleInput
        className="w-72"
        onChange={(e) => setValue(e.target.value)}
        placeholder="Nhập mật khẩu..."
        type="text"
        value={value}
      />
    </div>
  );
};

export default PassEmployee;
