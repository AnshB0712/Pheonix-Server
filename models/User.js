const mongoose = require('mongoose');

const User = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Name is required!'],
	},
	otp: {
		type: String,
		default: '',
	},
	role: {
		type: Number,
		default: 2004,
		enum: [1989, 2000, 2004],
	},
	mobile: {
		type: String,
		unique: true,
		validate: {
			validator(v) {
				return /^([0-9]{10}$)/.test(v);
			},
			message: props => `${props.value} is not a valid phone number!`,
		},
		required: [true, 'Phone number is required!'],
	},

}, {timestamps: {
	createdAt: 'created_at',
},
});

module.exports = mongoose.model('User', User);
