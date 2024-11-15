"use client"
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";  // Thêm import cho Input từ ShadCN UI
import { Label } from "@/components/ui/label"; // Thêm import cho Label từ ShadCN UI
import { Button } from "@/components/ui/button"; // Nếu cần dùng button từ ShadCN UI
import AddressSelector from "./AddressSelector";
import CheckBox from "./CheckBox";

const OrderInfoUser = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [note, setNote] = useState('');

  return (
    <div className="orderInformation flex justify-center p-5 bg-white w-[55%]">
     <div className='w-[90%]'>
     <h3 className="title text-[20px] font-semibold">Thông tin đặt hàng</h3>
      <div className="formInfo mt-[20px]">
        <form>
          <div className="info-name-phone flex items-center justify-between">
            <div className="group/name grid w-[68%]">
              <Label htmlFor="name" className="font-semibold text-gray-600 text-[16px] ml-3">
                Họ và tên
              </Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border outline-none p-2 rounded-2xl text-[14px] text-gray-500 border-gray-300 hover:border-pink-500"
                placeholder="Nhập họ và tên của bạn"
              />
            </div>
            <div className="group/phone grid w-[28%]">
              <Label htmlFor="phone" className="font-semibold text-gray-600 text-[16px] ml-3">
                Số điện thoại
              </Label>
              <Input
                id="phone"
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="border outline-none p-2 rounded-2xl text-[14px] text-gray-500 border-gray-300 hover:border-pink-500"
                placeholder="Nhập số điện thoại của bạn"
              />
            </div>
          </div>
          <div className="info-email mt-[20px]">
            <div className="group/email grid">
              <Label htmlFor="email" className="font-semibold text-gray-600 text-[16px] ml-3">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border outline-none p-2 rounded-2xl text-[14px] text-gray-500 border-gray-300 hover:border-pink-500"
                placeholder="Nhập email của bạn"
              />
            </div>
          </div>
          <div className="info-address mt-[20px]">
            <div className="group/address grid">
              <Label htmlFor="address" className="font-semibold text-gray-600 text-[16px] ml-3">
                Địa chỉ
              </Label>
              <Input
                id="address"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="border outline-none p-2 rounded-2xl text-[14px] text-gray-500 border-gray-300 hover:border-pink-500"
                placeholder="Địa chỉ của bạn (Ex: Đà Nẵng, Hòa Xuân)"
              />
            </div>
          </div>
          <AddressSelector />

          <div className="info-note mt-[20px]">
            <div className="group/note grid">
              <Label htmlFor="note" className="font-semibold text-gray-600 text-[16px] ml-3">
                Ghi thêm chú thích
              </Label>
              <Input
                id="note"
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="border outline-none p-2 rounded-2xl text-[14px] text-gray-500 border-gray-300 hover:border-pink-500"
                placeholder="(ví dụ: Tôi muốn giao hàng ngoài giờ hành chính)"
              />
            </div>
          </div>
          <div className="optional mt-[20px]">
            <CheckBox label="Gọi cho người khác nhận hàng (nếu có)" defaultChecked={false} />
          </div>

          
        </form>
      </div>
     </div>
    </div>
  );
};

export default OrderInfoUser;
