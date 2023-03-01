const express = require('express');
const multer = require('multer');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const {
	newProduct,
	getProducts,
	getSingleProduct,
	updateProduct,
	deleteProduct,
} = require('../controllers/productController');

const storage = multer.diskStorage({});

const fileFilter = (req, file, cb) => {
	const validExts = ['.jpg', '.jpeg', '.png', '.webp'];
	if (!validExts.includes(path.extname(file.originalname).toLowerCase())) {
		return cb(new Error('Only jpg, jpeg and png files are allowed!'));
	}
	const fileSize = parseInt(req.headers['content-length']);

	if (fileSize > 1048576) {
		return cb(new Error('File size is too large. Max limit is 10MB'));
	}

	cb(null, true);
};

let upload = multer({
	storage,
	fileFilter,
	fileSize: 1048576, // 10MB
});

// create new product
router.route('/new/product').post(upload.single('image'), newProduct);

// get all products
router.route('/products').get(getProducts);

// get single product
router.route('/product/:id').get(getSingleProduct);

// update product
router.route('/product/:id').put(upload.single('image'), updateProduct);

// delete product
router.route('/product/:id').delete(deleteProduct);

module.exports = router;
