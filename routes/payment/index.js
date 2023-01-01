const express = require('express');
const paymentRouter = express.Router()
const paymentController = require('../../controllers/payment/paymentController');
const paymentProcess = require('../../controllers/payment/paymentProcess');

paymentRouter
.post('/paytm',paymentController)
.post('/paytm/process',paymentProcess)

module.exports = paymentRouter