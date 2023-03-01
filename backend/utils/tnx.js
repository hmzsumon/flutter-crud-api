const Transaction = require('../models/transaction');

//create a transaction function
const createTransaction = async (
	userId,
	transactionType,
	amount,
	purpose,
	description,
	price
) => {
	// check isCashIn or isCashOut
	let isCashIn = false;
	let isCashOut = false;

	if (transactionType === 'cashIn') {
		isCashIn = true;
	}

	if (transactionType === 'cashOut') {
		isCashOut = true;
	}

	const transaction = new Transaction({
		userId,
		transactionType,
		amount,
		purpose,
		description,
		price,
		isCashIn,
		isCashOut,
	});

	return await transaction.save();
};

module.exports = createTransaction;
