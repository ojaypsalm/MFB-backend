const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(

    {
        firstName: { type: String, required: true,},
        lastName: { type: String, required: true,},
        email: { type: String, required: true, unique: true,},
        password: { type: String, required: true,},
        referralCode: { type: String, required: true,},
        referredBy: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
        referrals: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
        walletBonus: { type: Number, default: 0 },
        wallet : {type: mongoose.Schema.Types.ObjectId, ref: 'wallet', default: null}


    }
)

const UserModel = mongoose.model('user', UserSchema)
module.exports = UserModel;