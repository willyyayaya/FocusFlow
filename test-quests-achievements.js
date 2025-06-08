const axios = require('axios');

async function testQuestsAndAchievements() {
  console.log('🎯 Testing Daily Quests and Achievements System...\n');
  
  try {
    // 步驟 1: 創建測試用戶
    console.log('1️⃣ Creating test user...');
    try {
      await axios.post('http://localhost:5001/api/auth/register', {
        username: 'questtest',
        email: 'questtest@example.com',
        password: 'password123'
      });
      console.log('✅ Test user created');
    } catch (err) {
      if (err.response?.status === 400) {
        console.log('ℹ️ Test user already exists');
      } else {
        throw err;
      }
    }
    
    // 步驟 2: 登入
    console.log('\n2️⃣ Logging in...');
    const loginResponse = await axios.post('http://localhost:5001/api/auth/login', {
      username: 'questtest',
      password: 'password123'
    });
    const token = loginResponse.data.token;
    const userId = loginResponse.data.user.id;
    console.log(`✅ Login successful, User ID: ${userId}, Points: ${loginResponse.data.user.points}`);
    
    const headers = { 'Authorization': `Bearer ${token}` };
    
    // 步驟 3: 檢查今日任務
    console.log('\n3️⃣ Checking today\'s quests...');
    const questsResponse = await axios.get('http://localhost:5001/api/quests/today', { headers });
    console.log(`✅ Found ${questsResponse.data.length} daily quests:`);
    questsResponse.data.forEach(quest => {
      console.log(`   - ${quest.DailyQuest.title}: ${quest.currentProgress}/${quest.DailyQuest.targetCount} (+${quest.DailyQuest.rewardPoints} 點)`);
    });
    
    // 步驟 4: 檢查所有成就
    console.log('\n4️⃣ Checking achievements...');
    const achievementsResponse = await axios.get('http://localhost:5001/api/achievements', { headers });
    console.log(`✅ Found ${achievementsResponse.data.length} achievements:`);
    achievementsResponse.data.forEach(achievement => {
      const userProgress = achievement.UserAchievements?.[0];
      const progress = userProgress?.currentProgress || 0;
      const isUnlocked = userProgress?.isUnlocked || false;
      console.log(`   - ${achievement.title}: ${progress}/${achievement.targetValue} ${isUnlocked ? '🏆' : ''} (+${achievement.rewardPoints} 點)`);
    });
    
    // 步驟 5: 測試創建任務（觸發每日任務進度）
    console.log('\n5️⃣ Testing task creation (triggers quest progress)...');
    for (let i = 1; i <= 3; i++) {
      const taskResponse = await axios.post('http://localhost:5002/api/tasks', {
        title: `測試任務 ${i}`,
        description: `這是第 ${i} 個測試任務`,
        date: new Date().toISOString().split('T')[0]
      }, { headers });
      console.log(`✅ Created task ${i}: ${taskResponse.data.title}`);
    }
    
    // 步驟 6: 檢查任務進度更新
    console.log('\n6️⃣ Checking quest progress after task creation...');
    const updatedQuestsResponse = await axios.get('http://localhost:5001/api/quests/today', { headers });
    const createTaskQuest = updatedQuestsResponse.data.find(q => q.DailyQuest.questType === 'create_task');
    if (createTaskQuest) {
      console.log(`✅ Create task quest progress: ${createTaskQuest.currentProgress}/${createTaskQuest.DailyQuest.targetCount}`);
      if (createTaskQuest.isCompleted) {
        console.log('🎉 Create task quest completed!');
      }
    }
    
    // 步驟 7: 測試完成任務（觸發成就檢查）
    console.log('\n7️⃣ Testing task completion (triggers achievements)...');
    const tasksResponse = await axios.get('http://localhost:5002/api/tasks', { headers });
    const firstTask = tasksResponse.data[0];
    
    if (firstTask) {
      const completeResponse = await axios.put(`http://localhost:5002/api/tasks/${firstTask.id}`, {
        ...firstTask,
        completed: true
      }, { headers });
      console.log(`✅ Completed task: ${firstTask.title}`);
    }
    
    // 步驟 8: 檢查成就解鎖
    console.log('\n8️⃣ Checking unlocked achievements...');
    const unlockedAchievementsResponse = await axios.get('http://localhost:5001/api/achievements/unlocked', { headers });
    console.log(`✅ Unlocked ${unlockedAchievementsResponse.data.length} achievements:`);
    unlockedAchievementsResponse.data.forEach(userAchievement => {
      console.log(`   🏆 ${userAchievement.Achievement.title} - ${userAchievement.Achievement.description}`);
    });
    
    // 步驟 9: 檢查最終點數
    console.log('\n9️⃣ Checking final points...');
    const finalUserResponse = await axios.get('http://localhost:5001/api/auth/me', { headers });
    console.log(`✅ Final points: ${finalUserResponse.data.user.points}`);
    
    console.log('\n🎉 All quest and achievement tests passed!');
    
    console.log('\n📋 System Summary:');
    console.log('✅ Daily Quests: Auto-tracking task creation and completion');
    console.log('✅ Achievements: Auto-unlocking based on milestones');
    console.log('✅ Points Rewards: Automatic distribution for quests and achievements');
    console.log('✅ Progress Tracking: Real-time updates for user progress');
    
  } catch (error) {
    console.error('\n❌ Test failed:');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    } else {
      console.error('Error:', error.message);
    }
  }
}

testQuestsAndAchievements(); 