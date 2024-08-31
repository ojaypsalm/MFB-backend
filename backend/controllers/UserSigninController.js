const UserModel = require("../models/UserModel");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSignInController = async(req, res)=>{
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email: email });
        if(!user){
            return res.status(404).json({
                message: 'User not found',
                error: true,
                success: false
            })
        };

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(401).json({
                message: 'Invalid password',
                error: true,
                success: false
            })
        };

        const token = jwt.sign({ userId: user._id }, process.env.APP_SECRET_KEY, {
            expiresIn: '1h',
        });

        res.status(201).json({ 
            token: token,
            message: 'Successfully logged In'
        });

    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

module.exports = UserSignInController;