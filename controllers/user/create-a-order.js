const Order = require("../../models/Order")

const createAOrder = async (req,res) => {
   const { userId,mobile } = req.user
   const { _id,amount } = await Order.create({...req.body,orderBy:userId,orderByMobile:mobile})
   return res.status(202).json({
    message:"Order Created Successfully!",
    // HERE _id IS A ORDER-ID
    objectId: _id.toString(),
    amount
   })
}

module.exports = createAOrder