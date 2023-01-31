const { channels } = require("../config/connectToQueue")

const publishToQueue = async (data) => {
    try {
        console.log(data)
        await channels.payment.sendToQueue('payment-stag',Buffer.from(JSON.stringify(data)))
    } catch (error) {
        console.log(error)
        throw new Error('--- Q-Publisher Error ---')
    }
}

module.exports = publishToQueue
