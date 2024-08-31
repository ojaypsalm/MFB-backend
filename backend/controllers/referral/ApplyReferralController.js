const UserModel = require("../../models/UserModel");

const applyReferralCode = async (req, res) =>{
    try {
        const { code } = req.body;
        const user = await UserModel.findById(req.user.id);
        if(user.referredBy){
            return res.status(400).json({ message: 'You have already applied for a referral code' });
        }
        const referrer = await UserModel.findOne({ referralCode: code });
        if(!referrer){
            return res.status(400).json({ message: 'Invalid referral code' })
        }
        if(referrer.id === user.id){
            return res.status(400).json({ message: 'You cannot apply for your own referral code' });
        }

        user.referredBy = referrer.id;
        referrer.referrals.push(user.id);
        await user.save();
        await referrer.save()

        referrer.walletBonus += 5;

        await Promise({ message: 'Referral code applied successfully' })

    } catch (error) {
        res.status(500).json({ message: 'Error applying referral code' });
    }


}

module.exports = applyReferralCode;

