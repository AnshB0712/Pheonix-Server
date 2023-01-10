const express = require('express');
const adminRouter = express.Router()

const {addADish,updateADish,deleteADish} = require('../../controllers/admin/addADish');
const changeInStockStatus = require('../../controllers/admin/changeInStockStatus');
const changeOrderStatus = require('../../controllers/admin/changeOrderStatus');
const getCatalogue = require('../../controllers/admin/getCatalogue');
const getDishDetails = require('../../controllers/admin/getDishDetails');
const getOrderViaMobile = require('../../controllers/admin/getOrderViaMobile');

adminRouter
.post('/add-a-dish',addADish)
.patch('/update-a-dish',updateADish)
.delete('/delete-a-dish',deleteADish)
.get('/get-catalogue',getCatalogue)
.patch('/change-order-status',changeOrderStatus)
.patch('/change-instock-status',changeInStockStatus)
.get('/get-dish-details',getDishDetails)
.get('/get-order',getOrderViaMobile)

module.exports = adminRouter

