const express = require('express');
const app = express();

// test route
app.get('/', (req, res) => {
	res.send('Hello World Vercel!');
});

// start server
app.listen(3000, () => {
	console.log('Server started on port 3000');
});
