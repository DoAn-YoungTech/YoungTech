const employeeRepository = require('../repositories/employeeRepository');

const employeeService = {

 
  createEmployee: async (data, userId) => {
    return await employeeRepository.createEmployee(data, userId);
  },
  
  //checkUserExist
  checkUserExist: async (userId) => {
    return await employeeRepository.checkUserExist(userId);
  },

  viewingListEmployee: async () => {
    return await employeeRepository.viewingListEmployee();
  },
  // updateInformationEmployee
  updateInformationEmployee: async (data, accountId) => {
    return await employeeRepository.updateInformationEmployee(data, accountId);
  },
  // viewOnlyEmployee
  viewOnlyEmployee: async (id) => {
    return await employeeRepository.viewOnlyEmployee(id);
  },

  //deleteEmployeeById(id)
  deleteEmployeeById: async (id) => {
    return await employeeRepository.deleteEmployeeById(id);
  },
};

module.exports = employeeService;
