const {BadRequestError} = require('../../errors');
const Order = require('../../models/Order');

const changePaymentStatus = async (req, res) => {
	const {orderId, statusToBe} = req.body;
	console.log({orderId, statusToBe});
	if (!orderId || !statusToBe) {
		throw new BadRequestError('Order ID and Latest Status is required to change the payment status.');
	}

	await Order.findByIdAndUpdate(orderId, {
		paymentStatus: statusToBe,
		orderStatus: statusToBe == 'FLD' ? 'FLD' : 'PNDG',
	});

	res.status(200).json({message: 'Status changed successfully!'});
};

module.exports = changePaymentStatus;
