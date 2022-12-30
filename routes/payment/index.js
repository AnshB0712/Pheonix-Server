const express = require('express');
const paymentRouter = express.Router()
const paymentController = require('../../controllers/payment/paymentController');
const paymentProcess = require('../../controllers/payment/paymentProcess');
const paymentStatusController = require('../../controllers/payment/paymentStatusController');

paymentRouter
.post('/paytm',paymentController)
.post('/paytm-status',paymentStatusController)
.post('/paytm/process',paymentProcess)

module.exports = paymentRouter