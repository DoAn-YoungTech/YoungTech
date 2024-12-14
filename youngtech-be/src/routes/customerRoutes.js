const express = require('express');
const customerController = require('../controllers/customerController');
const customerRoutes = express.Router();
const middlewareController = require('../controllers/middlewareController');
// get all customer
customerRoutes.get(
  '/viewListCustomer',
  middlewareController.verifyToken,
  customerController.getAllCustomers
);

// addInformationByAccount
customerRoutes.put(
  '/updateCustomer',
  middlewareController.verifyToken,
  customerController.addInformationCustomer
);

// edit information
customerRoutes.patch(
  '/editCustomer/:id',
  middlewareController.verifyToken,
  customerController.editCustomer
);

// delete soft
customerRoutes.patch(
  '/softDelete/:id',
  middlewareController.verifyToken,
  middlewareController.verifyTokenAndRole(['admin']),
  customerController.softDelete
);

customerRoutes.get(
  '/getOrderHistoryByCustomerId/:id',
   middlewareController.verifyToken,
   middlewareController.verifyTokenAndRole(['salesperson','admin']),
  customerController.getOrderHistoryHandler
);
customerRoutes.post(
  '/addCustomerOffline',
  middlewareController.verifyToken,
  middlewareController.verifyTokenAndRole(['salesperson']),
  customerController.addCustomerOffline
);
module.exports = customerRoutes;
