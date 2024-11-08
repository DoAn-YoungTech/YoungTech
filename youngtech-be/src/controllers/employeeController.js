const employeeService = require("../services/employeeService");
const employeeController = {
  getAllEmployee: async (req, res) => {
    try {
      const result = await employeeService.getAllEmployee();
      if (!result) {
        res.status(404).json({ message: `Can not get all employee` });
      } else {
        res.status(201).json({ message: "Get all employee success!" });
      }
    } catch (err) {
      res.status(500).json({ message: `error server ${err.message}` });
    }
  },
  updateEmployee: async (req, res) => {
    try {
      const id = req.params.id;
      const data = req.body;
      const result = await employeeService.updateEmployee(id, data);
      if (!result) {
        res
          .status(404)
          .json({ message: `Can't update employee ! Please Check again.` });
      } else {
        res.status(201).json({ message: "Update employee successfully !" });
      }
    } catch (err) {
      res.status(500).json({ message: `Error server : ${err.message}` });
    }
  },
  deleteEmployee: async (req, res) => {
    try {
      const id = req.params.id;
      const result = await employeeService.deleteEmployee(id);
      if (!result) {
        res.status(404).json({ message: ` Can't Delete employee by id ${id}` });
      } else {
        res
          .status(201)
          .json({ message: `Delete employee by id ${id} success !` });
      }
    } catch (err) {
      res.status(500).json({ message: `err ${err.message}` });
    }
  },
  getEmployeeById: async (req, res) => {
    try {
      const id = req.params.id;
      const result = await employeeService.getEmployeeById(id);
      if (!result) {
        res.status(404).json({
          message: `Can't get employee id  ${id} ! Please check again ...`
        });
      } else {
        res.status(200).json({ message: `Get employee id  ${id} Success` });
      }
    } catch (err) {
      res.status(500).json({ message: `err ${err.message}` });
    }
  },
  createEmployee: async (req, res) => {
    try {
      const data = req.body;
      console.log(data);
      const result = await employeeService.createEmployee(data);
      if (!result) {
        res.status(404).json({ message: "Can not create employee" });
      } else {
        res.status(200).json({ message: "create employee success" });
      }
    } catch (err) {
      res.status(500).json({ message: `err ${err}` });
    }
  }
};

module.exports = employeeController;
