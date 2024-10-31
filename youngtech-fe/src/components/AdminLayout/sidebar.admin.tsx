import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  const toggleSidebar = () => setIsCollapsed((prev) => !prev);
  const toggleDropdown = (label: string) => {
    setOpenDropdown((prev) => (prev === label ? null : label));
  };

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
      isDropdown: true,
      subItems: [
        { label: "Đơn hàng", href: "/admin/sale/order", icon: "pi pi-shopping-cart" },
        { label: "Chi tiết đơn hàng", href: "/admin/sale/orderDetail", icon: "pi pi-check-circle" },
      ],
    },
    {
      label: "Quản lý kinh doanh",
      icon: "pi pi-briefcase",
      href: "/admin/business",
      isDropdown: true,
      subItems: [
        { label: "Hoá đơn bán hàng", href: "/admin/business/output-invoice", icon: "pi pi-file" },
        { label: "Quản lý sản phẩm", href: "/admin/business/product", icon: "pi pi-box" },
        { label: "Quản lý khách hàng", href: "/admin/business/customer", icon: "pi pi-user" },        
      ],
    },
    {
      label: "Quản lý danh mục sản phẩm",
      icon: "pi pi-tags",
      href: "/admin/categories",
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
            <div key={index}>
              {item.isDropdown ? (
                <>
                  <button
                    onClick={() => toggleDropdown(item.label)}
                    className={`flex items-center ${pathname.startsWith(item.href) ? "text-blue-500" : "text-gray-700"}`}
                  >
                    <i className={`${item.icon} text-lg`} />
                    <span className={`${isCollapsed ? "hidden" : "ml-2"}`}>{item.label}</span>
                  </button>
                  {openDropdown === item.label && (
                    <div className="ml-6 mt-2 space-y-2">
                      {item.subItems.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          href={subItem.href}
                          className={`flex items-center ${pathname === subItem.href ? "text-blue-500" : "text-gray-700"}`}
                        >
                          <i className={`${subItem.icon} text-lg`} />
                          <span className={`${isCollapsed ? "hidden" : "ml-2"}`}>{subItem.label}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={item.href}
                  className={`flex items-center ${pathname === item.href ? "text-blue-500" : "text-gray-700"}`}
                >
                  <i className={`${item.icon} text-lg`} />
                  <span className={`${isCollapsed ? "hidden" : "ml-2"}`}>{item.label}</span>
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className={`flex-1 ml-${isCollapsed ? "20" : "60"}`}>
      </div>
    </div>
  );
};

export default Sidebar;
