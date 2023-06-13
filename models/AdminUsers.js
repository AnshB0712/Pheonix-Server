const mongoose = require('mongoose');

const AdminUser = new mongoose.Schema({
	username: {
		type: String,
		unique: true,
		required: [true, 'username is required.'],
	},
	password: {
		type: String,
		required: [true, 'password is required.'],
	},
	role: {
		type: Number,
		default: 2000,
		enum: [1989, 2000, 2004],
	},
}, {
	timestamps: true,
});

module.exports = mongoose.model('Adminuser', AdminUser);
