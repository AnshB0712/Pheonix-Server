const express = require('express');
const getOrderInfo = require('../../controllers/shared/getOrderInfo');
const sharedRouter = express.Router()

sharedRouter.get('/order',getOrderInfo)

module.exports = sharedRouter