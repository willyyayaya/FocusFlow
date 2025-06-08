const axios = require('axios');
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');
const { User } = require('../models');

// Line Pay 設定 (測試環境)
const LINE_PAY_CONFIG = {
  channelId: process.env.LINEPAY_CHANNEL_ID || 'test_channel_id',
  channelSecret: process.env.LINEPAY_CHANNEL_SECRET || 'test_channel_secret',
  apiUrl: process.env.LINEPAY_API_URL || 'https://sandbox-api-pay.line.me', // 測試環境
  version: 'v3'
};

// 生成 Line Pay 簽名
function generateSignature(uri, body, nonce) {
  const message = LINE_PAY_CONFIG.channelSecret + uri + body + nonce;
  return crypto.createHmac('sha256', LINE_PAY_CONFIG.channelSecret)
    .update(message)
    .digest('base64');
}

// 發起支付請求
exports.createPayment = async (req, res) => {
  const userId = req.user.id;
  const { amount, pointsToAdd } = req.body; // amount: 支付金額, pointsToAdd: 要購買的點數
  
  try {
    const orderId = uuidv4();
    const nonce = uuidv4();
    
    const requestBody = {
      amount: amount,
      currency: 'TWD',
      orderId: orderId,
      packages: [{
        id: 'points_package',
        amount: amount,
        name: `購買 ${pointsToAdd} 點數`,
        products: [{
          name: `FocusFlow 點數 x${pointsToAdd}`,
          quantity: 1,
          price: amount
        }]
      }],
      redirectUrls: {
        confirmUrl: `http://localhost:5001/api/linepay/confirm?orderId=${orderId}&userId=${userId}&points=${pointsToAdd}`,
        cancelUrl: `http://localhost:3000/payment/cancel`
      }
    };
    
    const uri = `/v3/payments/request`;
    const bodyString = JSON.stringify(requestBody);
    const signature = generateSignature(uri, bodyString, nonce);
    
    const headers = {
      'Content-Type': 'application/json',
      'X-LINE-ChannelId': LINE_PAY_CONFIG.channelId,
      'X-LINE-Authorization-Nonce': nonce,
      'X-LINE-Authorization': signature
    };
    
    const response = await axios.post(
      `${LINE_PAY_CONFIG.apiUrl}${uri}`,
      requestBody,
      { headers }
    );
    
    if (response.data.returnCode === '0000') {
      res.json({
        success: true,
        paymentUrl: response.data.info.paymentUrl.web,
        transactionId: response.data.info.transactionId,
        orderId: orderId
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Line Pay request failed',
        error: response.data
      });
    }
  } catch (error) {
    console.error('Line Pay error:', error);
    res.status(500).json({
      success: false,
      message: 'Payment request failed',
      error: error.message
    });
  }
};

// 確認支付
exports.confirmPayment = async (req, res) => {
  const { transactionId, orderId, userId, points } = req.query;
  
  try {
    const nonce = uuidv4();
    const requestBody = {
      amount: req.query.amount || 100, // 從查詢參數獲取金額
      currency: 'TWD'
    };
    
    const uri = `/v3/payments/${transactionId}/confirm`;
    const bodyString = JSON.stringify(requestBody);
    const signature = generateSignature(uri, bodyString, nonce);
    
    const headers = {
      'Content-Type': 'application/json',
      'X-LINE-ChannelId': LINE_PAY_CONFIG.channelId,
      'X-LINE-Authorization-Nonce': nonce,
      'X-LINE-Authorization': signature
    };
    
    const response = await axios.post(
      `${LINE_PAY_CONFIG.apiUrl}${uri}`,
      requestBody,
      { headers }
    );
    
    if (response.data.returnCode === '0000') {
      // 支付成功，增加用戶點數
      const user = await User.findByPk(userId);
      if (user) {
        user.points += parseInt(points);
        await user.save();
        
        // 重導向到成功頁面
        res.redirect(`http://localhost:3000/payment/success?points=${points}`);
      } else {
        res.redirect(`http://localhost:3000/payment/error?message=User not found`);
      }
    } else {
      res.redirect(`http://localhost:3000/payment/error?message=Payment confirmation failed`);
    }
  } catch (error) {
    console.error('Payment confirmation error:', error);
    res.redirect(`http://localhost:3000/payment/error?message=Payment confirmation error`);
  }
};

// 取得支付狀態
exports.getPaymentStatus = async (req, res) => {
  const { transactionId } = req.params;
  
  try {
    const nonce = uuidv4();
    const uri = `/v3/payments/authorizations?transactionId=${transactionId}`;
    const signature = generateSignature(uri, '', nonce);
    
    const headers = {
      'X-LINE-ChannelId': LINE_PAY_CONFIG.channelId,
      'X-LINE-Authorization-Nonce': nonce,
      'X-LINE-Authorization': signature
    };
    
    const response = await axios.get(
      `${LINE_PAY_CONFIG.apiUrl}${uri}`,
      { headers }
    );
    
    res.json(response.data);
  } catch (error) {
    console.error('Get payment status error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get payment status',
      error: error.message
    });
  }
}; 