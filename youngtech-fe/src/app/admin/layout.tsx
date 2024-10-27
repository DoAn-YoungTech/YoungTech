'use client';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeicons/primeicons.css';
import Sidebar from "@/components/AdminLayout/admin.sidebar";
import Header from "@/components/AdminLayout/header.admin";
import { useState } from "react";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen((prev) => !prev);
    };

    return (
        <>
            <Header/>
            <div className="flex">
                {isSidebarOpen && <Sidebar />}
                <div className={`flex-1 transition-all duration-300 mt-20 ${isSidebarOpen ? "p-10" : ""}`}>
                    {children}
                </div>
            </div>
        </>
    );
}
