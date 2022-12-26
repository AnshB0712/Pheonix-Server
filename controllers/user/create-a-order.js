const Order = require("../../models/Order")

const createAOrder = async (req,res) => {
   await Order.create({...req.body})
   return res.status(202).json({
    message:"Order Created Successfully!"
   })
}

module.exports = createAOrder