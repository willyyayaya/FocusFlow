const axios = require('axios');

async function testStoreFunctionality() {
  console.log('🧪 Testing Points Store with Food TCG Cards...\n');
  
  try {
    // 步驟 1: 檢查商品列表
    console.log('1️⃣ Checking products...');
    const productsResponse = await axios.get('http://localhost:5001/api/products');
    console.log(`✅ Found ${productsResponse.data.length} products`);
    
    // 顯示 Food TCG 卡包
    const tcgProducts = productsResponse.data.filter(p => p.name.includes('Food TCG'));
    console.log('\n🎴 Food TCG Card Packs:');
    tcgProducts.forEach(product => {
      console.log(`   - ${product.name}: ${product.pointsRequired} 點 (庫存: ${product.stock})`);
      console.log(`     ${product.description}`);
    });
    
    // 步驟 2: 創建測試用戶
    console.log('\n2️⃣ Creating test user...');
    try {
      await axios.post('http://localhost:5001/api/auth/register', {
        username: 'tcgtest',
        email: 'tcgtest@example.com',
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
    
    // 步驟 3: 登入
    console.log('\n3️⃣ Logging in...');
    const loginResponse = await axios.post('http://localhost:5001/api/auth/login', {
      username: 'tcgtest',
      password: 'password123'
    });
    const token = loginResponse.data.token;
    console.log(`✅ Login successful, Points: ${loginResponse.data.user.points}`);
    
    // 步驟 4: 增加點數用於測試
    console.log('\n4️⃣ Adding points for testing...');
    const addPointsResponse = await axios.post('http://localhost:5001/api/auth/users/' + loginResponse.data.user.id + '/points/add', 
      { points: 1000 },
      { headers: { 'Authorization': `Bearer ${token}` } }
    );
    console.log(`✅ Points added, New balance: ${addPointsResponse.data.newPoints}`);
    
    // 步驟 5: 測試兌換 Food TCG 基礎卡包
    console.log('\n5️⃣ Testing Food TCG Basic Pack redemption...');
    const basicPack = tcgProducts.find(p => p.name.includes('基礎'));
    if (basicPack) {
      const redeemResponse = await axios.post('http://localhost:5001/api/products/redeem',
        { productId: basicPack.id },
        { headers: { 'Authorization': `Bearer ${token}` } }
      );
      console.log(`✅ Successfully redeemed ${basicPack.name}`);
      console.log(`   Points used: ${basicPack.pointsRequired}`);
      console.log(`   Remaining points: ${redeemResponse.data.remainingPoints}`);
    }
    
    // 步驟 6: 檢查兌換記錄
    console.log('\n6️⃣ Checking redemption history...');
    const redemptionsResponse = await axios.get('http://localhost:5001/api/products/redemptions',
      { headers: { 'Authorization': `Bearer ${token}` } }
    );
    console.log(`✅ Found ${redemptionsResponse.data.length} redemption(s)`);
    redemptionsResponse.data.forEach(redemption => {
      console.log(`   - ${redemption.Product.name} (${redemption.pointsUsed} 點)`);
    });
    
    console.log('\n🎉 All tests passed! Store functionality working correctly.');
    
  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
  }
}

testStoreFunctionality(); 