const Order = require('../../models/Order');
const {BadRequestError} = require('../../errors');

const getOrderInfo = async (req, res) => {
	const {orderId} = req.query;
	if (!orderId) {
		throw new BadRequestError();
	}

	const order = await Order.findOne({_id: orderId});

	if (!order) {
		throw new BadRequestError();
	}

	let flag = true;
	const duration = 1 * 60 * 1000;

	setTimeout(() => {
		flag = false;
	}, duration);

	// eslint-disable-next-line no-unmodified-loop-condition
	while (flag) {
		if (order.paymentStatus === 'PRCSNG') {
			continue;
		}

		if (!flag || order.paymentStatus !== 'PRCSNG') {
			break;
		}
	}

	res.status(200).json({
		message: 'Order Found Successfully!',
		data: order,
	});
};

module.exports = getOrderInfo;
