const amqplib = require('amqplib');
const Order = require('../models/Order');
const Transaction = require('../models/Transaction');

let channels = {}
const connectToQueue = async () => {
    try {
        const queueName = 'payment-stag';
        const queueConnection = await amqplib.connect('amqps://lwvhzjou:L1_1-46BwKIOR5j5jMsFVsR1cB75JVwl@puffin.rmq2.cloudamqp.com/lwvhzjou');
        paymentQueue(queueConnection,queueName);
    } catch (error) {
        console.log(error)
        throw new Error('Rabbit-MQ Connection Error')
    }
}

const paymentQueue = async (connection,name) => {
    const paymentChannel = await connection.createChannel()
    await paymentChannel.assertQueue(name)
    channels.payment = paymentChannel;

    await paytmConsumer(paymentChannel,name)

}

const paytmConsumer = async (channel,name) => {
    try {
        channel.consume(name,async (data) => {
            let paymentStatus = 'PNDG'
            const response = JSON.parse(data.content.toString())
                
            if(response.status == 'TXN_SUCCESS')
                paymentStatus = "SXS"
            if(response.status == 'TXN_FAILURE')
                paymentStatus = "FLD"

            await Order.findByIdAndUpdate(response.orderId,{paymentStatus,orderStatus: paymentStatus == 'SXS' ? "PNDG" : "FLD"})
            await Transaction.create(response)
            
            channel.ack(data)
            console.log('🚀 Data consumed by the queue.')
        })
    } catch (e) {
        console.log(e)
    }
}
module.exports = {connectToQueue,channels}