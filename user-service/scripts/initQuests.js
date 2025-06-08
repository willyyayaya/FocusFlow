require('dotenv').config();
const { sequelize, DailyQuest } = require('../models');

async function initQuests() {
  try {
    await sequelize.sync();
    
    // 清除現有任務
    await DailyQuest.destroy({ where: {} });
    
    // 新增每日任務
    const quests = [
      {
        title: '每日登入',
        description: '每天登入 FocusFlow 即可獲得獎勵',
        questType: 'login',
        targetCount: 1,
        rewardPoints: 5,
        isActive: true,
        resetDaily: true
      },
      {
        title: '創建任務',
        description: '今天創建 3 個新任務',
        questType: 'create_task',
        targetCount: 3,
        rewardPoints: 15,
        isActive: true,
        resetDaily: true
      },
      {
        title: '完成任務',
        description: '今天完成 5 個任務',
        questType: 'complete_task',
        targetCount: 5,
        rewardPoints: 25,
        isActive: true,
        resetDaily: true
      },
      {
        title: '任務達人',
        description: '今天完成 10 個任務',
        questType: 'complete_task',
        targetCount: 10,
        rewardPoints: 50,
        isActive: true,
        resetDaily: true
      },
      {
        title: '連續登入',
        description: '連續登入 7 天',
        questType: 'streak',
        targetCount: 7,
        rewardPoints: 100,
        isActive: true,
        resetDaily: false
      }
    ];
    
    for (const questData of quests) {
      try {
        await DailyQuest.create(questData);
        console.log(`Created quest: ${questData.title}`);
      } catch (err) {
        console.error(`Error creating quest ${questData.title}:`, err.message);
      }
    }
    
    console.log('Daily quests initialized successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error initializing quests:', error);
    process.exit(1);
  }
}

initQuests(); 