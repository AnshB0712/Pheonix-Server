const Order = require("../../models/Order")

const getAllTodaysOrdersViaSocket = (socket) => {
    Order.watch([],{ fullDocument: "updateLookup" }).on('change',(data) => {
        const {operationType} = data
        if(
            operationType === 'update' && 
            data?.fullDocument?.orderStatus==='PNDG' && 
            data?.updateDescription?.updatedFields?.paymentStatus === 'SXS'
        ) {
        console.log(data.fullDocument)
        socket.emit('new-order',data.fullDocument)
        }
    });
}

module.exports = getAllTodaysOrdersViaSocket