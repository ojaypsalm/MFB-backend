const Transaction = require("../../models/UserTransactionModel");
const axios = require('axios');
require('dotenv').config();

const FLUTTER_SECRET_KEY = process.env.FLUTTERWAVE_SECRET_KEY

const airtimeToCashController = async (req, res)=>{
    try {
        const { network, phoneNumber, amount, pin, email, paymentMethod } = req.body;

        const validPaymentMethods = [
            'card',
            'account',
            'banktransfer',
            'mpesa',
            'mobilemoneyghana',
            'mobilemoneyfranco',
            'mobilemoneyuganda',
            'mobilemoneyrwanda',
            'mobilemoneyzambia',
            'barter',
            'barter', 
            'nqr', 
            'ussd', 
            'credit'

        ];
        if(!validPaymentMethods.includes(paymentMethod)){
            return res.status(400).json({
                message: 'Invalid payment method',
                error: true,
                success: false
            })
        }
        const transaction = new Transaction({
            user: req.user.id,
            type: 'airtime',
            amount,
            status: 'initiated',
            paymentMethod: paymentMethod,
            network,
            phoneNumber
        });
        await transaction.save();

        const requestData ={
                tx_ref: `MC-${Date.now()}`, // unique transaction reference
                amount: amount,
                currency: 'NGN',
                payment_type: paymentMethod,
                payment_option: 'account',
                phone_number: phoneNumber,
                network: network,
                email: email,
                client_ip: req.ip,
                pin:pin,
                redirect_url: 'https://yourdomain.com/success',
                device_fingerprint: req.headers['user-agent'],
        };

            const config = {
                headers: {
                    Authorization: `Bearer ${FLUTTER_SECRET_KEY}`,
                    'Content-Type': 'application/json'
                },
            };
            const response = await axios.post(
                "https://api.flutterwave.com/v3/payments",
                 requestData,
                 config
            )

        if (response.data.status === 'success') {
            transaction.status = 'successful';
            transaction.transactionNo = response.data.data.flw_ref;
            await transaction.save();

            return  res.json({
                message: 'Airtime to cash transaction successful',
                success: true,
                transactionId: transaction._id,
                data: response.data.data,
            });
        }else {
            transaction.status = 'failed';
            await transaction.save();

            res. status(400).json({
                message: 'Airtime to cash transaction failed',
                success: false,
                transactionId: transaction._id,
                data: response.data.data,
                error: response.data.message
            });
        }
    } catch (error) {
        console.log(error.response ? error.response.data : error.message);
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

module.exports = airtimeToCashController;