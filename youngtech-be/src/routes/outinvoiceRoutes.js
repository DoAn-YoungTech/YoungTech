// outinvoiceRoutes.js
const express = require('express');
const outinvoiceRoutes = express.Router();
const outinvoiceController = require('../controllers/outinvoiceController');

outinvoiceRoutes.get('/', outinvoiceController.getAllOutInvoices);
outinvoiceRoutes.get('/:id', outinvoiceController.getOutInvoiceById);
outinvoiceRoutes.post('/', outinvoiceController.createOutInvoice);
outinvoiceRoutes.delete('/:id', outinvoiceController.deleteOutInvoice);

module.exports = outinvoiceRoutes;