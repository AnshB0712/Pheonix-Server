const Dish = require('../../models/Dish');

const getDishFromId = async (req, res) => {
	const {items} = req.query;
	const result = [];

	for (const id of items) {
		const res = await Dish.findOne({_id: id});
		result.push(res);
	}

	res.status(200).json({data: result});
};

module.exports = getDishFromId;
