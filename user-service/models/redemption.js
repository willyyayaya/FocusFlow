module.exports = (sequelize, DataTypes) => {
  const Redemption = sequelize.define('Redemption', {
    userId: { type: DataTypes.INTEGER, allowNull: false },
    productId: { type: DataTypes.INTEGER, allowNull: false },
    pointsUsed: { type: DataTypes.INTEGER, allowNull: false },
    status: { 
      type: DataTypes.ENUM('pending', 'completed', 'cancelled'), 
      defaultValue: 'pending' 
    },
    redemptionDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  });

  return Redemption;
}; 