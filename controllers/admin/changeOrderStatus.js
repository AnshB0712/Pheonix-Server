const Order = require("../../models/Order")

const changeOrderStatus = async (req,res) => {
    const {id,orderStatus} = req.body
    await Order.findByIdAndUpdate(id,{orderStatus})
    res.status(200).json({
        message: `Order with ID ${id} got it's status changed to ${orderStatus}`,
    })
}

module.exports = changeOrderStatus