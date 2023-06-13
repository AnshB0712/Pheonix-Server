const Order = require('../../models/Order');

const getAllSxsTxnOrder = async (req, res) => {
	const startOfToday = new Date();
	startOfToday.setHours(0, 0, 0, 0);
	const endOfToday = new Date();
	endOfToday.setHours(23, 59, 59, 59);

	const data = await Order.find({
		createdAt: {
			$gte: startOfToday,
			$lt: endOfToday,
		},
		paymentStatus: 'SXS',
	}).sort({createdAt: -1});

	res.json({
		message: 'request done successfully.',
		data,
	});
};

module.exports = getAllSxsTxnOrder;
