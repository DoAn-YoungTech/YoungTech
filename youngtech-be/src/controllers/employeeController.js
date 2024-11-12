const authService = require('../services/authService');
const employeeService = require('../services/employeeService');
const authController = require('./authControllers');
const employeeController = {
 
  // delete employee by id
  deleteEmployeeById: async (req, res) => {
    try {
      const id = req.params.id;
      if (!id) {
        return res.status(404).json({ message: 'User employee not fount' });
      }
      const result = await employeeService.deleteEmployeeById(id);
      console.log(result);
      if (!result) {
        return res.status(403).json({ message: 'Can not Delete !' });
      }
      res.status(200).json({ message: '  delete success!' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  //only admin can viewing list employee
  viewingListEmployee: async (req, res) => {
    try {
      const result = await employeeService.viewingListEmployee();
      if (!result) {
        return res.status(404).json({ message: 'Can not found' });
      }
      res.status(200).json({ message: result });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  // view a employee by id
  viewOnlyEmployee: async (req, res) => {
    try {
      const id = req.params.id;
      if (!id) {
        return res.status(404).json({ message: 'user employee not fount' });
      }

      const result = await employeeService.viewOnlyEmployee(id);
      if (!result) {
        return res.status(404).json({ message: 'can not found employee!' });
      }
      res.status(200).json({ message: result });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  //only admin can create Employee
  createEmployee: async (req, res) => {
    try {
      //get user id
      const userId = req.user.id;
      const data = req.body;
      // check data exist in body
      if (
        (data.fullName == '' || data.profilePicture == '',
        data.dateOfBirth == '',
        data.phoneNumber == '',
        data.position == '')
      ) {
        return res
          .status(404)
          .json({ message: 'Value is empty !Please check again .' });
      }
      // check user id exist  in table employee if not exist => create
      const checkUserExist = await employeeService.checkUserExist(userId);
      console.log(`checkUserExist ${checkUserExist}`);

      if (!checkUserExist) {
        return res.status(404).json({ message: 'Employee exist !' });
      }

      console.log(data);

      const result = await employeeService.createEmployee(data, userId);

      console.log(`Insert into employee`, result);
      if (!result) {
        return res.status(404).json({ message: 'Insert employee fail !' });
      }

      res.status(200).json({ message: 'create employee success' });
    } catch (err) {
      res.status(500).json({ message: `err ${err}` });
    }
  },
  //update information employee
  updateInformationEmployee: async (req, res) => {
    try {
      // update account id
      const accountId = req.params.accountId;
      const data = req.body;
      console.log(`data`, data);
      console.log(`account_id `, accountId);
      if (
        (data.fullName == '' || data.profilePicture == '',
        data.dateOfBirth == '',
        data.phoneNumber == '',
        data.position == '')
      )
        if (!accountId) {
          return res.status(404).json({ message: 'Account id is not found !' });
        }

      const updateInformationEmployee =
        await employeeService.updateInformationEmployee(data, accountId);
      if (!updateInformationEmployee) {
        return res.status(403).json({ message: 'Update employee fail !' });
      }

      res.status(200).json({ message: 'update employee success !' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};

module.exports = employeeController;
