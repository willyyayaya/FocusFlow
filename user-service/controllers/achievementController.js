const { Achievement, UserAchievement, User } = require('../models');

// 獲取所有成就
exports.getAllAchievements = async (req, res) => {
  const userId = req.user.id;
  
  try {
    const achievements = await Achievement.findAll({
      where: { isActive: true },
      include: [{
        model: UserAchievement,
        where: { userId },
        required: false
      }]
    });
    
    res.json(achievements);
  } catch (err) {
    res.status(500).json({ message: 'Fetch achievements failed', error: err.message });
  }
};

// 檢查並解鎖成就
exports.checkAndUnlockAchievements = async (req, res) => {
  const userId = req.user.id;
  const { achievementType, currentValue } = req.body;
  
  try {
    // 找到對應類型的成就
    const achievements = await Achievement.findAll({
      where: { achievementType, isActive: true }
    });
    
    const unlockedAchievements = [];
    
    for (const achievement of achievements) {
      // 檢查用戶是否已有此成就記錄
      let userAchievement = await UserAchievement.findOne({
        where: {
          userId,
          achievementId: achievement.id
        }
      });
      
      if (!userAchievement) {
        userAchievement = await UserAchievement.create({
          userId,
          achievementId: achievement.id,
          currentProgress: 0,
          isUnlocked: false
        });
      }
      
      // 如果已解鎖，跳過
      if (userAchievement.isUnlocked) continue;
      
      // 更新進度
      userAchievement.currentProgress = currentValue;
      
      // 檢查是否達成條件
      if (currentValue >= achievement.targetValue) {
        userAchievement.isUnlocked = true;
        userAchievement.unlockedAt = new Date();
        
        // 發放獎勵
        const user = await User.findByPk(userId);
        user.points += achievement.rewardPoints;
        await user.save();
        
        unlockedAchievements.push({
          achievement,
          rewardPoints: achievement.rewardPoints
        });
      }
      
      await userAchievement.save();
    }
    
    if (unlockedAchievements.length > 0) {
      res.json({
        message: 'Achievements unlocked!',
        unlockedAchievements,
        totalRewardPoints: unlockedAchievements.reduce((sum, ua) => sum + ua.rewardPoints, 0)
      });
    } else {
      res.json({ message: 'Progress updated', unlockedAchievements: [] });
    }
    
  } catch (err) {
    res.status(500).json({ message: 'Check achievements failed', error: err.message });
  }
};

// 獲取用戶已解鎖的成就
exports.getUserAchievements = async (req, res) => {
  const userId = req.user.id;
  
  try {
    const userAchievements = await UserAchievement.findAll({
      where: { userId, isUnlocked: true },
      include: [Achievement],
      order: [['unlockedAt', 'DESC']]
    });
    
    res.json(userAchievements);
  } catch (err) {
    res.status(500).json({ message: 'Fetch user achievements failed', error: err.message });
  }
}; 