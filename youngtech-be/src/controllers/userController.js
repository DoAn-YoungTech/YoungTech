const userService = require("../services/userService");
const userController = {
  // GET ALL USER
  getAllUser: async (req, res) => {
    try {
      const result = await userService.getAllUser();
      if (!result) {
        res
          .status(404)
          .json({ message: "Cant not found all user , Please check again !" });
      } else {
        const { password, ...other } = result;
        res.status(200).json({ ...other });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  // GET USER BY ID
  getUserById: async (req, res) => {
    try {
      const id = req.params.id;
      const result = await userService.getUserById(id);
      if (!result) {
        res.status(404).json({ message: "user not found !" });
      } else {
        res.status(200).json({ result: result });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  // DELETE USER BY ID
  deleteUserById: async (req, res) => {
    try {
      const id = req.params.id;
      const result = await userService.deleteUserById(id);
      if (!result) {
        res.status(404).json({ message: `Can't found user by ${id}` });
      } else {
        res.status(200).json({ message: "Remove user Success " });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }, 
  // viewing personal information
  profile: async (req, res) => {
    // get id user login
    const userId = req.user.id;
    // then show profile personal user
    const viewInformationPersonal = await userService.viewInformationPersonal(
      userId
    );

    res.json({ message: `Information personal ${userId}` });
  }
};
module.exports = userController;
