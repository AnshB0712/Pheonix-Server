const express = require('express');
const {addADish,updateADish,deleteADish} = require('../../controllers/admin/addADish');
const changeOrderStatus = require('../../controllers/admin/changeOrderStatus');
const getAllTodaysOrders = require('../../controllers/admin/getAllTodaysOrders');
const adminRouter = express.Router()

adminRouter
.post('/add-a-dish',addADish)
.patch('/update-a-dish',updateADish)
.delete('/delete-a-dish',deleteADish)
.get('/todays-orders',getAllTodaysOrders)
.patch('/change-order-status',changeOrderStatus)

module.exports = adminRouter

