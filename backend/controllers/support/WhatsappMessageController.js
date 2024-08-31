const SupportModel = require('../../models/SupportModel');


 const sendWhatsAppMessage = async(req, res)=>{
    const { message } = req.body;

  if (!message) {
    return res.status(400).json({ success: false, message: 'Message content is required' });
  }

  try {
    const supportTicket = new SupportModel({
      user: req.user.id,
      type: 'whatsapp',
      details: message
    });
    await supportTicket.save();

    res.json({ success: true, message: 'Message sent to WhatsApp support' });
  } catch (error) {
    console.error('Error sending WhatsApp message:', error);
    res.status(500).json({ success: false, message: 'Error sending WhatsApp message' });
  }
 }

 module.exports = sendWhatsAppMessage;