"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import EmployeeTable from "./EmployeeTable";
import AddEmployee from "./AddEmployee";
import EditEmployee from "./EditEmployee";
import { RootState, AppDispatch } from '@/redux/Store';
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployees,createEmployee,deleteEmployee,editEmployee } from "@/redux/Employee/employeeThunks";

// Interface for Employee
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

const EmployeeActions = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Extracting employee data, loading, and error states from Redux store
  const { employee, loading, error } = useSelector((state: RootState) => state.employee);

  const [isAddDialogOpen, setAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  // Use Redux data directly instead of local state
  const handleAddEmployee = (newEmployee: Employee) => {
    // Dispatch an action to add the employee to the store (if you have such an action)
    dispatch(createEmployee(newEmployee)); // Example if you have addEmployee action
    setAddDialogOpen(false);
  };

  const handleEditEmployee = (updatedEmployee: Employee) => {
    // Dispatch an action to update the employee in the store (if you have such an action)
    dispatch(editEmployee(updatedEmployee)); // Example if you have updateEmployee action
    setEditDialogOpen(false);
  };

  const handleDeleteEmployee = (id: number) => {
    // Dispatch an action to delete the employee (if you have such an action)
    dispatch(deleteEmployee(id)); // Example if you have deleteEmployee action
  };

  const handleEditButtonClick = (employee: Employee) => {
    setSelectedEmployee(employee);
    setEditDialogOpen(true);
  };

  useEffect(() => {
    // Dispatch fetchEmployees to load the data when the component mounts
    dispatch(fetchEmployees());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <Button className="bg-orange-600" onClick={() => setAddDialogOpen(true)}>
        Thêm Nhân Viên
      </Button>
      
      {/* Pass employee data directly from Redux */}
      <EmployeeTable 
        employees={employee} // Directly using employee data from Redux
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
