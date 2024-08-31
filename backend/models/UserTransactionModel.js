
const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
  type: { type: String, enum: ['airtime', 'cash', 'wallet'], required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ['initiated', 'successful', 'failed'], required: true },
  paymentMethod: { 
    type: String, 
    enum: [
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
      'nqr', 
      'ussd', 
      'credit'
    ],
   required: true 
  }, 
  transactionNo: { type: String },
  network: { type: String, enum: ['MTN', 'Airtel', 'Glo', '9mobile'], required: true },
  phoneNumber: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Transaction', transactionSchema);
