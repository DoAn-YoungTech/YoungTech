import React from "react";

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md p-4 flex items-center justify-center fixed top-0 left-0 right-0 z-10">
      <h1 className="text-2xl font-bold text-blue-600 mb-4 mt-4">
        QUẢN LÝ HỆ THỐNG
      </h1>
      <div className="absolute right-4">
        <button className="p-2 text-blue-600 hover:bg-gray-200 rounded">
          <i className="pi pi-user" />
        </button>
      </div>
    </header>
  );
};

export default Header;
