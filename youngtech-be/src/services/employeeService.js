const employeeRepository = require("../repositories/employeeRepository");

const employeeService = {
  getAllEmployee: async () => {
    return await employeeRepository.getAllEmployee();
  },
  createEmployee: async (data) => {
    return await employeeRepository.createEmployee(data);
  },
  updateEmployee: async (id, data) => {
    return await employeeRepository.updateEmployee(id, data);
  },
  deleteEmployee: async (id) => {
    const data = { is_deleted: true };  // Dữ liệu xóa mềm
    return await employeeRepository.updateEmployee(id,data);
  },
  getEmployeeById: async (id) => {
    return await employeeRepository.getEmployeeById(id);
  },
};

module.exports = employeeService;
