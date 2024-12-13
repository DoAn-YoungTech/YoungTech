import axios from 'axios';

const Api_url = process.env.NEXT_PUBLIC_API_URL;
// add employees
export const createEmployee = async (employeeData: any) => {
  const response = await fetch(`${Api_url}/employees/createEmployee`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(employeeData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Lỗi khi thêm nhân viên.");
  }
};
// fetch all employees
export const getEmployees = async () => {
    try {
        const response = await axios.get(`${Api_url}/employees/viewingListEmployee`);
        console.log('Employees retrieved:', response.data); // Log dữ liệu trả về từ API
        return response.data;
    } catch (error) {
        console.error('Error retrieving employees:', error.response?.data || error.message);
        throw error;
    }
};

// delete employee
export const deleteEmployee = async (accountId: any) => {
    try {
        const response = await axios.delete(`${Api_url}/employees/deleteEmployeeById/${accountId}`);
        console.log('Employee deleted:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error deleting employee:', error.response?.data || error.message);
        throw error;
    }
};