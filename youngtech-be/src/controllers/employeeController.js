const employeeService = require("../services/employeeService");

const employeeController = {
  getAllEmployee: async (req, res) => {
    try {
      // Lấy tham số phân trang từ query (mặc định là page 1 và limit 10)
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 2;
  
      // Tính toán offset dựa trên page và limit
      const offset = (page - 1) * limit;
  
      // Gọi service để lấy danh sách nhân viên với phân trang
      const result = await employeeService.getAllEmployee({ offset, limit });
  
      if (!result || result.data.length === 0) {
        return res.status(404).json({ message: "No employees found" });
      }
  
      // Trả về kết quả phân trang
      res.json({
        message: "All employees",
        data: result.data,
        pagination: {
          page,
          limit,
          totalItems: result.totalItems,
          totalPages: Math.ceil(result.totalItems / limit),
        },
      });
    } catch (err) {
      res.status(500).json({ message: "Internal Server Error", error: err.message });
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
  
      // Kiểm tra các giá trị trong body
      if (
        !data.fullName || !data.profilePicture || !data.dateOfBirth ||
        !data.phoneNumber || !data.position || !data.account_id
      ) {
        return res.status(400).json({ message: "Value is empty! Please check again." });
      }
  
      // Kiểm tra xem account_id đã tồn tại trong bảng employee chưa
      const checkUserExist = await employeeService.checkUserExist(data.account_id);
      if (checkUserExist) {
        return res.status(400).json({ message: "Employee with this account ID already exists!" });
      }
  
      // Tạo nhân viên mới nếu account_id chưa tồn tại
      const result = await employeeService.createEmployee(data);
      if (!result) {
        res.status(400).json({ message: "Create employee failed!" });
      } else {
        res.status(201).json({ message: "Employee created successfully!", data: result });
      }
    } catch (err) {
      res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
  },
  
  deleteEmployee: async (req, res) => {
    try {
      const id = req.params.id;
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
  restoreEmployee: async (req, res) => {
    try {
        const id = req.params.id;

        // Gọi service để khôi phục lại
        const result = await employeeService.restoreEmployee(id);

        if (!result) {
            res.status(404).json({ message: "Employee not found or already restored" });
        } else {
            res.status(200).json({ message: "Employee restored successfully!" });
        }
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
}

};

module.exports = employeeController;
