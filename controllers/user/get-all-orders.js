const Order = require("../../models/Order")

const getAllOrders = async (req,res) => {
    const {userId} = req.query
    const results = await Order.find({orderBy:userId})
    res.status(200).json({
        message: `All the orders created by userID ${userId}`,
        data: results,
        length: results.length
    })
}

module.exports = getAllOrders