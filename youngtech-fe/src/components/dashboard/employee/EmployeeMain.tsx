"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import EmployeeTable from "./EmployeeTable";
import AddEmployee from "./AddEmployee";
import EditEmployee from "./EditEmployee";

interface Employee {
  id: number;
  flag: boolean;
  fullName: string;
  profilePicture: string;
  dateOfBirth: Date;
  phoneNumber: string;
  position: string;
  account_id: number | null;
}

const mockEmployees: Employee[] = [
  {
    id: 1,
    flag: true,
    fullName: "Nguyễn Văn A",
    profilePicture: "https://via.placeholder.com/150",
    dateOfBirth: new Date("1990-01-01"),
    phoneNumber: "0123456789",
    position: "Quản lý",
    account_id: 1,
  },
  {
    id: 2,
    flag: true,
    fullName: "Trần Thị B",
    profilePicture: "https://via.placeholder.com/150",
    dateOfBirth: new Date("1992-02-02"),
    phoneNumber: "0987654321",
    position: "Nhân viên",
    account_id: 2,
  },
  {
    id: 3,
    flag: true,
    fullName: "Lê Văn C",
    profilePicture: "https://via.placeholder.com/150",
    dateOfBirth: new Date("1988-03-03"),
    phoneNumber: "0912345678",
    position: "Kỹ sư",
    account_id: 3,
  },
  {
    id: 4,
    flag: true,
    fullName: "Phạm Thị D",
    profilePicture: "https://via.placeholder.com/150",
    dateOfBirth: new Date("1995-04-04"),
    phoneNumber: "0934567890",
    position: "Chuyên viên",
    account_id: 4,
  },
  {
    id: 5,
    flag: true,
    fullName: "Ngô Văn E",
    profilePicture: "https://via.placeholder.com/150",
    dateOfBirth: new Date("1991-05-05"),
    phoneNumber: "0961234567",
    position: "Nhân viên bán hàng",
    account_id: 5,
  },
  {
    id: 6,
    flag: true,
    fullName: "Đặng Thị F",
    profilePicture: "https://via.placeholder.com/150",
    dateOfBirth: new Date("1985-06-06"),
    phoneNumber: "0945678901",
    position: "Giám đốc",
    account_id: 6,
  },
];

const EmployeeActions = () => {
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const [isAddDialogOpen, setAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  const handleAddEmployee = (newEmployee: Employee) => {
    setEmployees([...employees, newEmployee]);
    setAddDialogOpen(false);
  };

  const handleEditEmployee = (updatedEmployee: Employee) => {
    setEmployees((prevEmployees) =>
      prevEmployees.map((emp) =>
        emp.id === updatedEmployee.id ? updatedEmployee : emp
      )
    );
    setEditDialogOpen(false);
  };

  const handleDeleteEmployee = (id: number) => {
    setEmployees((prevEmployees) => prevEmployees.filter((emp) => emp.id !== id));
  };

  const handleEditButtonClick = (employee: Employee) => {
    setSelectedEmployee(employee);
    setEditDialogOpen(true);
  };

  return (
    <div>
      <Button className="bg-orange-600" onClick={() => setAddDialogOpen(true)}>Thêm Nhân Viên</Button>
      <EmployeeTable 
        employees={employees} 
        onEdit={handleEditButtonClick} 
        onDelete={handleDeleteEmployee} 
      />

      {/* Dialog for Adding Employee */}
      <AddEmployee
        isOpen={isAddDialogOpen}
        onClose={() => setAddDialogOpen(false)}
        onAdd={handleAddEmployee}
      />

      {/* Dialog for Editing Employee */}
      <EditEmployee
        isOpen={isEditDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        employee={selectedEmployee}
        onEdit={handleEditEmployee}
      />
    </div>
  );
};

export default EmployeeActions;
