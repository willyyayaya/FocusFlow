const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// 註冊
router.post('/register', authController.register);

// 登入
router.post('/login', authController.login);

// 驗證 token（給其他服務用）
router.post('/verify', authController.verify);

// 點數相關 API
router.get('/users/:userId/points', authController.getPoints);
router.post('/users/:userId/points/add', authController.addPoints);
router.post('/users/:userId/points/deduct', authController.deductPoints);

module.exports = router; 