const { format } = require("date-fns")
const Order = require("../../models/Order")

const getAllTodaysOrders = async (req,res) => {
    const {orderStatus="PNDG",orderType='7'} = req.query

    let startDate = new Date();
    startDate.setSeconds(0);
    startDate.setHours(0);
    startDate.setMinutes(0);
    let dateMidnight = new Date(startDate);
    dateMidnight.setHours(23);
    dateMidnight.setMinutes(59);
    dateMidnight.setSeconds(59);
      
    const q = {
        createdAt:{
            $gt:startDate,
            $lt:dateMidnight
        },
        orderStatus,
        orderType
    }

    const results = await Order.find(q)

    res.json({
        data: results,
        length: results.length
    })
}

module.exports = getAllTodaysOrders