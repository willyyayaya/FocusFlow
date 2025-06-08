const { Sequelize } = require('sequelize');
const UserModel = require('./user');
const ProductModel = require('./product');
const RedemptionModel = require('./redemption');

// 處理空密碼的情況
const dbConfig = {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  logging: false,
};

// 如果密碼不為空，才加入密碼
const sequelize = process.env.DB_PASSWORD 
  ? new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, dbConfig)
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, dbConfig);

const User = UserModel(sequelize, Sequelize.DataTypes);
const Product = ProductModel(sequelize, Sequelize.DataTypes);
const Redemption = RedemptionModel(sequelize, Sequelize.DataTypes);

// 設定關聯
User.hasMany(Redemption, { foreignKey: 'userId' });
Redemption.belongsTo(User, { foreignKey: 'userId' });
Product.hasMany(Redemption, { foreignKey: 'productId' });
Redemption.belongsTo(Product, { foreignKey: 'productId' });

module.exports = {
  sequelize,
  User,
  Product,
  Redemption,
}; 