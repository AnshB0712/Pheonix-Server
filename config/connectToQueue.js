const amqplib = require('amqplib');
const Order = require('../models/Order');
const Transaction = require('../models/Transaction');
const { RABBITMQ_URL } = require('../variables');

let channels = {}
const exchangeName = 'pheonix'
const paymentQName = 'payment-stag';
const ordersQName = 'order-stag';


const connectToQueue = async () => {
    try {
        const queueConnection = await amqplib.connect(RABBITMQ_URL);

        channels.paymentsChannel = await queueConnection.createChannel();
        channels.ordersChannel = await queueConnection.createChannel();

        await paymentsQueue(paymentQName);
        await ordersQueue(ordersQName);
    } catch (error) {
        console.log(error)
        throw new Error('Rabbit-MQ Connection Error')
    }
}

const paymentsQueue = async (name) => {
    
    try {
    
        await channels.paymentsChannel.assertExchange(exchangeName,'headers')
        await channels.paymentsChannel.assertQueue(name)
        channels.paymentsChannel.bindQueue(name,exchangeName,'',{'type':'payment','x-match':'all'})
        await paymentsConsumer(name)
    } catch (e) {
        console.log(e)
    }

}
const ordersQueue = async (name) => {
    try {
        await channels.paymentsChannel.assertExchange(exchangeName,'headers')
        await channels.paymentsChannel.assertQueue(name)
        channels.ordersChannel.bindQueue(name,exchangeName,'',{'type':'order','x-match':'all'})
    } catch (e) {
        console.log(e)
    }

}

const paymentsConsumer = async (name) => {
    try {
        channels.paymentsChannel.consume(name,async (data) => {

            if(!data) return;

            let paymentStatus = 'PNDG'
            const response = JSON.parse(data.content.toString())
                
            if(response.status == 'TXN_SUCCESS')
                paymentStatus = "SXS"
            if(response.status == 'TXN_FAILURE')
                paymentStatus = "FLD"

            await Order.findByIdAndUpdate(response.orderId,{paymentStatus,orderStatus: paymentStatus == 'SXS' ? "PNDG" : "FLD"})
            await Transaction.create(response)

            const order = await Order.findById(response.orderId);

            console.log(order)

            channels.ordersChannel.publish(exchangeName,'',Buffer.from(JSON.stringify(order)),{
                headers: {type:'order'},
                persistent: true,
                messageId: response.orderId
            })
            console.log('🚀 Order send to the queue.')
            
            channels.paymentsChannel.ack(data)
            console.log('🚀 Data consumed by the queue.')
        })
    } catch (error) {
        console.log(error)
    }
}




module.exports = {connectToQueue,channels,exchangeName,ordersQName,orderConsumer}