const express = require('express');
const paymentRouter = express.Router()
const paymentController = require('../../controllers/payment/paymentController');
const paymentStatusController = require('../../controllers/payment/paymentStatusController');
const changePaymentStatus = require('../../controllers/payment/changePaymentStatus');

paymentRouter
.post('/paytm',paymentController)
.post('/paytm-status',paymentStatusController)
.patch('/paytm/change-status',changePaymentStatus)

module.exports = paymentRouter