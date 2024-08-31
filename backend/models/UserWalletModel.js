const mongoose = require('mongoose');

const walletSchema = new mongoose.Schema({
    balance : {type: Number, default: 0},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'user', default: null}
});

module.exports = mongoose.model('wallet', walletSchema);