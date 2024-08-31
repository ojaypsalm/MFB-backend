const express = require('express');
const userSignInController = require('../controllers/UserSigninController');
const userSignupController = require('../controllers/UserSignupController');
const airtimeToCashController = require('../controllers/transaction/AirtimeToCashController');
const authMiddleware = require('../authMiddleware/middleware');
const getReferralCode = require('../controllers/referral/GetReferralController');
const applyReferralCode = require('../controllers/referral/ApplyReferralController');
const getReferralStats = require('../controllers/referral/GetReferralStats');
const FundWalletController = require('../controllers/wallet/FundWalletController');
const getBalanceController = require('../controllers/wallet/GetBalanceController');
const getLiveChat = require('../controllers/support/LifeChatController');
const sendWhatsAppMessage = require('../controllers/support/WhatsappMessageController');
const getSupportNumber = require('../controllers/support/SupportNumberController');
const reportSupport = require('../controllers/support/ReportIssueController');
const getAppReviewStatus = require('../controllers/support/AppReviewController');
const router = express.Router();




router.post('/signup',  userSignupController);
router.post('/signIn',  userSignInController);
router.post('/airtimeToCash', authMiddleware, airtimeToCashController);
router.get('/code', authMiddleware, getReferralCode);
router.post('/apply', authMiddleware, applyReferralCode);
router.get('/stats', authMiddleware, getReferralStats);
router.post('/fund', authMiddleware, FundWalletController );
router.get('/balance', authMiddleware, getBalanceController);
router.get('/live-chat', authMiddleware, getLiveChat);
router.post('/whatsapp', authMiddleware, sendWhatsAppMessage);
router.get('/phone', authMiddleware, getSupportNumber);
router.post('/report', authMiddleware, reportSupport);
router.get('/app-review-status', authMiddleware, getAppReviewStatus )




module.exports = router;