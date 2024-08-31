const SupportModel = require('../../models/SupportModel');

const getLiveChat = (req, res)=>{
    res.json({ available: true, url: 'https://example.com/live-chat' });
}

module.exports = getLiveChat;