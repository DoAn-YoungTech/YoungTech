"use client";
import { useState, useEffect } from "react";
import AddEmployee from "./AddEmployee";
import PaginationSearch from "./PaginationSearch";

export default function EmployeeListComponent() {
    const [employees, setEmployees] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false); // Trạng thái modal

    useEffect(() => {
    // Giả lập 100 bản ghi
    const simulatedEmployees = Array.from({ length: 100 }, (_, index) => ({
        id: index + 1,
        code: `EMP${(index + 1).toString().padStart(3, '0')}`,
        name: `Nguyễn Văn ${String.fromCharCode(65 + (index % 26))}`, // Tạo tên từ A-Z
        email: `nguyen${index + 1}@example.com`,
        phone: `01234567${index % 10}${index % 10}${index % 10}`,
        position: "Nhân viên",
    }));

    setEmployees(simulatedEmployees);
}, []);


    return (
        <div className="container mx-auto p-8">
            <div className="flex justify-between mb-4">
                <h1 className="text-2xl font-bold">DANH SÁCH NHÂN VIÊN</h1>
            </div>
            <div className="flex justify-between mb-6">
                <button
                    onClick={() => setIsModalOpen(true)} // Mở modal
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded shadow transition duration-200 ease-in-out"
                >
                    + Thêm nhân viên
                </button>
            </div>

            {/* Sử dụng component PaginationSearch */}
            <PaginationSearch data={employees} rowsPerPage={10} onDataFiltered={setEmployees} />

            <AddEmployee isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} /> {/* Truyền props */}
        </div>
    );
}
