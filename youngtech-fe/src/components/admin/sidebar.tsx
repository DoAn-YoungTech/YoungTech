import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => setIsCollapsed((prev) => !prev);

  const items = [
    {
      label: "Trang chủ",
      icon: "pi pi-home",
      href: "/admin",
    },
    {
      label: "Quản lý nhân viên",
      icon: "pi pi-users",
      href: "/admin/employee",
    },
    {
      label: "Quản lý bán hàng",
      icon: "pi pi-cart-minus",
      href: "/admin/sale",
    },
    {
      label: "Quản lý kinh doanh",
      icon: "pi pi-briefcase",
      href: "/admin/business",
    },
    {
      label: "Quản lý danh mục sản phẩm",
      icon: "pi pi-tags",
      href: "/admin/parentCategories",
    },
    {
      label: "Quản lý nhà cung cấp",
      icon: "pi pi-user",
      href: "/admin/suppliers",
    },
    {
      label: "Quản lý nhập kho hàng",
      icon: "pi pi-warehouse",
      href: "/admin/inventory",
    },
    {
      label: "Danh sách hoá đơn",
      icon: "pi pi-file",
      href: "/admin/invoices",
    },
  ];

  return (
    <div className={`flex ${isCollapsed ? "w-20" : "w-60"} transition-width duration-300`}>
      <div
        className={`bg-white shadow-lg h-screen p-4 fixed top-0 left-0 z-10 flex flex-col items-center transition-all duration-300`}
      >
        <button
          onClick={toggleSidebar}
          className="mt-4 mb-8 p-2 rounded-full text-blue-600 bg-gray-100 hover:bg-gray-200 transition"
        >
          <i className={`pi ${isCollapsed ? "pi-angle-right" : "pi-angle-left"} text-xl`} />
        </button>
        <div className="mb-6">
          <h2 className={`${isCollapsed ? "hidden" : "text-3xl font-bold text-blue-600"}`}>
            YoungTech
          </h2>
        </div>
        <div className="space-y-4 text-center">
          {items.map((item, index) => (
            <Link 
              key={index} 
              href={item.href} 
              className={`flex items-center ${pathname === item.href ? "text-blue-500" : "text-gray-700"}`}
            >
              <i className={`${item.icon} text-lg`} />
              <span className={`${isCollapsed ? "hidden" : "ml-2"}`}>{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
      <div className={`flex-1 ml-${isCollapsed ? "20" : "60"}`}>
        {/* Nội dung chính của trang sẽ nằm ở đây */}
      </div>
    </div>
  );
};

export default Sidebar;