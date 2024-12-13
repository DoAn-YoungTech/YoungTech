"use client";
import React, { useEffect, useState } from "react";
import { getEmployees, deleteEmployee } from "@/services/employee/EmployeeService";
import { toast } from "react-toastify";
import { FaEye, FaTrashAlt, FaEdit } from "react-icons/fa";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Paginator } from "primereact/paginator";

const ListEmployees = () => {
  const [employees, setEmployees] = useState<any[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchField, setSearchField] = useState("fullName");
  const [loading, setLoading] = useState(true);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(5);

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

  const handleDelete = async (id: string) => {
    if (confirm("Xác nhận xóa?")) {
      try {
        await deleteEmployee(id);
        setEmployees(employees.filter((emp) => emp.id !== id));
        toast.success("Xóa thành công!");
      } catch {
        toast.error("Xóa thất bại, vui lòng thử lại.");
      }
    }
  };

  const renderRow = (employee: any) => (
    <tr
      key={employee.id}
      className="border-b border-gray-700 hover:bg-gray-800"
    >
      <td className="p-4">{employee.id}</td>
      <td className="p-4">{employee.fullName}</td>
      <td className="p-4">
        <img
          src={employee.profilePicture}
          alt=""
          className="rounded-full w-12 h-12"
        />
      </td>
      <td className="p-4">{employee.phoneNumber}</td>
      <td className="p-4">{employee.position}</td>
      <td className="p-4 flex justify-center gap-4">
        <FaEye
          className="text-blue-500 hover:text-blue-300 cursor-pointer"
          title="Xem"
        />
        <FaTrashAlt
          className="text-red-500 hover:text-red-300 cursor-pointer"
          title="Xóa"
          onClick={() => handleDelete(employee.id)}
        />
        <FaEdit
          className="text-green-500 hover:text-green-300 cursor-pointer"
          title="Sửa"
        />
      </td>
    </tr>
  );

  if (loading) return <div>Loading...</div>;

  const paginatedEmployees = filteredEmployees.slice(first, first + rows);

  return (
    <div className="p-4 text-white">
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
          panelClassName="bg-gray-900 text-white rounded-lg shadow-lg"
          itemTemplate={(option) => (
            <div className="px-4 py-2 hover:bg-gray-700 rounded-md cursor-pointer">
              {option.label}
            </div>
          )}
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
        className="p-paginator p-component bg-gray-800 p-4 rounded-lg shadow-md"
        template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
      />
    </div>
    </div>
  );
};

export default ListEmployees;
