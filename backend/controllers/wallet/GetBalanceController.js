const Wallet = require("../../models/UserWalletModel");

const getBalanceController = async (req, res)=>{
    try {
        const wallet = await Wallet.findOne({user: req.user._id});
        if(!wallet){
            return res.json({
                balance: 0,
                message: 'Wallet not found',
                success: true
            })
        }
        res.json({
            message: 'Wallet retrieved successfully',
            success: true,
            data: wallet.balance
        })
    } catch (error) {
        console.error('Error getting wallet balance:', error);
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

module.exports = getBalanceController;