const Order = require("../../models/Order")

const getAllOrders = async (req,res) => {
    const {id} = req.body
    const results = await Order.find({orderBy:id})
    res.status(200).json({
        message: `All the orders created by userID ${id}`,
        data: results,
        length: results.length
    })
}

module.exports = getAllOrders