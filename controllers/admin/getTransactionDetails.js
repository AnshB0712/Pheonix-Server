const Transaction = require('../../models/Transaction');
const BadRequestError = require('../../errors');

const getTransactionDetails = async (req, res) => {
	const {orderId} = req.params;

	if (!orderId) {
		throw new BadRequestError('OrderId is required.');
	}

	const transaction = await Transaction.findOne({orderId});

	if (!transaction) {
		res.status(404).json({message: 'transaction not found.'});
	}

	res.status(200).json({
		data: transaction,
	});
};

module.exports = getTransactionDetails;
