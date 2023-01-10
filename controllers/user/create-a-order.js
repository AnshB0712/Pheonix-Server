const Order = require("../../models/Order")

const createAOrder = async (req,res) => {
   const { _id,amount } = await Order.create({...req.body})
   return res.status(202).json({
    message:"Order Created Successfully!",
    objectId: _id.toString(),
    amount
   })
}

module.exports = createAOrder