const Order = require("../../models/Order")

const getAllTodaysOrdersViaSocket = async (socket) => {
    try {
        const changeStream = Order.watch([], { fullDocument: 'updateLookup' })
        changeStream.on('change',(data) => {
            if(data.operationType === 'update' && data?.updateDescription?.updatedFields?.paymentStatus === 'SXS'){
                socket.emit('new-order',data.fullDocument)
            }
        })
    } catch (error) {
        console.log(error)
        changeStream.close()
    }
}

module.exports = {getAllTodaysOrdersViaSocket}

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