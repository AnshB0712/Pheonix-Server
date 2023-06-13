const express = require('express');
const adminLogin = require('../../controllers/auth/adminLogin');
const getAllDishes = require('../../controllers/public/getAllDishes');
const getDishFromId = require('../../controllers/public/getDishFromId');
const renewToken = require('../../controllers/public/renewToken');
const publicRouter = express.Router();

publicRouter
	.get('/', getAllDishes)
	.get('/refresh', renewToken)
	.get('/get-dish-from-id', getDishFromId)
	.post('/admin/login', adminLogin);

module.exports = publicRouter;
