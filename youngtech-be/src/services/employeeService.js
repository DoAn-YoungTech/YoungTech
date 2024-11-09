const { restoreEmployee } = require("../controllers/employeeController");
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
    const data = { flag: true };  // Dữ liệu xóa mềm
    return await employeeRepository.deleteEmployee(id,data);
  },
  getEmployeeById: async (id) => {
    return await employeeRepository.getEmployeeById(id);
  },
  restoreEmployee: async (id) =>{
    return await employeeRepository.restoreEmployee(id);
  }
};

module.exports = employeeService;
