const { DailyQuest, UserQuest, User } = require('../models');
const { Op } = require('sequelize');

// 獲取今日任務
exports.getTodayQuests = async (req, res) => {
  const userId = req.user.id;
  const today = new Date().toISOString().split('T')[0];
  
  try {
    // 獲取所有活躍的每日任務
    const dailyQuests = await DailyQuest.findAll({
      where: { isActive: true }
    });
    
    // 獲取用戶今日的任務進度
    const userQuests = await UserQuest.findAll({
      where: {
        userId,
        questDate: today
      },
      include: [{
        model: DailyQuest,
        required: true
      }]
    });
    
    // 為沒有記錄的任務創建新記錄
    const existingQuestIds = userQuests.map(uq => uq.questId);
    const newQuests = [];
    
    for (const quest of dailyQuests) {
      if (!existingQuestIds.includes(quest.id)) {
        const newUserQuest = await UserQuest.create({
          userId,
          questId: quest.id,
          questDate: today,
          currentProgress: 0,
          isCompleted: false
        });
        newUserQuest.DailyQuest = quest;
        newQuests.push(newUserQuest);
      }
    }
    
    const allQuests = [...userQuests, ...newQuests];
    
    res.json(allQuests);
  } catch (err) {
    res.status(500).json({ message: 'Fetch quests failed', error: err.message });
  }
};

// 更新任務進度
exports.updateQuestProgress = async (req, res) => {
  const userId = req.user.id;
  const { questType, increment = 1 } = req.body;
  const today = new Date().toISOString().split('T')[0];
  
  try {
    // 找到對應類型的任務
    const quest = await DailyQuest.findOne({
      where: { questType, isActive: true }
    });
    
    if (!quest) {
      return res.status(404).json({ message: 'Quest not found' });
    }
    
    // 找到或創建用戶任務記錄
    let userQuest = await UserQuest.findOne({
      where: {
        userId,
        questId: quest.id,
        questDate: today
      }
    });
    
    if (!userQuest) {
      userQuest = await UserQuest.create({
        userId,
        questId: quest.id,
        questDate: today,
        currentProgress: 0,
        isCompleted: false
      });
    }
    
    // 如果已完成，不再更新
    if (userQuest.isCompleted) {
      return res.json({ message: 'Quest already completed', userQuest });
    }
    
    // 更新進度
    userQuest.currentProgress += increment;
    
    // 檢查是否完成
    if (userQuest.currentProgress >= quest.targetCount) {
      userQuest.isCompleted = true;
      userQuest.completedAt = new Date();
      
      // 發放獎勵
      const user = await User.findByPk(userId);
      user.points += quest.rewardPoints;
      await user.save();
      
      await userQuest.save();
      
      res.json({
        message: 'Quest completed!',
        userQuest,
        rewardPoints: quest.rewardPoints,
        newPoints: user.points
      });
    } else {
      await userQuest.save();
      res.json({ message: 'Progress updated', userQuest });
    }
    
  } catch (err) {
    res.status(500).json({ message: 'Update quest progress failed', error: err.message });
  }
};

// 領取任務獎勵（手動領取）
exports.claimQuestReward = async (req, res) => {
  const userId = req.user.id;
  const { questId } = req.params;
  const today = new Date().toISOString().split('T')[0];
  
  try {
    const userQuest = await UserQuest.findOne({
      where: {
        userId,
        questId,
        questDate: today,
        isCompleted: true
      },
      include: [DailyQuest]
    });
    
    if (!userQuest) {
      return res.status(404).json({ message: 'Completed quest not found' });
    }
    
    if (userQuest.rewardClaimed) {
      return res.status(400).json({ message: 'Reward already claimed' });
    }
    
    // 發放獎勵
    const user = await User.findByPk(userId);
    user.points += userQuest.DailyQuest.rewardPoints;
    await user.save();
    
    userQuest.rewardClaimed = true;
    await userQuest.save();
    
    res.json({
      message: 'Reward claimed successfully',
      rewardPoints: userQuest.DailyQuest.rewardPoints,
      newPoints: user.points
    });
    
  } catch (err) {
    res.status(500).json({ message: 'Claim reward failed', error: err.message });
  }
}; 