const Order = require("../../models/Order");

const getAllTodaysOrdersViaREST = async (req,res) => {
    const { arrayOfOrderIds } = req.query
    const ids = arrayOfOrderIds.split(',')

    if(!arrayOfOrderIds?.split(',')) return res.json({
        message: 'request done successfully.',
        data: []
    })

    const startOfToday = new Date();
    startOfToday.setHours(0,0,0,0)
    const endOfToday = new Date();
    endOfToday.setHours(23,59,59,59)

    const data = await Order.find({
        createdAt: {
            '$gte': startOfToday,
            '$lt': endOfToday,
        },
        orderStatus: 'PNDG',
        paymentStatus: 'SXS'
    }).sort({createdAt: -1})
    
    const filteredData = data.reduce((acc, order) => {
        if(ids.includes(order._id.toString())) return acc
        else return [...acc, order];
      }, [])

    console.log(filteredData,'filteredData')
    console.log(ids)

    res.json({
        message: 'request done successfully.',
        data: filteredData
    })
}


module.exports = getAllTodaysOrdersViaREST