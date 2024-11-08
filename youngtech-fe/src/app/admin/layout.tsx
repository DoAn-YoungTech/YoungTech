"use client";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.css";
import "primeicons/primeicons.css";
import Sidebar from "@/components/adminLayout/sidebar.Admin";
import Header from "@/components/adminLayout/header.Admin";
import { useState } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen] = useState(true);

  return (
    <>
      <Header />
      <div className="flex">
        {isSidebarOpen && <Sidebar />}
        <div
          className={`flex-1 transition-all duration-300 mt-20 ${
            isSidebarOpen ? "p-20" : ""
          }`}
        >
          {children}
        </div>
      </div>
    </>
  );
}