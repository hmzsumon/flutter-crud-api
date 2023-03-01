const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema(
	{
		productName: {
			type: String,
			required: [true, 'Please enter product name'],
		},
		price: {
			type: Number,
			required: [true, 'Please enter product price'],
		},
		description: {
			type: String,
		},
		image: {
			url: {
				type: String,
			},
			public_id: {
				type: String,
			},
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Product', productSchema);
