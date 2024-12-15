"use client";
import React from "react";
import { useState, useEffect } from "react";
import { ShinyRotatingBorderButton } from "../../ButtonSave/BtnSave";
import { ModernSimpleInput } from "../../editProduct/InputType";
import { ToastContainer, toast } from "react-toastify";
import { useSession } from "next-auth/react";
import axios from "axios";
const baseURL = process.env.NEXT_PUBLIC_API_URL;
const FormLayout = () => {
  const { data: session, status } = useSession();
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [errors, setErrors] = useState({
    fullName: "",
    phoneNumber: "",
    address: ""
  });
  const validateForm = () => {
    let isValid = true;
    const newErrors = { fullName: "", phoneNumber: "", address: "" };

    if (!fullName.trim()) {
      newErrors.fullName = "Tên khách hàng không được để trống.";
      isValid = false;
    }

    if (!phoneNumber.trim()) {
      newErrors.phoneNumber = "Số điện thoại không được để trống.";
      isValid = false;
    } else if (!/^\d{10,11}$/.test(phoneNumber)) {
      newErrors.phoneNumber = "Số điện thoại phải có 10-11 chữ số.";
      isValid = false;
    }

    if (!address.trim()) {
      newErrors.address = "Địa chỉ không được để trống.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const formData = {
        fullName,
        phoneNumber,
        address
      };
      console.log(session);
      try {
        const submit = async () => {
          const response = await axios.post(
            `${baseURL}/customers/addCustomerOffline`,
            formData,
            {
              headers: {
                Authorization: `Bearer ${session.accessToken}`
              }
            }
          );
          if (!response.ok) {
            alert(`Response status: ${response.status}`);
          }
          alert("Tạo customer thành công 🎉");
          console.log(response.data);
        };
        submit();
      } catch (err) {
        console.log(err.message);
      }
      console.log("Form Data:", formData);
    }
  };
  const handleReset = () => {
    setFullName("");
    setPhoneNumber("");
    setAddress("");
    setErrors({ fullName: "", phoneNumber: "", address: "" });
  };
  return (
    <>
       
      <h2 className="text-white/70 text-[1.1rem] mb-3">
        Nhập thông tin khách hàng{" "}
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="input-name flex flex-col gap-2">
          <label
            htmlFor="fullName"
            className="block text-sm font-medium text-white/50 mb-2"
          >
            Tên khách hàng
          </label>
          <ModernSimpleInput
            id="fullName"
            className="w-72"
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Nhập tên khách hàng..."
            type="text"
            value={fullName}
          />
          {errors.fullName && (
            <span className="text-red-500 text-sm">{errors.fullName}</span>
          )}
        </div>
        <div className="input-name flex flex-col gap-2">
          <label
            htmlFor="phoneNumber"
            className="block text-sm font-medium text-white/50 mb-2"
          >
            Số điện thoại
          </label>
          <ModernSimpleInput
            id="phoneNumber"
            className="w-72"
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Nhập sdt khách hàng..."
            type="text"
            value={phoneNumber}
          />
          {errors.phoneNumber && (
            <span className="text-red-500 text-sm">{errors.phoneNumber}</span>
          )}
        </div>
        <div className="input-name flex flex-col gap-2">
          <label
            htmlFor="address"
            className="block text-sm font-medium text-white/50 mb-2"
          >
            Địa chỉ khách hàng
          </label>
          <ModernSimpleInput
            id="address"
            className="w-72"
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Nhập địa chỉ khách hàng..."
            type="text"
            value={address}
          />
          {errors.address && (
            <span className="text-red-500 text-sm">{errors.address}</span>
          )}
        </div>
        <div className="flex gap-3 items-center ">
          <ShinyRotatingBorderButton type="submit" className="w-full">
            Submit
          </ShinyRotatingBorderButton>
          <ShinyRotatingBorderButton
            type="button"
            onClick={handleReset}
            className="w-full"
          >
            Reset
          </ShinyRotatingBorderButton>
        </div>
      </form>
    </>
  );
};

export default FormLayout;
