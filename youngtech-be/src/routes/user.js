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
// DELETE USER BY ID
user.delete(
  "/deleteUserById/:id",
  middlewareController.verifyTokenAndAdminAuth,
  userController.deleteUserById
);
module.exports = user;
