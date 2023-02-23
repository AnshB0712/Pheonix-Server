const { channels, ordersQName } = require("../../config/connectToQueue")
const Order = require("../../models/Order")

const getAllTodaysOrdersViaSocket = (socket) => {
    channels.ordersChannel.consume(ordersQName,(data) => {
        try {
            if(!data) return;
            const order = JSON.parse(data.content.toString())
            console.log(order)
            socket.emit('new-order',order)
        } catch (error) {
            console.log(error)
        }
    })
}

module.exports = getAllTodaysOrdersViaSocket


    // Order.watch([],{ fullDocument: "updateLookup" }).on('change',(data) => {
    //     const {operationType} = data
    //     if(
    //         operationType === 'update' && 
    //         data?.fullDocument?.orderStatus==='PNDG' && 
    //         data?.updateDescription?.updatedFields?.paymentStatus === 'SXS'
    //     ) {
    //     console.log(data.fullDocument)
    //     socket.emit('new-order',data.fullDocument)
    //     }
    // });