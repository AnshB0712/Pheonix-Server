const { BadRequestError } = require('../../errors')
const Order = require('../../models/Order')


let start = new Date();
start.setHours(0,0,0,0);

let end = new Date();
end.setHours(23,59,59,999);

const getOrderViaMobile = async (req,res) => {
    const { mobile } = req.query

    if(!mobile)
        throw new BadRequestError('mobile number is required to get its orders.')
    
    const data = await Order.find({
        orderByMobile: mobile,
        orderStatus: 'PNDG',
        paymentStatus:'SXS',
        createdAt:{
            '$gte': start,
            '$lte': end
        },
        updatedAt:{
            
            '$gte': start,
            '$lte': end
        }
    })

    res.json({
        data,
        message: 'request done successfully.'
    })
}

module.exports = getOrderViaMobile