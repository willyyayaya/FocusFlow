const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');

// 註冊
router.post('/register', authController.register);

// 登入
router.post('/login', authController.login);

// 獲取當前用戶資訊 (需要認證)
router.get('/me', auth, authController.me);

// 驗證 token（給其他服務用）
router.post('/verify', authController.verify);

// 點數相關 API
router.get('/users/:userId/points', authController.getPoints);
router.post('/users/:userId/points/add', authController.addPoints);
router.post('/users/:userId/points/deduct', authController.deductPoints);

module.exports = router; 