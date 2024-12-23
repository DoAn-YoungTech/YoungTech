"use client";

import React, { useEffect, useState } from "react";
import { getEmployees } from "@/services/employeeServices";
import { Card } from 'primereact/card';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Button } from 'primereact/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/navigation';
import {
  faTools,
  faSearch,
  faPlus,
  faPen,
  faTrash,
  faExclamationTriangle,
  faXmark
} from '@fortawesome/free-solid-svg-icons';
import Pagination from '@/components/layout/pagination';
import EmployeeDelete from './employeeDelete';

const ListEmployees = () => {
  const router = useRouter();
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [globalFilter, setGlobalFilter] = useState('');
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [first, setFirst] = useState(0);
  const [rows] = useState(5);
  const [darkMode, setDarkMode] = useState(false);
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  useEffect(() => {
    const handleStorageChange = () => {
      const savedDarkMode = localStorage.getItem('darkMode');
      if (savedDarkMode !== null) {
        setDarkMode(JSON.parse(savedDarkMode));
      }
    };

    handleStorageChange();
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  useEffect(() => {
    fetchEmployees();
  }, []);

  useEffect(() => {
    if (globalFilter) {
      const lowercaseFilter = globalFilter.toLowerCase();
      const filtered = employees.filter(employee => 
        Object.values(employee).some(value => 
          value && value.toString().toLowerCase().includes(lowercaseFilter)
        )
      );
      setFilteredEmployees(filtered);
    } else {
      setFilteredEmployees(employees);
    }
  }, [globalFilter, employees]);

  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: '' });
    }, 3000);
  };

  const fetchEmployees = async () => {
    try {
      const response = await getEmployees();
      if (response && response.message) {
        setEmployees(response.message);
        setFilteredEmployees(response.message);
        setMaintenanceMode(false);
      }
    } catch (error) {
      console.error('Lỗi khi tải dữ liệu:', error);
      setMaintenanceMode(true);
    } finally {
      setLoading(false);
    }
  };

  const onPageChange = (event) => {
    setFirst(event.first);
  };

  const openNew = () => {
    router.push('/employees/add');
  };

  const openEdit = (employee) => {
    router.push(`/employees/edit/${employee.id}`);
  };

  const confirmDelete = (employee) => {
    setSelectedEmployee(employee);
    setDeleteDialogVisible(true);
  };

  const hideDeleteDialog = () => {
    setDeleteDialogVisible(false);
    setSelectedEmployee(null);
  };

  const onDeleteSuccess = () => {
    fetchEmployees();
    hideDeleteDialog();
    showNotification('Xóa nhân viên thành công', 'success');
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex gap-2">
        <Button 
          icon={<FontAwesomeIcon icon={faPen} />} 
          rounded 
          outlined 
          severity="info" 
          onClick={() => openEdit(rowData)}
          className="p-2"
        />
        <Button 
          icon={<FontAwesomeIcon icon={faTrash} />} 
          rounded 
          outlined 
          severity="danger"
          onClick={() => confirmDelete(rowData)}
          className="p-2"
        />
      </div>
    );
  };

  const header = (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 p-4">
      <div className="flex flex-wrap items-center gap-4">
        <h5 className={`m-0 text-2xl font-bold tracking-tight ${darkMode ? 'text-green-400' : 'text-blue-700'}`}>
          Danh Sách Nhân Viên
        </h5>
        <Button 
          label="Thêm mới" 
          icon={<FontAwesomeIcon icon={faPlus} className="mr-2" />}
          severity="success" 
          onClick={openNew}
        />
      </div>
      <div className="relative w-full md:w-auto text-gray-900">
        <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <InputText
          value={globalFilter || ''}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Tìm kiếm..."
          className={`w-full md:w-[300px] pl-10 p-2 text-base rounded-lg border ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'} placeholder-gray-500`}
        />
      </div>
    </div>
  );

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <ProgressSpinner strokeWidth="4" animationDuration=".5s" className="w-16 h-16 text-blue-600" />
    </div>
  );

  if (maintenanceMode) return (
    <div className={`flex flex-col justify-center items-center min-h-screen ${darkMode ? 'text-white' : 'text-gray-900'}`}>
      <FontAwesomeIcon icon={faTools} className="text-6xl mb-4 text-yellow-500" />
      <h2 className="text-2xl font-bold mb-2">Hệ thống đang bảo trì</h2>
      <p className="text-lg">Vui lòng quay lại sau. Xin cảm ơn!</p>
    </div>
  );

  const currentEmployees = filteredEmployees.slice(first, first + rows);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
      {notification.show && (
        <div className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 flex items-center gap-2 ${
          notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
        } text-white`}>
          <FontAwesomeIcon icon={notification.type === 'success' ? faExclamationTriangle : faXmark} />
          <span>{notification.message}</span>
        </div>
      )}
      
      <EmployeeDelete
        visible={deleteDialogVisible}
        employee={selectedEmployee}
        onHide={hideDeleteDialog}
        onSuccess={onDeleteSuccess}
      />

      <div className="px-3 py-4 md:px-6 lg:px-8 min-h-[calc(100vh-80px)]">
        <Card className={`shadow-xl rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <DataTable
            value={currentEmployees}
            header={header}
            emptyMessage="Không tìm thấy nhân viên nào"
            className={`rounded-xl overflow-hidden shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
            responsiveLayout="stack"
            breakpoint="960px"
            stripedRows
            showGridlines
            rowHover
          >
            <Column 
              field="id" 
              header="Mã NV" 
              sortable 
              style={{minWidth: '100px'}}
              className={`text-center font-medium text-base p-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}
              headerClassName={`${darkMode ? 'bg-gray-700' : 'bg-blue-600'} text-white font-semibold p-4 text-base`}
            />
            <Column 
              field="fullName" 
              header="Họ và Tên" 
              sortable 
              style={{minWidth: '200px'}}
              className={`font-medium text-base p-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}
              headerClassName={`${darkMode ? 'bg-gray-700' : 'bg-blue-600'} text-white font-semibold p-4 text-base`}
            />
            <Column 
              field="position" 
              header="Chức vụ" 
              sortable 
              style={{minWidth: '120px'}}
              className={`font-medium text-base p-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}
              headerClassName={`${darkMode ? 'bg-gray-700' : 'bg-blue-600'} text-white font-semibold p-4 text-base`}
            />
            <Column
              header="Thao tác"
              body={actionBodyTemplate}
              style={{minWidth: '120px'}}
              headerClassName={`${darkMode ? 'bg-gray-700' : 'bg-blue-600'} text-white font-semibold p-4 text-base`}
            />
          </DataTable>
          <Pagination
            first={first}
            rows={rows}
            totalRecords={filteredEmployees.length}
            onPageChange={onPageChange}
            darkMode={darkMode}
          />
        </Card>
      </div>
    </div>
  );
};

export default ListEmployees;
