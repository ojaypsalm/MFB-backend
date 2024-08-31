const Wallet = require("../../models/UserWalletModel");

const FundWalletController = async(req, res)=>{
    try {
        const { amount } = req.body;
        if(!amount || amount <= 0){
            return res.status(400).json({message: 'Invalid amount'})
        }
        const wallet = await Wallet.findOne({user: req.user._id});
        if(!wallet){
            wallet = new Wallet({user: req.user.id});
        }

        wallet.balance += amount;
        await wallet.save();
        res.json({
            message: 'Wallet funded successfully',
            success: true,
            newBalance: wallet.balance
        });


    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

module.exports = FundWalletController;