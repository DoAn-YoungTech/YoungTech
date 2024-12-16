"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getEmployees } from "@/services/employee/EmployeeService";
import { toast } from "react-toastify";
import { FaEye, FaTrashAlt, FaEdit } from "react-icons/fa";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Paginator } from "primereact/paginator";
import Image from "next/image";
import DeletePopup from "./DeletePopup";

const ListEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchField, setSearchField] = useState("fullName");
  const [loading, setLoading] = useState(true);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(5);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  const router = useRouter();

  const searchOptions = [
    { label: "Tên", value: "fullName" },
    { label: "Vị trí", value: "position" },
    { label: "Số điện thoại", value: "phoneNumber" },
  ];

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const { message } = await getEmployees();
        setEmployees(message);
        setFilteredEmployees(message);
      } catch {
        toast.error("Không thể tải danh sách nhân viên.");
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  useEffect(() => {
    setFilteredEmployees(
      employees.filter((emp) =>
        emp[searchField]?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, searchField, employees]);

  const handleDeleteClick = (employee) => {
    setSelectedEmployee(employee);
    setShowDeletePopup(true);
  };

  const handleEdit = (id) => router.push(`/dashboard/quanly-nhanvien/chinhsua-nhanvien/${id}`);

  const renderRow = (employee) => (
    <tr key={employee.id} className="border-b border-gray-700 hover:bg-gray-800">
      <td className="p-4">{employee.id}</td>
      <td className="p-4">{employee.fullName}</td>
      <td className="p-4">
        <Image
          src={employee.profilePicture || "/default-avatar.png"}
          alt="Avatar"
          width={48}
          height={48}
          className="rounded-full"
        />
      </td>
      <td className="p-4">{employee.phoneNumber}</td>
      <td className="p-4">{employee.position}</td>
      <td className="p-4 flex justify-center gap-4">
        <FaEye className="text-blue-500 hover:text-blue-300 cursor-pointer" title="Xem" />
        <FaTrashAlt
          className="text-red-500 hover:text-red-300 cursor-pointer"
          title="Xóa"
          onClick={() => handleDeleteClick(employee)}
        />
        <FaEdit
          className="text-green-500 hover:text-green-300 cursor-pointer"
          title="Sửa"
          onClick={() => handleEdit(employee.id)}
        />
      </td>
    </tr>
  );

  if (loading) return <div>Loading...</div>;

  const paginatedEmployees = filteredEmployees.slice(first, first + rows);

  return (
    <div className="p-4 text-white">
      <DeletePopup
        visible={showDeletePopup}
        onHide={() => setShowDeletePopup(false)}
        employee={selectedEmployee}
        onDeleteSuccess={(id) => {
          const updatedEmployees = employees.filter((emp) => emp.id !== id);
          setEmployees(updatedEmployees);
          setFilteredEmployees(updatedEmployees);
          toast.success("Xóa thành công!");
        }}
      />
      <h1 className="text-xl font-bold mb-4">Danh sách nhân viên</h1>
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <InputText
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Tìm kiếm"
          className="w-full md:w-1/2 px-4 py-2 rounded-lg border border-gray-700 bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
        />
        <Dropdown
          value={searchField}
          options={searchOptions}
          onChange={(e) => setSearchField(e.value)}
          placeholder="Chọn trường tìm kiếm"
          className="w-full md:w-1/4 px-4 py-2 rounded-lg border border-gray-700 bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
        />
      </div>
      <table className="table-auto w-full text-sm text-gray-200">
        <thead className="bg-gray-800">
          <tr>
            <th className="p-4">ID</th>
            <th className="p-4">Tên</th>
            <th className="p-4">Ảnh</th>
            <th className="p-4">Số ĐT</th>
            <th className="p-4">Vị trí</th>
            <th className="p-4">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {paginatedEmployees.length > 0 ? (
            paginatedEmployees.map(renderRow)
          ) : (
            <tr>
              <td colSpan={6} className="text-center p-4">
                Không có nhân viên nào
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="flex justify-center mt-4">
        <Paginator
          first={first}
          rows={rows}
          totalRecords={filteredEmployees.length}
          onPageChange={(e) => {
            setFirst(e.first);
            setRows(e.rows);
          }}
        />
      </div>
    </div>
  );
};

export default ListEmployees;
