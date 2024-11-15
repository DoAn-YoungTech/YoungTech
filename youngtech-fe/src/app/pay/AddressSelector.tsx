"use client"

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState,AppDispatch } from '@/redux/Store';
import { fetchProvinces, fetchDistricts, fetchWards } from '@/redux/Address/addressThunks';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

const AddressSelector = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { provinces, districts, wards } = useSelector((state: RootState) => state.address);

  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');

  useEffect(() => {
    dispatch(fetchProvinces());
  }, [dispatch]);

  const handleProvinceChange = (value: string) => {
    setSelectedProvince(value);
    dispatch(fetchDistricts(value));
  };

  const handleDistrictChange = (value: string) => {
    setSelectedDistrict(value);
    dispatch(fetchWards(value));
  };

  return (
    <div className="info-name-phone flex items-center mt-[20px] justify-between">
      {/* Select Province */}
      <Select  onValueChange={handleProvinceChange}>
        <SelectTrigger className="w-[33%]">
          <SelectValue placeholder="Chọn Tỉnh/Thành phố" />
        </SelectTrigger>
        <SelectContent>
          {provinces?.length > 0 ? (
            provinces.map((province) => (
              <SelectItem key={province.code} value={province.code}>
                {province.name}
              </SelectItem>
            ))
          ) : (
            <SelectItem value="default" disabled>
              Đang tải...
            </SelectItem>
          )}
        </SelectContent>
      </Select>

      {/* Select District */}
      <Select  onValueChange={handleDistrictChange} disabled={!selectedProvince}>
        <SelectTrigger className="w-[33%]">
          <SelectValue placeholder="Chọn Quận/Huyện" />
        </SelectTrigger>
        <SelectContent>
          {districts?.length > 0 ? (
            districts.map((district) => (
              <SelectItem key={district.code} value={district.code}>
                {district.name}
              </SelectItem>
            ))
          ) : (
            <SelectItem value="default" disabled>
              {selectedProvince ? "Đang tải..." : "Chọn Tỉnh/Thành phố trước"}
            </SelectItem>
          )}
        </SelectContent>
      </Select>

      {/* Select Ward */}
      <Select  disabled={!selectedDistrict}>
        <SelectTrigger className="w-[33%]">
          <SelectValue placeholder="Chọn Xã/Phường" />
        </SelectTrigger>
        <SelectContent>
          {wards?.length > 0 ? (
            wards.map((ward) => (
              <SelectItem key={ward.code} value={ward.code}>
                {ward.name}
              </SelectItem>
            ))
          ) : (
            <SelectItem value="default" disabled>
              {selectedDistrict ? "Đang tải..." : "Chọn Quận/Huyện trước"}
            </SelectItem>
          )}
        </SelectContent>
      </Select>
    </div>
  );
};

export default AddressSelector;
