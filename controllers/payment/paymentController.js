/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
const https = require('https');
const {PAYTM_M_KEY, PAYTM_M_ID, BACKEND_URL} = require('../../variables');
const PaytmChecksum = require('./PaytmChecksum');

const paymentController = (req, res) => {
	const {orderId, amount} = req.body;
	const {userId} = req.user;
	const paytmParams = {};

	paytmParams.body = {
		requestType: 'Payment',
		mid: PAYTM_M_ID,
		websiteName: 'WEBSTAGING',
		orderId,
		callbackUrl: `${BACKEND_URL}/payment/paytm-status`,
		txnAmount: {
			value: String(amount),
			currency: 'INR',
		},
		userInfo: {
			custId: userId,
		},
	};

	/*
* Generate checksum by parameters we have in body
* Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys
*/
	PaytmChecksum.generateSignature(JSON.stringify(paytmParams.body), PAYTM_M_KEY).then(checksum => {
		paytmParams.head = {
			signature: checksum,
		};

		const post_data = JSON.stringify(paytmParams);

		const options = {

			/* For Staging */
			hostname: 'securegw-stage.paytm.in',

			/* For Production */
			// hostname: 'securegw.paytm.in',

			port: 443,
			path: `/theia/api/v1/initiateTransaction?mid=${PAYTM_M_ID}&orderId=${orderId}`,
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Content-Length': post_data.length,
			},
		};

		let response = '';
		const post_req = https.request(options, post_res => {
			post_res.on('data', chunk => {
				response += chunk;
			});

			post_res.on('end', () => {
				try {
					const serverResponse = JSON.parse(response);
					res.json({response: serverResponse});
				} catch (error) {
					const strippedResponse = response.replace(/<[^>]+>/g, '');
					console.log(strippedResponse);
					res.status(500).send(strippedResponse);
				}
			});
		});

		post_req.write(post_data);
		post_req.end();
	});
};

module.exports = paymentController;
