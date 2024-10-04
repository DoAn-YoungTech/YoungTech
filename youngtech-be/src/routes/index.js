const express = require("express");
const supplierRoutes = require("./supplierRoutes");
const invoiceRouters = require("./invoiceRouters")
const router = express.Router();

router.use("/suppliers", supplierRoutes);
router.use('/invoices' , invoiceRouters)
module.exports = router;
