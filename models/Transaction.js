const mongoose = require('mongoose');

const Transaction = new mongoose.Schema({
	transactionId: {
		type: String,
		required: true,
	},
	transactionAmount: {
		type: String,
		required: true,
	},
	currency: {
		type: String,
		required: true,
	},
	gatewayName: {
		type: String,
	},
	bankName: {
		type: String,
	},
	paymentMode: {
		type: String,
		required: true,
	},
	responseCode: {
		type: Number,
		required: true,
	},
	responseMessage: {
		type: String,
		required: true,
	},
	orderId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
	},
	orderBy: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
	},
	status: {
		type: String,
		required: true,
	},
	bankTransactionId: {
		type: String,
	},
	transactionDate: {
		type: Date,
	},
}, {timestamps: true});

module.exports = mongoose.model('Transaction', Transaction);
