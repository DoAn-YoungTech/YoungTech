const express = require("express");
const supplierRoutes = require("./supplierRoutes");
const invoiceRouters = require("./invoiceRouters")
const router = express.Router(); 
const employeeRouter = require('./employeeRouter')
const parentCategoriesRouter = require('./parentCategoriesRouter');
const childCategoriesRouter = require('./childCategoriesRouter');
router.use("/suppliers", supplierRoutes);
router.use('/invoices' , invoiceRouters);

router.use('/employees'  , employeeRouter );
router.use('/parentcategories', parentCategoriesRouter);
router.use('/childcategories', childCategoriesRouter);
module.exports = router;
