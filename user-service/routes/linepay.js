const express = require('express');
const router = express.Router();
const linePayController = require('../controllers/linePayController');
const auth = require('../middleware/auth');

// 發起支付請求 (需要認證)
router.post('/request', auth, linePayController.createPayment);

// 確認支付 (Line Pay 回調，不需要認證)
router.get('/confirm', linePayController.confirmPayment);

// 取得支付狀態 (需要認證)
router.get('/status/:transactionId', auth, linePayController.getPaymentStatus);

module.exports = router; 