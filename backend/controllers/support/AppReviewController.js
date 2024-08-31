const SupportModel = require('../../models/SupportModel');

const getAppReviewStatus = (req, res)=>{
    res.json({ available: false, message: 'Coming Soon' });
}

module.exports = getAppReviewStatus;