const SupportModel = require('../../models/SupportModel');

const getSupportNumber = (req, res)=>{
    res.json({ phoneNumber: '+1234567890' });
}

module.exports = getSupportNumber;