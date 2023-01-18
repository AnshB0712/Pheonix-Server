const express = require('express');
const paymentRouter = express.Router()
const paymentController = require('../../controllers/payment/paymentController');
const changePaymentStatus = require('../../controllers/payment/changePaymentStatus');

paymentRouter
.post('/paytm',paymentController)
.patch('/paytm/change-status',changePaymentStatus)

module.exports = paymentRouter