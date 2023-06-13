const Order = require('../../models/Order');

const getAllOrders = async (req, res) => {
	const {page} = req.query;
	const {userId} = req.user;
	const limit = 10;
	const pageInNumberType = Number(page);
	const totalOrders = await Order.countDocuments({orderBy: userId});
	const results = await Order.find({orderBy: userId}).sort({createdAt: -1}).limit(limit).skip(limit * (pageInNumberType - 1));
	res.status(200).json({
		message: `All the orders created by userID ${userId}`,
		data: results,
		totalOrders,
		page: pageInNumberType,
		totalPages: Math.ceil(totalOrders / limit),
	});
};

module.exports = getAllOrders;
