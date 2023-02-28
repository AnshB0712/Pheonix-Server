const Order = require('../../models/Order')
const {BadRequestError} = require('../../errors')

const getOrderInfo = async (req,res) => {
    const { orderId } = req.query
    if(!orderId) throw new BadRequestError()

    while(true){
        const order = await Order.findOne({_id: orderId})

        if(!order){ 
            throw new BadRequestError()
            break;
        }

        if(order.paymentStatus !== 'PRCSNG'){
            res.status(200).json({
                message:"Order Found Successfully!",
                data: order
            })
            break;
        }

        await new Promise(resolve => setTimeout(resolve, 2000));

    }
    
}

module.exports = getOrderInfo