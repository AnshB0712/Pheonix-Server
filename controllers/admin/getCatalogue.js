const Dish = require('../../models/Dish');

const getCatalogue = async (req, res) => {
	const catalogue = await Dish.find({});
	res.json({
		message: 'Request done successfully.',
		data: catalogue,
	});
};

module.exports = getCatalogue;
