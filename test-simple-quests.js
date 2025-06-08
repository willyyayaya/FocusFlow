const axios = require('axios');

async function testSimpleQuests() {
  console.log('🎯 Testing Simple Daily Quests System...\n');
  
  try {
    // 登入
    const loginResponse = await axios.post('http://localhost:5001/api/auth/login', {
      username: 'questtest',
      password: 'password123'
    });
    const token = loginResponse.data.token;
    const headers = { 'Authorization': `Bearer ${token}` };
    
    console.log('✅ Login successful');
    
    // 測試任務進度更新
    console.log('\n📝 Testing quest progress update...');
    const progressResponse = await axios.post('http://localhost:5001/api/quests/progress', {
      questType: 'create_task',
      increment: 1
    }, { headers });
    
    console.log('✅ Quest progress response:', progressResponse.data);
    
    // 測試成就檢查
    console.log('\n🏆 Testing achievement check...');
    const achievementResponse = await axios.post('http://localhost:5001/api/achievements/check', {
      achievementType: 'task_master',
      currentValue: 1
    }, { headers });
    
    console.log('✅ Achievement check response:', achievementResponse.data);
    
    // 檢查最終點數
    const finalUserResponse = await axios.get('http://localhost:5001/api/auth/me', { headers });
    console.log('\n💰 Final points:', finalUserResponse.data.user.points);
    
    console.log('\n🎉 Simple quest test completed!');
    
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

testSimpleQuests(); 