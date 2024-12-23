"use client";

import React, { useState, useEffect } from 'react';
import { deleteEmployee } from '@/services/employeeServices';

export default function EmployeeDelete({ visible, employee, onHide, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const handleStorageChange = () => {
      const savedDarkMode = localStorage.getItem('darkMode');
      if (savedDarkMode !== null) {
        setDarkMode(JSON.parse(savedDarkMode));
      }
    };

    handleStorageChange();
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleDelete = async () => {
    try {
      setLoading(true);
      const response = await deleteEmployee(employee.id);
      
      if (response.status === 200) {
        onSuccess('Đã xóa nhân viên thành công');
        onHide();
      }
    } catch (error) {
      onSuccess('Không thể xóa nhân viên. Vui lòng thử lại sau.', 'error');
    } finally {
      setLoading(false);
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white'} rounded-lg p-6 w-[450px]`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">Xác nhận xóa</h3>
          <button 
            onClick={onHide}
            className={`${darkMode ? 'text-gray-300 hover:text-gray-100' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="mb-6 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span>
            Bạn có chắc chắn muốn xóa nhân viên <b>{employee?.fullName}</b>?
          </span>
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={onHide}
            disabled={loading}
            className={`px-4 py-2 border ${darkMode ? 'border-gray-600 hover:bg-gray-700' : 'border-gray-300 hover:bg-gray-100'} rounded-md disabled:opacity-50`}
          >
            Hủy
          </button>
          <button
            onClick={handleDelete}
            disabled={loading}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 flex items-center"
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : null}
            Xóa
          </button>
        </div>
      </div>
    </div>
  );
}
