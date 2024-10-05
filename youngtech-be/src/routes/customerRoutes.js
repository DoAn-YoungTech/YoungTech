const express = require("express");
const customerController = require("../controllers/customerController");
const customerRoutes = express.Router();

customerRoutes.get("/", customerController.getAllCustomers);

module.exports = customerRoutes;
