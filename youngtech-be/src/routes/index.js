const express = require("express");
const supplierRoutes = require("./supplierRoutes");
const invoiceRouters = require("./invoiceRouters");
const employeeRouter = require("./employeeRouter");
const customerRoutes = require("./customerRoutes");
const user = require("./user");
const auth = require("./auth");
const admin = require("./admin");
const router = express.Router();

router.use("/suppliers", supplierRoutes);
router.use("/invoices", invoiceRouters);
router.use("/employees", employeeRouter);
router.use("/customers", customerRoutes);
router.use("/auth", auth);
router.use("/user", user);
router.use("/admin", admin);
module.exports = router;
