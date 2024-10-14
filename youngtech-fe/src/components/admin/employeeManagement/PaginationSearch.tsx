"use client";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit, faEye } from "@fortawesome/free-solid-svg-icons";

interface Employee {
    id: number;
    code: string;
    name: string;
    email: string;
    phone: string;
    position: string;
}

interface PaginationSearchProps {
    data: Employee[];
    rowsPerPage: number;
}

export default function PaginationSearch({ data, rowsPerPage }: PaginationSearchProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");

    const filteredData = data.filter((item) =>
        Object.values(item).some((value) =>
            value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    const currentData = filteredData.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchTerm(value);
        setCurrentPage(1);
    };

    const handlePreviousPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Tìm kiếm..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="mb-4 p-2 border border-gray-300 rounded"
            />
            <table className="table-auto w-full border-collapse">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">STT</th>
                        <th className="border px-4 py-2">Mã nhân viên</th>
                        <th className="border px-4 py-2">Họ và tên</th>
                        <th className="border px-4 py-2">Email</th>
                        <th className="border px-4 py-2">SĐT</th>
                        <th className="border px-4 py-2">Chức vụ</th>
                        <th className="border px-4 py-2">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {currentData.length === 0 ? (
                        <tr>
                            <td colSpan={7} className="border px-4 py-2 text-center">Không có dữ liệu</td>
                        </tr>
                    ) : (
                        currentData.map((employee, index) => (
                            <tr key={employee.id} className="border-b">
                                <td className="border px-4 py-2">{(currentPage - 1) * rowsPerPage + index + 1}</td>
                                <td className="border px-4 py-2">{employee.code}</td>
                                <td className="border px-4 py-2">{employee.name}</td>
                                <td className="border px-4 py-2">{employee.email}</td>
                                <td className="border px-4 py-2">{employee.phone}</td>
                                <td className="border px-4 py-2">{employee.position}</td>
                                <td className="border px-4 py-2">

                                    <button className="bg-transparent hover:bg-gray-200 py-2 px-4 rounded shadow">
                                        <FontAwesomeIcon icon={faEye} className="text-blue-500 hover:text-blue-600" />
                                    </button>

                                    <button className="bg-transparent hover:bg-gray-200 py-2 px-4 rounded shadow">
                                        <FontAwesomeIcon icon={faEdit} className="text-yellow-500 hover:text-yellow-600" />
                                    </button>

                                    <button className="bg-transparent hover:bg-gray-200 py-2 px-4 rounded shadow">
                                        <FontAwesomeIcon icon={faTrash} className="text-red-500 hover:text-red-600" />
                                    </button>

                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            <div className="flex justify-between items-center mt-4">
                <button
                    onClick={handlePreviousPage}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded shadow"
                    disabled={currentPage === 1}
                >
                    Trang trước
                </button>
                <span className="font-semibold">
                    Trang {currentPage} / {totalPages}
                </span>
                <button
                    onClick={handleNextPage}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded shadow"
                    disabled={currentPage === totalPages}
                >
                    Trang tiếp
                </button>
            </div>
        </div>
    );
}
