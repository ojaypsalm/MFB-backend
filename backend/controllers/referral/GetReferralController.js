const UserModel = require("../../models/UserModel");
const crypto = require('crypto-js');



const getReferralCode = async (req, res)=> {
    try {

        const generateReferralCode = () => {
            return crypto.randomBytes(4).toString('hex').toUpperCase();
        };

        const user = await UserModel.findById(req.user.id);
        if(!user.referralCode){
            user.referralCode = generateReferralCode();
            await user.save();
        }
        res.json({ referralCode: user.referralCode });
        
    } catch (error) {
        console.error('Error getting referral code:', error);
        res.status(500).json({ message: 'Error getting referral code' });
    }
}

module.exports = getReferralCode;

