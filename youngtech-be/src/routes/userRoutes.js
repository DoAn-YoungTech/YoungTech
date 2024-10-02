// routes/userRoutes.js
const express = require("express");
const userController = require("../controllers/userController");
const userRoutes = express.Router();

userRoutes.post("", userController.createUser);
userRoutes.get("", userController.getAllUsers);
userRoutes.get("/:id", userController.getUserById);
userRoutes.put("/:id", userController.updateUser);
userRoutes.delete("/:id", userController.deleteUser);

module.exports = userRoutes;
