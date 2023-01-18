const Order = require('./models/Order')
const deleteAllOrdersCreatedByUser = async () => {

    const orders = await Order.find({orderByMobile: '8160743926'})

    orders.forEach(async (order) => {
        await order.delete()
    });
} 

module.exports = { deleteAllOrdersCreatedByUser }