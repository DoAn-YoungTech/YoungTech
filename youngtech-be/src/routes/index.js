const express = require("express");
const supplierRoutes = require("./supplierRoutes");
const invoiceRouters = require("./invoiceRouters")
const employeeRouter = require('./employeeRouter')
const customerRoutes = require("./customerRoutes")
const router = express.Router();


router.use("/suppliers", supplierRoutes);
router.use('/invoices' , invoiceRouters);
router.use('/employees'  , employeeRouter);
router.use('/customers'  , customerRoutes)

module.exports = router;
