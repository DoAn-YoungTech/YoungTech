"use client"
import { Table } from '@/components/ui/table'; // Kiểm tra đường dẫn chính xác
import { Button } from '@/components/ui/button'; // Kiểm tra đường dẫn chính xác
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
interface EmployeeTableProps {
  employees: Employee[];
  onEdit: (employee: Employee) => void;
  onDelete: (id: number) => void;
}

const EmployeeTable: React.FC<EmployeeTableProps> = ({ employees, onEdit, onDelete }) => {
  return (
    
    <Table>
      <thead className='text-left '>
        <tr >
        <th className="py-5">ID</th>
          <th className="py-5">Họ và Tên</th>
          <th className="py-5">Hình Ảnh</th>
          <th className="py-5">Ngày Sinh</th>
          <th className="py-5">Số Điện Thoại</th>
          <th className="py-5">Chức Vụ</th>
          <th className="py-5">Thao Tác</th>
        </tr>
      </thead>
      <tbody className=''>
        {employees.map((employee) => (
          <tr  key={employee.id}>
            <td>{employee.id}</td>
            <td>{employee.fullName}</td>
            <td>
              <img src={employee.profilePicture} alt={employee.fullName} className="w-12 h-12 rounded-full" />
            </td>
            <td>{new Date(employee.dateOfBirth).toLocaleDateString()}</td>
            <td>{employee.phoneNumber}</td>
            <td>{employee.position}</td>
            <td className='gap-2 flex'>
              <Button className='bg-blue-500 hover:bg-blue-600' onClick={() => onEdit(employee)}><FaEdit/></Button>
              <Button className='bg-red-500 hover:bg-red-600' onClick={() => onDelete(employee.id)}><MdDeleteOutline/></Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default EmployeeTable;
