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
      await Product.create(productData);
      console.log(`Created product: ${productData.name}`);
    }
    
    console.log('Products initialized successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error initializing products:', error);
    process.exit(1);
  }
}

initProducts(); 