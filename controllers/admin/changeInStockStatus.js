const Dish = require('../../models/Dish');
const {BadRequestError} = require('../../errors');

const changeInStockStatus = async (req, res) => {
	const {id, inStock} = req.body;

	if (!id ?? !inStock) {
		throw new BadRequestError('ID and StatusToBe is required to allow changes.');
	}

	await Dish.findByIdAndUpdate(id, {inStock});
	res.status(200).json({
		message: `Dish with ID ${id} got it's status changed to ${inStock}`,
	});
};

module.exports = changeInStockStatus;
