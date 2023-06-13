const express = require('express');
const getOrderInfo = require('../../controllers/shared/getOrderInfo');
const logout = require('../../controllers/shared/logout');
const sharedRouter = express.Router();

sharedRouter
	.get('/order', getOrderInfo)
	.get('/logout', logout);

module.exports = sharedRouter;
