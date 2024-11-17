// src/redux/employeeThunks.ts

import { Dispatch } from 'redux';
import { setEmployees, setLoading, setError, addEmployee, removeEmployee, updateEmployee } from './employeeSlice';
import { Employee } from '@/types/EmployeeType';

// Thunk for fetching employees from the API
export const fetchEmployees = () => async (dispatch: Dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await fetch('http://localhost:4000/employees');
    
    // Check if the response status is OK (2xx)
    if (!response.ok) {
      throw new Error('Failed to fetch employees');
    }

    const employees: Employee[] = await response.json();
    dispatch(setEmployees(employees));
  } catch (error: any) {
    dispatch(setError(error.message || 'Failed to fetch employees'));
  } finally {
    dispatch(setLoading(false));
  }
};

// Thunk for adding an employee (POST request)
export const createEmployee = (employee: Employee) => async (dispatch: Dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await fetch('http://localhost:4000/employees', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(employee),
    });

    if (!response.ok) {
      throw new Error('Failed to add employee');
    }

    const newEmployee = await response.json();
    dispatch(addEmployee(newEmployee)); // Add the employee to Redux store
  } catch (error: any) {
    dispatch(setError(error.message || 'Failed to add employee'));
  } finally {
    dispatch(setLoading(false));
  }
};

// Thunk for removing an employee (DELETE request)
export const deleteEmployee = (employeeId: number) => async (dispatch: Dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await fetch(`http://localhost:4000/employees/${employeeId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete employee');
    }

    dispatch(removeEmployee(employeeId)); // Remove the employee from Redux store
  } catch (error: any) {
    dispatch(setError(error.message || 'Failed to delete employee'));
  } finally {
    dispatch(setLoading(false));
  }
};

// Thunk for updating an employee (PUT request)
export const editEmployee = (employee: Employee) => async (dispatch: Dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await fetch(`http://localhost:4000/employees/${employee.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(employee),
    });

    if (!response.ok) {
      throw new Error('Failed to update employee');
    }

    const updatedEmployee = await response.json();
    dispatch(updateEmployee(updatedEmployee)); // Update the employee in Redux store
  } catch (error: any) {
    dispatch(setError(error.message || 'Failed to update employee'));
  } finally {
    dispatch(setLoading(false));
  }
};
