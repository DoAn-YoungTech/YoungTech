"use client";

import React, { useEffect, useState } from 'react';
import { Paginator } from 'primereact/paginator';

const Pagination = ({ first, rows, totalRecords, onPageChange }) => {
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

  return (
    <div className="mt-6">
      <Paginator
        first={first}
        rows={rows}
        totalRecords={totalRecords}
        onPageChange={onPageChange}
        template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport"
        className={`rounded-xl shadow-md hover:shadow-lg transition-all duration-300 ${
          darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
        }`}
        currentPageReportTemplate={`Trang {currentPage} / {totalPages}`}
        leftContent={
          <div className="flex items-center">
            <span className={`text-sm font-medium ml-2 mr-2 ${darkMode ? 'text-white' : 'text-gray-600'}`}>Hiển thị:</span>
            <span className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{Math.min(first + rows, totalRecords)}</span>
            <span className={`mx-1 ${darkMode ? 'text-white' : 'text-gray-600'}`}>trong</span>
            <span className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{totalRecords}</span>
          </div>
        }
        rightContent={
          <div className={`flex items-center text-sm font-medium mr-2 ${darkMode ? 'text-white' : 'text-gray-600'}`}>
            <span>Tổng số bản ghi:</span>
            <span className={`font-bold ml-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{totalRecords}</span>
          </div>
        }
        pt={{
          pageButton: ({ context }) => ({
            className: `p-2 min-w-[2.5rem] rounded-lg font-medium transition-all duration-200 ${
              context.active 
                ? darkMode ? 'bg-gray-600 text-white' : 'bg-blue-500 text-white'
                : darkMode ? 'text-white hover:bg-gray-700' : 'text-gray-600 hover:bg-blue-100'
            }`
          }),
          firstPageButton: {
            className: `p-2 rounded-lg transition-all duration-200 ${
              darkMode ? 'text-white hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'
            }`
          },
          prevPageButton: {
            className: `p-2 rounded-lg transition-all duration-200 ${
              darkMode ? 'text-white hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'
            }`
          },
          nextPageButton: {
            className: `p-2 rounded-lg transition-all duration-200 ${
              darkMode ? 'text-white hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'
            }`
          },
          lastPageButton: {
            className: `p-2 rounded-lg transition-all duration-200 ${
              darkMode ? 'text-white hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'
            }`
          },
          currentPageReport: {
            className: `text-sm font-medium mx-2 ${darkMode ? 'text-white' : 'text-gray-600'}`
          }
        }}
      />
    </div>
  );
};

export default Pagination;
