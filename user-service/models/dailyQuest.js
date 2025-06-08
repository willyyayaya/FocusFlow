module.exports = (sequelize, DataTypes) => {
  const DailyQuest = sequelize.define('DailyQuest', {
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    questType: { 
      type: DataTypes.ENUM('create_task', 'complete_task', 'login', 'streak'), 
      allowNull: false 
    },
    targetCount: { type: DataTypes.INTEGER, defaultValue: 1 }, // 目標數量
    rewardPoints: { type: DataTypes.INTEGER, allowNull: false },
    isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
    resetDaily: { type: DataTypes.BOOLEAN, defaultValue: true }, // 是否每日重置
  });

  return DailyQuest;
}; 