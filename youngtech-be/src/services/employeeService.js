const employeeRepository = require("../repositories/employeeRepository");

const employeeService = {
  getAllEmployee: async () => {
    return await employeeRepository.getAllEmployee();
  },

  createEmployee: async (data) => {
    console.log("1");
    console.log("Data here ", data);

    return await employeeRepository.createEmployee(data);
  },

  // updateEmployee : async (id,data) => {
  //     return await employeeRepository.updateEmployee( id, data);
  // },
  // deleteEmployee : async (id) => {
  //     return await employeeRepository.deleteEmployee(id)
  // },
  // getEmployeeById : async (id , data) => {
  //     return await employeeRepository.getEmployeeById(id , data)
  // }
};

module.exports = employeeService;
