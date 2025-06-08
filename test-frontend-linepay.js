const axios = require('axios');

async function testFrontendLinePayFlow() {
  console.log('🧪 Testing Frontend Line Pay Flow...\n');
  
  try {
    // 步驟 1: 註冊用戶
    console.log('1️⃣ Creating test user...');
    try {
      const registerResponse = await axios.post('http://localhost:5001/api/auth/register', {
        username: 'frontendtest',
        email: 'frontend@test.com',
        password: 'password123'
      });
      console.log('✅ User created successfully');
    } catch (err) {
      if (err.response?.status === 400) {
        console.log('ℹ️ User already exists, continuing...');
      } else {
        throw err;
      }
    }
    
    // 步驟 2: 登入獲取 token
    console.log('\n2️⃣ Logging in...');
    const loginResponse = await axios.post('http://localhost:5001/api/auth/login', {
      username: 'frontendtest',
      password: 'password123'
    });
    
    if (!loginResponse.data.token) {
      throw new Error('No token received');
    }
    
    const token = loginResponse.data.token;
    const userId = loginResponse.data.user.id;
    console.log('✅ Login successful, User ID:', userId);
    
    // 步驟 3: 檢查用戶點數
    console.log('\n3️⃣ Checking user points...');
    const userResponse = await axios.get('http://localhost:5001/api/auth/me', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    console.log('💰 Current points:', userResponse.data.user.points);
    
    // 步驟 4: 發起 Line Pay 請求 (模擬前端)
    console.log('\n4️⃣ Creating Line Pay request...');
    const paymentData = {
      amount: 100,
      pointsToAdd: 100
    };
    
    console.log('📤 Request data:', paymentData);
    console.log('🔑 Using token:', token.substring(0, 20) + '...');
    
    const paymentResponse = await axios.post('http://localhost:5001/api/linepay/request', paymentData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    console.log('✅ Line Pay request successful!');
    console.log('📋 Response:', {
      success: paymentResponse.data.success,
      transactionId: paymentResponse.data.transactionId,
      orderId: paymentResponse.data.orderId,
      paymentUrl: paymentResponse.data.paymentUrl ? 'Generated' : 'Missing'
    });
    
    // 步驟 5: 檢查支付 URL
    if (paymentResponse.data.paymentUrl) {
      console.log('\n5️⃣ Payment URL generated successfully');
      console.log('🔗 URL:', paymentResponse.data.paymentUrl);
      console.log('\n✅ Frontend Line Pay flow test PASSED!');
      console.log('\n📝 Next steps:');
      console.log('   1. User would be redirected to:', paymentResponse.data.paymentUrl);
      console.log('   2. After payment, Line Pay would redirect to confirm URL');
      console.log('   3. Points would be added to user account');
    } else {
      console.log('❌ No payment URL in response');
    }
    
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

testFrontendLinePayFlow(); 