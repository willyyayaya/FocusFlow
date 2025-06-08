const { Sequelize } = require('sequelize');
const UserModel = require('./user');
const ProductModel = require('./product');
const RedemptionModel = require('./redemption');
const DailyQuestModel = require('./dailyQuest');
const AchievementModel = require('./achievement');
const UserQuestModel = require('./userQuest');
const UserAchievementModel = require('./userAchievement');

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
const DailyQuest = DailyQuestModel(sequelize, Sequelize.DataTypes);
const Achievement = AchievementModel(sequelize, Sequelize.DataTypes);
const UserQuest = UserQuestModel(sequelize, Sequelize.DataTypes);
const UserAchievement = UserAchievementModel(sequelize, Sequelize.DataTypes);

// 設定關聯
User.hasMany(Redemption, { foreignKey: 'userId' });
Redemption.belongsTo(User, { foreignKey: 'userId' });
Product.hasMany(Redemption, { foreignKey: 'productId' });
Redemption.belongsTo(Product, { foreignKey: 'productId' });

// 每日任務關聯
User.hasMany(UserQuest, { foreignKey: 'userId' });
UserQuest.belongsTo(User, { foreignKey: 'userId' });
DailyQuest.hasMany(UserQuest, { foreignKey: 'questId' });
UserQuest.belongsTo(DailyQuest, { foreignKey: 'questId' });

// 成就關聯
User.hasMany(UserAchievement, { foreignKey: 'userId' });
UserAchievement.belongsTo(User, { foreignKey: 'userId' });
Achievement.hasMany(UserAchievement, { foreignKey: 'achievementId' });
UserAchievement.belongsTo(Achievement, { foreignKey: 'achievementId' });

module.exports = {
  sequelize,
  User,
  Product,
  Redemption,
  DailyQuest,
  Achievement,
  UserQuest,
  UserAchievement,
}; 