const {channels, exchangeName} = require('../config/connectToQueue');

const publishToPaymentsQueue = async data => {
	try {
		console.log(data);
		await channels.paymentsChannel.publish(exchangeName, '', Buffer.from(JSON.stringify(data)), {
			headers: {
				type: 'payment',
			},
		});
	} catch (error) {
		console.log(error);
		throw new Error('--- Q-Publisher Error ---');
	}
};

const publishToPendingPaymentsQueue = async data => {
	try {
		console.log(data);
		await channels.pendingPaymentsChannel.publish(exchangeName, '', Buffer.from(JSON.stringify(data)), {
			headers: {
				type: 'pending-payment',
			},
		});
	} catch (error) {
		console.log(error);
		throw new Error('--- Q-Publisher Error ---');
	}
};

module.exports = {publishToPaymentsQueue, publishToPendingPaymentsQueue};
