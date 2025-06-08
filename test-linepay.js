require('dotenv').config({ path: './user-service/.env' });
const axios = require('axios');

async function testLinePayRequest() {
  console.log('Testing Line Pay request...');
  console.log('Channel ID:', process.env.LINEPAY_CHANNEL_ID);
  console.log('API URL:', process.env.LINEPAY_API_URL);
  
  try {
    // 模擬登入用戶
    const loginResponse = await axios.post('http://localhost:5001/api/auth/login', {
      username: 'testuser',
      password: 'password123'
    });
    
    if (loginResponse.data.success) {
      const token = loginResponse.data.token;
      console.log('Login successful, token:', token.substring(0, 20) + '...');
      
      // 測試 Line Pay 請求
      const paymentResponse = await axios.post('http://localhost:5001/api/linepay/request', {
        amount: 100,
        pointsToAdd: 100
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      console.log('Payment response:', paymentResponse.data);
    } else {
      console.log('Login failed, creating test user...');
      
      // 創建測試用戶
      const registerResponse = await axios.post('http://localhost:5001/api/auth/register', {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123'
      });
      
      if (registerResponse.data.success) {
        console.log('User created successfully');
        // 重新測試登入
        await testLinePayRequest();
      } else {
        console.log('Failed to create user:', registerResponse.data);
      }
    }
  } catch (error) {
    console.error('Test failed:', error.response?.data || error.message);
  }
}

testLinePayRequest(); 