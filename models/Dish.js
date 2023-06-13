const mongoose = require('mongoose');

const Dish = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Name of the dish is required!'],
	},
	perPrice: {
		type: Number,
		required: [true, 'Price of the dish is required!'],
	},
	category: {
		type: String,
		enum: ['thali', 'chinese', 'comfort food', 'punjabi'],
		required: [true, 'Category of the dish is required!'],
	},
	imageURL: {
		type: String,
		required: [true, 'Image of the dish is required!'],
	},
	parts: {
		type: [String],
	},
	inStock: {
		type: Boolean,
		default: true,
	},
}, {timestamps: {
	createdAt: 'created_at',
},
});

module.exports = mongoose.model('Dish', Dish);
