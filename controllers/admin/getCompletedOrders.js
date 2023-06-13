const {BadRequestError} = require('../../errors');
const Order = require('../../models/Order');

const getCompletedOrders = async (req, res) => {
	const {orderType} = req.params;
	if (!orderType) {
		throw new BadRequestError('OrderType required to complete the request');
	}

	const startOfToday = new Date();
	startOfToday.setHours(0, 0, 0, 0);
	const endOfToday = new Date();
	endOfToday.setHours(23, 59, 59, 59);

	const orders = await Order.find({
		createdAt: {
			$gte: startOfToday,
			$lt: endOfToday,
		},
		orderStatus: 'SXS',
		orderType,
	});

	res.json({
		message: 'Request Successfull.',
		data: orders,
	});
};

module.exports = getCompletedOrders;
