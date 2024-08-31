const mongoose = require('mongoose');

const SupportSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true }, 
  reason: { type: String, required: false },  
  details: { type: String, required: false },  
  createdAt: { type: Date, default: Date.now }
});

const SupportModel = mongoose.model('Support', SupportSchema);

module.exports = SupportModel;
