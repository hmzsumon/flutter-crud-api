const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');

const errorMiddleware = require('./middleware/error');

// Config
if (process.env.NODE_ENV !== 'PRODUCTION') {
	require('dotenv').config({ path: 'backend/config/config.env' });
}

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(fileUpload());

// Route Imports
const products = require('./routes/productRoute');

// Routes
app.use('/api/v1', products);

// Middleware for Errors
app.get('/', (req, res) => {
	res.send('Hello World');
});
app.use(errorMiddleware);

module.exports = app;
