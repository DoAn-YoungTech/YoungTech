// src/components/AdminLayout/header.tsx
import React from "react";

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  return (
    <header className="bg-white shadow-md p-4 flex items-center justify-between">
      <button onClick={toggleSidebar} className="p-2 text-blue-600">
        <i className="pi pi-bars text-xl" />
      </button>
      <h1 className="text-xl font-bold text-blue-600">Quản lý hệ thống</h1>
      <div>
        <button className="p-2 text-blue-600 hover:bg-gray-200 rounded">
          <i className="pi pi-user" />
        </button>
      </div>
    </header>
  );
};

export default Header;