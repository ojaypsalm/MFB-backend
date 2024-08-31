const jwt = require('jsonwebtoken');
const UserModel = require("../models/UserModel");

const authMiddleware = async(req, res, next)=>{
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if(!token){
            return res.status(401).json({
                message: 'Authorization token missing'
            })
        }
        try {
            const decoded = jwt.verify(token, process.env.APP_SECRET_KEY);
            console.log("Decoded Token:", decoded);
            const user = await UserModel.findById(decoded.userId);
            if(!user){
                console.error('User not found:', decoded.userId);
                return res.status(401).json({
                    message: 'User not found'
                });
            }
            req.user = user;
            next();

        } catch (error) {
            return res.status(401).json({
                message: 'Invalid or expired token'
            })
        }
    } catch (error) {
        res.status(401).json({ message: 'Token is not valid' });
    }
}
module.exports = authMiddleware;