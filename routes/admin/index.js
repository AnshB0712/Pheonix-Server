const express = require('express');
const adminRouter = express.Router()

const {addADish,updateADish,deleteADish} = require('../../controllers/admin/addADish');
const changeInStockStatus = require('../../controllers/admin/changeInStockStatus');
const changeOrderStatus = require('../../controllers/admin/changeOrderStatus');
const getAllTodaysOrdersViaREST = require('../../controllers/admin/getAllTodaysOrdersViaREST');
const getCatalogue = require('../../controllers/admin/getCatalogue');
const getCompletedOrders = require('../../controllers/admin/getCompletedOrders');
const getDishDetails = require('../../controllers/admin/getDishDetails');
const getOrderViaMobile = require('../../controllers/admin/getOrderViaMobile');
const getTransactionDetails = require('../../controllers/admin/getTransactionDetails');
const getUserDetails = require('../../controllers/admin/getUserDetails');
const getAllSxsTxnOrder = require('../../controllers/admin/getAllSxsTxnOrder');

adminRouter
.post('/add-a-dish',addADish)
.patch('/update-a-dish',updateADish)
.delete('/delete-a-dish',deleteADish)
.get('/get-catalogue',getCatalogue)
.patch('/change-order-status',changeOrderStatus)
.patch('/change-instock-status',changeInStockStatus)
.get('/get-dish-details',getDishDetails)
.get('/get-order',getOrderViaMobile)
.get('/get-all-today-orders',getAllTodaysOrdersViaREST)
.get('/get-completed-orders/:orderType',getCompletedOrders)
.get('/transaction/:orderId',getTransactionDetails)
.get('/user/:userId',getUserDetails)
.get('/sxs-txn-orders',getAllSxsTxnOrder)

module.exports = adminRouter

