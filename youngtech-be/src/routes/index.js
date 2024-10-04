const express = require("express");
const supplierRoutes = require("./supplierRoutes");
const invoiceRouters = require("./invoiceRouters")
const router = express.Router(); 
const employeeRouter = require('./employeeRouter')
router.use("/suppliers", supplierRoutes);
router.use('/invoices' , invoiceRouters);

router.use('/employees'  , employeeRouter )

module.exports = router;
