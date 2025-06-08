const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const auth = require('../middleware/auth');

// 取得所有商品 (公開)
router.get('/', productController.getProducts);

// 新增商品 (需要認證，管理員功能)
router.post('/', auth, productController.createProduct);

// 兌換商品 (需要認證)
router.post('/redeem', auth, productController.redeemProduct);

// 取得用戶兌換記錄 (需要認證)
router.get('/redemptions', auth, productController.getUserRedemptions);

// 取得所有兌換記錄 (需要認證，管理員功能)
router.get('/redemptions/all', auth, productController.getAllRedemptions);

module.exports = router; 