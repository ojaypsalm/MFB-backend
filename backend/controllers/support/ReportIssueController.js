const SupportModel = require('../../models/SupportModel');


const reportSupport = async(req, res)=>{
    const { reason, details } = req.body;

    if (!reason || !details) {
      return res.status(400).json({ success: false, message: 'Reason and details are required' });
    }
  
    try {
      const supportReport = new SupportModel({
        user: req.user.id,
        type: 'report',
        reason,
        details
      });
      await supportReport.save();
  
      res.json({ success: true, message: 'Support report submitted successfully' });
    } catch (error) {
      console.error('Error submitting support report:', error);
      res.status(500).json({ success: false, message: 'Error submitting support report' });
    }

}

module.exports = reportSupport;