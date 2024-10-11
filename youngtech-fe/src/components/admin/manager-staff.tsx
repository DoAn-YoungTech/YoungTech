"use client";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit, faEye } from "@fortawesome/free-solid-svg-icons";

export default function EmployeeListComponent() {
    const [employees, setEmployees] = useState([
        {
            id: 1,
            code: "EMP001",
            name: "Nguyễn Văn A",
            email: "a.nguyen@example.com",
            phone: "0123456789",
            position: "Nhân viên bán hàng",
        },
        {
            id: 2,
            code: "EMP002",
            name: "Nguyễn Văn B",
            email: "b.nguyen@example.com",
            phone: "0123456788",
            position: "Nhân viên kinh doanh",
        },
        {
            id: 3,
            code: "EMP003",
            name: "Nguyễn Văn C",
            email: "c.nguyen@example.com",
            phone: "0123456888",
            position: "Thủ kho",
        },
        {
            id: 4,
            code: "EMP004",
            name: "Nguyễn Văn D",
            email: "d.nguyen@example.com",
            phone: "0123458888",
            position: "Nhân viên bán hàng",
        },
    ]);


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ name, phone, email, password });
        setIsModalOpen(false); // Đóng modal sau khi thêm nhân viên
    };

    return (
        <div className="container mx-auto p-8">
            <div className="flex justify-between mb-4">
                <h1 className="text-2xl font-bold">DANH SÁCH NHÂN VIÊN</h1>
            </div>
            <div className="flex justify-between mb-6">
                <input
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 border border-gray-300 rounded shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
                    type="text"
                    placeholder="Tìm kiếm nhân viên..."
                />
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded shadow transition duration-200 ease-in-out"
                >
                    + Thêm nhân viên
                </button>
            </div>


            {/* Table */}
            <table className="table-auto w-full border-collapse">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">STT</th>
                        <th className="border px-4 py-2">Mã nhân viên</th>
                        <th className="border px-4 py-2">Họ và tên</th>
                        <th className="border px-4 py-2">Email</th>
                        <th className="border px-4 py-2">Sđt</th>
                        <th className="border px-4 py-2">Chức vụ</th>
                        <th className="border px-4 py-2">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee, index) => (
                        <tr key={employee.id} className="border-b">
                            <td className="border px-4 py-2">{index + 1}</td>
                            <td className="border px-4 py-2">{employee.code}</td>
                            <td className="border px-4 py-2">{employee.name}</td>
                            <td className="border px-4 py-2">{employee.email}</td>
                            <td className="border px-4 py-2">{employee.phone}</td>
                            <td className="border px-4 py-2">{employee.position}</td>
                            <td className="border px-4 py-2">
                                <FontAwesomeIcon
                                    icon={faEye}
                                    className="text-blue-500 hover:text-blue-700 mr-2"
                                />
                                <FontAwesomeIcon
                                    icon={faEdit}
                                    className="text-yellow-500 hover:text-yellow-700 mr-2"
                                />
                                <FontAwesomeIcon
                                    icon={faTrash}
                                    className="text-red-500 hover:text-red-700 mr-2"
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>

            </table>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-1/2">
                        <h2 className="text-2xl font-bold mb-4 text-center">THÊM NHÂN VIÊN</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="flex items-center justify-center border-2 border-dashed rounded-lg h-48">
                                    <span className="text-gray-400"><input type="file" /></span>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-gray-700 font-medium mb-2">Tên</label>
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="Nhập tên"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-gray-700 font-medium mb-2">Sđt</label>
                                        <input
                                            type="text"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            placeholder="Nhập số điện thoại"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-gray-700 font-medium mb-2">Email</label>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Nhập email"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-gray-700 font-medium mb-2">Mật khẩu</label>
                                        <input
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Nhập mật khẩu"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-end space-x-4 mt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded shadow"
                                >
                                    Hủy
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded shadow"
                                >
                                    Thêm
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
