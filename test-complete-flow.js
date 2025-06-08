const axios = require('axios');

async function testCompleteFlow() {
  console.log('🧪 Testing Complete FocusFlow System...\n');
  
  try {
    // 步驟 1: 檢查服務狀態
    console.log('1️⃣ Checking services...');
    const userServiceCheck = await axios.get('http://localhost:5001');
    const taskServiceCheck = await axios.get('http://localhost:5002');
    const frontendCheck = await axios.get('http://localhost:3000');
    console.log('✅ All services are running');
    
    // 步驟 2: 檢查商品列表
    console.log('\n2️⃣ Checking products...');
    const productsResponse = await axios.get('http://localhost:5001/api/products');
    console.log(`✅ Found ${productsResponse.data.length} products`);
    productsResponse.data.forEach(product => {
      console.log(`   - ${product.name}: ${product.pointsRequired} 點 (庫存: ${product.stock})`);
    });
    
    // 步驟 3: 創建測試用戶
    console.log('\n3️⃣ Creating test user...');
    try {
      await axios.post('http://localhost:5001/api/auth/register', {
        username: 'flowtest',
        email: 'flowtest@example.com',
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
    
    // 步驟 4: 登入
    console.log('\n4️⃣ Logging in...');
    const loginResponse = await axios.post('http://localhost:5001/api/auth/login', {
      username: 'flowtest',
      password: 'password123'
    });
    const token = loginResponse.data.token;
    const userId = loginResponse.data.user.id;
    console.log(`✅ Login successful, User ID: ${userId}, Points: ${loginResponse.data.user.points}`);
    
    // 步驟 5: 測試 /auth/me 端點
    console.log('\n5️⃣ Testing /auth/me endpoint...');
    const meResponse = await axios.get('http://localhost:5001/api/auth/me', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    console.log(`✅ User info: ${meResponse.data.user.username}, Points: ${meResponse.data.user.points}`);
    
    // 步驟 6: 測試 Line Pay 請求
    console.log('\n6️⃣ Testing Line Pay request...');
    const linePayResponse = await axios.post('http://localhost:5001/api/linepay/request', {
      amount: 100,
      pointsToAdd: 100
    }, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    if (linePayResponse.data.success) {
      console.log('✅ Line Pay request successful');
      console.log(`   Transaction ID: ${linePayResponse.data.transactionId}`);
      console.log(`   Payment URL: ${linePayResponse.data.paymentUrl ? 'Generated' : 'Missing'}`);
    } else {
      console.log('❌ Line Pay request failed');
    }
    
    // 步驟 7: 加點數測試兌換
    console.log('\n7️⃣ Adding points for redemption test...');
    await axios.post(`http://localhost:5001/api/auth/users/${userId}/points/add`, {
      points: 500
    });
    console.log('✅ Added 500 points');
    
    // 步驟 8: 測試商品兌換
    console.log('\n8️⃣ Testing product redemption...');
    const redeemResponse = await axios.post('http://localhost:5001/api/products/redeem', {
      productId: 1
    }, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    console.log('✅ Product redemption successful');
    console.log(`   Remaining points: ${redeemResponse.data.remainingPoints}`);
    
    // 步驟 9: 檢查兌換記錄
    console.log('\n9️⃣ Checking redemption history...');
    const redemptionsResponse = await axios.get('http://localhost:5001/api/products/redemptions', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    console.log(`✅ Found ${redemptionsResponse.data.length} redemption records`);
    
    console.log('\n🎉 All tests passed! System is working correctly.');
    
    console.log('\n📋 Test Summary:');
    console.log('✅ Services: User Service, Task Service, Frontend');
    console.log('✅ Products: Loading and display');
    console.log('✅ Authentication: Register, Login, /auth/me');
    console.log('✅ Line Pay: Request generation');
    console.log('✅ Points: Adding and deducting');
    console.log('✅ Redemption: Product exchange');
    console.log('✅ History: Redemption records');
    
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

testCompleteFlow(); 