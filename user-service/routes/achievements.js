const express = require('express');
const router = express.Router();
const achievementController = require('../controllers/achievementController');
const auth = require('../middleware/auth');

// 獲取所有成就
router.get('/', auth, achievementController.getAllAchievements);

// 檢查並解鎖成就
router.post('/check', auth, achievementController.checkAndUnlockAchievements);

// 獲取用戶已解鎖的成就
router.get('/unlocked', auth, achievementController.getUserAchievements);

module.exports = router; 