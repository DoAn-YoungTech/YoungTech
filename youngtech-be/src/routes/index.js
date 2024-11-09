const express = require("express");
const supplierRoutes = require("./supplierRoutes");
const invoiceRouters = require("./invoiceRouters")
const router = express.Router(); 
const employeeRouter = require('./employeeRouter')
const parentCategoriesRoutes = require('./parentCategoriesRoutes');
const childCategoriesRoutes = require('./childCategoriesRoutes');
const ordersRoutes = require('./orderRoutes');
const orderDetailRoutes = require('./orderDetailRoutes');
const cartRoutes = require('./orderRoutes');
const cartItemRoutes = require('./cartItemRoutes');
const customerRoutes = require("./customerRoutes")
const productRoutes = require("./productRoutes");


router.use("/suppliers", supplierRoutes);
router.use('/invoices' , invoiceRouters);
router.use('/employees'  , employeeRouter );
router.use('/parentcategories', parentCategoriesRoutes);
router.use('/childcategories', childCategoriesRoutes);
router.use('/orders', ordersRoutes);
router.use('/orderdetail', orderDetailRoutes);
router.use ('/cart', cartRoutes);
router.use('/cartitem', cartItemRoutes)
router.use('/customers'  , customerRoutes);
router.use('/product', productRoutes);
module.exports = router;
