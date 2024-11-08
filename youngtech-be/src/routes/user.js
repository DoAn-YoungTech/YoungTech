const express = require("express");
const user = express.Router();
const userController = require("../controllers/userController");
const middlewareController = require("../controllers/middlewareController");

//GET ALL USER

user.get(
  "/getAllUser",
  middlewareController.verifyToken,
  userController.getAllUser
);
// GET USER ID

user.get("/getUserById/:id", userController.getUserById);
// DELETE USER BY ID

user.delete("/deleteUserById/:id", userController.deleteUserById);

user.get(
  "/viewPersonalUser",
  middlewareController.verifyToken,
  userController.profile
);
module.exports = user;
