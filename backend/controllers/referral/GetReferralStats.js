const UserModel = require("../../models/UserModel");

const getReferralStats = async(req, res)=>{
    try {
        const user = await UserModel.findById(req.user.id).populate('referrals');
        const totalReferrals = user.referrals.length;
        const currentWalletBonus = user.walletBonus;
        res.json({
            totalReferrals,
            currentWalletBonus
        })

    } catch (error) {
        console.error('Error fetching referral stats:', error);
        res.status(500).json({ message: 'Error fetching referral stats' });
    }
}

module.exports = getReferralStats;
