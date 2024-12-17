import { fetchCustomersById, updateInfoMe } from '@/redux/Customers/customerThunks';
import React, { useEffect, useState } from 'react';
import { FaEdit } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { useSession } from 'next-auth/react';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
const PersonalInfo = () => {
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const { customers } = useSelector((state) => state.customers);

  // State để quản lý việc hiển thị form chỉnh sửa
  const [isEditing, setIsEditing] = useState(false);

  // State quản lý dữ liệu thông tin cá nhân
  const [userInfo, setUserInfo] = useState({
    name: "",
    phone: "",
  });

  useEffect(() => {
    if (session) {
      dispatch(fetchCustomersById());
    }
  }, [dispatch, session]);

  useEffect(() => {
    if (customers && customers.customers) {
      setUserInfo({
        name: customers.customers.fullName, // Cập nhật tên
        phone: customers.customers.phoneNumber, // Cập nhật số điện thoại
      });
    }
  }, [customers]);

  // Hàm xử lý khi người dùng nhấn "Sửa"
  const handleEditClick = () => {
    setIsEditing(true);
  };

  // Hàm xử lý khi người dùng thay đổi giá trị trong form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  // Hàm xử lý khi người dùng nhấn "Lưu"
  const handleSaveClick = async () => {
    const data = {
      fullName: userInfo.name,
      phoneNumber: userInfo.phone,
    };
    const req = await dispatch(updateInfoMe(data)); 
    if(req){
      toast.success("Cập nhật thành công")
    }
    setIsEditing(false); 
  };

  // Hàm xử lý khi người dùng nhấn "Hủy"
  const handleCancelClick = () => {
    setIsEditing(false); // Đóng form chỉnh sửa mà không thay đổi dữ liệu
  };

  return (
    <div className="w-full mb-5 bg-white shadow-md overflow-auto rounded p-4">
      <ToastContainer/>
      <h2 className="text-lg font-bold mb-4">THÔNG TIN CÁ NHÂN</h2>
 
      {!isEditing ? (
        <div>
          <p className='flex gap-3 items-center'>
            {userInfo.name} - {userInfo.phone}
            <button 
              onClick={handleEditClick} 
              className="text-blue-500 flex gap-1 items-center ml-2">
                <FaEdit className='text-blue-500' />
              Sửa
            </button>
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700">Họ và tên</label>
            <input
              type="text"
              name="name"
              value={userInfo.name}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block text-gray-700">Số điện thoại</label>
            <input
              type="text"
              name="phone"
              value={userInfo.phone}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          <div className="flex justify-center space-x-4">
            <button
              onClick={handleSaveClick}
              className="bg-slate-800 text-white px-4 py-2 rounded hover:bg-slate-900"
            >
              Lưu
            </button>
            <button
              onClick={handleCancelClick}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Hủy
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonalInfo;
