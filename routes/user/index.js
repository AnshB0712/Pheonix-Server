/* eslint-disable new-cap */
const express = require('express');
const createAOrder = require('../../controllers/user/create-a-order');
const getAllOrders = require('../../controllers/user/get-all-orders');
const userRouter = express.Router();

userRouter
	.post('/create-a-order', createAOrder)
	.get('/get-all-orders', getAllOrders);

module.exports = userRouter;
