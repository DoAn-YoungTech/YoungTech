
 
 
const express = require('express');
const supplierRoutes = require('./supplierRoutes');
const invoiceRouters = require('./invoiceRouters');
const employeeRouter = require('./employeeRouter');
const customerRoutes = require('./customerRoutes');
const productRoutes = require('./productRoutes');
const imageRoutes = require('./imageRoutes');
const inputInvoiceRoutes = require('./inputInvoiceRoutes');
const outinvoiceRoutes = require('./outinvoiceRoutes');
const orderRoutes = require('./orderRoutes');
const user = require('./user');
const auth = require('./auth');
const admin = require('./admin');
const roles = require('./roles');
const cart = require('./cart')
const router = express.Router();
 
router.use('/suppliers', supplierRoutes);
router.use('/invoices', invoiceRouters);
router.use('/employees', employeeRouter);
router.use('/customers', customerRoutes);
router.use('/auth', auth);
router.use('/user', user);
router.use('/admin', admin);
router.use('/roles', roles);
router.use('/cart', cart)
router.use('/product', productRoutes);
router.use('/images', imageRoutes);
router.use('/inputinvoice', inputInvoiceRoutes);
router.use('/outinvoice', outinvoiceRoutes);
router.use('/order', orderRoutes);
module.exports = router;
 
 
