module.exports = (sequelize, DataTypes) => {
  const UserAchievement = sequelize.define('UserAchievement', {
    userId: { type: DataTypes.INTEGER, allowNull: false },
    achievementId: { type: DataTypes.INTEGER, allowNull: false },
    unlockedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    currentProgress: { type: DataTypes.INTEGER, defaultValue: 0 },
    isUnlocked: { type: DataTypes.BOOLEAN, defaultValue: false },
  });

  return UserAchievement;
}; 