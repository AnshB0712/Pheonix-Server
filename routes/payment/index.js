const express = require('express');
const paymentRouter = express.Router()
const paymentController = require('../../controllers/payment/paymentController');
const paymentProcess = require('../../controllers/payment/paymentProcess');
const paymentStatusController = require('../../controllers/payment/paymentStatusController');
const changePaymentStatus = require('../../controllers/payment/changePaymentStatus');

paymentRouter
.post('/paytm',paymentController)
.post('/paytm/process',paymentProcess)
.post('/paytm-status',paymentStatusController)
.patch('/paytm/change-status',changePaymentStatus)

module.exports = paymentRouter