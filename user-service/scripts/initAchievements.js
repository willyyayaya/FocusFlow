require('dotenv').config();
const { sequelize, Achievement } = require('../models');

async function initAchievements() {
  try {
    await sequelize.sync();
    
    // 清除現有成就
    await Achievement.destroy({ where: {} });
    
    // 新增成就
    const achievements = [
      {
        title: '任務新手',
        description: '完成第一個任務',
        achievementType: 'task_master',
        targetValue: 1,
        rewardPoints: 20,
        iconUrl: 'https://via.placeholder.com/64x64?text=🎯',
        rarity: 'common'
      },
      {
        title: '任務達人',
        description: '累計完成 50 個任務',
        achievementType: 'task_master',
        targetValue: 50,
        rewardPoints: 100,
        iconUrl: 'https://via.placeholder.com/64x64?text=⭐',
        rarity: 'rare'
      },
      {
        title: '任務大師',
        description: '累計完成 200 個任務',
        achievementType: 'task_master',
        targetValue: 200,
        rewardPoints: 300,
        iconUrl: 'https://via.placeholder.com/64x64?text=👑',
        rarity: 'epic'
      },
      {
        title: '任務傳說',
        description: '累計完成 500 個任務',
        achievementType: 'task_master',
        targetValue: 500,
        rewardPoints: 1000,
        iconUrl: 'https://via.placeholder.com/64x64?text=🏆',
        rarity: 'legendary'
      },
      {
        title: '點數收集者',
        description: '累計獲得 1000 點數',
        achievementType: 'point_collector',
        targetValue: 1000,
        rewardPoints: 50,
        iconUrl: 'https://via.placeholder.com/64x64?text=💰',
        rarity: 'common'
      },
      {
        title: '點數大亨',
        description: '累計獲得 10000 點數',
        achievementType: 'point_collector',
        targetValue: 10000,
        rewardPoints: 200,
        iconUrl: 'https://via.placeholder.com/64x64?text=💎',
        rarity: 'epic'
      },
      {
        title: '堅持不懈',
        description: '連續登入 30 天',
        achievementType: 'streak_keeper',
        targetValue: 30,
        rewardPoints: 500,
        iconUrl: 'https://via.placeholder.com/64x64?text=🔥',
        rarity: 'rare'
      },
      {
        title: '早起鳥兒',
        description: '在早上 6-8 點完成 10 個任務',
        achievementType: 'early_bird',
        targetValue: 10,
        rewardPoints: 150,
        iconUrl: 'https://via.placeholder.com/64x64?text=🌅',
        rarity: 'rare'
      },
      {
        title: '夜貓子',
        description: '在晚上 10-12 點完成 10 個任務',
        achievementType: 'night_owl',
        targetValue: 10,
        rewardPoints: 150,
        iconUrl: 'https://via.placeholder.com/64x64?text=🌙',
        rarity: 'rare'
      }
    ];
    
    for (const achievementData of achievements) {
      try {
        await Achievement.create(achievementData);
        console.log(`Created achievement: ${achievementData.title}`);
      } catch (err) {
        console.error(`Error creating achievement ${achievementData.title}:`, err.message);
      }
    }
    
    console.log('Achievements initialized successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error initializing achievements:', error);
    process.exit(1);
  }
}

initAchievements(); 