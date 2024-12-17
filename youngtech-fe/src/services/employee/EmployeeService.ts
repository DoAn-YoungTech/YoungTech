import axios from 'axios';
import { getAuthHeaders } from '@/utils/session';

const Api_url = process.env.NEXT_PUBLIC_API_URL;

export const createEmployee = async (employeeData: any) => {
const headers = await getAuthHeaders();  try {
    const response = await axios.post(`${Api_url}/employees/createEmployee`, employeeData, {
      headers
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Lỗi khi thêm nhân viên.");
  }
};

export const getEmployees = async () => {
const headers = await getAuthHeaders();  try {
    const response = await axios.get(`${Api_url}/employees/viewingListEmployee`, {
      headers
    });
    return response.data;
  } catch (error: any) {
    console.error('Error retrieving employees:', error.response?.data || error.message);
    throw error;
  }
};

export const getEmployeeById = async (accountID: string) => {
const headers = await getAuthHeaders();  try {
    const response = await axios.get(`${Api_url}/employees/viewOnlyEmployee/${accountID}`, {
      headers
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Không thể lấy thông tin nhân viên.');
  }
};

export const updateEmployee = async (id: string, data: any) => {
const headers = await getAuthHeaders();  try {
    const response = await axios.put(`${Api_url}/employees/updateInformationEmployee/${id}`, data, {
      headers
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Lỗi khi cập nhật thông tin nhân viên.');
  }
};

export const deleteEmployee = async (accountId: any) => {
const headers = await getAuthHeaders();  try {
    const response = await axios.delete(`${Api_url}/employees/deleteEmployeeById/${accountId}`, {
      headers
    });
    return response.data;
  } catch (error: any) {
    throw error;
  }
};
