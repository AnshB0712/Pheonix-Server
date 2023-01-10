const Order = require("../../models/Order")

const paymentStatusController = async (req,res) => {
    let paymentStatus = 'PNDG'
    const response = req.body
    
    if(response.STATUS == 'TXN_SUCCESS')
        paymentStatus = "SXS"
    if(response.STATUS == 'TXN_FAILURE')
        paymentStatus = "FLD"

    await Order.findByIdAndUpdate(response.ORDERID,{paymentStatus,orderStatus: paymentStatus == 'SXS' ? "PNDG" : "FLD"})

    res.redirect(301,'http://localhost:5173/order/'+response.ORDERID)
}

module.exports = paymentStatusController