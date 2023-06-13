const User = require('../../models/User');
const BadRequestError = require('../../errors');

const getUserDetails = async (req, res) => {
	const {userId} = req.params;

	if (!userId) {
		throw new BadRequestError('UserID is required.');
	}

	const user = await User.findOne({_id: userId});

	if (!user) {
		res.status(404).json({message: 'user not found.'});
	}

	res.status(200).json({
		data: user,
	});
};

module.exports = getUserDetails;
