"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import EditProfilePopup from "./EditProfilePopup";
import { useSession, signOut } from "next-auth/react";

const Avatar: React.FC = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const { data: session, status, update } = useSession();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [profileData, setProfileData] = useState({
    image: "https://res.cloudinary.com/dsiwefmmd/image/upload/v1734401914/uploads/ovkvvopjaroz0rwcxt1o.jpg",
    name: "Chưa cập nhật",
    gender: "Chưa cập nhật",
    birthDate: "Chưa cập nhật",
    email: "Chưa cập nhật",
    role: "guest",
    id: null,
  });

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      setProfileData({
        image: session.user.image || "https://res.cloudinary.com/dsiwefmmd/image/upload/v1734401914/uploads/ovkvvopjaroz0rwcxt1o.jpg",
        name: session.user.name || session.user.email,
        email: session.user.email,
        gender: session.user.gender || "Chưa cập nhật",
        birthDate: session.user.birthDate || "Chưa cập nhật",
        role: session.user.role || "guest",
        id: session.user.id,
      });
    }
  }, [session, status]);

  const handleSaveProfile = async (updatedProfile: typeof profileData) => {
    try {
      const response = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProfile),
      });
      if (!response.ok) throw new Error("Cập nhật thất bại!");

      setProfileData(updatedProfile);
      await update(updatedProfile); // Cập nhật session
      setIsPopupVisible(false);
    } catch (error) {
      console.error("Lỗi khi lưu thông tin:", error);
    }
  };

  // Hàm hiển thị menu
  const handleMenuShow = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current); // Hủy bỏ timeout cũ
    }
    setIsMenuVisible(true);
  };

  // Hàm ẩn menu
  const handleMenuHide = () => {
    timeoutRef.current = setTimeout(() => {
      setIsMenuVisible(false);
    }, 300); // Delay 300ms
  };

  return (
    <div
      className="relative cursor-pointer"
      onMouseEnter={handleMenuShow}
      onMouseLeave={handleMenuHide}
    >
      {/* Avatar */}
      <Image
        src={profileData.image}
        alt="Avatar"
        width={40}
        height={40}
        className="rounded-full border-2 border-gray-300 shadow-lg hover:shadow-2xl transition-all duration-200"
      />

      {/* Menu */}
      {isMenuVisible && (
        <div className="absolute right-0 mt-2 w-52 bg-gray-800 border border-gray-700 rounded-lg shadow-lg">
          <ul className="py-2 text-sm text-gray-200">
            <li
              className="px-4 py-2 hover:bg-gray-700 cursor-pointer transition-all duration-200"
              onClick={() => setIsPopupVisible(true)}
            >
              Chỉnh sửa thông tin cá nhân
            </li>
            <li
              className="px-4 py-2 hover:bg-gray-700 cursor-pointer transition-all duration-200"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              Đăng xuất
            </li>
          </ul>
        </div>
      )}

      {/* Popup chỉnh sửa */}
      <EditProfilePopup
        isVisible={isPopupVisible}
        onClose={() => setIsPopupVisible(false)}
        onSave={handleSaveProfile}
        initialProfile={profileData}
      />
    </div>
  );
};

export default Avatar;
