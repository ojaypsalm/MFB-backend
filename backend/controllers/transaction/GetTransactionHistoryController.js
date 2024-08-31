const Transaction = require("../models/TransactionModel")

const transactionHistory = async(req, res)=>{
    try {
        const transactions = await Transaction.find({user: req.user._id}).sort('-createdAt');
        res.json({
            message: 'Transaction history retrieved successfully',
            success: true,
            transactionId: transactions._id
        });

    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

module.exports = transactionHistory;