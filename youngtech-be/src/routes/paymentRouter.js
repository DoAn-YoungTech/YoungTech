const express = require('express');
const {createPayment} = require("../controllers/paymentController")
const paymentRouter = express.Router();
paymentRouter.post('/createPayment' , createPayment)
module.exports = paymentRouter;