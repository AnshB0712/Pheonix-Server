const { channels, ordersQName } = require("../../config/connectToQueue")

let orderConsumer;

const getAllTodaysOrdersViaSocket = async (socket) => {
  orderConsumer = await channels.ordersChannel.consume(ordersQName,(data) => {
        try {
            const order = JSON.parse(data.content.toString())
            const deliveryTag = data.fields.deliveryTag;
            socket.emit('new-order',{...order,deliveryTag})
        } catch (error) {
            console.log(error)
        }
    })
console.log(orderConsumer,'orderConsumer')
}

module.exports = {getAllTodaysOrdersViaSocket,orderConsumer}

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