module.exports = (sequelize, DataTypes) => {
  const UserQuest = sequelize.define('UserQuest', {
    userId: { type: DataTypes.INTEGER, allowNull: false },
    questId: { type: DataTypes.INTEGER, allowNull: false },
    currentProgress: { type: DataTypes.INTEGER, defaultValue: 0 },
    isCompleted: { type: DataTypes.BOOLEAN, defaultValue: false },
    completedAt: { type: DataTypes.DATE },
    questDate: { type: DataTypes.DATEONLY, allowNull: false }, // 任務日期
    rewardClaimed: { type: DataTypes.BOOLEAN, defaultValue: false }, // 獎勵是否已領取
  });

  return UserQuest;
}; 