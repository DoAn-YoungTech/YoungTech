const bcrypt = require("bcrypt");
const authService = require("../services/authService");
const authController = {
  register: async (req, res) => {
    try {
      const { userName, email, password } = req.body;
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
      const result = await authService.register(userName, email, hashPassword);
      if (!result) {
        res.status(404).json({ message: "Not found" });
      } else {
        res.status(201).json({ message: "Register success !" });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      // find userName follow email
      const user = await authService.findUserByEmail(email);
      console.log(user);
      if (!user) {
        res
          .status(404)
          .json({ message: "Email use not exit , Please try again !" });
      }
      // then => compare pass login === pass on database ,use bcrypt
      const comparePass = await bcrypt.compare(password, user.password);
      if (!comparePass) {
        res.status(404).json({ message: "Password wrong!" });
      }
      if (user && comparePass) {
        res.status(200).json({ message: "Login success" });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};

module.exports = authController;
