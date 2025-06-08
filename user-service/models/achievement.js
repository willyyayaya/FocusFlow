module.exports = (sequelize, DataTypes) => {
  const Achievement = sequelize.define('Achievement', {
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    achievementType: { 
      type: DataTypes.ENUM('task_master', 'point_collector', 'streak_keeper', 'early_bird', 'night_owl'), 
      allowNull: false 
    },
    targetValue: { type: DataTypes.INTEGER, allowNull: false }, // 目標值
    rewardPoints: { type: DataTypes.INTEGER, allowNull: false },
    iconUrl: { type: DataTypes.STRING },
    isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
    rarity: { 
      type: DataTypes.ENUM('common', 'rare', 'epic', 'legendary'), 
      defaultValue: 'common' 
    },
  });

  return Achievement;
}; 