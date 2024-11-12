const employeeRepository = require("../repositories/employeeRepository");

const employeeService = {
  getAllEmployee: async ({ offset, limit }) => {
    return await employeeRepository.getAllEmployee({ offset, limit });
  },
  createEmployee: async (data) => {
    return await employeeRepository.createEmployee(data);
  },
  updateEmployee: async (id, data) => {
    return await employeeRepository.updateEmployee(id, data);
  },
  deleteEmployee: async (id) => {
    const data = { flag: true };  // Dữ liệu xóa mềm
    return await employeeRepository.deleteEmployee(id, data);
  },
  getEmployeeById: async (id) => {
    return await employeeRepository.getEmployeeById(id);
  },
  restoreEmployee: async (id) => {
    return await employeeRepository.restoreEmployee(id);
  },
  // Thêm hàm checkUserExist để kiểm tra userId
  checkUserExist: async (userId) => {
    return await employeeRepository.checkUserExist(userId);
  }
};

module.exports = employeeService;
