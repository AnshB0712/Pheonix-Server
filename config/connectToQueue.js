/* eslint-disable no-negated-condition */
/* eslint-disable camelcase */
/* eslint-disable eqeqeq */
const amqplib = require('amqplib');
const Order = require('../models/Order');
const Transaction = require('../models/Transaction');
const {RABBITMQ_URL, PAYTM_M_ID, PAYTM_M_KEY} = require('../variables');
const https = require('https');
const PaytmChecksum = require('../controllers/payment/PaytmChecksum');

const channels = {};
const exchangeName = 'pheonix';
const paymentQName = 'payment-stag';
const pendingPaymentsQName = 'pending-payment-stag';
const ordersQName = 'order-stag';

const connectToQueue = async () => {
	try {
		const queueConnection = await amqplib.connect(RABBITMQ_URL);

		channels.paymentsChannel = await queueConnection.createChannel();
		channels.ordersChannel = await queueConnection.createChannel();
		channels.pendingPaymentsChannel = await queueConnection.createChannel();

		await paymentsQueue(paymentQName);
		await pendingPaymentsQueue(pendingPaymentsQName);
	} catch (error) {
		console.log(error);
		throw new Error('Rabbit-MQ Connection Error');
	}
};

const paymentsQueue = async name => {
	try {
		await channels.paymentsChannel.assertExchange(exchangeName, 'headers');
		await channels.paymentsChannel.assertQueue(name);
		channels.paymentsChannel.bindQueue(name, exchangeName, '', {type: 'payment', 'x-match': 'all'});
		await paymentsConsumer(name);
	} catch (e) {
		console.log(e);
	}
};

const pendingPaymentsQueue = async name => {
	try {
		await channels.pendingPaymentsChannel.assertExchange(exchangeName, 'headers');
		await channels.pendingPaymentsChannel.assertQueue(name);
		channels.pendingPaymentsChannel.bindQueue(name, exchangeName, '', {type: 'pending-payment', 'x-match': 'all'});
		await pendingPaymentsConsumer(name);
	} catch (e) {
		console.log(e);
	}
};

const paymentsConsumer = async name => {
	try {
		channels.paymentsChannel.consume(name, async data => {
			if (!data) {
				return;
			}

			let paymentStatus = 'PRCSNG';
			let orderStatus = 'PNDG';
			let orderFailReason = '';
			const response = JSON.parse(data.content.toString());

			if (response.status == 'TXN_SUCCESS') {
				paymentStatus = 'SXS';
				orderStatus = 'PNDG';
			}

			if (response.status == 'TXN_FAILURE') {
				paymentStatus = 'FLD';
				orderStatus = 'FLD';
				orderFailReason = response.responseMessage;
			}

			if (response.status == 'PENDING') {
				paymentStatus = 'PNDG';
				orderStatus = 'PNDG';
			}

			await Order.findByIdAndUpdate(response.orderId, {paymentStatus, orderStatus, orderFailReason});

			channels.paymentsChannel.ack(data);
			console.log('🚀 Payment consumed by the Payment-Q.');
		});
	} catch (error) {
		console.log(error);
	}
};

const pendingPaymentsConsumer = async name => {
	try {
		channels.pendingPaymentsChannel.consume(name, async data => {
			if (!data) {
				return;
			}

			const response = JSON.parse(data.content.toString());

			console.log(response, 'pending-payment-Q');

			/* Initialize an object */
			const paytmParams = {};

			/* Body parameters */
			paytmParams.body = {

				/* Find your MID in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys */
				mid: PAYTM_M_ID,

				/* Enter your order id which needs to be check status for */
				orderId: response.orderId,
			};

			/**
            * Generate checksum by parameters we have in body
            * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys
            */
			const checksum = await PaytmChecksum.generateSignature(JSON.stringify(paytmParams.body), PAYTM_M_KEY);

			/* Head parameters */
			paytmParams.head = {

				/* Put generated checksum value here */
				signature: checksum,
			};

			/* Prepare JSON string for request */
			const post_data = JSON.stringify(paytmParams);

			const options = {

				/* For Staging */
				hostname: 'securegw-stage.paytm.in',

				/* For Production */
				// hostname: 'securegw.paytm.in',

				port: 443,
				path: '/v3/order/status',
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Content-Length': post_data.length,
				},
			};

			// Set up the request
			let statusResponse = '';
			const post_req = https.request(options, post_res => {
				post_res.on('data', chunk => {
					statusResponse += chunk;
				});

				post_res.on('end', async () => {
					try {
						const serverResponse = JSON.parse(statusResponse);

						console.log(serverResponse, 'PayTM Status');

						const statusResponseCode = serverResponse?.body?.resultInfo?.resultCode;
						const statusResponseMsg = serverResponse?.body?.resultInfo?.resultMsg;
						const statusResponseStatus = serverResponse?.body?.resultInfo?.resultStatus;

						if (statusResponseCode == 400 || statusResponse == 402 || statusResponse == 294) {
							channels.pendingPaymentsChannel.nack(data, false, true);
						} else {
							await Order.findByIdAndUpdate(response.orderId, {
								paymentStatus: statusResponseCode == '01' ? 'SXS' : 'FLD',
								orderStatus: statusResponseCode == '01' ? 'PND' : 'FLD',
								orderFailReason: statusResponseCode != '01' ? statusResponseMsg : '',
							});
							await Transaction.findOneAndUpdate({transactionId: response.transactionId}, {
								status: statusResponseStatus,
								responseCode: statusResponseCode,
								responseMessage: statusResponseMsg,
							});

							channels.pendingPaymentsChannel.ack(data);
							console.log('🚀 Pending Payment consumed by the PendingPayments-Q.');
						}
					// eslint-disable-next-line no-unused-vars
					} catch (error) {
						const strippedResponse = response.replace(/<[^>]+>/g, '');
						console.log(strippedResponse, 'Payment Status Error');
					}
				});
			});

			// Post the data
			post_req.write(post_data);
			post_req.end();
		});
	} catch (error) {
		console.log(error);
	}
};

module.exports = {connectToQueue, channels, exchangeName, ordersQName};
