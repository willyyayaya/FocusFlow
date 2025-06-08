const express = require('express');
const router = express.Router();
const questController = require('../controllers/questController');
const auth = require('../middleware/auth');

// 獲取今日任務
router.get('/today', auth, questController.getTodayQuests);

// 更新任務進度
router.post('/progress', auth, questController.updateQuestProgress);

// 領取任務獎勵
router.post('/:questId/claim', auth, questController.claimQuestReward);

module.exports = router; 