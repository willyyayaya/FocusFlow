require('dotenv').config();
const { sequelize, Product } = require('../models');

async function initProducts() {
  try {
    await sequelize.sync();
    
    // 清除現有商品
    await Product.destroy({ where: {} });
    
    // 新增測試商品
    const products = [
      {
        name: '星巴克咖啡券',
        description: '星巴克中杯咖啡兌換券',
        pointsRequired: 100,
        stock: 50,
        imageUrl: 'https://via.placeholder.com/200x200?text=Starbucks'
      },
      {
        name: '麥當勞套餐券',
        description: '麥當勞大麥克套餐兌換券',
        pointsRequired: 150,
        stock: 30,
        imageUrl: 'https://via.placeholder.com/200x200?text=McDonald'
      },
      {
        name: '7-11購物金',
        description: '7-11 便利商店 100元購物金',
        pointsRequired: 200,
        stock: 100,
        imageUrl: 'https://via.placeholder.com/200x200?text=7-11'
      },
      {
        name: 'Food TCG 基礎卡包',
        description: '包含5張隨機美食卡牌，稀有度包含普通、稀有卡',
        pointsRequired: 80,
        stock: 200,
        imageUrl: 'https://via.placeholder.com/200x200?text=Food+TCG+Basic'
      },
      {
        name: 'Food TCG 進階卡包',
        description: '包含5張隨機美食卡牌，保證至少1張稀有卡',
        pointsRequired: 150,
        stock: 100,
        imageUrl: 'https://via.placeholder.com/200x200?text=Food+TCG+Advanced'
      },
      {
        name: 'Food TCG 傳說卡包',
        description: '包含5張隨機美食卡牌，保證至少1張傳說卡',
        pointsRequired: 300,
        stock: 50,
        imageUrl: 'https://via.placeholder.com/200x200?text=Food+TCG+Legend'
      },
      {
        name: '電影票',
        description: '威秀影城電影票一張',
        pointsRequired: 300,
        stock: 20,
        imageUrl: 'https://via.placeholder.com/200x200?text=Movie'
      },
      {
        name: 'Amazon 禮品卡',
        description: 'Amazon 500元禮品卡',
        pointsRequired: 500,
        stock: 10,
        imageUrl: 'https://via.placeholder.com/200x200?text=Amazon'
      }
    ];
    
    for (const productData of products) {
      try {
        await Product.create(productData);
        console.log(`Created product: ${productData.name}`);
      } catch (err) {
        console.error(`Error creating product ${productData.name}:`, err.message);
      }
    }
    
    console.log('Products initialized successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error initializing products:', error);
    process.exit(1);
  }
}

initProducts(); 