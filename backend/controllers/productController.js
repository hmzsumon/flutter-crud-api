const Product = require('../models/Product');
const ErrorHandler = require('../utils/errorhandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const cloudinary = require('cloudinary');

// Create new product => /api/v1/admin/product/new
exports.newProduct = catchAsyncErrors(async (req, res, next) => {
	const result = await cloudinary.v2.uploader.upload(req.file.path, {
		folder: 'crud-app',
	});

	const { productName, price, description } = req.body;

	const product = await Product.create({
		productName,
		price,
		description,
		image: {
			url: result.secure_url,
			public_id: result.public_id,
		},
	});

	res.status(201).json({
		success: true,
		message: 'New product created successfully',
		product,
	});
});

// Get all products
exports.getProducts = catchAsyncErrors(async (req, res, next) => {
	const productName = req.query.productName;
	const condition = productName
		? { productName: { $regex: new RegExp(productName), $options: 'i' } }
		: {};

	const products = await Product.find(condition);
	res.status(200).json({
		success: true,
		products,
	});
});

// Get single product details
exports.getSingleProduct = catchAsyncErrors(async (req, res, next) => {
	const product = await Product.findById(req.params.id);

	if (!product) {
		return next(new ErrorHandler('Product not found', 404));
	}

	res.status(200).json({
		success: true,
		product,
	});
});

// update product
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
	let product = await Product.findById(req.params.id);

	if (!product) {
		return next(new ErrorHandler('Product not found', 404));
	}

	const result = await cloudinary.v2.uploader.upload(req.file.path, {
		folder: 'crud-app',
	});

	const { productName, price, description } = req.body;

	product = await Product.findByIdAndUpdate(
		req.params.id,
		{
			productName,
			price,
			description,
			image: {
				url: result.secure_url,
				public_id: result.public_id,
			},
		},
		{
			new: true,
			runValidators: true,
			useFindAndModify: false,
		}
	);

	res.status(200).json({
		success: true,
		message: 'Product updated successfully',
		product,
	});
});

// delete product
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
	const product = await Product.findById(req.params.id);
	if (!product) {
		return next(new ErrorHandler('Product not found', 404));
	}

	await cloudinary.v2.uploader.destroy(product.image.public_id);

	await product.remove();

	res.status(200).json({
		success: true,
		message: 'Product deleted successfully',
	});
});
