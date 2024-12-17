"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

interface EditProfilePopupProps {
  isVisible: boolean;
  onClose: () => void;
  onSave: (updatedProfile: ProfileData) => void;
  initialProfile: ProfileData;
}

interface ProfileData {
  image: string;
  name: string;
  gender: string;
  birthDate: string;
  email: string;
}

const EditProfilePopup: React.FC<EditProfilePopupProps> = ({
  isVisible,
  onClose,
  onSave,
  initialProfile,
}) => {
  const [profile, setProfile] = useState<ProfileData>(initialProfile);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    setProfile(initialProfile);
    setPreviewImage(null); // Reset preview
  }, [initialProfile]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewImage(url);
      setProfile({ ...profile, image: url });
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setProfile({ ...profile, [field]: value });
  };

  const handleSave = () => {
    onSave(profile);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
      <div className="bg-[#1f2937] rounded-lg shadow-xl p-6 w-96 text-white transition-all duration-300">
        <h2 className="text-xl font-semibold mb-4 text-gray-100">Chỉnh sửa thông tin</h2>

        {/* Avatar */}
        <div className="flex items-center mb-6">
          <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-gray-500 mr-4">
            <Image
              src={previewImage || profile.image}
              alt="Avatar"
              layout="fill"
              objectFit="cover"
              priority
            />
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="text-sm text-gray-400 bg-transparent border border-gray-500 rounded-md p-2 hover:border-gray-300 focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Các trường chỉnh sửa */}
        {[{ label: "Họ và tên", field: "name" }].map((input) => (
          <div className="mb-4" key={input.field}>
            <label className="block text-sm mb-2">{input.label}</label>
            <input
              type="text"
              value={profile[input.field as keyof ProfileData]}
              onChange={(e) => handleInputChange(input.field, e.target.value)}
              className="w-full p-3 rounded-md border-2 border-gray-600 bg-[#2d3748] text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-200"
            />
          </div>
        ))}

         {/* Email */}
         <div className="mb-4">
          <label className="block text-sm mb-2">Email</label>
          <input
            type="text"
            value={profile.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className="w-full p-3 rounded-md border-2 border-gray-600 bg-[#2d3748] text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-200"
          />
        </div>

        {/* Giới tính */}
        <div className="mb-4">
          <label className="block text-sm mb-2">Giới tính</label>
          <select
            value={profile.gender}
            onChange={(e) => handleInputChange("gender", e.target.value)}
            className="w-full p-3 rounded-md border-2 border-gray-600 bg-[#2d3748] text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-200"
          >
            <option value="male">Nam</option>
            <option value="female">Nữ</option>
            <option value="other">Khác</option>
          </select>
        </div>

        {/* Ngày sinh */}
        <div className="mb-4">
          <label className="block text-sm mb-2">Ngày sinh</label>
          <input
            type="date"
            value={profile.birthDate}
            onChange={(e) => handleInputChange("birthDate", e.target.value)}
            className="w-full p-3 rounded-md border-2 border-gray-600 bg-[#2d3748] text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-200"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 rounded-md text-white hover:bg-gray-500 transition-all duration-200"
          >
            Hủy
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-indigo-600 rounded-md text-white hover:bg-indigo-700 transition-all duration-200"
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfilePopup;
