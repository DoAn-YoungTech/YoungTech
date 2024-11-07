const roleService = require("../services/roleService");
const rolesControllers = {
  createRole: async (req, res) => {
    try {
      const role = req.body;
      const { roleName } = req.body;

      const checkRole = await roleService.getAllRole();

      const check = checkRole.some((roles) => roles.roleName === roleName);

      if (check) {
        return res.json({
          message: "role name exist ! please create another name"
        });
      } else {
        const result = await roleService.createRole(role);
        if (result) {
          res.status(200).json({ message: "Create role success" });
        } else {
          res
            .status(404)
            .json({ message: `Can not create permission in role` });
        }
      }
    } catch (err) {
      res.status(200).json({ message: err.message });
    }
  },

  
  getAllRole: async (req, res) => {
    try {
      const result = await roleService.getAllRole();
      if (!result) {
        res.status(404).json({ message: "Can not get all role !" });
      } else {
        res.status(200).json({ result: result });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};
module.exports = rolesControllers;
