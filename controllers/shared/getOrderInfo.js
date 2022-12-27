const Order = require('../../models/Order')
const BadRequestError = require('../../errors')

const getOrderInfo = async (req,res) => {
    const { orderId } = req.query
    console.log(orderId)
    if(!orderId) throw new BadRequestError()

    const order = await Order.findOne({_id: orderId})

    if(!order) throw new BadRequestError()

    res.status(200).json({
        message:"Order Found Successfully!",
        data: order
    })
}

module.exports = getOrderInfo