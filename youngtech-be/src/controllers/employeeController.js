const employeeService = require("../services/employeeService");

const employeeController = {
  getAllEmployee: async (req, res) => {
    try {
      const result = await employeeService.getAllEmployee();
      res.json({ message: "All employees!", data: result });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Internal Server Error", error: err.message });
    }
  },

  getEmployeeById: async (req, res) => {
    try {
      const id = req.params.id;
      const result = await employeeService.getEmployeeById(id);
      if (!result) {
        res.status(404).json({ message: "Employee by id not found" });
      } else {
        res.status(200).json({ message: "Success", data: result });
      }
    } catch (err) {
      res
        .status(500)
        .json({ message: "Internal Server Error", error: err.message });
    }
  },

  updateEmployee: async (req, res) => {
    try {
      const id = req.params.id;
      const data = req.body;
      const result = await employeeService.updateEmployee(id, data);
      if (!result) {
        res.status(404).json({ message: "Employee not found for update" });
      } else {
        res.status(200).json({ message: "Update successful", data: result });
      }
    } catch (err) {
      res
        .status(500)
        .json({ message: "Internal Server Error", error: err.message });
    }
  },

  createEmployee: async (req, res) => {
    try {
      const data = req.body;
      const result = await employeeService.createEmployee(data);
      if (!result) {
        res.status(400).json({ message: "Create employee failed!" });
      } else {
        res
          .status(201)
          .json({ message: "Employee created successfully!", data: result });
      }
    } catch (err) {
      res
        .status(500)
        .json({ message: "Internal Server Error", error: err.message });
    }
  },

  deleteEmployee: async (req, res) => {
    try {
      const id = req.params.id;
            // Thay vì xóa hoàn toàn, bạn cập nhật trường is_deleted thành true
      const result = await employeeService.deleteEmployee(id); // Gọi service để thực hiện xóa mềm
      if (!result) {
        res.status(404).json({ message: "Employee not found" });
      } else {
        res
          .status(200)
          .json({ message: "Employee marked as deleted successfully!" });
      }
    } catch (err) {
      res
        .status(500)
        .json({ message: "Internal Server Error", error: err.message });
    }
  },
};

module.exports = employeeController;
