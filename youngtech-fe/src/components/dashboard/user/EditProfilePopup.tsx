// src/components/EditProfilePopup.tsx
"use client"
import React, { useState } from 'react';

interface EditProfilePopupProps {
    isVisible: boolean;
    onClose: () => void;
    onSave: (newImage: string) => void;
}

const EditProfilePopup: React.FC<EditProfilePopupProps> = ({ isVisible, onClose, onSave }) => {
    const [newImage, setNewImage] = useState<string | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const previewUrl = URL.createObjectURL(file); // Tạo URL tạm thời cho hình ảnh
            setNewImage(previewUrl);
        }
    };

    const handleSave = () => {
        if (newImage) {
            onSave(newImage); // Gửi hình ảnh mới lên component cha
        }
    };

    if (!isVisible) return null; // Không hiển thị nếu isVisible là false

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
            <div className="bg-[#1f2937] rounded-lg shadow-lg p-6 w-1/3 text-white">
                <h2 className="text-xl font-semibold mb-4 text-gray-100">Chỉnh sửa thông tin cá nhân</h2>
                <form>
                    {/* Thay đổi hình ảnh */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-400">Hình ảnh</label>
                        <div className="flex items-center mt-2">
                            <img 
                                src={newImage || "https://via.placeholder.com/100"} // Hiển thị ảnh đã chọn trong popup
                                alt="Avatar Preview" 
                                className="w-20 h-20 rounded-full mr-4 border border-gray-500"
                            />
                            <input 
                                type="file" 
                                className="block text-sm text-gray-400 bg-transparent border border-gray-500 rounded-md p-2 hover:border-gray-300 focus:outline-none focus:border-indigo-500"
                                accept="image/*"
                                onChange={handleImageChange} // Gọi hàm khi chọn ảnh
                            />
                        </div>
                    </div>

                    {/* Thay đổi họ và tên */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-400">Họ và tên</label>
                        <input 
                            type="text" 
                            className="mt-2 block w-full rounded-md border border-gray-500 bg-[#1f2937] text-white p-2 focus:border-indigo-500 focus:ring-indigo-500"
                            placeholder="Nhập họ và tên"
                        />
                    </div>

                    {/* Thay đổi giới tính */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-400">Giới tính</label>
                        <select 
                            className="mt-2 block w-full rounded-md border border-gray-500 bg-[#1f2937] text-white p-2 focus:border-indigo-500 focus:ring-indigo-500"
                        >
                            <option value="male">Nam</option>
                            <option value="female">Nữ</option>
                            <option value="other">Khác</option>
                        </select>
                    </div>

                    {/* Thay đổi ngày sinh */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-400">Ngày sinh</label>
                        <input 
                            type="date" 
                            className="mt-2 block w-full rounded-md border border-gray-500 bg-[#1f2937] text-white p-2 focus:border-indigo-500 focus:ring-indigo-500"
                        />
                    </div>

                    {/* Thay đổi email */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-400">Email</label>
                        <input 
                            type="email" 
                            className="mt-2 block w-full rounded-md border border-gray-500 bg-[#1f2937] text-white p-2 focus:border-indigo-500 focus:ring-indigo-500"
                            placeholder="Nhập email"
                        />
                    </div>

                    {/* Nút Hành động */}
                    <div className="flex justify-end">
                        <button 
                            type="button" 
                            className="mr-2 px-4 py-2 bg-gray-600 text-gray-200 rounded-md hover:bg-gray-500"
                            onClick={onClose} // Đóng popup
                        >
                            Hủy
                        </button>
                        <button 
                            type="button" 
                            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                            onClick={handleSave} // Lưu hình ảnh và đóng popup
                        >
                            Lưu
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProfilePopup;
